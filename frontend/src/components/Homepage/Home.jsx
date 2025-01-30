import Hero from "./Hero"
import Features from "./MainFeatures"
import WhyChooseUs from "./WhyChooseUs"
import Reviews from "./Reviews"
import CTA from "./CTA"
import Footer from "./Footer"
import Navigation from "./Navigation"
import {useNavigate} from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <Features />
      <WhyChooseUs />
      <Reviews />
      <CTA />
      <Footer />
    </main>
  )
}

