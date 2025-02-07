import { useEffect, useRef, useState } from "react";
import yourVideoSource1 from "../assets/media/Advertisement.mp4";
import yourVideoSource2 from "../assets/media/Product.mp4";
import yourVideoSource3 from "../assets/media/Sk2.mp4";
import yourVideoSource4 from "../assets/media/interior.mp4";
import yourVideoSource5 from "../assets/media/3dmodel.mp4";

function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);  // State for managing text visibility
  const videoRef = useRef(null);
  const videoSources = [yourVideoSource1, yourVideoSource2, yourVideoSource3, yourVideoSource4, yourVideoSource5];

  const videoTexts = [
    { topLeft: "Advertisement", bottomRight: "Designing" },
    { topLeft: "3D Product", bottomRight: "Advertisement" },
    { topLeft: "3D Motion Poster", bottomRight: "Lyrical Video" },
    { topLeft: "Architecture", bottomRight: "Prototyping" },
    { topLeft: "3D Model", bottomRight: "Rendering" },
  ];

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videoSources.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePrevious = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videoSources.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videoSources.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Effect for controlling the visibility of the text
  useEffect(() => {
    setIsTextVisible(false); // Initially hide the text when changing videos

    const timeout = setTimeout(() => {
      setIsTextVisible(true); // Fade in the text after a short delay
    }, 300); // Adjust delay as needed

    return () => clearTimeout(timeout); // Clean up timeout if the video changes again before the fade-in is triggered
  }, [currentVideoIndex]);  // Trigger this effect every time the video index changes

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Background with dark gradient */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-[#01092d] via-gray-800 to-[#01092d] opacity-80"></div>
      </div>

      {/* Video container */}
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <div className="w-full h-[100%] bg-black rounded-lg shadow-lg overflow-hidden relative">
          {/* Responsive Video */}
          <video
            ref={videoRef}
            src={videoSources[currentVideoIndex]}
            className="w-full h-full object-cover"
            autoPlay
            loop={false}
            muted
            onEnded={handleVideoEnd}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          ></video>

       {/* Top Left Dynamic Text with Continuous Animation */}
        {/* Top Left Dynamic Text with Continuous Animation */}
        <div className={`absolute top-5 left-5 z-20 text-fade-in-out ${isTextVisible ? "text-appear-left" : ""}`}>
          <h1
            className="text-2xl sm:text-8xl lg:text-4xl font-small text-white transform transition-transform duration-300 hover:scale-105"
            style={{
              fontSize: window.innerWidth < 768 ? "2.5rem" :
                      window.innerWidth >= 768 && window.innerWidth < 1024 ? "3.75rem" :
                      window.innerWidth >= 1024 ? "4.75rem" : undefined,

              lineHeight: window.innerWidth < 768 ? "18rem" :
                          window.innerWidth >= 768 && window.innerWidth < 1024 ? "18rem" :
                          window.innerWidth >= 1024 ? "18rem" : undefined,
            }}
          >
            {videoTexts[currentVideoIndex].topLeft}
          </h1>
        </div>

        {/* Bottom Right Dynamic Text with Continuous Animation */}
        <div className={`absolute bottom-5 right-5 z-20 text-fade-in-out ${isTextVisible ? "text-appear-right" : ""}`}>
          <h1
            className="text-2xl sm:text-8xl lg:text-6xl font-bold text-white transform transition-transform duration-300 hover:scale-105"
            style={{
              fontSize: window.innerWidth < 768 ? "2.5rem" :
                      window.innerWidth >= 768 && window.innerWidth < 1024 ? "3.75rem" :
                      window.innerWidth >= 1024 ? "4.75rem" : undefined,

              lineHeight: window.innerWidth < 768 ? "18rem" :
                          window.innerWidth >= 768 && window.innerWidth < 1024 ? "18rem" :
                          window.innerWidth >= 1024 ? "18rem" : undefined,
            }}
          >
            {videoTexts[currentVideoIndex].bottomRight}
          </h1>
        </div>

        </div>

        {/* Controls and Timeline */}
        {/* <div className="absolute left-5 z-20 flex flex-col items-center space-y-2"
        style={{bottom:"3.25rem"}}>

          <div className="relative w-32 sm:w-40 lg:w-64 h-2 bg-gray-300 rounded-full">
            <div className="absolute top-0 left-0 w-full h-full bg-gray-700 rounded-full"></div>
            <div
              className="absolute top-0 h-4 w-4 bg-white rounded-full"
              style={{
                transform: "translateY(-23%)",
                left: `${(currentTime / duration) * 100}%`, // Corrected here
                transition: "left 0.1s linear",
              }}
            ></div>
          </div> */}

          {/* Buttons */}
          {/* <div className="flex space-x-5">
            <button
              onClick={handlePrevious}
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-600 transition-all transform hover:-translate-y-1 shadow-xl
                        sm:p-2 sm:w-10 w-10 h-10 text-sm sm:h-10 sm:text-sm sm:shadow-lg" // Adjusting size for mobile screens
                        style={{position:"relative",top:"0.75rem"}}
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-5 sm:h-5 text-white" // Reduce size of the SVG on mobile screens
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-600 transition-all transform hover:-translate-y-1 shadow-xl
                        sm:p-2 sm:w-10 sm:h-10 w-10 h-10 text-sm sm:text-sm sm:shadow-lg" // Adjusting size for mobile screens
                        style={{position:"relative",top:"0.75rem"}}
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-5 sm:h-5 text-white" // Reduce size of the SVG on mobile screens
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default Hero;
