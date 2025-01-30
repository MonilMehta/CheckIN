"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import ResponsiveAppBar from './StaffNavbar'
import Footer from './Footer'

const AddRoom = () => {
  const [roomData, setRoomData] = useState({
    room_number: '',
    employee: '',
  })
  const [roomImage, setRoomImage] = useState(null)
  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/staff/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        })
        setEmployees(response.data.filter(user => !user.is_staff))
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }

    fetchEmployees()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setRoomData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleImageChange = (e) => {
    if (e.target.files) {
      setRoomImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('room_number', roomData.room_number)
    formData.append('employee', roomData.employee)
    if (roomImage) {
      formData.append('room_image', roomImage)
    }

    try {
      await axios.post('http://localhost:8000/api/createroom/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      navigate('/home')
    } catch (error) {
      console.error('Error adding room:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <ResponsiveAppBar />
      <div className="max-w-2xl  mx-auto px-4 py-8">
        <h1 className="text-3xl mt-20 font-bold text-gray-900 mb-8">Add New Room</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <Label htmlFor="room_number" className="text-gray-700">
                Room Number
              </Label>
              <Input
                id="room_number"
                name="room_number"
                value={roomData.room_number}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-gray-700">Employee</Label>
              <Select
                value={roomData.employee}
                onValueChange={(value) => setRoomData({ ...roomData, employee: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-gray-700 block">Room Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:text-gray-700 file:bg-gray-100 file:border-0 file:rounded-md file:px-4 file:py-2"
              />
              {roomImage && (
                <div className="mt-4">
                  <img 
                    src={URL.createObjectURL(roomImage)} 
                    alt="Room Preview" 
                    className="max-w-[300px] max-h-[200px] object-cover rounded-md border border-gray-200"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {roomImage.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
          >
            Add Room
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default AddRoom