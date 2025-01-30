import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function CTA() {
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900/50 to-indigo-900/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="glass-panel rounded-3xl p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Background Sparkles */}
          <div className="absolute inset-0 z-0">
            <Sparkles className="absolute top-1/4 left-1/4 w-24 h-24 text-blue-400/20 animate-pulse" />
            <Sparkles className="absolute top-3/4 right-1/4 w-24 h-24 text-blue-400/20 animate-pulse delay-300" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
              Ready to Transform Your Hotel Management?
            </h2>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Get started today and experience the power of our cutting-edge hotel management system.
            </p>
            
            <div className="flex justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  size="lg" 
                  className="bg-blue-800/80 hover:bg-blue-700/90 backdrop-blur-sm"
                  onClick={() => navigate('/signup')}
                >
                  Schedule Demo
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  size="lg" 
                  className="bg-blue-600/80 hover:bg-blue-500/90 backdrop-blur-sm flex items-center gap-2"
                  onClick={() => navigate('/signup')}
                >
                  <Sparkles className="w-5 h-5 animate-sparkle" />
                  Start Free Trial
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .glass-panel {
          background: rgba(16, 24, 39, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }
        
        @keyframes sparkle {
          0% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.8; transform: scale(1); }
        }
        
        .animate-sparkle {
          animation: sparkle 1.5s infinite;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  )
}