import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Settings, SmilePlus, TrendingUp } from "lucide-react"

const reasons = [
  {
    icon: Settings,
    title: "Efficient Operations",
    description:
      "Streamline your daily tasks and improve overall efficiency with our integrated management tools. Our system automates repetitive tasks, allowing your staff to focus on providing exceptional service.",
  },
  {
    icon: SmilePlus,
    title: "Enhanced Guest Experience",
    description:
      "Provide exceptional service and personalized experiences to increase guest satisfaction and loyalty. Our system helps you understand guest preferences and tailor your services accordingly.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Insights",
    description:
      "Make informed decisions based on comprehensive analytics and reporting features. Our system provides real-time data and actionable insights to help you optimize your hotel's performance.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-xl mb-12 max-w-3xl mx-auto text-gray-300"
        >
          Our hotel management system is designed to address the unique challenges faced by hoteliers in today's
          fast-paced hospitality industry. We combine cutting-edge technology with user-friendly interfaces to
          streamline your operations and enhance guest satisfaction.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors duration-300">
                <CardHeader>
                  <reason.icon className="w-10 h-10 text-blue-500 mb-4" />
                  <CardTitle className="text-2xl text-white">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{reason.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}