import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Wrench, CheckCircle, ArrowRight } from "lucide-react";
import axios from 'axios';
import { useAuth } from '../AuthContext';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const StaffMain = () => {
  const navigate = useNavigate();
  const [roomInspections, setRoomInspections] = useState([]);
  const [visitedRooms, setVisitedRooms] = useState(new Set());
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchRoomData();
    }
  }, [token]);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/room-status/', {
        headers: { Authorization: `Token ${token}` },
      });
      setRoomInspections(response.data);
    } catch (error) {
      console.error('Error fetching room data:', error.message);
    }
  };

  const handleRoomClick = (roomNumber) => {
    navigate(`/StaffDashboard`, { state: { roomNumber } });
    setVisitedRooms(prev => new Set(prev).add(roomNumber));
  };

  const RoomCard = ({ room, delay }) => (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      transition={{ delay }}
    >
      <Card className="group h-full transition-all hover:shadow-lg">
        <CardHeader className="relative overflow-hidden p-0">
          <img
            src={room.room_image || "/api/placeholder/400/200"}
            alt={`Room ${room.room_number}`}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-xl font-bold text-white">Room {room.room_number}</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            {room.status === 'clean' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Wrench className="h-5 w-5 text-amber-500" />
            )}
            <span className="text-sm font-medium capitalize text-gray-700">
              {room.status}
            </span>
          </div>
          
          <button
            onClick={() => handleRoomClick(room.room_number)}
            className="group/btn flex w-full items-center justify-between rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const RoomSection = ({ title, rooms, startDelay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: startDelay }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
          {rooms.length} rooms
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room, index) => (
          <RoomCard
            key={room.room_number}
            room={room}
            delay={startDelay + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );

  const cleanedRooms = roomInspections.filter(room => room.status === 'clean');
  const maintenanceRooms = roomInspections.filter(room => room.status === 'maintenance');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mx-auto max-w-7xl space-y-8 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900">Staff Dashboard</h1>
          <p className="mt-2 text-gray-600">Monitor and manage room status</p>
        </motion.div>

        <RoomSection
          title="Clean Rooms"
          rooms={cleanedRooms}
          startDelay={0.2}
        />

        <RoomSection
          title="Maintenance Required"
          rooms={maintenanceRooms}
          startDelay={0.4}
        />
      </div>
    </div>
  );
};

export default StaffMain;