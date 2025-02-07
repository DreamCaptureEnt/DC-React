import gsap from "gsap";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Works() {
  const [selectedCategory, setSelectedCategory] = useState("Advertisement"); // Default category
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [cursorStyle, setCursorStyle] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorStyle({ left: e.clientX, top: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const categories = {
    Advertisement: [
      { imageURL: "src/assets/Advertisement/vamsa.png", title: "Vamsha Textiles", videoURL: "src/assets/media/Vamsha_General.mp4",},
      { imageURL: "src/assets/Advertisement/Arun.png", title: "Arun Silks", videoURL: "src/assets/media/Arun.mp4" },
      { imageURL: "src/assets/Advertisement/Thaila_jewell.png", title: "Thaila Jewellery", videoURL: "src/assets/media/Thaila_Jewellery.mp4" },
      { imageURL: "src/assets/Advertisement/Siva.png", title: "Siva Textiles" , videoURL: "src/assets/media/Siva.mp4"},
      { imageURL: "src/assets/Advertisement/Krishna.png", title: "Krishna Jewellery" , videoURL: "src/assets/media/Krishna_Opening.mp4"},
      { imageURL: "src/assets/Advertisement/Maharaja.png", title: "Maharaja Nagar" , videoURL: "src/assets/media/Architecture4.mp4"},
    ],
    "Film Posters": [
      { imageURL: "src/assets/Film_Posters/soodhukavvum.png", title: "Soodhu Kavvum" , videoURL: "src/assets/media/SK2_poster_MP4_v03.mp4 "},
      { imageURL: "src/assets/Film_Posters/Petta.png", title: "Petta" , videoURL: "src/assets/media/PETTA_Song.mp4"},
    ],
    "3D Animation": [
      { imageURL: "src/assets/3D_Animation/Orra.png", title: "Orra Jewellery",videoURL:"src/assets/media/Orra_Screen.mp4" },
      { imageURL: "src/assets/3D_Animation/Car_reel.png", title: "Car Reelshow",videoURL: "src/assets/media/Car_Reel.mp4" },
    ],
    Architecture: [
      { imageURL: "src/assets/Architecture/Archhouse.jpeg", title: "Architecture Model",videoURL:"src/assets/media/Exterior_first.mov"},
    ],
    "Product Commercials": [
      { imageURL: "src/assets/Product_Commercials/Ponnies.png", title: "Ponnis Oil",videoURL:"src/assets/media/Ponnis_02.mp4" },
      { imageURL: "src/assets/Product_Commercials/Ritual.png", title: "Ponnis Oil",videoURL:"src/assets/media/Ritual.mov" },
    ],
    "Augmented Reality": [
      { imageURL: "src/assets/Augmented_Reality/Ar1.jpg", title: "Apartmental Structure" },
      { imageURL: "src/assets/Augmented_Reality/Ar2.jpeg", title: "House Exterior Structure",videoURL:"src/assets/media/AR_Ext_Demo.mp4" },
      { imageURL: "src/assets/Augmented_Reality/Ar3.jpeg", title: "House Interior Structure" },
    ],
    "Artificial Intelligence": [
      { imageURL: "src/assets/Artificial_Intelligence/Fox_Lion.png", title: "Lion and Fox",videoURL:"src/assets/media/AI_Fox_Story.mp4" },
      { imageURL: "src/assets/Artificial_Intelligence/Elephant.png", title: "Elephant And Friends",videoURL:"src/assets/media/AI_Elephant_Story_v4.mp4" },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setActiveVideo(null);  // Close the video when scrolling
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeVideo]);
  
  const handleCardClick = (videoURL) => {
    setActiveVideo(videoURL); // Set the active video when a card is clicked
  };

  const closeVideo = () => {
    setActiveVideo(null); // Close the video container
  };

  return (
    <section className="works-section py-20 relative "
    style={{background: "radial-gradient(circle, #01092d 10%, #01092d 50%, #01092d 100%)"}}>
     
      <div className="container mx-auto px-5" style={{ maxWidth: "108rem" }}>
        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-8">
          {Object.keys(categories).map((category) => (
            <CategoryLink
              key={category}
              category={category}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory} // Pass the selected category
            />
          ))}
        </div>

        {/* Selected Category */}
        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mt-10"
            >
              {/* <h2 className="text-2xl font-bold text-center mb-6 text-white">
                {selectedCategory}
              </h2> */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-4 md:gap-8"
              style={{justifyItems:'center'}}>
                {categories[selectedCategory].map((card, index) => (
                  <Card
                    key={index}
                    imageURL={card.imageURL}
                    title={card.title}
                    videoURL={card.videoURL}
                    category={selectedCategory}
                    isMobile={isMobile}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Video Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dimmed Background */}
            <div
              className="fixed inset-0 bg-black opacity-80 z-40"
              onClick={closeVideo} // Close video on background click
            ></div>

            <div className="relative bg-white shadow-lg rounded-lg p-4 w-11/12 mx-auto" style={{ maxWidth: "700px",zIndex:"100" }}>
              <button
                className="absolute top-2 right-2 text-gray-700 hover:text-white text-l transition-all duration-300 ease-in-out transform hover:scale-125 hover:rotate-3 hover:shadow-2xl hover:bg-gray-800 p-2 rounded-full"
                onClick={closeVideo}
              >
                ✕
              </button> 
              <video
                style={{ marginTop: "40px" }}
                src={activeVideo}
                autoPlay
                className="w-full rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const CategoryLink = ({ category, setSelectedCategory, selectedCategory }) => {
  const handleClick = () => {
    setSelectedCategory(category);
  };

  // const categoryImages = {
  //   Advertisement: "src/assets/Advertisement/advertisement.jpg",
  //   "Film Posters": "https://picsum.photos/id/119/200",
  //   "3D Animation": "https://picsum.photos/id/121/200",
  //   Architecture: "https://picsum.photos/id/122/200",
  //   "Product Commercials": "https://picsum.photos/id/123/200",
  //   "Augmented Reality": "https://picsum.photos/id/127/200",
  //   "Artificial Intelligence": "https://picsum.photos/id/129/200",
  // };

  return (
    <motion.div
      className={`group relative p-2 flex flex-col items-center cursor-pointer transition-transform duration-300 text-white ${
        selectedCategory === category ? "active-underline" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
    >
      {/* <img
        src={categoryImages[category]}
        alt={category}
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md mb-4"
      /> */}
      <span className="text-sm sm:text-sm md:text-[1rem] lg:text-[1.05rem] font-semibold text-center">{category}</span>
    </motion.div>
  );
};
  const Card = ({ imageURL, title, videoURL, category, isMobile, onCardClick }) => {
    const isFilmPosterOrAR =
      category === "Film Posters" || category === "Augmented Reality";
      const [showCursor, setShowCursor] = useState(false);
      const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

      const handleMouseEnter = () => {
        setShowCursor(true);
      };

      const handleMouseLeave = () => {
        setShowCursor(false);
      };

      const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setCursorPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      };
        

    return (
      <motion.div
        className={`relative border-2 border-gray-300 rounded-lg overflow-hidden ${
          isFilmPosterOrAR
            ? isMobile
              ? "h-[180px] w-[140px]"
              : "h-[380px] w-[260px]"
            : isMobile
            ? "h-[120px] w-[175px]"
            : "h-[220px] w-[320px]"
        }`}
        initial={{
          opacity: 0,
          scale: 0.5,
          y: -50, // Card drops into position
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0, // Smooth bounce effect as the card settles
        }}
        exit={{
          opacity: 0,
          scale: 0.5,
          y: 50, // Card exits downward with a bounce
        }}
        whileHover={{
          scale: 1.05, // Slight bounce zoom on hover
          rotate: 1, // Minimal rotation for a dynamic feel
        }}
        transition={{
          type: "spring", // Makes the animation feel bouncy
          stiffness: 180, // Controls the rigidity of the spring
          damping: 12, // Adds smoothness to the bounce
          mass: 0.8, // Adds natural weight to the spring
          duration: 0.8, // Smoothens the animation flow
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => onCardClick(videoURL)}
      >
        <img
          src={imageURL}
          alt={title}
          className={`object-cover w-full h-full ${
            isFilmPosterOrAR ? "object-center" : "object-top"
          }`}
        />
        <div className="absolute bottom-0 bg-black bg-opacity-60 text-white w-full p-4 text-center text-sm sm:text-lg font-semibold transition-all duration-300 ease-in-out group-hover:bg-opacity-80">
          {title}
        </div>
        {/* Custom Cursor */}
        {showCursor && (
          <div
            className="video_card"
            style={{
              position: "absolute",
              top: cursorPosition.y / 1.15,
              left: cursorPosition.x / 1.15,
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-black">
              Play
            </span>
          </div>
        )}
      </motion.div>

    
    );
  };


  export default Works;
