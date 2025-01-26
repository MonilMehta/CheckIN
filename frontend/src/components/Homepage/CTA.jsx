import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"  // Added import

export default function CTA() {
  const navigate = useNavigate()  // Added useNavigate

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Hotel Management?</h2>
          <p className="text-xl mb-8">
            Get started today and experience the power of our cutting-edge hotel management system.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              className="bg-blue-800 hover:bg-blue-500"
              onClick={() => navigate('/signup')}  // Added onClick handler
            >
              Schedule Demo
            </Button>
            <Button 
              size="lg" 
              className="bg-blue-700 hover:bg-blue-500"
              onClick={() => navigate('/signup')}  // Added onClick handler
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

