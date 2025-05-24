import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, HandMetal, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isOnboardingPage = location.pathname.includes('/onboarding');
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate(isAuthenticated ? '/dashboard' : '/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-bg-medium shadow-md py-4">
      <div className="container-custom flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={handleLogoClick}
        >
          <HandMetal size={28} className="text-primary" />
          <span className="font-bold text-xl">SignLearn</span>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated && !isOnboardingPage && (
            <>
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-gray-300 hover:text-white"
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/dictionary')}
                className="text-gray-300 hover:text-white"
              >
                Dictionary
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-300 hover:text-white"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-bg-medium py-4 px-6">
          <div className="flex flex-col space-y-4">
            {isAuthenticated && !isOnboardingPage && (
              <>
                <button 
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-white py-2"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    navigate('/dictionary');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-white py-2"
                >
                  Dictionary
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white py-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;