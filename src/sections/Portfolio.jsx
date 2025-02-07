import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import Works from '../components/Works'
function Portfolio() {
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
      gsap.from('.split-title', {
        scale: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.split-title',
          start: 'top bottom',
          end: 'top 40%',
          scrub: true,
        }
      })

    })

  return (
   <section id='portfolio' className='bg-background'
   style={{
    background: "radial-gradient(circle, #01092d 10%, #01092d 50%, #01092d 100%)"
   }}>
    <h1
  className="split-title static top-[15vh] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora text-white text-center text-text tracking-tighter mt-10 mb-8 mx-auto"
  style={{ lineHeight: 2, transform: "translate(0px, 45px)" }}
  >
    Our Works
  </h1>
     <Works />

   </section>
  )
}

export default Portfolio

