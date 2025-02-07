import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
// import logo from '../assets/logo.png'


const AboutCard = (props) => {
  return (
     <div className={props.className}> <TiltCard /></div>
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = () => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative  rounded-xl"
    >
      <div className="absolute z-0 top-auto bottom-0 md:bottom-0 md:top-0 md:right-auto md:left-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(109,111,244,0.5)] opacity-50 blur-[80px]"></div>
        <img src={logo} alt="logo" className="blur-xl opacity-50" />
      <div
        style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
            backgroundImage: `url(${logo})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-2xl"
      >
      </div>
    </motion.div>
  );
};

export default AboutCard;