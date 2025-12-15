import Hero from "./sections/Hero";
import About from "./sections/About";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import Services from "./sections/Services";

function Home() {
  return (
    <>
      <Hero />
      {/* <About /> */}
      <Services/>
      <Portfolio />
      <Contact />
    </>
  );
}

export default Home;