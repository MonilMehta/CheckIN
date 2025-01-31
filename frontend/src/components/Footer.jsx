import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Sparkles } from "lucide-react"
import { Button } from "./ui/button"

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 to-blue-900/95 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bottom-0 p-4">
        {/* Main Content */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                HotelEase
              </h2>
              <p className="mt-4 text-gray-300 text-lg">
                Redefining hospitality through innovation
              </p>
            </motion.div>

            <motion.div 
              className="flex space-x-4 ml-28"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
            >
              <Button variant="ghost" size="icon" className="glass-panel p-3 hover:bg-blue-600/20">
                <Facebook className="w-6 h-6 text-blue-400" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-panel p-3 hover:bg-blue-600/20">
                <Twitter className="w-6 h-6 text-blue-400" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-panel p-3 hover:bg-blue-600/20">
                <Instagram className="w-6 h-6 text-blue-400" />
              </Button>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <motion.div 
            className="w-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
           
            <div className="" style={{marginRight:"-10vw"}}>
              <h3 className="text-lg font-semibold text-blue-400">Company</h3>
              <ul className="space-y-3">
                {['About', 'Careers', 'Support', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div 
            initial={{ x: 20 }}
            whileInView={{ x: 0 }}
            style={{marginLeft:"-10vw"}}
          >
            <div className="glass-panel rounded-xl flex flex-row  justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Stay Connected</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                  <span>Vile Parle, Mumbai</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 mr-2 text-blue-400" />
                  <span>+91 99999 99999</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 mr-2 text-blue-400" />
                  <span>contact@hotelease.com</span>
                </div>
              </div>
              </div>
              <div className="glass-panel rounded-xl">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Location</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789012!2d72.825833315096!3d19.099999999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63f1f1f1f1f%3A0x1f1f1f1f1f1f1f1f!2sVile%20Parle%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1611234567890!5m2!1sen!2sin"
                className="w-full h-32 rounded-lg border border-white/10"
                loading="lazy"
              />
            </div>
            </div>

            
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-white/10 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} HotelEase. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent" />
      </div>
    </footer>
  )
}

export default Footer