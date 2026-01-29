import { motion, AnimatePresence } from 'motion/react'; // Ajout de AnimatePresence
import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Mountain, Heart, Lock, Eye, EyeOff, X } from 'lucide-react';
import { Link } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import { LegalModal } from './LegalModal';
import { TikTokIcon } from './TikTokIcon';
import { EditableText } from './admin/EditableText';
import { useAdmin } from '../contexts/AdminContext';

interface FooterProps {
  contact?: {
    telephone: string;
    email: string;
    adresse: string;
  };
  social?: {
    instagram: string;
    tiktok: string;
  };
}

export function Footer({ contact, social }: FooterProps = {}) {
  const { login, setIsAdminMode, isAdminMode } = useAdmin();
  const [legalModal, setLegalModal] = useState<'mentions' | 'privacy' | 'cookies' | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Accueil', to: '/' },
    { label: 'Nos Gîtes', to: '/gites' },
    { label: 'Tarifs', to: '/tarifs' },
    { label: 'Bien-être', to: '/bien-etre' },
    { label: 'Contact', to: '/contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const success = await login(adminPassword);
      
      if (success) {
        setShowAdminModal(false);
        setAdminPassword('');
        setIsAdminMode(true);
      } else {
        setLoginError('Mot de passe incorrect');
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setLoginError('Erreur de connexion au serveur');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <>
      <footer className="relative bg-gradient-to-b from-[#1a252f] to-[#0f1419] overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/50 to-transparent" />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(196, 165, 116, 0.1) 35px, rgba(196, 165, 116, 0.1) 70px)`
          }} />
        </div>

        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#c4a574]/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-[#5a7a9f]/5 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Mountain className="w-6 h-6 text-[#c4a574]" />
                <h3 className="text-white">Les Gîtes du Soulor</h3>
              </div>
              <p className="text-white/60 mb-4 leading-relaxed">
                Vivez une expérience authentique au cœur des Pyrénées. 
                Quatre gîtes de charme pour des moments inoubliables en montagne.
              </p>
              <div className="flex gap-3">
                <motion.a
                  href={social?.instagram || 'https://www.instagram.com/les_gites_du_soulor/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/10 hover:border-transparent shadow-lg hover:shadow-[#dd2a7b]/50"
                  aria-label="Suivez-nous sur Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={social?.tiktok || 'https://www.tiktok.com/@les_gites_du_soulor'}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-[#00f2ea] hover:via-[#ff0050] hover:to-[#000000] flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/10 hover:border-transparent shadow-lg hover:shadow-[#00f2ea]/50"
                  aria-label="Suivez-nous sur TikTok"
                >
                  <TikTokIcon className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* SEO Pages Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h3 className="text-white mb-4">Nos Gîtes</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/gite-arrens-marsous"
                    className="text-white/60 hover:text-[#c4a574] transition-colors flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[#c4a574] transition-colors" />
                    Gîte Arrens-Marsous
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gite-val-azun"
                    className="text-white/60 hover:text-[#c4a574] transition-colors flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[#c4a574] transition-colors" />
                    Gîte Val d'Azun
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gite-bain-nordique"
                    className="text-white/60 hover:text-[#c4a574] transition-colors flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[#c4a574] transition-colors" />
                    Gîte Bain Nordique
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gite-proximite-lourdes"
                    className="text-white/60 hover:text-[#c4a574] transition-colors flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[#c4a574] transition-colors" />
                    Gîte près de Lourdes
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-white mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/60">
                  <MapPin className="w-5 h-5 text-[#c4a574] flex-shrink-0 mt-0.5" />
                  <EditableText
                    path="contact.adresse"
                    value={contact?.adresse || '42 route du Soulor, 65400 Arrens-Marsous, France'}
                    as="span"
                    multiline
                  />
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <Phone className="w-5 h-5 text-[#c4a574] flex-shrink-0" />
                  <a href={`tel:${contact?.telephone || '+33645795939'}`} className="hover:text-[#c4a574] transition-colors">
                    <EditableText
                      path="contact.telephone"
                      value={contact?.telephone || '06 45 79 59 39'}
                      as="span"
                    />
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <Mail className="w-5 h-5 text-[#c4a574] flex-shrink-0" />
                  <a href={`mailto:${contact?.email || 'spanazol@wanadoo.fr'}`} className="hover:text-[#c4a574] transition-colors">
                    <EditableText
                      path="contact.email"
                      value={contact?.email || 'spanazol@wanadoo.fr'}
                      as="span"
                    />
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-white mb-4">Informations Légales</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setLegalModal('mentions')}
                    className="text-white/60 hover:text-[#c4a574] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[#c4a574] transition-colors" />
                    Mentions Légales
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalModal('privacy')}
                    className="text-white/60 hover:text-[#c4a574] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[#c4a574] transition-colors" />
                    Politique de Confidentialité
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalModal('cookies')}
                    className="text-white/60 hover:text-[#c4a574] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[#c4a574] transition-colors" />
                    Politique des Cookies
                  </button>
                </li>
                <li>
                  <a
                    href="https://gite-soulor-reservation.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-[#c4a574] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[#c4a574] transition-colors" />
                    Réservation
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <p className="text-white/60 text-sm">
                  © {currentYear} Les Gîtes du Soulor. Tous droits réservés.
                </p>
                {/* Bouton Admin discret */}
                {!isAdminMode && (
                  <motion.button
                    onClick={() => setShowAdminModal(true)}
                    whileHover={{ scale: 1.05 }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#c4a574]/20 text-white/40 hover:text-[#c4a574] transition-all border border-white/10 hover:border-[#c4a574]/30"
                    title="Espace administrateur"
                  >
                    <Lock className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span>Conçu avec</span>
                <Heart className="w-4 h-4 text-[#c4a574] fill-[#c4a574]" />
                <span>par</span>
                <a 
                  href="#" 
                  className="text-[#c4a574] hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Camille Panazol - PixelBoost
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative bottom element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c4a574]/30 to-transparent" />
      </footer>

      {/* Modal de connexion Admin */}
      <AnimatePresence>
        {showAdminModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAdminModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#3a4a5a] rounded-2xl border border-[#c4a574]/30 p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAdminModal(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c4a574] rounded-full mb-4">
                  <Lock className="w-8 h-8 text-[#3a4a5a]" />
                </div>
                <h2 className="text-white mb-2">Espace Administrateur</h2>
                <p className="text-white/70">Les Gîtes du Soulor</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label htmlFor="admin-password" className="block text-white/90 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
                      placeholder="Entrez votre mot de passe"
                      required
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading || !adminPassword}
                  className="w-full py-3 bg-[#c4a574] hover:bg-[#b89564] disabled:bg-[#c4a574]/50 text-[#3a4a5a] rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none"
                >
                  {loginLoading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legal Modal */}
      {legalModal && (
        <LegalModal
          isOpen={!!legalModal}
          onClose={() => setLegalModal(null)}
          type={legalModal}
        />
      )}
    </>
  );
}