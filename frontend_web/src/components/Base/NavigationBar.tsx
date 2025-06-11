import React, { useState } from "react";
import {
  Users,
  BookOpen,
  Bot,
  Info,
  Mail,
  Menu,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";

// Navigation Items
const navigationItems = [
  { name: "Lobbies", href: "/lobbies", icon: Users },
  { name: "Game Rules", href: "/rules", icon: BookOpen },
  { name: "AI Models", href: "/ai-models", icon: Bot, badge: "Experimental" },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
];

// NavigationBar Component
interface NavigationBarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  currentPage = "lobbies",
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleNavigation = (href: string, name: string) => {
    if (onNavigate) {
      onNavigate(name.toLowerCase().replace(" ", "-"));
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        {/* Logo/Brand */}
        <div className="nav-brand">
          <div className="brand-icon">
            <Sparkles className="brand-sparkle" />
          </div>
          <span className="brand-text">Hanabi</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-desktop">
          <div className="nav-links">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive =
                currentPage === item.name.toLowerCase().replace(" ", "-");

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.name)}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                >
                  <IconComponent className="nav-icon" />
                  <span className="nav-text">{item.name}</span>
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="user-menu-container">
            <button
              className="user-menu-trigger"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <div className="user-avatar">
                <span className="avatar-text">JD</span>
              </div>
              <span className="user-name">John Doe</span>
              <ChevronDown
                className={`user-chevron ${isUserMenuOpen ? "user-chevron-open" : ""}`}
              />
            </button>

            {isUserMenuOpen && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <div className="dropdown-avatar">
                    <span className="avatar-text">JD</span>
                  </div>
                  <div className="dropdown-user-info">
                    <span className="dropdown-name">John Doe</span>
                    <span className="dropdown-email">john@example.com</span>
                  </div>
                </div>
                <div className="user-dropdown-divider"></div>
                <button className="dropdown-item">
                  <Users className="dropdown-icon" />
                  Profile
                </button>
                <button className="dropdown-item">
                  <BookOpen className="dropdown-icon" />
                  Game History
                </button>
                <button className="dropdown-item">
                  <Info className="dropdown-icon" />
                  Settings
                </button>
                <div className="user-dropdown-divider"></div>
                <button className="dropdown-item dropdown-logout">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive =
                currentPage === item.name.toLowerCase().replace(" ", "-");

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.name)}
                  className={`mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`}
                >
                  <IconComponent className="mobile-nav-icon" />
                  <span className="mobile-nav-text">{item.name}</span>
                  {item.badge && (
                    <span className="mobile-nav-badge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mobile-user-section">
            <div className="mobile-user-info">
              <div className="mobile-avatar">
                <span className="avatar-text">JD</span>
              </div>
              <div className="mobile-user-details">
                <span className="mobile-user-name">John Doe</span>
                <span className="mobile-user-email">john@example.com</span>
              </div>
            </div>
            <button className="mobile-logout-button">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Footer Component

export default NavigationBar;
