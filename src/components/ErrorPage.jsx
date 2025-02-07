import { Link } from 'react-router-dom'
import { MdArrowRightAlt } from "react-icons/md";
import { motion, useAnimate } from 'framer-motion'
function ErrorPage() {

    const [scope, animate] = useAnimate();
  return (
    <section className="bg-background font-inter h-screen grid place-items-center">
    <div className="container w-full">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl font-sora text-primary">404</h1>
            <p className="mb-10 text-3xl tracking-tight font-bold md:text-4xl text-text-light">Oops! This page doesn&apos;t exist.</p>
            <Link
              to="/"
              className="group cursor-pointer w-[50vw] md:w-[55%] py-5 flex items-center justify-between text-background hover:px-5 hover:py-4 transition-all ease-in-out duration-500 relative mx-auto"
              onMouseEnter={() => {
                animate(scope.current, {
                  clipPath: [
                    "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
                    "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                  ]
                })
              }}
              onMouseLeave={() => {
                animate(scope.current, {
                  clipPath: [
                    "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                    "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
                  ]
                })
              }}
            >
              <span className="z-10 flex font-poppins text-text group-hover:text-background transition-all ease-in-out font-medium ">Go to Home</span>
              <MdArrowRightAlt className="z-10 text-text group-hover:text-background transition-all lg:text-xl" />
              <div  ref={scope} className="absolute inset-0 bg-text z-0" style={{
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
              }}></div>
              <motion.div
              className="absolute bottom-0 w-full h-[1px] bg-text bg-opacity-40 rounded-full group-hover:w-0 transition-all ease-in-out duration-500"
              initial={{
                clipPath: "polygon(50% 0px, 50% 0px, 50% 100%, 50% 100%)",
              }}
              whileInView={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
              transition={{
                delay: 0.1,
                duration: 0.6,
                ease: "easeInOut",
              }}
            ></motion.div>
            </Link>
        </div>
    </div>

</section>
  )
}

export default ErrorPage