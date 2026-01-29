import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Car, Train, Plane } from 'lucide-react';
import { EditableText } from '../components/admin/EditableText';
import { useAdmin } from '../contexts/AdminContext';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export function ContactPage() {
  const { content } = useAdmin();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Envoi direct par email au gérant
    const emailDestination = content.contact?.email || 'spanazol@wanadoo.fr';
    const sujet = `Demande de renseignement - ${formData.nom}`;
    const corps = `
Nom: ${formData.nom}
Email: ${formData.email}
Téléphone: ${formData.telephone}

Message:
${formData.message}
    `.trim();

    // Ouvrir le client email par défaut
    window.location.href = `mailto:${emailDestination}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        message: '',
      });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const infosContact = [
    {
      icon: Phone,
      titre: 'Téléphone',
      valeur: content.contact?.telephone || '06 45 79 59 39',
      lien: `tel:${content.contact?.telephone || '0645795939'}`,
    },
    {
      icon: Mail,
      titre: 'Email',
      valeur: content.contact?.email || 'spanazol@wanadoo.fr',
      lien: `mailto:${content.contact?.email || 'spanazol@wanadoo.fr'}`,
    },
    {
      icon: MapPin,
      titre: 'Adresse',
      valeur: content.contact?.adresse || '42 route du Soulor, 65400 Arrens-Marsous, France',
      lien: 'https://maps.google.com',
    },
    {
      icon: Clock,
      titre: 'Disponibilité',
      valeur: 'Tous les jours : 9h - 20h',
      lien: null,
    },
  ];

  const accesInfos = [
    {
      icon: Car,
      titre: 'En Voiture',
      description: 'Depuis Lourdes : 30 min via D821. Depuis Pau : 1h via A64 et D821. Parking privé gratuit sur place.',
    },
    {
      icon: Train,
      titre: 'En Train',
      description: 'Gare de Lourdes (25 km) : TGV Paris-Lourdes en 4h30. Navettes et taxis disponibles.',
    },
    {
      icon: Plane,
      titre: 'En Avion',
      description: 'Aéroport Tarbes-Lourdes-Pyrénées (35 km). Aéroport de Pau (60 km). Location de voiture sur place.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Gîtes Arrens-Marsous - Réservation & Renseignements | Les Gîtes du Soulor</title>
        <meta name="description" content="Contactez Les Gîtes du Soulor à Arrens-Marsous (65) pour toute demande de réservation ou renseignement. Tél : 06 45 79 59 39. Réponse sous 24h." />
        <link rel="canonical" href="https://lesgitesdusoulor.fr/contact" />
      </Helmet>

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2d3843]/50 to-transparent" />
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#c4a574] rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.div
                className="inline-block mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <MessageCircle className="w-16 h-16 text-[#c4a574] mx-auto" />
              </motion.div>
              <EditableText
                path="pages.contact.titre"
                value={content.pages?.contact?.titre || 'Contactez-nous'}
                as="h1"
                className="text-5xl text-white mb-4"
                style={{ fontFamily: 'serif' }}
              />
              <EditableText
                path="pages.contact.sousTitre"
                value={content.pages?.contact?.sousTitre || 'Nous sommes à votre écoute pour préparer votre séjour'}
                as="p"
                className="text-white/70 text-xl max-w-2xl mx-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Texte SEO Introduction */}
        <section className="py-8 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
              >
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl text-white mb-4" style={{ fontFamily: 'serif' }}>
                    Votre Séjour à Arrens-Marsous : Réservation & Renseignements
                  </h2>
                  
                  <p className="text-white/90 leading-relaxed mb-4">
                    Vous souhaitez <strong className="text-[#c4a574]">réserver un gîte</strong> pour vos prochaines vacances dans les <strong className="text-[#c4a574]">Pyrénées</strong> ? Les Gîtes du Soulor sont à votre disposition pour vous accueillir toute l'année à <strong className="text-[#c4a574]">Arrens-Marsous</strong>, dans le <strong className="text-[#c4a574]">Val d'Azun</strong>. Nous répondons à toutes vos questions sur nos 4 gîtes pour 2 personnes, nos tarifs, et nos équipements bien-être (bain nordique et sauna).
                  </p>
                  
                  <p className="text-white/70 leading-relaxed text-sm">
                    <strong className="text-white">Réponse rapide garantie :</strong> Nous nous engageons à répondre à toutes vos demandes dans un délai de <strong>24 heures maximum</strong>. Pour les demandes urgentes ou de dernière minute, nous vous conseillons de nous contacter directement par téléphone au <strong className="text-[#c4a574]">06 45 79 59 39</strong>. Nos gîtes sont situés au <strong>42 route du Soulor</strong> à Arrens-Marsous (65400), facilement accessibles depuis Lourdes (30 min), Pau (1h) ou Tarbes (45 min).
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Formulaire de contact */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Formulaire */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <EditableText
                  path="pages.contact.formulaireTitre"
                  value={content.pages?.contact?.formulaireTitre || 'Demande de renseignement'}
                  as="h2"
                  className="text-3xl text-white mb-6"
                  style={{ fontFamily: 'serif' }}
                />
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm">Nom complet *</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#c4a574] focus:outline-none transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#c4a574] focus:outline-none transition-colors"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Téléphone</label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#c4a574] focus:outline-none transition-colors"
                        placeholder="+33 6 XX XX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2 text-sm">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#c4a574] focus:outline-none transition-colors resize-none"
                      placeholder="Parlez-nous de vos besoins, préférences ou questions..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-lg bg-gradient-to-r from-[#c4a574] to-[#d4b584] text-white font-semibold flex items-center justify-center gap-2 hover:from-[#d4b584] hover:to-[#c4a574] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer la demande
                      </>
                    )}
                  </motion.button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-center"
                    >
                      ✓ Votre client email s'est ouvert. Vérifiez et envoyez le message.
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Informations supplémentaires */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <EditableText
                    path="pages.contact.infoTitre"
                    value={content.pages?.contact?.infoTitre || 'Informations pratiques'}
                    as="h2"
                    className="text-3xl text-white mb-6"
                    style={{ fontFamily: 'serif' }}
                  />
                  
                  <div className="space-y-4">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <EditableText
                        path="pages.contact.horaires"
                        value={content.pages?.contact?.horaires || 'Nous répondons à vos messages dans un délai de 24h maximum. Pour les demandes urgentes, privilégiez le contact téléphonique.'}
                        as="p"
                        className="text-white/70 leading-relaxed"
                        multiline
                      />
                    </div>
                  </div>
                </div>

                {/* Carte interactive */}
                <div className="relative">
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2926.8947558794!2d-0.20845!3d42.9647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU3JzUzLjAiTiAwwrAxMicyOS44Ilc!5e0!3m2!1sfr!2sfr!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localisation Les Gîtes du Soulor"
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comment nous rejoindre */}
        <section className="py-16 bg-gradient-to-b from-transparent via-[#2d3843]/30 to-transparent relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <EditableText
                path="pages.contact.accesTitre"
                value={content.pages?.contact?.accesTitre || 'Comment nous rejoindre'}
                as="h2"
                className="text-4xl text-white mb-4"
                style={{ fontFamily: 'serif' }}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {accesInfos.map((acces, index) => {
                const Icon = acces.icon;
                return (
                  <motion.div
                    key={acces.titre}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c4a574]/5 via-transparent to-[#5a7a9f]/5 rounded-2xl border border-white/5 group-hover:border-[#c4a574]/30 transition-all duration-300" />
                    
                    <div className="relative p-8 text-center">
                      <motion.div
                        className="flex justify-center mb-4"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4 rounded-full bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20">
                          <Icon className="w-8 h-8 text-[#c4a574]" />
                        </div>
                      </motion.div>
                      <EditableText
                        path={`pages.contact.acces.${index}.titre`}
                        value={acces.titre}
                        as="h3"
                        className="text-xl text-white mb-3"
                      />
                      <EditableText
                        path={`pages.contact.acces.${index}.description`}
                        value={acces.description}
                        as="p"
                        className="text-white/70 text-sm leading-relaxed"
                        multiline
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}