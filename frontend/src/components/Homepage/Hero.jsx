"use client"

import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Sparkles } from "lucide-react"


export default function Hero() {

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-50"
      >
        <source src="/hotel-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            CheckIn
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Streamline your hotel operations with our cutting-edge AI-powered management solutions
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center mx-auto"
          >
            <Sparkles className="mr-2 h-5 w-5" /> Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  )
}