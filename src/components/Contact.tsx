import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, Send, MessageCircle, Sparkles, Instagram } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { TikTokIcon } from './TikTokIcon';
import { EditableText } from './admin/EditableText';
import { useAdmin } from '../contexts/AdminContext';

interface ContactProps {
  contact?: {
    telephone: string;
    email: string;
    adresse: string;
  };
}

export function Contact({ contact }: ContactProps = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useAdmin();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Question de ${formData.name} - Les Gîtes du Soulor`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Téléphone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:spanazol@wanadoo.fr?subject=${subject}&body=${body}`;
  };

  return (
    <section 
      ref={ref}
      id="contact" 
      className="py-20 bg-gradient-to-b from-[#2c3e50] to-[#34495e] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#c4a574]/20 to-[#7a9fbf]/20 border border-[#c4a574]/30 text-[#c4a574] backdrop-blur-sm">
              Contact & Informations
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-wide">
            Nous Contacter
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-lg"
          >
            Une question ? N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais
          </motion.p>
        </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-[#3a4a5a]/80 to-[#2c3e50]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c4a574] to-[#b89560] flex items-center justify-center shadow-lg shadow-[#c4a574]/30">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  Coordonnées
                </h3>
                <EditableText
                  path="contact.description"
                  value={content?.contact?.description || "N'hésitez pas à nous contacter pour toute question concernant nos gîtes, les tarifs ou pour effectuer une réservation."}
                  as="p"
                  className="text-white/70 mb-8 leading-relaxed"
                  multiline
                />

                <div className="space-y-4">
                  <motion.a
                    href="tel:0645795939"
                    className="flex items-center gap-4 p-5 bg-[#2c3e50]/50 rounded-xl border border-white/5 group"
                    whileHover={{ x: 8, borderColor: 'rgba(196, 165, 116, 0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c4a574] to-[#b89560] flex items-center justify-center shadow-lg shadow-[#c4a574]/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Téléphone</p>
                      <EditableText
                        path="contact.telephone"
                        value={content?.contact?.telephone || "06 45 79 59 39"}
                        as="p"
                        className="text-white text-lg"
                      />
                    </div>
                  </motion.a>

                  <motion.a
                    href={`mailto:${content?.contact?.email || 'spanazol@wanadoo.fr'}`}
                    className="flex items-center gap-4 p-5 bg-[#2c3e50]/50 rounded-xl border border-white/5 group"
                    whileHover={{ x: 8, borderColor: 'rgba(196, 165, 116, 0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c4a574] to-[#b89560] flex items-center justify-center shadow-lg shadow-[#c4a574]/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <EditableText
                        path="contact.email"
                        value={content?.contact?.email || "spanazol@wanadoo.fr"}
                        as="p"
                        className="text-white text-lg break-all"
                      />
                    </div>
                  </motion.a>

                  <motion.a
                    href={content?.social?.instagram || "https://www.instagram.com/les_gites_du_soulor/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 bg-[#2c3e50]/50 rounded-xl border border-white/5 group"
                    whileHover={{ x: 8, borderColor: 'rgba(221, 42, 123, 0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center shadow-lg shadow-[#dd2a7b]/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Instagram</p>
                      <EditableText
                        path="social.instagramHandle"
                        value={content?.social?.instagramHandle || "@les_gites_du_soulor"}
                        as="p"
                        className="text-white text-lg"
                      />
                    </div>
                  </motion.a>

                  <motion.a
                    href={content?.social?.tiktok || "https://www.tiktok.com/@les_gites_du_soulor"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 bg-[#2c3e50]/50 rounded-xl border border-white/5 group"
                    whileHover={{ x: 8, borderColor: 'rgba(0, 242, 234, 0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f2ea] via-[#ff0050] to-[#000000] flex items-center justify-center shadow-lg shadow-[#00f2ea]/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <TikTokIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">TikTok</p>
                      <EditableText
                        path="social.tiktokHandle"
                        value={content?.social?.tiktokHandle || "@les_gites_du_soulor"}
                        as="p"
                        className="text-white text-lg"
                      />
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-[#3a4a5a]/80 to-[#2c3e50]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c4a574] to-[#b89560] flex items-center justify-center shadow-lg shadow-[#c4a574]/30">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  Envoyez-nous une question
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-white/90 mb-2 block">
                      Nom complet <span className="text-[#c4a574]">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#2c3e50]/50 border-white/10 text-white placeholder:text-white/40 focus:border-[#c4a574] focus:ring-[#c4a574]/20"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-white/90 mb-2 block">
                      Email <span className="text-[#c4a574]">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#2c3e50]/50 border-white/10 text-white placeholder:text-white/40 focus:border-[#c4a574] focus:ring-[#c4a574]/20"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-white/90 mb-2 block">
                      Téléphone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-[#2c3e50]/50 border-white/10 text-white placeholder:text-white/40 focus:border-[#c4a574] focus:ring-[#c4a574]/20"
                      placeholder="06 00 00 00 00"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-white/90 mb-2 block">
                      Votre message <span className="text-[#c4a574]">*</span>
                    </label>
                    <Textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-[#2c3e50]/50 border-white/10 text-white placeholder:text-white/40 focus:border-[#c4a574] focus:ring-[#c4a574]/20 resize-none"
                      placeholder="Posez-nous votre question..."
                    />
                  </div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    className="pt-2"
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#c4a574] to-[#b89560] hover:from-[#b89560] hover:to-[#c4a574] text-white shadow-lg shadow-[#c4a574]/30 h-12 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Envoyer ma question
                      <Send className="w-4 h-4" />
                    </Button>
                  </motion.div>

                  <p className="text-white/50 text-sm text-center">
                    Votre client mail s'ouvrira pour envoyer le message
                  </p>
                </form>
              </div>
            </motion.div>
          </div>

      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#c4a574]/5 blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#7a9fbf]/5 blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
}
