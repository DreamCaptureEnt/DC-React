import React from "react";
import { motion } from "framer-motion";

const BenefitSlideshow = () => {
  const benefits = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/DreamWorks-Logo.svg",
      text: "DreamWorks Animation",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
      text: "Netflix",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Cartoon_Network_2010_logo.svg",
      text: "Cartoon Network",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Disney_Plus_logo.svg",
      text: "Disney+",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
      text: "HBO Max",
    },
  ];
  

  const cardStyle = {
    width: "150px",
    height: "150px",
    margin: "0 1rem",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    fontsize: "14px"
  };

  const profilePicStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "0.5rem",
    objectFit: "cover",
  };

  return (
    <div className="relative text-white items-center flex flex-col">
      <h2 className="flex justify-center text-3xl sm:text-3xl md:text-3xl lg:text-4xl"> Our Clients </h2>
      <motion.div className="animated-line h-1 bg-primary rounded-full w-20 md:w-32 mt-4" />
    <div className="benefits-slideshow overflow-hidden ">
      <div className="slideshow-container flex animate-continuous-scroll">
        {/* Loop the benefits content */}
        {[...benefits, ...benefits].map((benefit, index) => ( 
          <div key={index} style={cardStyle}>
             <img
              src={benefit.logo}
              alt={benefit.text}
              className="w-24 h-24 object-contain mb-4"
            />
            <p className="text-sm text-white font-semibold">{benefit.title}</p>
          </div>
        ))}
      </div>

      {/* Add CSS animations and responsiveness */}
      <style jsx>{`
        .benefits-slideshow {
          width: 90%; /* Default width */
          max-width: 900px; /* Maximum width for large screens */
          margin: 0 auto;
        }

        .slideshow-container {
          display: flex;
        }

        @keyframes continuous-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .animate-continuous-scroll {
          animation: continuous-scroll 15s linear infinite;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .benefits-slideshow {
            max-width: 600px;
          }
          .animate-continuous-scroll div {
            width: 120px;
            height: 120px;
          }
        }

        @media (max-width: 768px) {
          .benefits-slideshow {
            max-width: 500px;
          }
          .animate-continuous-scroll div {
            width: 100px;
            height: 100px;
          }
        }

        @media (max-width: 480px) {
          .benefits-slideshow {
            max-width: 300px;
          }
          .animate-continuous-scroll div {
            width: 80px;
            height: 80px;
            margin: 0 0.5rem;
          }
        }
      `}</style>
    </div>
    </div>
  );
};

export default BenefitSlideshow;
