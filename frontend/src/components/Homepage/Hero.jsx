"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-neutral-900 to-blue-900/95">
      {/* Main Container */}
      <div className="flex h-full w-full flex-col items-center justify-center md:flex-row">
        {/* 3D Model Container - Left Side */}
        <motion.div 
          className="h-full w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Spline 
            scene="https://prod.spline.design/zxwqwZjR-G8DuQS0/scene.splinecode"
            className="h-full w-full mt-20"
            onLoad={(spline) => {
              // Add interactivity to 3D elements
              spline.addEventListener('mouseDown', (e) => {
                if(e.target.name === 'Your_Element_Name') {
                  // Handle 3D element interaction
                  console.log('3D element clicked:', e.target.name);
                }
              });
            }}
          />
        </motion.div>

        {/* Glass Panel Container - Right Side */}
        <div className="flex h-full w-full items-center justify-center md:w-1/2">
          <motion.div
            className="glass-panel mx-8 my-12 w-full max-w-2xl p-8 backdrop-blur-xl md:mx-12 md:p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  Next Generation
                  <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Hotel Management
                  </span>
                </h1>
              </motion.div>

              {/* Description Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-lg text-gray-200 md:text-xl">
                  Transform your hospitality operations with our AI-powered platform featuring:
                </p>
                <ul className="mt-4 space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                    Real-time room analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                    Smart booking system
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                    Automated guest services
                  </li>
                </ul>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-blue-600/90 px-8 py-6 text-lg hover:bg-blue-700/90"
                  onClick={() => navigate('/signup')}
                >
                  <Sparkles className="mr-2 h-6 w-6 transition-transform group-hover:rotate-180" />
                  Start Free Trial
                  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent transition-opacity group-hover:opacity-100" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global Styles for Glass Panel */}
      <style jsx global>{`
        .glass-panel {
          background: rgba(16, 24, 39, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          background-image: radial-gradient(
            circle at 100% 100%,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.01) 100%
          );
        }

        /* Improve 3D canvas rendering */
        canvas {
          touch-action: none;
          outline: none;
        }
      `}</style>
    </section>
  );
}