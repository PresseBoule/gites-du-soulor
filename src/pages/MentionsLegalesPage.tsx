import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Scale, Building, Mail, Phone, MapPin } from 'lucide-react';

export function MentionsLegalesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3a4a5a] via-[#2d3843] to-[#3a4a5a] pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#c4a574]/20 to-[#5a7a9f]/20 border border-[#c4a574]/30 backdrop-blur-sm">
              <p className="text-[#c4a574] flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Informations Légales
              </p>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl text-white mb-6 bg-gradient-to-r from-white via-[#c4a574] to-white bg-clip-text text-transparent" style={{ fontFamily: 'serif' }}>
            Mentions Légales
          </h1>

          <motion.div
            className="h-1 w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-[#c4a574] to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Éditeur du site */}
          <div className="bg-gradient-to-br from-[#2d3843] to-[#3a4a5a] rounded-3xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c4a574]/20 to-[#5a7a9f]/20 flex items-center justify-center">
                <Building className="w-6 h-6 text-[#c4a574]" />
              </div>
              <h2 className="text-2xl text-white" style={{ fontFamily: 'serif' }}>
                Éditeur du Site
              </h2>
            </div>

            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">Raison sociale :</strong> SARL Les Artigaux</p>
              <p><strong className="text-white">SIRET :</strong> 851 041 590 00015</p>
              <p><strong className="text-white">Adresse :</strong> 42 route du Soulor, 65400 Arrens-Marsous, France</p>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#c4a574] mt-1" />
                <p><strong className="text-white">Téléphone :</strong> 06 45 79 59 39</p>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#c4a574] mt-1" />
                <p><strong className="text-white">Email :</strong> spanazol@wanadoo.fr</p>
              </div>
            </div>
          </div>

          {/* Hébergement */}
          <div className="bg-gradient-to-br from-[#2d3843] to-[#3a4a5a] rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl text-white mb-6" style={{ fontFamily: 'serif' }}>
              Hébergement du Site
            </h2>
            <div className="space-y-4 text-white/70">
              <p><strong className="text-white">Hébergeur :</strong> Netlify, Inc.</p>
              <p><strong className="text-white">Adresse :</strong> 610 22nd Street, Suite 315, San Francisco, CA 94107, USA</p>
            </div>
          </div>

          {/* Propriété Intellectuelle */}
          <div className="bg-gradient-to-br from-[#2d3843] to-[#3a4a5a] rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl text-white mb-6" style={{ fontFamily: 'serif' }}>
              Propriété Intellectuelle
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour
                les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il
                soit, est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
              <p>
                Les photos présentes sur ce site sont la propriété exclusive de Les Gîtes du Soulor et ne
                peuvent être utilisées sans autorisation préalable.
              </p>
            </div>
          </div>

          {/* Protection des données */}
          <div className="bg-gradient-to-br from-[#2d3843] to-[#3a4a5a] rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl text-white mb-6" style={{ fontFamily: 'serif' }}>
              Protection des Données Personnelles
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement
                Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de
                rectification et de suppression des données vous concernant.
              </p>
              <p>
                Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé par
                Les Gîtes du Soulor pour la gestion des réservations et des demandes de contact. Elles sont
                conservées pendant la durée nécessaire à la gestion de votre demande et ne sont en aucun
                cas transmises à des tiers.
              </p>
              <p>
                Pour exercer vos droits, vous pouvez nous contacter par email à spanazol@wanadoo.fr ou par
                courrier à l'adresse : 42 route du Soulor, 65400 Arrens-Marsous, France.
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-gradient-to-br from-[#2d3843] to-[#3a4a5a] rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl text-white mb-6" style={{ fontFamily: 'serif' }}>
              Cookies
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Ce site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont
                de petits fichiers texte stockés sur votre appareil qui nous permettent de mémoriser vos
                préférences.
              </p>
              <p>
                Vous pouvez paramétrer votre navigateur pour refuser les cookies. Cependant, certaines
                fonctionnalités du site pourraient ne plus être disponibles.
              </p>
            </div>
          </div>

          {/* Crédits */}
          <div className="bg-gradient-to-br from-[#2d3843] to-[#3a4a5a] rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl text-white mb-6" style={{ fontFamily: 'serif' }}>
              Crédits
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p><strong className="text-white">Conception et développement :</strong> Site créé avec Figma Make</p>
              <p><strong className="text-white">Photographies :</strong> Les Gîtes du Soulor</p>
              <p><strong className="text-white">Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
