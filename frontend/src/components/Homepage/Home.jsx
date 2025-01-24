import Hero from "./Hero"
import Features from "./MainFeatures"
import WhyChooseUs from "./WhyChooseUs"
import Reviews from "./Reviews"
import CTA from "./CTA"
import Footer from "./Footer"
import {useNavigate} from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  return (
    <main className="min-h-screen bg-black text-white">
    <div className="absolute w-auto min-w-full min-h-full max-w-none">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/signin')}>
        Login
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/signup')}>
        Sign Up
      </button>
    </div>
      <Hero />
      <Features />
      <WhyChooseUs />
      <Reviews />
      <CTA />
      <Footer />
    </main>
  )
}

