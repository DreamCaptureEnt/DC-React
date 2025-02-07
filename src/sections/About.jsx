import AboutCard from "../components/AboutCard";
import Services from "./Services";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { motion } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import React, { useState } from 'react';
import SplitType from 'split-type';
// import costmetic from "../assets/impactads.jpg"
// import floor3 from "../assets/Product_Commercials/Ponnies.png"
// import movieposter from "../assets/Film_Posters/soodhukavvum.png"
// import client from '../assets/clientcentric.png'
// import creative from '../assets/creative.png'
// import delivery from '../assets/delivery.png'
import { Link } from "react-scroll";


function About() {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.from('.split-title3', {
      scale: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.split-title3',
        start: 'top bottom',
        end: 'top 40%',
        scrub: true,
      }
    })

  })
  gsap.registerPlugin(ScrollTrigger);
  const [cursorVisible, setCursorVisible] = useState(false);
  // Handle mouse entering and leaving the card
  const handleMouseEnter = () => setCursorVisible(true);
  const handleMouseLeave = () => setCursorVisible(false);

  const cardhandleMouseMove = (e) => {
    if (cursorVisible) {
      const cursor = document.querySelector('.circle-cursor');
      cursor.style.left = `${e.pageX - cursor.offsetWidth / 2}px`;
      cursor.style.top = `${e.pageY - cursor.offsetHeight / 2}px`;
    }
  };

  useGSAP(() => {
    const splitText = new SplitType('.split-text', {
      types: "lines",
      linesClass: "line"
    });
  
    splitText.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("line-wrapper");
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
  
    gsap.utils.toArray(".line").forEach((line) => {
      gsap.from(line, {
        yPercent: 200,
        duration: 1,
        delay: 0.1,
        ease: "power4",
        scrollTrigger: {
          trigger: line,
          start: "top 90%",
        },
      });
    });
  
    gsap.utils.toArray('.scale-up').forEach((el) => {
      gsap.from(el, {
        scale: 0,
        duration: 1,
        ease: "power4",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      });
    });
  
    // Scroll animation for cards
    gsap.utils.toArray(".card").forEach((el) => {
      gsap.from(el, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  
    // // Bubble animations on scroll
    // gsap.utils.toArray(".bubble").forEach((el) => {
    //   gsap.from(el, {
    //     opacity: 0, // Start with opacity 0
    //     scale: 0,
    //     duration: 1.5,
    //     delay: 0.5,
    //     ease: "bounce.out",
    //     scrollTrigger: {
    //       trigger: "#about", // Trigger when the About section enters the viewport
    //       start: "top 80%", // Start animation when the top of the About section is 80% from the top of the viewport
    //       toggleActions: "play none none none", // Only play the animation once
    //     },
    //   });
    // });
  });
  

  // Mouse interaction for bubble movement
  const handleMouseMove = (e) => {
    const bubbles = document.querySelectorAll('.bubble');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    bubbles.forEach(bubble => {
      const speed = bubble.getAttribute('data-speed');
      const xPos = mouseX * speed;
      const yPos = mouseY * speed;

      gsap.to(bubble, {
        x: xPos * 30, // Multiplied to give more movement range
        y: yPos * 30, 
        ease: "power3.out",
      });
    });
  };

  return (
    <section
        id="about"
        className="flex items-center flex-col font-poppins px-3 lg:px-0 "
        onMouseMove={handleMouseMove} // Mouse move event listener
        style={{
          background: "radial-gradient(circle, #01092d 10%, #01092d 50%, #01092d 100%)",
        }}
      >
        
        <div className="container w-full">
        <h1
        className="split-title3 static top-[15vh] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora text-white text-center text-text tracking-tighter mt-4 mb-28 mx-auto"
        style={{ lineHeight: 2, transform: "translate(0px, 45px)" }}
        >
          About Us
        </h1>
      
          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mb-0 relative">
            {/* Bubble Elements */}
            {/* Left-side bubbles */}
            <div
              className="bubble lg:absolute hidden lg:block top-1/4 w-16 h-16 rounded-full bg-indigo-500 opacity-40"
              data-speed="2"
              style={{ left: -180 }}
            ></div>
            <div
              className="bubble lg:absolute hidden lg:block w-16 h-16 rounded-full bg-yellow-500 opacity-40"
              data-speed="2"
              style={{ left: -160, top: 44 }}
            ></div>
            <div
              className="bubble lg:absolute hidden lg:block w-16 h-16 rounded-full bg-red-500 opacity-40"
              data-speed="2"
              style={{ left: -280, top: 88 }}
            ></div>
      
            {/* Right-side bubbles */}
            <div
              className="bubble lg:absolute hidden lg:block w-16 h-16 rounded-full bg-indigo-500 opacity-40"
              data-speed="2"
              style={{ right: -180, top: 350 }}
            ></div>
            <div
              className="bubble lg:absolute hidden lg:block w-16 h-16 rounded-full bg-yellow-500 opacity-40"
              data-speed="2"
              style={{ right: -160, top: 510 }}
            ></div>
            <div
              className="bubble lg:absolute hidden lg:block w-16 h-16 rounded-full bg-red-500 opacity-40"
              data-speed="2"
              style={{ right: -280, top: 433 }}
            ></div>
            {/* Card 1 */}
            <div className="card group relative w-full max-w-[22rem] h-[350px] mx-auto overflow-hidden"
             >
              
              {/* Card Content */}
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent p-6 rounded-lg shadow-lg overflow-hidden relative">

                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000">
                  <img src={movieposter} alt="Card Image" className="w-full h-full object-cover" />
                </div>

                {/* Header with Blur Effect */}
                <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-t-lg group-hover:opacity-0 transition-opacity duration-1000 ">
                  <h3 className="text-[1rem] sm:text-l md:text-xl font-semibold text-white text-center">Stunning Movie Posters</h3>
                </div>

                {/* Body Text */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm  text-[1rem] sm:text-[1.01rem] md:text-[1.02rem] rounded-b-lg group-hover:opacity-0 transition-opacity duration-1000">
                  <p className="text-white px-4 pb-4 text-md mt-10">
                    We design eye-catching movie Film Posters, bringing your vision to life with every detail.
                  </p>
                </div>
                
              </div>

              {/* Explore More Button */}
              <motion.div
                className="absolute bottom-5 right-5 px-6 py-3 bg-white text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-[-50%] translate-y-[-50%] left-1/2">
               <Link to="portfolio" smooth={true} duration={500} className="block explore-more cursor-pointer">
                    Explore More
                  </Link>
              </motion.div>
            </div>


          {/* Card 2 */}
          <div className="card group relative w-full max-w-[22rem] h-[350px] mx-auto overflow-hidden"
             >
              
              {/* Card Content */}
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent p-6 rounded-lg shadow-lg overflow-hidden relative">

                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000">
                  <img src={costmetic} alt="Card Image" className="w-full h-full object-cover" />
                </div>

                {/* Header with Blur Effect */}
                <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-t-lg group-hover:opacity-0 transition-opacity duration-1000 ">
                  <h3 className="text-[1rem] sm:text-l md:text-xl font-semibold text-white text-center">Impactful Commercial Ads</h3>
                </div>

                {/* Body Text */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm text-[1rem] sm:text-[1.01rem] md:text-[1.02rem] rounded-b-lg group-hover:opacity-0 transition-opacity duration-1000">
                  <p className="text-white px-4 pb-4 text-md mt-10">
                  We create commercial Advertisements that drives engagement and boosts brand awareness.
                  </p>
                </div>
                
              </div>

              {/* Explore More Button */}
              <motion.div
                className="absolute bottom-5 right-5 px-6 py-3 bg-white text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-[-50%] translate-y-[-50%] left-1/2">
               <Link to="portfolio" smooth={true} duration={500} className="block explore-more cursor-pointer  " >
                    Explore More
                  </Link>
              </motion.div>
            </div>

          {/* Card 3 */}
          <div className="card group relative w-full max-w-[22rem] h-[350px] mx-auto overflow-hidden"
              >
              
              {/* Card Content */}
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent p-6 rounded-lg shadow-lg overflow-hidden relative">

                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000">
                  <img src={floor3} alt="Card Image" className="w-full h-full object-cover" />
                </div>

                {/* Header with Blur Effect */}
                <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-t-lg group-hover:opacity-0 transition-opacity duration-1000 ">
                  <h3 className="text-[1rem] sm:text-l md:text-xl font-semibold text-white text-center">Compelling Product Ads</h3>
                </div>

                {/* Body Text */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm text-[1rem] sm:text-[1.01rem] md:text-[1.02rem] rounded-b-lg group-hover:opacity-0 transition-opacity duration-1000">
                  <p className="text-white px-4 pb-4 text-md mt-10">
                  We craft Advertisements that highlight the unique features of your products, helping you engage customers.
                  </p>
                </div>
                
              </div>

              {/* Explore More Button */}
              <motion.div
                className="absolute bottom-5 right-5 px-6 py-3 bg-white text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-[-50%] translate-y-[-50%] left-1/2">
               <Link to="portfolio" smooth={true} duration={500} className="block explore-more cursor-pointer">
                    Explore More
                  </Link>
              </motion.div>
            </div>

          {/* Card 1 */}
          <div className="card group relative w-full max-w-[22rem] h-[350px] mx-auto overflow-hidden"
              >
              
              {/* Card Content */}
              <div className="w-full h-full bg-gradient-to-br p-6 from-[#9e9e9e] to-[#00000036] rounded-lg shadow-lg overflow-hidden relative">

                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000">
                  <img src={client} alt="Card Image" className="w-full h-full object-cover" />
                </div>

                {/* Header with Blur Effect */}
                <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-t-lg group-hover:opacity-0 transition-opacity duration-1000 ">
                  <h3 className="text-[1rem] sm:text-l md:text-xl font-semibold text-white text-center">Client-Centric Approach</h3>
                </div>

                {/* Body Text */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm text-[1rem] sm:text-[1.01rem] md:text-[1.02rem] rounded-b-lg group-hover:opacity-0 transition-opacity duration-1000">
                  <p className="text-white px-4 pb-4 text-md mt-10">
                  We put our clients at the heart of everything we do. By understanding their goals and needs.
                  </p>
                </div>
                
              </div>

              {/* Explore More Button */}
              <motion.div
                className="absolute bottom-5 right-5 px-6 py-3 bg-white text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-[-50%] translate-y-[-50%] left-1/2">
               <Link to="portfolio" smooth={true} duration={500} className="block explore-more cursor-pointer">
                    Explore More
                  </Link>
              </motion.div>
            </div>

          {/* Card 2 */}
          <div className="card group relative w-full max-w-[22rem] h-[350px] mx-auto overflow-hidden"
              >
              
              {/* Card Content */}
              <div className="w-full h-full bg-gradient-to-br p-6 from-[#9e9e9e] to-[#00000036] rounded-lg shadow-lg overflow-hidden relative">

                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000">
                  <img src={creative} alt="Card Image" className="w-full h-full object-cover" />
                </div>

                {/* Header with Blur Effect */}
                <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-t-lg group-hover:opacity-0 transition-opacity duration-1000 ">
                  <h3 className="text-[1rem] sm:text-l md:text-xl font-semibold text-white text-center">Creative Excellence</h3>
                </div>

                {/* Body Text */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm text-[1rem] sm:text-[1.01rem] md:text-[1.02rem] rounded-b-lg group-hover:opacity-0 transition-opacity duration-1000">
                  <p className="text-white px-4 pb-4 text-md mt-10">
                  We push boundaries to deliver innovative designs and videos that set your brand apart.
                  </p>
                </div>
                
              </div>

              {/* Explore More Button */}
              <motion.div
                  className="absolute bottom-5 right-5 px-6 py-3 bg-white text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-[-50%] translate-y-[-50%] left-1/2"
                >
                  <Link to="portfolio" smooth={true} duration={500} className="block explore-more cursor-pointer">
                    Explore More
                  </Link>
                </motion.div>
            </div>

          {/* Card 3 */}
          <div className="card group relative w-full max-w-[22rem] h-[350px] mx-auto overflow-hidden"
              >
              
              {/* Card Content */}
              <div className="w-full h-full bg-gradient-to-br from-[#9e9e9e] to-[#00000036] p-6 rounded-lg shadow-lg overflow-hidden relative">

                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000">
                  <img src={delivery} alt="Card Image" className="w-full h-full object-cover" />
                </div>

                {/* Header with Blur Effect */}
                <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-t-lg group-hover:opacity-0 transition-opacity duration-1000 ">
                  <h3 className="text-[1rem] sm:text-l md:text-xl font-semibold text-white text-center">Timely Delivery</h3>
                </div>

                {/* Body Text */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm text-[1rem] sm:text-[1.01rem] md:text-[1.02rem] rounded-b-lg group-hover:opacity-0 transition-opacity duration-1000">
                  <p className="text-white px-4 pb-4 text-md mt-10">
                  Our efficient workflow ensures your projects are completed on time, every time.
                  </p>
                </div>
                
              </div>

              {/* Explore More Button */}
              <motion.div
                className="absolute bottom-5 right-5 px-6 py-3 bg-white text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-[-50%] translate-y-[-50%] left-1/2">
               <Link to="portfolio" smooth={true} duration={500} className="block explore-more cursor-pointer ">
                    Explore More
                  </Link>
              </motion.div>
            </div>

        </div>
          {/* Circle cursor */}
          {/* {cursorVisible && (
                  <div className="circle-cursor cursor-visible relative">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-[]">
                      View
                    </span>
                  </div>
                )} */}
      </div>
    </section>
  );
}

export default About;
