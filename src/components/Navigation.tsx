import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import { EditableText } from './admin/EditableText';
import { useAdmin } from '../contexts/AdminContext';

interface NavigationProps {
  scrollY: number;
}

export function Navigation({ scrollY }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useAdmin();
  const location = useLocation();

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Tarifs', href: '/tarifs' },
    { label: 'Nos Gîtes', href: '/gites' },
    { label: 'Bien-être', href: '/bien-etre' },
    { label: 'Contact', href: '/contact' },
  ];

  const isScrolled = scrollY > 50;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#3a4a5a]/98 backdrop-blur-lg shadow-lg' : 'bg-[#3a4a5a]/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <EditableText
                path="texts.navLogo"
                value={content?.texts?.navLogo || "LES GÎTES DU SOULOR"}
                as="span"
                className="text-[#c4a574] tracking-[0.1em] sm:tracking-[0.15em] text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-2">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.href;
              return (
                <Link key={link.href} to={link.href}>
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    className={`text-sm px-3 xl:px-4 py-2 rounded-md transition-all ${
                      isActive
                        ? 'bg-[#c4a574]/20 text-[#c4a574] border border-[#c4a574]/30'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="xl:hidden text-white relative z-10 p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="xl:hidden overflow-hidden"
        >
          <div className="pb-4 pt-2 space-y-2">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.href;
              return (
                <Link key={link.href} to={link.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-[#c4a574]/20 text-[#c4a574] border border-[#c4a574]/30' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-between">
                      {link.label}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-[#c4a574]"
                        />
                      )}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}