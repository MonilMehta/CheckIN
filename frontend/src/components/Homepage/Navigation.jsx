"use client"

import { useState } from "react"
import Link from "react-router-dom"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Menu, LogIn, UserPlus } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "Why Us", href: "#why-us" },
  { name: "Reviews", href: "#reviews" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-black bg-opacity-90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              CheckIn
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="outline" size="sm" className="text-white hover:bg-gray-700">
                  <LogIn className="mr-2 h-4 w-4" /> Log In
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Button>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="outline" size="icon" className="mr-2">
              <LogIn className="h-5 w-5" />
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-2 py-2 text-lg hover:bg-gray-100 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2 mt-4">
                    <Button variant="outline" className="w-full">
                      <LogIn className="mr-2 h-4 w-4" /> Log In
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}