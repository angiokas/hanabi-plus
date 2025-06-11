import { Heart, Sparkles } from "lucide-react";
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Game: [
      { name: "Play Now", href: "/lobbies" },
      { name: "Game Rules", href: "/rules" },
      { name: "AI Models", href: "/ai-models" },
      { name: "Statistics", href: "/stats" },
    ],
    Community: [
      { name: "Discord Server", href: "/discord" },
      { name: "Reddit", href: "/reddit" },
      { name: "Forum", href: "/forum" },
      { name: "Tournaments", href: "/tournaments" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Bug Reports", href: "/bugs" },
      { name: "Feature Requests", href: "/features" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "DMCA", href: "/dmca" },
    ],
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-brand-icon">
                <Sparkles className="footer-sparkle" />
              </div>
              <span className="footer-brand-text">Hanabi</span>
            </div>
            <p className="footer-description">
              Experience the beautiful cooperative card game Hanabi online. Work
              together with your team to create the perfect fireworks display!
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link">
                <Heart className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Heart className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Heart className="social-icon" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer-link-group">
                <h3 className="footer-link-title">{category}</h3>
                <ul className="footer-link-list">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="footer-link">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <h3 className="newsletter-title">Stay Updated</h3>
          <p className="newsletter-description">
            Get notified about new features, tournaments, and community events.
          </p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email..."
              className="newsletter-input"
            />
            <button className="newsletter-button">Subscribe</button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Hanabi Online. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <span className="footer-made-with">
                Made with <Heart className="footer-heart" /> for the Hanabi
                community
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
