import gsap from "gsap";
import { useEffect } from "react";
import SplitType from "split-type";
import logo from "../assets/DC_LOGO.png";

function Preloader() {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";
    const t1 = gsap.timeline();

    // Split text into characters
    const splitText = new SplitType(".preloader-text", {
      charClass: "char-preloader",
      types: "chars",
    });

    // Logo Animation
    t1.fromTo(
      ".char-preloader",
      {
        y: 100,
        opacity: 0,
        rotation: 45, // Starting rotation for dramatic effect
        color: "#ffffff",
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        color: "#ff6347",
        stagger: 0.1, // Stagger for each character
        delay: 0.3,
        duration: 1,
        ease: "power4.inOut",
      }
    );

    // Fade out preloader
    t1.to(".preloader", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      delay: 0.2,
      onComplete: () => {
        document.body.style.overflowX = "hidden";
        document.body.style.overflowY = "auto";
      },
      ease: "power4.inOut",
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 preloader h-screen w-full bg-[#01092d] font-sora grid place-items-center"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      }}
    >
      <div className="overflow-hidden text-center">
        <div className="preloader-text text-5xl md:text-6xl lg:text-8xl">
          <img
            src={logo}
            alt="Graphters logo"
            className="w-96 sm:w-96 md:w-[45%] lg:w-[50%] mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Preloader;
