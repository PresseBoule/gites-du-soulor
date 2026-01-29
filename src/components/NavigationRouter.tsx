import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import { EditableText } from './admin/EditableText';
import { useAdmin } from '../contexts/AdminContext';

interface NavigationProps {
  scrollY: number;
}

const navItems = [
  { label: 'Accueil', path: '/' },
  { label: 'Tarifs', path: '/tarifs' },
  { label: 'Nos Gîtes', path: '/gites' },
  { label: 'Bien-être', path: '/bien-etre' },
  { label: 'Contact', path: '/contact' },
];

export function NavigationRouter({ scrollY }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = scrollY > 50;
  const { content } = useAdmin();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#1a252f]/98 backdrop-blur-lg shadow-2xl border-b border-[#c4a574]/20' 
          : 'bg-gradient-to-b from-[#1a252f]/80 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="cursor-pointer relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative z-10">
                <EditableText
                  path="texts.siteName"
                  value={content?.texts?.siteName || "LES GÎTES DU SOULOR"}
                  as="span"
                  className="text-white tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-base whitespace-nowrap"
                />
              </div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#c4a574]/0 via-[#c4a574]/10 to-[#c4a574]/0 rounded-lg -inset-2"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-2">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className="relative px-3 xl:px-4 py-2 text-white/80 hover:text-white transition-colors group text-sm xl:text-base"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ y: -2 }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Hover background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/20 to-[#7a9fbf]/20 rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-[#c4a574]/30 to-[#b89560]/30 rounded-lg border border-[#c4a574]/50"
                        initial={false}
                        transition={{ 
                          type: "spring", 
                          stiffness: 380, 
                          damping: 30 
                        }}
                      />
                    )}
                    
                    {/* Bottom line on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c4a574] to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
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
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                  <motion.div
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#c4a574]/30 to-[#b89560]/30 text-white border border-[#c4a574]/50' 
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}
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

      {/* Decorative bottom border */}
      {isScrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.nav>
  );
}