import { ClipboardList, Shield, AlertTriangle, Users, Activity } from 'lucide-react'
import { Card, CardContent } from "../ui/card"

const features = [
  {
    icon: ClipboardList,
    title: "Room Management",
    description: "Efficiently manage and track room status, cleanliness, and maintenance needs.",
  },
  {
    icon: Shield,
    title: "Security & Access Control",
    description: "Control access to rooms and maintain security with role-based permissions.",
  },
  {
    icon: Shield,
    title: "Maintenance Tracking",
    description: "Track and schedule maintenance tasks, repairs, and routine checks.",
  },
  {
    icon: AlertTriangle,
    title: "Damage Detection and Estimation",
    description: "Detect abnormalities such as broken furniture, stains, or damage. Estimate the cost for replacement if any!",
  },
  {
    icon: Users,
    title: "Staff Management",
    description: "Manage cleaning staff, assign tasks, and monitor performance.",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Monitor room status and maintenance activities in real-time.",
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Main Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300"
            >
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}