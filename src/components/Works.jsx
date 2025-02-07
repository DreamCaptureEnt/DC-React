import React, { useState } from "react";
import Slider from "react-slick";
import { CSSTransition } from "react-transition-group";
// import video from "../assets/media/Architecture1.mov";

const WorksPage = () => {
  const [activeTab, setActiveTab] = useState("showreel");
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(0);

  const works = [
    {
      name: "Advertisement",
      videos: [
        { title: "Ad Video 1", url: "https://www.youtube.com/embed/o-8Q3bpYb7g" },
        { title: "Ad Video 2", url: "https://www.youtube.com/embed/sample_ad_2" },
        { title: "Ad Video 3", url: "https://www.youtube.com/embed/sample_ad_3" },
        { title: "Ad Video 1", url: "https://www.youtube.com/embed/o-8Q3bpYb7g" },
        { title: "Ad Video 2", url: "https://www.youtube.com/embed/sample_ad_2" },
        { title: "Ad Video 3", url: "https://www.youtube.com/embed/sample_ad_3" },
      ],
    },
    {
      name: "Product",
      videos: [
        { title: "Product Video 1", url: "https://www.youtube.com/embed/sample_prod_1" },
        { title: "Product Video 2", url: "https://www.youtube.com/embed/sample_prod_2" },
        { title: "Product Video 3", url: "https://www.youtube.com/embed/sample_prod_3" },
        { title: "Product Video 1", url: "https://www.youtube.com/embed/sample_prod_1" },
        { title: "Product Video 2", url: "https://www.youtube.com/embed/sample_prod_2" },
        { title: "Product Video 3", url: "https://www.youtube.com/embed/sample_prod_3" },
      ],
    },
    {
      name: "AR",
      videos: [
        { title: "AR Video 1", url: "https://www.youtube.com/embed/sample_ar_1" },
        { title: "AR Video 2", url: "https://www.youtube.com/embed/sample_ar_2" },
        { title: "AR Video 3", url: "https://www.youtube.com/embed/sample_ar_3" },
        { title: "AR Video 1", url: "https://www.youtube.com/embed/sample_ar_1" },
        { title: "AR Video 2", url: "https://www.youtube.com/embed/sample_ar_2" },
        { title: "AR Video 3", url: "https://www.youtube.com/embed/sample_ar_3" },
      ],
    },
    {
        name: "Advertisement",
        videos: [
          { title: "Ad Video 1", url: "https://www.youtube.com/embed/o-8Q3bpYb7g" },
          { title: "Ad Video 2", url: "https://www.youtube.com/embed/sample_ad_2" },
          { title: "Ad Video 3", url: "https://www.youtube.com/embed/sample_ad_3" },
          { title: "Ad Video 1", url: "https://www.youtube.com/embed/o-8Q3bpYb7g" },
          { title: "Ad Video 2", url: "https://www.youtube.com/embed/sample_ad_2" },
          { title: "Ad Video 3", url: "https://www.youtube.com/embed/sample_ad_3" },
        ],
      },
      {
        name: "Product",
        videos: [
          { title: "Product Video 1", url: "https://www.youtube.com/embed/sample_prod_1" },
          { title: "Product Video 2", url: "https://www.youtube.com/embed/sample_prod_2" },
          { title: "Product Video 3", url: "https://www.youtube.com/embed/sample_prod_3" },
          { title: "Product Video 1", url: "https://www.youtube.com/embed/sample_prod_1" },
          { title: "Product Video 2", url: "https://www.youtube.com/embed/sample_prod_2" },
          { title: "Product Video 3", url: "https://www.youtube.com/embed/sample_prod_3" },
        ],
      },
      {
        name: "AR",
        videos: [
          { title: "AR Video 1", url: "https://www.youtube.com/embed/sample_ar_1" },
          { title: "AR Video 2", url: "https://www.youtube.com/embed/sample_ar_2" },
          { title: "AR Video 3", url: "https://www.youtube.com/embed/sample_ar_3" },
          { title: "AR Video 1", url: "https://www.youtube.com/embed/sample_ar_1" },
          { title: "AR Video 2", url: "https://www.youtube.com/embed/sample_ar_2" },
          { title: "AR Video 3", url: "https://www.youtube.com/embed/sample_ar_3" },
        ],
      },
  ];

  const selectedWork = works[selectedWorkIndex];

  // Carousel settings
  const workCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setSelectedWorkIndex(current), // Update selected work index
  };

  const videoCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className="text-gray-800 flex flex-col items-center"
      style={{
        background: "radial-gradient(circle, #01092d 10%, #01092d 50%, #01092d 100%)",
      }}
    >
      {/* Header Tabs */}
      <div className="sticky top-0 w-full shadow-lg z-30 py-4 flex justify-center space-x-8">
        <button
          className={`text-lg font-semibold px-6 py-2 rounded-full transition-all duration-300 ${
            activeTab === "showreel"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("showreel")}
        >
          Show-Reel
        </button>
        {/* <button
          className={`text-lg font-semibold px-6 py-2 rounded-full transition-all duration-300 ${
            activeTab === "worklinks"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("worklinks")}
        >
          Work-Links
        </button> */}
      </div>

      {/* Content Section */}
      {/* Content Section */}
    <div className="flex-grow w-full max-w-[100rem] px-6 py-8">
    {activeTab === "showreel" ? (
        <div className="flex justify-center items-center transition-all duration-500">
        <iframe
            title="Showreel Video"
            className="w-full aspect-video rounded-lg"
            src="https://www.youtube.com/embed/yE2EmQSk7vY?si=DaqOdctvVG_LW-MJ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        </div>
    ) : (
          <div>
            {/* Work Selection */}
                <div id="work-selection" className="sm:hidden mb-8">
                {/* Work Selection Carousel (Mobile) */}
                <Slider
                    {...{
                    ...workCarouselSettings,
                    dots: false, 
                    arrows: true, 
                    }}
                    className="custom-work-carousel"
                >
                    {works.map((work, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg shadow-md ${
                        selectedWorkIndex === index
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-800"
                        }`}
                    >
                        <h3 className="text-xl font-medium text-center">{work.name}</h3>
                    </div>
                    ))}
                </Slider>
                </div>


            {/* Desktop Grid for Work Selection */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xlg:grid-cols-6 gap-6 mb-8">
              {works.map((work, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg transition-transform transform duration-300 hover:scale-105 shadow-md ${
                    selectedWorkIndex === index
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={() => setSelectedWorkIndex(index)}
                >
                  <h3 className="text-xl font-medium">{work.name}</h3>
                </button>
              ))}
            </div>

            {/* Selected Work Videos */}
            <CSSTransition
              in={!!selectedWork}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center text-white">
                  {selectedWork.name}
                </h3>
                <div className="sm:hidden">
                  {/* Video Carousel (Mobile) */}
                  <Slider {...{...videoCarouselSettings,
                    dots: true,
                    arrows: false, 
                  }}>
                    {selectedWork.videos.map((video, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-6"
                      >
                        <p className="text-lg font-semibold mb-4 text-center">
                          {video.title}
                        </p>
                        <iframe
                          title={video.title}
                          className="w-full aspect-video rounded-lg"
                          src={video.url}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* Desktop Grid for Videos */}
                  {selectedWork.videos.map((video, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                    >
                      <p className="text-lg font-semibold mb-4 text-center">
                        {video.title}
                      </p>
                      <iframe
                        title={video.title}
                        className="w-full aspect-video rounded-lg"
                        src={video.url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            </CSSTransition>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorksPage;
