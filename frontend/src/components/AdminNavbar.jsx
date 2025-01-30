"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { 
  Home, 
  Hotel, 
  PlusSquare, 
  LayoutDashboard, 
  Users, 
  LogOut,
  Menu
} from "lucide-react"

export default function AdminNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const navItems = [
    { name: "Home", icon: Home, action: () => navigate('/AdminDashboard') },
    { name: "Rooms", icon: Hotel, action: () => navigate('/rooms') },
    { name: "Add Room", icon: PlusSquare, action: () => navigate('/add-room') },
    { name: "Dashboard Stats", icon: LayoutDashboard, action: () => navigate('/dashboardstats') },
    { name: "Employees", icon: Users, action: () => navigate('/employees') },
  ]

  return (
    <nav className="fixed w-full bg-gray-900 bg-opacity-90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/AdminDashboard')}
              className="text-white text-2xl font-bold hover:opacity-80 transition-opacity"
            >
              HotelEase
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  onClick={item.action}
                  variant="ghost"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 gap-2"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              ))}
              <Button
                onClick={handleLogOut}
                variant="ghost"
                className="text-red-300 hover:bg-gray-700 hover:text-red-500 px-3 py-2 gap-2"
              >
                <LogOut className="h-5 w-5" />
                Log Out
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-800">
                <nav className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      onClick={() => {
                        item.action()
                        setIsOpen(false)
                      }}
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white gap-3 py-6"
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="text-lg">{item.name}</span>
                    </Button>
                  ))}
                  <Button
                    onClick={handleLogOut}
                    variant="ghost"
                    className="w-full justify-start text-red-300 hover:bg-gray-700 hover:text-red-500 gap-3 py-6"
                  >
                    <LogOut className="h-6 w-6" />
                    <span className="text-lg">Log Out</span>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}