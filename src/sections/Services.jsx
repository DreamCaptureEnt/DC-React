import React from 'react';
import Slider from 'react-slick';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { FaFilm } from 'react-icons/fa';
import { FaCube } from 'react-icons/fa';
import { AiOutlineRocket } from 'react-icons/ai';
import { FaVideo } from 'react-icons/fa';
import { RiMovie2Line } from 'react-icons/ri';
import { GiHouse } from 'react-icons/gi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

const services = [
  {
    title: "3D Advertisement",
    icon: <FaCube className="icon w-8 h-8 text-primary" />,
    details: [
      "Stunning Ad Designs",
      "Targeted Campaigns",
      "High Engagement",
      "Video Ads",
      "Professional Content"
    ],
  },
  {
    title: "Graphic Design",
    icon: <AiOutlineAppstoreAdd className="icon w-8 h-8 text-primary" />,
    details: [
      "Logo Creation",
      "Brand Identity",
      "Web Design",
      "Packaging Design",
      "Marketing Materials (brochures, flyers)"
    ],
  },
  {
    title: "Video Editing",
    icon: <FaFilm className="icon w-8 h-8 text-primary" />,
    details: [
      "Creative Video content",
      "Editing for Social Media",
      "Professional Production",
      "Video Color Grading",
      "Sound Design and Mixing"
    ],
  },
  {
    title: "Digital Marketing",
    icon: <AiOutlineRocket className="icon w-8 h-8 text-primary" />,
    details: [
      "SEO Services",
      "Social Media Marketing",
      "Google Ads",
      "Graphic Design",
      "Pay-Per-Click Advertising"
    ],
  },
  {
    title: "Feature Flim / Movie",
    icon: <FaVideo className="icon w-8 h-8 text-primary" />,
    details: [
      "Motion Poster",
      "Visually Stunning Posters",
      "3D Lyrical Video",
      "Conceptual Art",
      "Illustrative Designs",
    ],
  },
  {
    title: "Product Animation",
    icon: <RiMovie2Line className="icon w-8 h-8 text-primary" />,
    details: [
      "3D product Animations",
      "Explainer Videos",
      "Creative Visual Effects",
      "Product Simulations",
      "Augmented Reality (AR) Demos"
    ],
  },
  {
    title: "Architectural Visualization",
    icon: <GiHouse className="icon w-8 h-8 text-primary" />,
    details: [
      "3D Architectural Renders",
      "Interior and Exterior Visualization",
      "Virtual Tours",
      "Building and Landscape Modeling",
      "Photorealistic Rendering"
    ],
  },
];

const Services = () => {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.from('.split-title2', {
      scale: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.split-title2',
        start: 'top bottom',
        end: 'top 40%',
        scrub: true,
      }
    })
  })
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
          centerPadding: '20px',
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <section id="services" className="service-carousel-container mx-auto px-4 py-6 max-w-screen-2xl relative">
      <h1
        className="split-title2 static top-[15vh] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sora text-white text-center text-text tracking-tighter mt-10 mb-20 mx-auto"
        style={{ lineHeight: 2, transform: "translate(0px, 45px)" }}
      >
        Services
      </h1>
      <Slider {...settings}>
        {services.map((service, index) => (
          <div key={index} className="service-card bg-white p-6 shadow-lg rounded-md mx-2 flex flex-col justify-between items-center text-center">
            <div className="icon-container mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
            <ul className="service-details flex flex-col gap-2 text-sm text-gray-600">
              {service.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Services;
