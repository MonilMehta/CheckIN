from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .serializers import RoomStatusCreateSerializer, RoomStatusSerializer, EmployeePerformanceSerializer
from .models import EmployeePerformance
from .aimodels import predict_single_image, detect_objects_and_count
from .models import RoomStatus, RoomCleanLog
from authentication.models import User
from .models import RoomStatus, RoomCleanLog
from .serializers import RoomStatusSerializer, RoomCleanLogSerializer
from .aimodels import predict_single_image, detect_objects_and_count
from rest_framework import status
import plotly.graph_objs as go
from django.db import models
from django.db.models import Q
from django.db.models.functions import TruncDate
from django.utils import timezone
from datetime import timedelta


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_cleaning_report(request):
    room_number = request.data.get('room_number')
    notes = request.data.get('notes')
    reported_issues = request.data.get('reported_issues')

    try:
        room_status = RoomStatus.objects.get(room_number=room_number)
    except RoomStatus.DoesNotExist:
        return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

    room_status.notes = notes
    room_status.reported_issues = reported_issues
    room_status.save()

    clean_log = RoomCleanLog.objects.create(
        employee=request.user,
        room=room_status,
        notes=notes,
        reported_issues=reported_issues,
        success=room_status.last_cleaning_success
    )

    return Response({
        'message': 'Cleaning report submitted successfully',
        'cleaning_success': room_status.last_cleaning_success
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def room_cleaning_history(request, room_number):
    try:
        room = RoomStatus.objects.get(room_number=room_number)
    except RoomStatus.DoesNotExist:
        return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

    cleaning_logs = RoomCleanLog.objects.filter(room=room).order_by('-clean_date')
    serializer = RoomCleanLogSerializer(cleaning_logs, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

class RoomStatusViewSet(viewsets.ModelViewSet):
    queryset = RoomStatus.objects.all()
    print(queryset)
    serializer_class = RoomStatusSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createroom(request):
    serializer = RoomStatusCreateSerializer(data=request.data)
    if serializer.is_valid():
        room_number = request.data.get('room_number')
        employee_id = request.data.get('employee')  # Get the employee ID from the request

        room_image = serializer.validated_data.get('room_image')
        image_content = ContentFile(room_image.read())
        image_name = room_image.name
        image_path = default_storage.save(f'D:/Hackathon/LOC/core/room_images/{image_name}', image_content)

        if RoomStatus.objects.filter(room_number=room_number).exists():
            return Response({'error': 'Room status already exists'}, status=status.HTTP_400_BAD_REQUEST)

        room_status_value = None

        try:
            image, prediction = predict_single_image(image_path)
            if prediction and len(prediction) > 0 and len(prediction[0]) > 0:
                room_status_value = 'clean' if prediction[0][0] < 0.6 else 'maintenance'
            else:
                return Response({'error': 'Prediction data is invalid'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Error during prediction: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if room_status_value is None:
            return Response({'error': 'Status could not be determined'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Find the employee instance from the employee_id
            employee = User.objects.get(id=employee_id)  # Assuming User is the employee model

            room_status = RoomStatus.objects.create(
                room_number=room_number,
                employee=employee,  # Set the employee field here
                room_image=image_path,
                status=room_status_value
            )
            return Response(RoomStatusSerializer(room_status).data, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({'error': 'Employee does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateroom(request, room_number):
    try:
        room_status = RoomStatus.objects.get(room_number=room_number)
    except RoomStatus.DoesNotExist:
        return Response({'error': 'Room status not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = RoomStatusCreateSerializer(room_status, data=request.data, partial=True)
    if serializer.is_valid():
        room_image = serializer.validated_data.get('room_image')
        if room_image:
            image_content = ContentFile(room_image.read())
            image_name = room_image.name
            image_path = default_storage.save(f'D:/Hackathon/LOC/core/room_images/{image_name}', image_content)
            room_status.room_image = image_path

            # Update the existing room status object
            image, prediction = predict_single_image(image_path)
            room_status.status = 'clean' if prediction[0][0] < 0.6 else 'maintenance'

        # Assign the authenticated user to the room status
        room_status.employee = request.user
        room_status.save()
        return Response(RoomStatusSerializer(room_status).data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Room statistics
        rooms = RoomStatus.objects.all()
        room_stats = {
            'total_rooms': rooms.count(),
            'clean': rooms.filter(status='clean').count(),
            'maintenance': rooms.filter(status='maintenance').count(),
            'cleaning_needed': rooms.filter(
                models.Q(bottle__gt=2) | 
                models.Q(cup__gt=4) | 
                models.Q(wine_glass__gt=2) | 
                models.Q(bowl__gt=4)
            ).count()
        }

        # Employee statistics
        employees = User.objects.filter(employee_type='staff')
        employee_stats = []
        
        for employee in employees:
            performance = EmployeePerformance.objects.get_or_create(employee=employee)[0]
            performance.update_stats()
            
            recent_logs = RoomCleanLog.objects.filter(
                employee=employee,
                clean_date__gte=timezone.now() - timezone.timedelta(days=30)
            )
            
            employee_stats.append({
                'employee_id': employee.id,
                'employee_name': employee.get_full_name(),
                'total_rooms_cleaned': performance.total_rooms_cleaned,
                'successful_cleanings': performance.successful_cleanings,
                'success_rate': (performance.successful_cleanings / performance.total_rooms_cleaned * 100) if performance.total_rooms_cleaned > 0 else 0,
                'average_duration': performance.average_duration,
                'average_quality_score': performance.average_quality_score,
                'monthly_rating': performance.monthly_rating,
                'recent_activity': {
                    'rooms_cleaned_this_month': recent_logs.count(),
                    'average_daily_rooms': recent_logs.count() / 30,
                }
            })

        return Response({
            'room_stats': room_stats,
            'employee_stats': employee_stats,
            'inventory_stats': {
                'total_inventory_issues': rooms.filter(
                    models.Q(bottle__gt=2) | 
                    models.Q(cup__gt=4) | 
                    models.Q(wine_glass__gt=2) | 
                    models.Q(bowl__gt=4)
                ).count()
            }
        }, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # This enforces authentication
@csrf_exempt
def inventory_check(request):
    employee = request.user
    if not request.user.is_authenticated:
        return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        room_number = request.data.get('room_number')

        try:
            room_status = RoomStatus.objects.get(room_number=room_number)
        except RoomStatus.DoesNotExist:
            return Response({"error": "RoomStatus does not exist"}, status=status.HTTP_404_NOT_FOUND)

        object_counts = detect_objects_and_count(image_file)
        room_status.status = request.data.get('status')
        room_status.employee = employee  # Authenticated User object
        room_status.bottle = object_counts.get('bottle', 0)/2
        room_status.cup = object_counts.get('cup', 0)/4
        room_status.wine_glass = object_counts.get('wine_glass', 0)/2
        room_status.bowl = object_counts.get('bowl', 0)/4
        room_status.save()

        return Response({"inventory_counts": object_counts}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def roomdata(request, pk):
    try:
        room_status = RoomStatus.objects.get(pk=pk)
        serializer = RoomStatusSerializer(room_status)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except RoomStatus.DoesNotExist:
        return Response({"error": "RoomStatus does not exist"}, status=status.HTTP_404_NOT_FOUND)

class EmployeePerformanceGraphs(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, employee_id):
        logs = RoomCleanLog.objects.filter(
            employee_id=employee_id,
            clean_date__gte=timezone.now() - timedelta(days=30)
        )
        daily_stats = logs.annotate(date=TruncDate('clean_date')).values('date').annotate(
            count=models.Count('id'),
            success_rate=models.Count('id', filter=Q(success=True)) * 100.0 / models.Count('id')
        ).order_by('date')
        
        fig1 = go.Figure()
        fig1.add_trace(go.Scatter(
            x=[x['date'] for x in daily_stats],
            y=[x['count'] for x in daily_stats],
            name='Rooms Cleaned'
        ))
        fig1.update_layout(title='Daily Rooms Cleaned')

        fig2 = go.Figure()
        fig2.add_trace(go.Scatter(
            x=[x['date'] for x in daily_stats],
            y=[x['success_rate'] for x in daily_stats],
            name='Success Rate'
        ))
        fig2.update_layout(title='Daily Success Rate (%)')

        return Response({
            'rooms_cleaned_graph': fig1.to_json(),
            'success_rate_graph': fig2.to_json()
        }, status=status.HTTP_200_OK)

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        # Summary of user types/staff
        total_users = User.objects.count()
        total_staff = User.objects.filter(employee_type='staff').count()
        total_admins = User.objects.filter(employee_type='admin').count()

        # Summary of rooms
        total_rooms = RoomStatus.objects.count()
        maintenance_rooms = RoomStatus.objects.filter(status='maintenance').count()

        # Summary of logs
        total_logs = RoomCleanLog.objects.count()

        return Response({
            'users_summary': {
                'total_users': total_users,
                'total_staff': total_staff,
                'total_admins': total_admins
            },
            'rooms_summary': {
                'total_rooms': total_rooms,
                'maintenance_rooms': maintenance_rooms
            },
            'logs_summary': {
                'total_logs': total_logs
            }
        }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def archive_old_logs(request):
    days_threshold = int(request.data.get('days', 90))
    cutoff_date = timezone.now() - timedelta(days=days_threshold)
    old_logs = RoomCleanLog.objects.filter(clean_date__lt=cutoff_date)
    count_deleted = old_logs.delete()

    return Response({
        'message': f"{count_deleted[0]} old logs archived successfully."
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def employee_performance_stats(request):
    performances = EmployeePerformance.objects.all()
    serializer = EmployeePerformanceSerializer(performances, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def employee_performance_detail(request, employee_id):
    try:
        performance = EmployeePerformance.objects.get(employee_id=employee_id)
        serializer = EmployeePerformanceSerializer(performance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except EmployeePerformance.DoesNotExist:
        return Response({"error": "EmployeePerformance does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_employee_performance(request, employee_id):
    try:
        performance = EmployeePerformance.objects.get(employee_id=employee_id)
    except EmployeePerformance.DoesNotExist:
        return Response({"error": "EmployeePerformance does not exist"}, status=status.HTTP_404_NOT_FOUND)

    serializer = EmployeePerformanceSerializer(performance, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_rooms(request):
    rooms = RoomStatus.objects.all()
    serializer = RoomStatusSerializer(rooms, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)