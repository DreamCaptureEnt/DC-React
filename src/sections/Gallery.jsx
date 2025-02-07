import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import transition from "../components/transition";

function Gallery() {
  const params = useParams();
  const tag = params.id;
  const title = params.id.replaceAll("-", " ").toUpperCase();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(tag); // State to track active category

  const fetchImage = () => {
    setIsLoading(true);
    fetch('https://graphtersdesign-c3750-default-rtdb.firebaseio.com/images.json')
      .then((res) => res.json())
      .then((data) => {
        const imageData = [];
        for (let key in data) {
          if (data[key].tag === tag) {
            imageData.push({ ...data[key], id: key });
          }
        }
        setImages(imageData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchImage();
  }, [tag]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Update the active category when clicked
  };

  // Sample text for each category (customize as needed)
  const categoryText = {
    "Advertisement": "Advertisement category description goes here. This could include details about various advertising works.",
    "Film Posters": "Film posters category description. Here you can describe the works related to film posters.",
    "3D Animation": "Description of 3D animation category. A brief about the process and work samples.",
    "Architecture": "Explore architectural designs and projects showcasing structural and creative expertise.",
    "Product Commercials": "Here you will find content related to product commercials, including short-form ads and branded content.",
    "Augmented Reality": "Augmented reality works, showcasing immersive experiences and digital integrations.",
    "Artificial Intelligence": "Explore works that involve the intersection of creativity and AI technology."
  };

  return (
    <section className="w-full bg-background">
      <h1 className='text-4xl sm:text-5xl font-bold font-sora text-center text-text tracking-tighter mt-10 mx-auto' style={{ marginBottom: "-60px", lineHeight: "2" }}>Works</h1>

      <div className="category-links flex items-center gap-1 md:gap-2 mt-[10vh] justify-center font-poppins text-xs md:text-md lg:text-lg">
        {['Advertisement', 'Film Posters', '3D Animation', 'Architecture', 'Product Commercials', 'Augmented Reality', 'Artificial Intelligence'].map((category) => (
          <div
            className={`category-card w-64 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] ${activeCategory === category ? 'shadow-lg border-2 border-primary' : ''}`}
            key={category}
            onClick={() => handleCategoryClick(category)}
          >
            <Link to={`/gallery/${category}`} className="text-center text-lg font-semibold text-text hover:text-primary">
              <div className="category-image h-40 w-full bg-gray-300 rounded-lg mb-4"></div>
              <h3 className="category-title">{category}</h3>
            </Link>
          </div>
        ))}
      </div>

      <h1 className='text-4xl sm:text-5xl font-bold font-sora text-center text-text tracking-tighter mt-10 mb-8 md:mb-5 mx-auto'>{title}</h1>

      {/* Category Description and Card Content */}
      {activeCategory && (
        <div className="category-content flex flex-col md:flex-row gap-10 px-5 py-5">
          {/* Left Card */}
          {activeCategory === 'Advertisement' && (
          <div className="category-card w-full md:w-[30%] bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
            <img 
              src="/src/assets/Cosmetic.jpg" 
              alt="Advertisement" 
              className="w-full h-full object-cover rounded-xl" 
            />
          </div>
        )}
          {/* Right Text */}
          <div className="category-text w-full md:w-1/2 text-left font-poppins text-lg text-text">
            <p className="mb-4">{categoryText[activeCategory]}</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex-col gap-4 w-full flex items-center justify-center h-[50vh]">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="image-grid grid grid-cols-2 md:grid-cols-3 gap-4 py-5 px-3">
          {images.map((image, i) => (
            <div className="h-auto max-w-full aspect-square flex items-center flex-col bg-slate-400 relative cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 ease-in-out rounded-xl" key={i + 1}>
              <img src={image.url} alt={image.tag} loading="lazy" className="w-full h-full object-cover rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !isLoading && (
        <h1 className="text-2xl sm:text-3xl font-poppins text-center text-text tracking-tight mx-auto">No {title.toLowerCase()} found.</h1>
      )}
    </section>
  );
}

export default transition(Gallery);
