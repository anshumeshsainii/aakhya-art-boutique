
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-royal-purple text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center">
                <span className="text-royal-purple font-playfair font-bold">A</span>
              </div>
              <span className="text-xl font-playfair font-bold">Aakhya</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Creating beautiful artwork that bridges imagination and reality. 
              Each piece tells a unique story through vibrant colors and intricate details.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-playfair font-semibold text-royal-gold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-royal-gold transition-colors">
                Home
              </Link>
              <Link to="/gallery" className="block text-gray-300 hover:text-royal-gold transition-colors">
                Gallery
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-royal-gold transition-colors">
                About
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-royal-gold transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-playfair font-semibold text-royal-gold">Get in Touch</h3>
            <div className="space-y-2">
              <a
                href="https://wa.me/917379340224"
                className="block text-gray-300 hover:text-royal-gold transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +91 7379340224
              </a>
              <a
                href="mailto:aakhya.artist@gmail.com"
                className="block text-gray-300 hover:text-royal-gold transition-colors"
              >
                Email: aakhya.artist@gmail.com
              </a>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://instagram.com/aakhya_artist"
                  className="text-gray-300 hover:text-royal-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com/aakhya.artist"
                  className="text-gray-300 hover:text-royal-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-royal-purple-light mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Aakhya. All rights reserved. | Designed with passion for art.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
