import { useEffect } from "react";

function VideoPlayer() {
  useEffect(() => {
    // Load Video.js when the component is mounted
    const script = document.createElement("script");
    script.src = "https://vjs.zencdn.net/8.0.4/video.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="video-container">
      <link
        href="https://vjs.zencdn.net/8.0.4/video-js.css"
        rel="stylesheet"
      />
      <video
        id="videoPlayer"
        className="video-js vjs-default-skin"
        controls
        preload="auto"
        width="640"
        height="360"
        data-setup="{}"
      >
        <source src="your-video.mp4" type="video/mp4" />
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that supports HTML5 video.
        </p>
      </video>
    </div>
  );
}

export default VideoPlayer;
