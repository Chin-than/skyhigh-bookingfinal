import React from 'react';
import { AppRoute, User } from '../types';

interface NavbarProps {
  user: User | null;
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentRoute, onNavigate, onLogout }) => {
  if (!user) return null;

  const navItems = [
    { label: 'Find Flights', icon: 'fa-plane', route: AppRoute.SEARCH },
    { label: 'My Bookings', icon: 'fa-ticket', route: AppRoute.BOOKINGS },
    { label: 'Profile', icon: 'fa-user', route: AppRoute.PROFILE },
  ];

  const handleNavClick = (e: React.MouseEvent, route: AppRoute) => {
    e.preventDefault();
    e.stopPropagation(); // Stop bubbling just in case
    onNavigate(route);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo Section - Click goes to SEARCH */}
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer mr-8" 
              onClick={(e) => handleNavClick(e, AppRoute.SEARCH)}
            >
              <div className="flex items-center gap-2">
                <div className="bg-brand-600 text-white p-2 rounded-lg">
                  <i className="fa-solid fa-plane-up text-xl"></i>
                </div>
                <span className="font-bold text-xl text-slate-800 tracking-tight">SkyHigh</span>
              </div>
            </div>

            {/* Navigation Links - Sibling to Logo, not child */}
            <div className="hidden sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  type="button"
                  onClick={(e) => handleNavClick(e, item.route)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    currentRoute === item.route
                      ? 'border-brand-500 text-slate-900'
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} mr-2`}></i>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="mr-4 text-sm font-medium text-slate-600 hidden md:inline-block">
                Welcome, {user.name}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-800 shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden flex justify-around border-t border-slate-200 py-2">
         {navItems.map((item) => (
            <button
              key={item.route}
              type="button"
              onClick={(e) => handleNavClick(e, item.route)}
              className={`flex flex-col items-center p-2 text-xs ${
                currentRoute === item.route ? 'text-brand-600' : 'text-slate-500'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-lg mb-1`}></i>
              {item.label}
            </button>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;