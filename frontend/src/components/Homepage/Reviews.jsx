
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "../ui/card"
import JohnDoe from "../../avatars/jane-doe.jpg"

const reviews = [
  {
    name: "Jane Doe",
    role: "Hotel Manager",
    content:
      "Amazing experience! The system has streamlined our operations and improved our guest satisfaction scores significantly.",
    avatar: JohnDoe,
  },
  {
    name: "John Smith",
    role: "Front Desk Supervisor",
    content: "The user interface is intuitive and easy to use. It has made our daily tasks much more efficient.",
    avatar: JohnDoe,
  },
  {
    name: "Emily Brown",
    role: "Housekeeping Manager",
    content:
      "The room cleanliness assessment feature has been a game-changer for our housekeeping team. Highly recommended!",
    avatar: JohnDoe,
  },
]

export default function Reviews() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-gray-900 h-full border-gray-700 hover:bg-gray-800 transition-colors duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    width={64} 
                    height={64} 
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                    <p className="text-sm text-gray-400">{review.role}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic">{review.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}