import { useState, useEffect,useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/all";
import emailjs from 'emailjs-com'; // Import emailjs library
import { FaEnvelope, FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa"

function Contact() {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.from('.split-title4', {
      scale: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.split-title4',
        start: 'top bottom',
        end: 'top 40%',
        scrub: true,
      }
    })

  })
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const formRef = useRef(null);
  const [isValid, setIsValid] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const capitalizeFirstLetter = (str) => {
    if (str && str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  };

  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.animated-line', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'power3.inOut',
      duration: 0.6,
      delay: 0.1,
      scrollTrigger: {
        trigger: '.animated-line',
        start: 'top 80%',
      }
    });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form
  useEffect(() => {
    const { name, phone, email, message } = formData;
    const isNameValid = /^[A-Za-z\s]+$/.test(name);
    const isPhoneValid = /^\d{10}$/.test(phone);
    const isEmailValid = email.endsWith('@gmail.com');
    const isValidForm = isNameValid && isPhoneValid && isEmailValid && message;
    setIsValid(isValidForm);
  }, [formData]);

  // Handle form submission using emailjs
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      setLoading(true); // Show loading spinner
      try {
        // Replace these values with your actual EmailJS user ID, service ID, and template ID
        const serviceId = 'service_2wak5wn';
        const templateId = 'template_14uhi2g';
        const userId = 'UO1ngjp5VtEJKIFsV';

        // Sending data to emailjs
        const templateParams = {
          to_name: 'Dream Capture Entertainment',  // Static or dynamic value
          from_name: capitalizeFirstLetter(formData.name),
          message: capitalizeFirstLetter(formData.message),
          phone: formData.phone,
          email: formData.email,
      };

        // Send the form data using emailjs
        await emailjs.send(serviceId, templateId, templateParams, userId);
        setShowSuccessMessage(true); // Show success message
        setFormData({ name: '', phone: '', email: '', message: '' }); 
        formRef.current.reset();
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after a delay
        }, 3000);
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the message.');
      } finally {
        setLoading(false); // Hide loading spinner
      }
    }
    
  };

  return (
    <section
      id="contact"
      className="relative w-full lg:pt-36 overflow-hidden"
    >
      {/* Background Icons with Blur */}
      <div className="absolute flex items-center justify-center"
      style={{inset: "0px 0px 292px 0px"}}>
        {/* Contact icons in background */}
        <div className="absolute w-full h-full flex justify-between items-center px-8 py-16">

          {/* Chat Icon */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 opacity-40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3h14a2 2 0 012 2v14l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2z"
              />
            </svg>
          </div>
            {/* Chat Icon */}
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/4 opacity-40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3h14a2 2 0 012 2v14l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2z"
              />
            </svg>
          </div>
            {/* Chat Icon */}
            <div className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/4 opacity-40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3h14a2 2 0 012 2v14l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2z"
              />
            </svg>
          </div>


        </div>
      </div>


      <div className="container flex flex-col justify-between flex-grow gap-10 md:gap-20 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center relative flex-col gap-5 md:gap-10 justify-center"
          style={{ paddingBottom: "240px" }}
        >
          <h1 className="split-title4 static top-[15vh] text-3xl md:text-5xl font-sora text-center font-bold tracking-tighter text-gray-800 pt-20 md:pt-32 text-white">
            Get in Touch!
          </h1>
          <motion.div className="animated-line h-1 bg-primary rounded-full w-20 md:w-32 mb-6" />
          <p className="text-center max-w-2xl text-gray-600 text-white">
            Feel free to reach out to us for any inquiries or just to say hello!
          </p>

          <motion.form
            id="contactForm"
            ref={formRef}
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg w-full md:w-[60%] lg:w-[50%] mx-auto"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:space-x-8 gap-6">
              <div className="flex flex-col space-y-6 w-full md:w-1/2">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 150 }}>
                  <label htmlFor="name" className="block bold text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full p-3 text-gray-700 bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-all ease-in-out rounded"
                    style={{ userSelect: "none" }} 
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 150 }}>
                  <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full p-3 text-gray-700 bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-all ease-in-out rounded"
                    style={{ userSelect: "none" }} 
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 150 }}>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-3 text-gray-700 bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-all ease-in-out rounded"
                    style={{ userSelect: "none" }} 
                  />
                </motion.div>
              </div>
              <div className="flex flex-col space-y-6 w-full md:w-1/2">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 150 }}>
                  <label htmlFor="message" className="block text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    className="w-full p-3 text-gray-700 bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-all ease-in-out rounded resize-none"
                    style={{ userSelect: "none" }} 
                    rows="3"
                  ></textarea>
                </motion.div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              {isValid ? (
                <motion.button
                  type="submit" disabled={loading}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all ease-in-out"
                  style={{ userSelect: "none" }}
                  whileHover={{ scale: 1.05 }}
                >
                   {loading ? (
                      <div className="spinner" style={{ marginRight: '8px' }}></div>
                    ) : (
                      'Submit'
                    )}
                </motion.button>
              ) : (
                <span
                  className="px-6 py-3 bg-gray-300 text-white rounded-lg cursor-not-allowed"
                  style={{ userSelect: "none" }}
                >
                  Please fill in all fields
                </span>
              )}
            </div>
          </motion.form>

          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.5 }}
              className=" text-green-600 bg-green-100 border border-green-300 p-4 rounded-lg text-center w-full md:w-[60%] lg:w-[50%] mx-auto"
              style={{position: "absolute", bottom:"10rem"}}
            >
              Message sent successfully!
            </motion.div>
          )}
        </motion.div>
      </div>
        {/* Footer */}
        <footer
          className="bg-gray-900 text-white py-10 text-center mt-5"
          style={{
            background: "radial-gradient(circle, #3d4982 10%, rgb(28 40 91) 50%, rgb(15 25 69) 100%)",
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center px-5 sm:px-10">
            {/* Left End: Gmail and Social Media Section */}
            <div className="flex flex-col items-start space-y-4 mb-5 sm:mb-0">
              {/* Email */}
              <a
                href="mailto:contactus.dreamcapture@gmail.com"
                style={{ userSelect: "none", cursor: "pointer" }}
                className="flex items-center space-x-2 text-white hover:text-primary transition"
              >
                <FaEnvelope className="text-lg" />
                <span>contactus.dreamcapture@gmail.com</span>
              </a>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/+919677094546"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-500 transition"
                >
                  <FaWhatsapp className="text-xl" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/_dreamcapture_entertainment?igsh=MWJkZnF1dHM3YTI2MA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-500 transition"
                >
                  <FaInstagram className="text-xl" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@dreamcapture_entertainment?si=03gyNiyv2NFEdFgA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-500 transition"
                >
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>

            {/* Center: Tagline and Copyright Section */}
            <div className="flex flex-col items-center mt-5 sm:mt-0">
              <p className="text-sm" style={{ userSelect: "none" }}>
                We help brands reach their goals through creative advertising solutions.
              </p>
              <p className="text-xs mt-4" style={{ userSelect: "none" }}>
                &copy; {new Date().getFullYear()} Dream Capture Entertainment. All rights reserved.
              </p>
            </div>

            {/* Right End: Address Section */}
            <div className="text-sm text-center sm:text-right sm:ml-10">
              <p style={{ userSelect: "none" }}>Address: Madurai, India</p>
            </div>
          </div>
        </footer>
    </section>
  );
}

export default Contact;
