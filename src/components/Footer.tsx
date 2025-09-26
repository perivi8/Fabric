import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-highlight to-accent rounded"></div>
              <span className="font-heading font-bold text-xl">Jai Chitra Textile</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Premium fabrics and home textiles from Tamil Nadu. Modern designs with traditional quality since 1995.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 p-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/products" className="block hover:text-highlight transition-colors">
                All Products
              </Link>
              <Link to="/bulk-inquiry" className="block hover:text-highlight transition-colors">
                Bulk Orders
              </Link>
              <Link to="/about" className="block hover:text-highlight transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block hover:text-highlight transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Categories</h3>
            <div className="space-y-2">
              <Link to="/products?category=cotton" className="block hover:text-highlight transition-colors">
                Cotton Fabrics
              </Link>
              <Link to="/products?category=silk" className="block hover:text-highlight transition-colors">
                Silk Fabrics
              </Link>
              <Link to="/products?category=home" className="block hover:text-highlight transition-colors">
                Home Textiles
              </Link>
              <Link to="/products?category=custom" className="block hover:text-highlight transition-colors">
                Custom Orders
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 text-highlight" />
                <div>
                  <p className="text-primary-foreground/80">
                    123 Textile Street<br />
                    Coimbatore, Tamil Nadu<br />
                    India - 641001
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-highlight" />
                <p className="text-primary-foreground/80">+91 98765 43210</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-highlight" />
                <p className="text-primary-foreground/80">info@jaichitratextile.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <p className="text-primary-foreground/60 text-left">
            © 2025 Jai Chitra Textile. All rights reserved. | Made with ❤️ in Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;