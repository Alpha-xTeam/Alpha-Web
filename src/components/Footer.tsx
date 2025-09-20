import React from 'react';
import StarBorder from './StarBorder';
import { InstagramIcon, TelegramIcon } from './Icons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/90 backdrop-blur-md border-t border-white/10 mt-20 relative z-10">
      <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col items-center text-center">
            <div className="flex items-center justify-center space-x-2 lg:space-x-3 mb-4">
              <img
                src="https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/ALPHA-LOGO.png"
                alt="Alpha Team Logo"
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
              />
              <span className="text-xl lg:text-2xl font-bold gradient-text font-clash">Alpha Team</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-sm lg:max-w-md text-center text-sm lg:text-base">
              A dynamic technology-focused group at the University of Babylon,
              dedicated to fostering innovation and technological advancement.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="https://www.instagram.com/talpha.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon size={24} />
              </a>
              <a href="https://t.me/xteam_alpha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <TelegramIcon size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base lg:text-lg font-bold text-white mb-3 lg:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Home</a></li>
              <li><a href="/team" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Our Team</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Projects</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Events</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base lg:text-lg font-bold text-white mb-3 lg:mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400 text-sm lg:text-base">
              <p>University of Babylon</p>
              <p>College of Information Technology</p>
              <div className="mt-4">
                <StarBorder
                  as="a"
                  href="mailto:contact@alphateam.edu"
                  className="btn-modern text-xs lg:text-sm px-3 lg:px-4 py-2 inline-block"
                  color="#ffffff"
                  speed="4s"
                >
                  Email Us
                </StarBorder>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Alpha Team. All rights reserved.
            <span className="text-white ml-2">Made with ❤️ for technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;