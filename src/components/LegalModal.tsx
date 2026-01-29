import { motion, AnimatePresence } from 'motion/react';
import { X, ScrollText, Shield, Cookie } from 'lucide-react';
import { Button } from './ui/button';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'mentions' | 'privacy' | 'cookies';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const content = {
    mentions: {
      title: 'Mentions Légales',
      icon: ScrollText,
      sections: [
        {
          title: 'Éditeur du site',
          content: (
            <>
              <p><strong>Dénomination sociale :</strong> SARL Les Artigaux</p>
              <p><strong>Forme juridique :</strong> Société à Responsabilité Limitée (SARL)</p>
              <p><strong>Capital social :</strong> 15 000 €</p>
              <p><strong>SIRET :</strong> 851 041 590 00015</p>
              <p className="mt-3"><strong>Gérant :</strong> Panazol Sylvain</p>
              <p><strong>Adresse :</strong> 42 route du Soulor, 65400 Arrens-Marsous, France</p>
              <p><strong>Téléphone :</strong> 06 45 79 59 39</p>
              <p><strong>Email :</strong> spanazol@wanadoo.fr</p>
            </>
          ),
        },
        {
          title: 'Responsable de publication',
          content: <p>Sylvain Panazol</p>,
        },
        {
          title: 'Conception et réalisation',
          content: (
            <>
              <p><strong>Designer & Développeur :</strong> Camille Panazol</p>
              <p><strong>Agence :</strong> PixelBoost</p>
            </>
          ),
        },
        {
          title: 'Hébergement',
          content: (
            <>
              <p><strong>Hébergeur :</strong> Netlify, Inc.</p>
              <p><strong>Adresse :</strong> 2325 3rd Street, Suite 296</p>
              <p>San Francisco, California 94107</p>
              <p>États-Unis</p>
              <p className="mt-2">
                <a 
                  href="https://www.netlify.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#c4a574] hover:underline"
                >
                  www.netlify.com
                </a>
              </p>
            </>
          ),
        },
        {
          title: 'Propriété intellectuelle',
          content: (
            <>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="mt-3">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est 
                formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </>
          ),
        },
        {
          title: 'Crédits photos',
          content: (
            <>
              <p>
                Toutes les photographies utilisées sur ce site sont issues de la collection personnelle 
                de Panazol Sylvain, gérant des Gîtes du Soulor.
              </p>
              <p className="mt-2">
                Ces images sont protégées par le droit d'auteur et ne peuvent être utilisées sans 
                autorisation préalable écrite.
              </p>
            </>
          ),
        },
      ],
    },
    privacy: {
      title: 'Politique de Confidentialité',
      icon: Shield,
      sections: [
        {
          title: 'Collecte des données personnelles',
          content: (
            <>
              <p>
                Dans le cadre de l'utilisation de notre site et de nos services de réservation, 
                nous sommes amenés à collecter les données personnelles suivantes :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Nom et prénom</strong></li>
                <li><strong>Adresse email</strong></li>
                <li><strong>Numéro de téléphone</strong></li>
                <li><strong>Informations de réservation</strong> (dates, nombre de personnes, gîte choisi)</li>
              </ul>
            </>
          ),
        },
        {
          title: 'Finalité de la collecte',
          content: (
            <>
              <p>Les données collectées sont utilisées pour :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Gérer vos réservations et confirmations</li>
                <li>Vous contacter concernant votre séjour</li>
                <li>Répondre à vos demandes d'information</li>
                <li>Améliorer nos services</li>
              </ul>
            </>
          ),
        },
        {
          title: 'Base légale du traitement',
          content: (
            <p>
              Le traitement de vos données personnelles est fondé sur l'exécution du contrat de 
              réservation et votre consentement explicite lors de la soumission du formulaire de contact.
            </p>
          ),
        },
        {
          title: 'Durée de conservation',
          content: (
            <>
              <p>Vos données sont conservées pendant :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>3 ans</strong> à compter de votre dernière interaction avec nos services</li>
                <li>Les données de réservation sont archivées conformément aux obligations comptables et fiscales</li>
              </ul>
            </>
          ),
        },
        {
          title: 'Vos droits',
          content: (
            <>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Droit d'accès :</strong> Vous pouvez demander une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> Vous pouvez corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données</li>
                <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> Vous pouvez récupérer vos données dans un format structuré</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, veuillez nous envoyer un email à :{' '}
                <a href="mailto:spanazol@wanadoo.fr" className="text-[#c4a574] hover:underline">
                  spanazol@wanadoo.fr
                </a>
              </p>
            </>
          ),
        },
        {
          title: 'Sécurité des données',
          content: (
            <p>
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées 
              pour garantir la sécurité de vos données personnelles et empêcher leur altération, 
              leur perte ou l'accès par des tiers non autorisés.
            </p>
          ),
        },
        {
          title: 'Transmission des données',
          content: (
            <p>
              Vos données personnelles ne sont ni vendues, ni louées, ni transmises à des tiers, 
              sauf obligation légale ou réglementaire.
            </p>
          ),
        },
        {
          title: 'Contact',
          content: (
            <>
              <p>Pour toute question concernant la protection de vos données personnelles :</p>
              <p className="mt-2">
                <strong>Email :</strong>{' '}
                <a href="mailto:spanazol@wanadoo.fr" className="text-[#c4a574] hover:underline">
                  spanazol@wanadoo.fr
                </a>
              </p>
              <p><strong>Téléphone :</strong> 06 45 79 59 39</p>
            </>
          ),
        },
      ],
    },
    cookies: {
      title: 'Politique des Cookies',
      icon: Cookie,
      sections: [
        {
          title: 'Qu\'est-ce qu\'un cookie ?',
          content: (
            <p>
              Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site web. 
              Il permet de mémoriser des informations relatives à votre navigation et de reconnaître votre 
              navigateur lors de votre prochaine visite.
            </p>
          ),
        },
        {
          title: 'Les cookies que nous utilisons',
          content: (
            <>
              <p><strong>1. Cookies nécessaires (obligatoires)</strong></p>
              <p className="mt-2 ml-4">
                Ces cookies sont indispensables au fonctionnement du site. Ils vous permettent de naviguer 
                sur le site et d'utiliser ses fonctionnalités essentielles. Sans ces cookies, certains 
                services ne peuvent pas être fournis.
              </p>
              <p className="mt-4"><strong>2. Cookies analytiques (optionnels)</strong></p>
              <p className="mt-2 ml-4">
                Ces cookies nous permettent de comprendre comment les visiteurs utilisent notre site, 
                de détecter les erreurs et d'améliorer les performances. Toutes les informations collectées 
                sont anonymes.
              </p>
              <p className="mt-4"><strong>3. Cookies marketing (optionnels)</strong></p>
              <p className="mt-2 ml-4">
                Ces cookies peuvent être utilisés pour vous proposer des contenus personnalisés et 
                adaptés à vos centres d'intérêt.
              </p>
            </>
          ),
        },
        {
          title: 'Gestion des cookies',
          content: (
            <>
              <p>Vous pouvez à tout moment :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Accepter ou refuser les cookies via la bannière de consentement</li>
                <li>Modifier vos préférences dans les paramètres de votre navigateur</li>
                <li>Supprimer les cookies déjà déposés sur votre appareil</li>
              </ul>
              <p className="mt-3">
                Attention : La désactivation de certains cookies peut affecter votre expérience de 
                navigation et limiter l'accès à certaines fonctionnalités du site.
              </p>
            </>
          ),
        },
        {
          title: 'Durée de conservation',
          content: (
            <p>
              Les cookies sont conservés pour une durée maximale de 13 mois à compter de leur premier dépôt 
              sur votre terminal. Votre consentement est valable pour cette même durée.
            </p>
          ),
        },
        {
          title: 'Pour plus d\'informations',
          content: (
            <>
              <p>
                Pour en savoir plus sur les cookies et leur utilisation, vous pouvez consulter le site de la CNIL :
              </p>
              <p className="mt-2">
                <a 
                  href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#c4a574] hover:underline"
                >
                  www.cnil.fr/fr/cookies-et-autres-traceurs
                </a>
              </p>
            </>
          ),
        },
      ],
    },
  };

  const currentContent = content[type];
  const Icon = currentContent.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#1a252f] border border-[#c4a574]/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#1a252f] border-b border-[#c4a574]/20 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c4a574]/20 to-[#b89560]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#c4a574]" />
                  </div>
                  <h2 className="text-white">{currentContent.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-6">
                <div className="space-y-8">
                  {currentContent.sections.map((section, index) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="space-y-3"
                    >
                      <h3 className="text-[#c4a574] flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-[#c4a574] to-[#b89560] rounded-full" />
                        {section.title}
                      </h3>
                      <div className="text-white/80 space-y-3 ml-4">
                        {section.content}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/60 text-sm text-center">
                    Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <div className="sticky bottom-0 bg-gradient-to-t from-[#1a252f] via-[#1a252f] to-transparent px-6 py-4 flex justify-center">
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-[#c4a574] to-[#b89560] hover:from-[#b89560] hover:to-[#c4a574] text-white shadow-lg"
                >
                  Fermer
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
