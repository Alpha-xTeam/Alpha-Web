"use client";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
  logo,
  brandName,
  isVisible = true,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  logo?: string;
  brandName?: string;
  isVisible?: boolean;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const words = ["Tech", "Inspire", "Change"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // تغيير الكلمة كل 2 ثانية

    return () => clearInterval(interval);
  }, [words.length]);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: -100,
          opacity: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "flex items-center justify-between fixed top-4 inset-x-0 mx-auto max-w-4xl lg:max-w-6xl xl:max-w-7xl border border-white/20 rounded-full bg-black/90 backdrop-blur-md shadow-[0px_4px_16px_rgba(0,0,0,0.3)] z-[5000] px-6 lg:px-8 py-3 lg:py-4",
          className
        )}
      >
        {/* Left Side - Logo and Brand */}
        <div className="flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
          {logo && (
            <img
              src={logo}
              alt="Logo"
              className="w-7 h-7 lg:w-9 lg:h-9 rounded-lg object-cover"
            />
          )}
          {brandName && (
            <span className="text-lg lg:text-xl font-bold text-white hidden sm:block whitespace-nowrap">
              {brandName}
            </span>
          )}
        </div>

        {/* Center - Navigation Items - Hidden on Mobile */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-4 lg:mx-8">
          <div className="flex items-center space-x-6 lg:space-x-8">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                to={navItem.link}
                className={cn(
                  "relative text-white items-center flex space-x-2 hover:text-white/80 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-white/5"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm lg:text-base font-medium whitespace-nowrap">{navItem.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side - Dynamic Word Button and Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
          {/* Dynamic Word Button - Hidden on Mobile */}
          <motion.button
            className="hidden lg:flex relative border border-white/20 text-sm lg:text-base font-medium text-white hover:bg-white/10 px-4 lg:px-6 py-2 lg:py-3 rounded-full transition-all duration-300 overflow-hidden group min-w-[100px] lg:min-w-[120px] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                {words[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-white to-transparent h-px group-hover:w-full transition-all duration-300" />
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0px_4px_16px_rgba(0,0,0,0.3)] lg:hidden z-[4999] overflow-hidden"
            >
              <div className="px-6 py-4">
                {/* Mobile Navigation Items */}
                <div className="flex flex-col space-y-2">
                  {navItems.map((navItem: any, idx: number) => (
                    <Link
                      key={`mobile-link=${idx}`}
                      to={navItem.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "relative text-white items-center flex space-x-3 hover:text-white/80 transition-colors duration-200 px-3 py-3 rounded-lg hover:bg-white/5"
                      )}
                    >
                      {navItem.icon && <span>{navItem.icon}</span>}
                      <span className="text-sm font-medium">{navItem.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Dynamic Word Button */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <motion.button
                    className="w-full relative border border-white/20 text-sm font-medium text-white hover:bg-white/10 px-4 py-3 rounded-full transition-all duration-300 overflow-hidden group flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentWordIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                      >
                        {words[currentWordIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-white to-transparent h-px group-hover:w-full transition-all duration-300" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};