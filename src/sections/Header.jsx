import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Spiral as Hamburger } from "hamburger-react";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/DC_LOGO.png";

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navVariants = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.3, ease: [0.12, 0, 0.39, 0] },
    },
    exit: {
      scaleY: 0,
      transition: { delay: 0.5, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const links = [
    { title: "Home",       link: "home",        type: "scroll" },
    { title: "Services",   link: "services",    type: "scroll" },
    { title: "Portfolio",  link: "portfolio",   type: "scroll" },
    { title: "Contact",    link: "contact",     type: "scroll" },
    { title: "Careers",    link: "/careers",    type: "route"  },
    // ↓ Technology — visually distinct pill
    { title: "Technology", link: "/technology", type: "route", highlight: true },
  ];

  const [isOpen, setOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("home");

  useGSAP(() => {
    gsap.from(".header", {
      y: -60,
      opacity: 0,
      ease: "power3.inOut",
      delay: 0.5,
      duration: 1.2,
    });
  });

  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => {
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        // kept for future use — isHeroSection logic preserved
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (location.pathname === "/careers") {
      setSelectedLink("careers");
    } else if (location.pathname === "/technology") {
      setSelectedLink("technology");
    } else if (location.pathname === "/") {
      setSelectedLink("home");
    }
  }, [location]);

  return (
    <motion.header className="header fixed w-screen mx-auto h-20 top-0 left-0 right-0 z-40 bg-transparent flex items-center justify-between border-text-light/20 px-4 sm:px-5">
      {/* Logo */}
      <RouterLink
        to="/"
        className="flex items-center justify-center gap-1 cursor-pointer mx-auto ml-0"
        style={{ userSelect: "none" }}
      >
        <img
          src={logo}
          alt="Dream Capture logo"
          className="logoscreen w-64 pt-8 relative right-9"
        />
      </RouterLink>

      {/* ── Desktop Navigation ── */}
      <nav
        className="hidden md:flex items-center gap-5"
        style={{ userSelect: "none" }}
      >
        {links.map((link, index) => (
          <div key={index} className="flex flex-col items-center">
            {link.type === "route" ? (
              link.highlight ? (
                /* ── Technology pill ── */
                <RouterLink
                  to={link.link}
                  className="cursor-pointer font-poppins text-md font-bold px-3 py-1 rounded-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background:
                      location.pathname === link.link
                        ? "#f59e0b"
                        : "rgba(245,158,11,0.12)",
                    color:
                      location.pathname === link.link ? "#060b18" : "#f59e0b",
                    border: "1px solid rgba(245,158,11,0.4)",
                  }}
                  onClick={() => setSelectedLink("technology")}
                >
                  {link.title}
                </RouterLink>
              ) : (
                <RouterLink
                  to={link.link}
                  className={`cursor-pointer font-poppins text-md ${
                    selectedLink === "careers" &&
                    location.pathname === "/careers"
                      ? "text-amber-500"
                      : "text-white"
                  } hover:scale-105 hover:text-amber-500 transition-all ease-in-out`}
                  onClick={() => setSelectedLink("careers")}
                  style={{ userSelect: "none" }}
                >
                  {link.title}
                </RouterLink>
              )
            ) : isHomePage ? (
              <ScrollLink
                to={link.link}
                spy={true}
                smooth={true}
                duration={500}
                className={`cursor-pointer font-poppins text-md ${
                  selectedLink === link.link ? "text-amber-500" : "text-white"
                } hover:scale-105 hover:text-amber-500 transition-all ease-in-out`}
                onSetActive={() => setSelectedLink(link.link)}
                onClick={() => setSelectedLink(link.link)}
                style={{ userSelect: "none" }}
              >
                {link.title}
              </ScrollLink>
            ) : (
              <RouterLink
                to={`/#${link.link}`}
                className="cursor-pointer font-poppins text-md text-white hover:scale-105 hover:text-amber-500 transition-all ease-in-out"
                style={{ userSelect: "none" }}
              >
                {link.title}
              </RouterLink>
            )}

            {/* Animated underline — skip for highlight pill */}
            {!link.highlight &&
              ((link.type === "scroll" &&
                selectedLink === link.link &&
                isHomePage) ||
                (link.type === "route" &&
                  location.pathname === link.link)) && (
                <motion.div
                  className="w-1/2 h-[2px] rounded-full bg-amber-500"
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 0.4,
                  }}
                />
              )}
          </div>
        ))}
      </nav>

      {/* ── Mobile Menu Overlay ── */}
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
                    {link.type === "route" ? (
                      <RouterLink
                        to={link.link}
                        className={`font-poppins text-4xl transition-all ease-in-out ${
                          link.highlight
                            ? "text-amber-400 hover:text-amber-300"
                            : location.pathname === link.link
                            ? "text-amber-500"
                            : "text-white hover:text-amber-500"
                        }`}
                        onClick={() => {
                          setOpen(false);
                          setSelectedLink(
                            link.link === "/careers" ? "careers" : "technology"
                          );
                        }}
                      >
                        {link.title}
                        {link.highlight && (
                          <span className="ml-2 text-base align-middle">↗</span>
                        )}
                      </RouterLink>
                    ) : isHomePage ? (
                      <ScrollLink
                        to={link.link}
                        spy={true}
                        smooth={true}
                        duration={500}
                        className={`font-poppins text-4xl ${
                          selectedLink === link.link
                            ? "text-amber-500"
                            : "text-white"
                        } hover:scale-105 hover:text-amber-500 transition-all ease-in-out cursor-pointer`}
                        onClick={() => {
                          setSelectedLink(link.link);
                          setOpen(false);
                        }}
                      >
                        {link.title}
                      </ScrollLink>
                    ) : (
                      <RouterLink
                        to={`/#${link.link}`}
                        className="font-poppins text-4xl text-white hover:text-amber-500 transition-all ease-in-out"
                        onClick={() => setOpen(false)}
                      >
                        {link.title}
                      </RouterLink>
                    )}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hamburger ── */}
      <div className="md:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} size={20} color="white" rounded />
      </div>
    </motion.header>
  );
}

export default Header;