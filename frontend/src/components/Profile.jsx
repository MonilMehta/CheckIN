import React, { useState, useEffect } from 'react';
import ResponsiveAppBarStaff from './StaffNavbar';
import Footer from './Footer';
import { 
  User, 
  Edit, 
  Mop, 
  Hotel, 
  Star, 
  ChevronDown, 
  ImagePlus, 
  ClipboardList, 
  Clock, 
  Flame, 
  Award,
  Calendar,
  Activity,
  Layers
} from 'lucide-react';

const Profile = () => {
  // State for user data with expanded fields relevant to a hotel cleaning staff
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    userName: 'johndoe123',
    employeeType: 'Staff',
    profileImage: '/static/images/avatar.jpg',
    performanceRating: 4.7,
    roomsCleaned: 243,
    cleaningStreak: 16,
    averageRating: 4.8,
    joinDate: '2023-05-15',
    assignedRooms: [
      { id: 'R103', status: 'Pending', floor: 1, type: 'Standard' },
      { id: 'R205', status: 'In Progress', floor: 2, type: 'Suite' },
    ],
    recentActivity: [
      { id: 'A123', room: 'R102', date: '2025-03-14', rating: 4.9, status: 'Completed' },
      { id: 'A122', room: 'R304', date: '2025-03-13', rating: 4.7, status: 'Completed' },
      { id: 'A121', room: 'R207', date: '2025-03-12', rating: 5.0, status: 'Completed' },
    ],
    skills: ['Deep Cleaning', 'Quick Turnaround', 'Attention to Detail'],
    certifications: ['Hospitality Standards', 'Safety Protocols']
  });

  // State for accordion expansion
  const [expanded, setExpanded] = useState({
    assigned: true,
    recent: false,
    performance: false
  });

  // Toggle accordion sections
  const toggleAccordion = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };

  // Calculate progress for performance meter (out of 5)
  const calculateProgress = (rating) => (rating / 5) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <ResponsiveAppBarStaff />
      
      <div className="flex-1 p-4 md:p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Staff Profile</h1>
            <p className="text-gray-600">View and manage your profile information</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-blue-600 p-6 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white">
                      {userData.profileImage ? (
                        <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={40} className="text-gray-400" />
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white">
                      <Edit size={14} className="text-white" />
                    </div>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-white">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="text-blue-100">{userData.userName}</p>
                  <div className="mt-2 px-3 py-1 bg-blue-700 rounded-full text-sm text-white">
                    {userData.employeeType}
                  </div>
                </div>
                
                <div className="p-6 border-b">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-3">
                      <User size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{userData.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mr-3">
                      <Calendar size={20} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Join Date</div>
                      <div className="font-medium">{userData.joinDate}</div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center">
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Skills & Certifications</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {userData.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userData.certifications.map((cert, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dashboard Area */}
            <div className="lg:col-span-2">
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">Performance</div>
                    <div className="bg-blue-100 p-2 rounded-md">
                      <Star size={16} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{userData.performanceRating}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${calculateProgress(userData.performanceRating)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">Rooms Cleaned</div>
                    <div className="bg-green-100 p-2 rounded-md">
                      <Mop size={16} className="text-green-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{userData.roomsCleaned}</div>
                  <div className="text-green-600 text-xs mt-2">Lifetime total</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">Streak</div>
                    <div className="bg-orange-100 p-2 rounded-md">
                      <Flame size={16} className="text-orange-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{userData.cleaningStreak}</div>
                  <div className="text-orange-600 text-xs mt-2">Consecutive days</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">Avg. Rating</div>
                    <div className="bg-purple-100 p-2 rounded-md">
                      <Award size={16} className="text-purple-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{userData.averageRating}</div>
                  <div className="text-purple-600 text-xs mt-2">AI Evaluation</div>
                </div>
              </div>
              
              {/* Assigned Rooms Section */}
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleAccordion('assigned')}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                      <ClipboardList size={20} className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Assigned Rooms</h3>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-500 transition-transform ${expanded.assigned ? 'transform rotate-180' : ''}`} 
                  />
                </div>
                
                {expanded.assigned && (
                  <div className="p-4 pt-0">
                    {userData.assignedRooms.length > 0 ? (
                      <div className="divide-y">
                        {userData.assignedRooms.map((room) => (
                          <div key={room.id} className="py-3 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-3">
                                <Hotel size={20} className="text-gray-500" />
                              </div>
                              <div>
                                <div className="font-medium">{room.id}</div>
                                <div className="text-sm text-gray-500">
                                  Floor {room.floor} • {room.type}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                room.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                room.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {room.status}
                              </span>
                              <button className="ml-3 bg-green-600 hover:bg-green-700 text-white p-1 rounded-md">
                                <ImagePlus size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-gray-500">
                        No rooms currently assigned
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Recent Activity Section */}
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleAccordion('recent')}
                >
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-md mr-3">
                      <Activity size={20} className="text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-500 transition-transform ${expanded.recent ? 'transform rotate-180' : ''}`} 
                  />
                </div>
                
                {expanded.recent && (
                  <div className="p-4 pt-0">
                    {userData.recentActivity.length > 0 ? (
                      <div className="divide-y">
                        {userData.recentActivity.map((activity) => (
                          <div key={activity.id} className="py-3 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-3">
                                <Mop size={20} className="text-gray-500" />
                              </div>
                              <div>
                                <div className="font-medium">Room {activity.room}</div>
                                <div className="text-sm text-gray-500">
                                  {activity.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="flex items-center mr-2">
                                <Star size={16} className="text-yellow-500 mr-1" />
                                <span>{activity.rating}</span>
                              </div>
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                {activity.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-gray-500">
                        No recent activity
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Performance Insights */}
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleAccordion('performance')}
                >
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-md mr-3">
                      <Layers size={20} className="text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Performance Insights</h3>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-500 transition-transform ${expanded.performance ? 'transform rotate-180' : ''}`} 
                  />
                </div>
                
                {expanded.performance && (
                  <div className="p-4 pt-0">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700">Cleanliness</span>
                          <span className="text-sm font-medium text-gray-700">4.8/5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700">Efficiency</span>
                          <span className="text-sm font-medium text-gray-700">4.5/5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700">Attention to Detail</span>
                          <span className="text-sm font-medium text-gray-700">4.9/5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700">Speed</span>
                          <span className="text-sm font-medium text-gray-700">4.3/5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '86%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Star size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800">AI Feedback</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Room cleaning quality is consistently excellent. Consider focusing on improving turnaround time while maintaining quality standards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Actions Section */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center">
                  <ImagePlus size={20} className="mr-2" />
                  Upload Room Images
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="mr-2" />
                  View Work Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
