import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NotFoundPic from '../assets/notFound.svg';
import { Button } from "@/components/ui/button";
import meetrix_logo from '../assets/meetrix_logo.svg';

export default function NotFound() {
  return (
    <div>
    <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                
                <motion.a 
                  href="/" 
                  className="text-2xl  inline-flex items-center hover:scale-105 transition-transform duration-300"
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <img className='py-1 mx-2 w-8' src={meetrix_logo} alt="/" />
                  <h1 className="text-2xl font-bold text-black">Meetrix</h1>
                </motion.a>
            
                {/* Auth Buttons */}
                <div className="flex space-x-3">
                  <motion.a 
                    href="/login"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" className="hover:bg-gray-50 border-gray-300 text-gray-700 hover:text-black transition-all duration-200">
                      Login
                    </Button>
                  </motion.a>
                  <motion.a 
                    href="/register"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-200">
                      Register
                    </Button>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.nav>
      <div
        className="flex flex-col items-center justify-center pt-20 mb-15 px-4"
        style={{
          backgroundImage:
            'radial-gradient(25.42% 52.24% at 50.03% 47.76%, #FFDBC8 0%, #FFF 100%)'
        }}
      >
        {/* Image animation */}
        <motion.img
          src={NotFoundPic}
          alt="404 Not Found"
          className="w-1/4 my-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Button animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Button
            size="lg"
            asChild
            className="w-40 h-12 mb-20"
            style={{
              borderRadius: "12px",
              border: "1.26px solid #FFAA67",
              background:
                "linear-gradient(95deg, #FFD0A2 4.5%, #FEB070 13.38%, #FF994F 31.58%, #FF7835 57.33%, #FF661F 79.98%, #FF5000 96.85%)",
              boxShadow: "1.26px 3.78px 7.686px 0 rgba(0, 0, 0, 0.20)",
              color: "#fff"
            }}
          >
            <Link to="/">Go home</Link>
          </Button>
        </motion.div>
      </div>
      <footer className="mt-16 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} developed with 🖤 by Anushree | All rights reserved @Meetrix.
          </footer>
    </div>
  );
}
