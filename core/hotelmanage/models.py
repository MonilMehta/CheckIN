from django.db import models
from authentication.models import User
from django.core.validators import MaxValueValidator

class RoomStatus(models.Model):
    ROOM_STATUSES = (
        ('clean', 'Clean'),
        ('maintenance', 'Needs Maintenance'),
    )
    room_number = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=ROOM_STATUSES, default='clean')
    last_checked = models.DateTimeField(auto_now=True)
    employee = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    progress_description = models.TextField(blank=True, null=True)
    room_image = models.ImageField(upload_to='room_images/', blank=True, null=True)
    
    # New fields
    notes = models.TextField(blank=True, null=True,default='')
    reported_issues = models.TextField(blank=True, null=True,default='')
    last_cleaning_success = models.BooleanField(null=True, blank=True,default=None)
   
    # Inventory fields
    bottle = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(2)])
    cup = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(4)])
    wine_glass = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(2)])
    bowl = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(4)])

    def __str__(self):
        return f"Room {self.room_number} - {self.status}"

    def save(self, *args, **kwargs):
        print("Saving room status")
        print("Current status:", self.status)
       
        # Check if the room is clean based on the inventory counts
        is_clean = (
            self.bottle <= 2 and
            self.cup <= 4 and
            self.wine_glass <= 2 and
            self.bowl <= 4
        )
        print("Is clean:", is_clean)
       
        if self.status == 'maintenance':
            pass  # Keep the status as maintenance
        elif is_clean:
            self.status = 'clean'
        else:
            self.status = 'maintenance'
       
        # Update last_cleaning_success
        self.last_cleaning_success = is_clean if self.status == 'clean' else False
       
        print("Updated status:", self.status)
        super().save(*args, **kwargs)

class RoomCleanLog(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(RoomStatus, on_delete=models.CASCADE)
    clean_date = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=False)  # Did the staff clean it properly?
    notes = models.TextField(blank=True, null=True)
    reported_issues = models.TextField(blank=True, null=True)
    cleaning_duration = models.DurationField(null=True, blank=True)  # Track time taken
    items_restored = models.JSONField(default=dict)  # Track inventory items restored
    quality_score = models.FloatField(default=0.0)  # Score based on cleaning quality
    verified_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='verifications'
    )

    @property
    def efficiency_score(self):
        if self.cleaning_duration:
            base_score = 100
            # Deduct points for longer duration (over 30 minutes)
            duration_minutes = self.cleaning_duration.total_seconds() / 60
            if duration_minutes > 30:
                base_score -= (duration_minutes - 30) * 2
            return max(base_score * (self.quality_score / 100), 0)
        return 0

    def __str__(self):
        return f"Room {self.room.room_number} cleaned by {self.employee.username}"

class EmployeePerformance(models.Model):
    employee = models.OneToOneField(User, on_delete=models.CASCADE)
    total_rooms_cleaned = models.IntegerField(default=0)
    successful_cleanings = models.IntegerField(default=0)
    average_duration = models.DurationField(null=True)
    average_quality_score = models.FloatField(default=0.0)
    monthly_rating = models.FloatField(default=0.0)

    def update_stats(self):
        logs = RoomCleanLog.objects.filter(employee=self.employee)
        self.total_rooms_cleaned = logs.count()
        self.successful_cleanings = logs.filter(success=True).count()
        
        if logs.exists():
            # Calculate average duration
            durations = logs.exclude(cleaning_duration=None)
            if durations.exists():
                total_duration = sum((log.cleaning_duration.total_seconds() for log in durations), 0)
                self.average_duration = total_duration / durations.count()
            
            # Calculate average quality score
            self.average_quality_score = logs.aggregate(models.Avg('quality_score'))['quality_score__avg'] or 0
            
            # Calculate monthly rating
            self.monthly_rating = (
                (self.successful_cleanings / self.total_rooms_cleaned * 100) * 0.4 +
                (self.average_quality_score) * 0.4 +
                (100 - (self.average_duration.total_seconds() / 1800) * 100) * 0.2
            ) if self.average_duration else 0
        
        self.save()