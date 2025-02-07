import { Link } from "react-scroll";
import { Spiral as Hamburger } from "hamburger-react";
import { useState, useEffect } from "react";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/DC_LOGO.png";

function Header() {
  const navVariants = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.3, ease: [0.12, 0, 0.39, 0] } },
    exit: { scaleY: 0, transition: { delay: 0.5, duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  };

  const links = [
    { title: "Home", link: "home" },
    // { title: "About", link: "about" },
    { title: "Services", link: "services" },
    { title: "Portfolio", link: "portfolio" },
    { title: "Contact", link: "contact" },
  ];

  const [isOpen, setOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("home");
  const [isHeroSection, setIsHeroSection] = useState(true);

  useGSAP(() => {
    gsap.from('.header', {
      y: -60,
      opacity: 0,
      ease: 'power3.inOut',
      delay: 0.5,
      duration: 1.2,
    });
  });

  // Update the state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        setIsHeroSection(heroRect.top <= 0 && heroRect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="header fixed w-screen mx-auto h-20 top-0 left-0 right-0 z-40 bg-transparent flex items-center justify-between border-text-light/20 px-4 sm:px-5"
    >
      {/* Center Logo */}
      <Link to="home" className=" flex items-center justify-center gap-1 cursor-pointer mx-auto ml-0" style={{ userSelect: "none" }}>
        <img src={logo} alt="Graphters logo" className=" logoscreen w-64 pt-8 relative right-9 " />
        {/* <span className="text-xl md:text-2xl font-arial tracking-tighter text-transparent bg-clip-text bg-gradient-to-r text-white">
        <span>Dream Capture </span> <br></br><span className="text-xl m-4" >Entertainment</span>
        </span> */}
      </Link>

      {/* Right-end Links */}
      <nav className="hidden md:flex items-center gap-5" style={{ userSelect: "none" }}>
        {links.map((link, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link
              to={link.link}
              spy={true}
              smooth={true}
              duration={500}
              className={`cursor-pointer font-poppins text-md ${
                selectedLink === link.link ? "text-amber-500" : isHeroSection ? "text-white" : "text-white"
              } hover:scale-105 hover:text-amber-500 transition-all ease-in-out`}
              onSetActive={() => setSelectedLink(link.link)}
              onClick={() => setSelectedLink(link.link)} // Ensure the link updates as active when clicked
              style={{ userSelect: "none" }}
            >
              {link.title}
            </Link>
            {selectedLink === link.link && (
              <motion.div
                className="w-1/2 h-[2px] rounded-full bg-amber-500"
                layoutId="underline"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  duration: 0.4,
                }}
              ></motion.div>
            )}
          </div>
        ))}
      </nav>

      <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed w-full bg-black h-screen inset-0 origin-top"
          variants={navVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="grid place-items-center mt-[20vh] gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {links.map((link, index) => (
              <div key={index} className="overflow-hidden">
                <motion.div>
                  <a
                    href={`#${link.link}`} // Directly use href for hash-based navigation
                    className={`font-poppins text-md text-4xl ${
                      selectedLink === link.link ? "text-amber-500" : "text-white"
                    } hover:scale-105 hover:text-amber-500 transition-all ease-in-out`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      setSelectedLink(link.link); // Update active link state
                      setOpen(false); // Close the menu
                      document
                        .getElementById(link.link)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll to the section
                    }}
                  >
                    {link.title}
                  </a>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>


      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          size={20}
          color="white"
          rounded
        />
      </div>
    </motion.header>
  );
}

export default Header;
