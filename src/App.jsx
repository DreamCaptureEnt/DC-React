import Header from "./sections/Header";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import Services from "./sections/Services"
import { ReactLenis } from "@studio-freight/react-lenis";
import Preloader from "./components/Preloader";
import { useEffect, useState } from "react";
import transition from "./components/transition";
import Chatbot from './components/Chatbot';


function App() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <ReactLenis root>
      {isLoading &&
        <Preloader />
      }
          <Header />
          <Hero />
          {/* <About /> */}
          <Services/>
          <Portfolio />
          <Contact />
          {/* <Chatbot/> */}
    </ReactLenis>
  );
}

export default transition(App);


