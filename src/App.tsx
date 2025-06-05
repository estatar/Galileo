import React, { useState } from 'react';
import { Satellite, Menu, X } from 'lucide-react';
import SpaceAnimation from './components/SpaceAnimation';
import GalileoInfo from './components/GalileoInfo';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center">
      <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center relative z-50">
        <div className="flex items-center space-x-2">
          <Satellite className="h-6 w-6 text-cyan-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Galileo
          </h1>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink href="#" active>Übersicht</NavLink>
          <NavLink href="#">Technologie</NavLink>
          <NavLink href="#">Services</NavLink>
          <NavLink href="#">Kontakt</NavLink>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Menu content */}
            <div className="absolute top-[78px] left-0 right-0 border-t border-gray-800 bg-gray-900/95 backdrop-blur-md">
              <nav className="flex flex-col py-4">
                <MobileNavLink href="#" active>Übersicht</MobileNavLink>
                <MobileNavLink href="#">Technologie</MobileNavLink>
                <MobileNavLink href="#">Services</MobileNavLink>
                <MobileNavLink href="#">Kontakt</MobileNavLink>
              </nav>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-1 w-full max-w-6xl px-4 md:px-8 flex flex-col items-center">
        <SpaceAnimation />
        <GalileoInfo />
      </main>
      
      <footer className="w-full py-4 text-center text-sm text-gray-500">
        <p>© 2025 Galileo Space Systems</p>
      </footer>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active }) => (
  <a
    href={href}
    className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
      active ? 'text-cyan-400' : 'text-gray-400'
    }`}
  >
    {children}
  </a>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ href, children, active }) => (
  <a
    href={href}
    className={`px-8 py-3 text-sm font-medium transition-colors hover:bg-gray-800/50 ${
      active ? 'text-cyan-400' : 'text-gray-400'
    }`}
  >
    {children}
  </a>
);

export default App;