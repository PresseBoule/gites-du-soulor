import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Settings } from 'lucide-react';
import { Button } from './ui/button';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Délai de 1 seconde avant d'afficher la bannière
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const savePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="bg-[#1a252f]/98 backdrop-blur-xl border border-[#c4a574]/30 rounded-2xl shadow-2xl overflow-hidden">
              {/* Decorative gradient border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c4a574] to-transparent" />

              {!showSettings ? (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c4a574]/20 to-[#b89560]/20 flex items-center justify-center">
                        <Cookie className="w-6 h-6 text-[#c4a574]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-white mb-2">🍪 Nous utilisons des cookies</h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                        Certains cookies sont nécessaires au fonctionnement du site, tandis que d'autres nous aident 
                        à améliorer nos services. Vous pouvez personnaliser vos préférences à tout moment.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <Button
                        onClick={() => setShowSettings(true)}
                        variant="outline"
                        className="border-[#c4a574]/30 text-white hover:bg-[#c4a574]/10 hover:border-[#c4a574]/50"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Personnaliser
                      </Button>
                      <Button
                        onClick={acceptNecessary}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Refuser
                      </Button>
                      <Button
                        onClick={acceptAll}
                        className="bg-gradient-to-r from-[#c4a574] to-[#b89560] hover:from-[#b89560] hover:to-[#c4a574] text-white shadow-lg shadow-[#c4a574]/20"
                      >
                        Tout accepter
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white">Paramètres des cookies</h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Necessary Cookies */}
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="mt-1 w-4 h-4 rounded accent-[#c4a574]"
                      />
                      <div className="flex-1">
                        <h4 className="text-white mb-1">Cookies nécessaires</h4>
                        <p className="text-white/60 text-sm">
                          Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.
                        </p>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded accent-[#c4a574]"
                      />
                      <div className="flex-1">
                        <h4 className="text-white mb-1">Cookies analytiques</h4>
                        <p className="text-white/60 text-sm">
                          Ces cookies nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
                        </p>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded accent-[#c4a574]"
                      />
                      <div className="flex-1">
                        <h4 className="text-white mb-1">Cookies marketing</h4>
                        <p className="text-white/60 text-sm">
                          Ces cookies sont utilisés pour vous proposer des contenus et publicités pertinents.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={acceptNecessary}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Cookies nécessaires uniquement
                    </Button>
                    <Button
                      onClick={savePreferences}
                      className="bg-gradient-to-r from-[#c4a574] to-[#b89560] hover:from-[#b89560] hover:to-[#c4a574] text-white shadow-lg shadow-[#c4a574]/20"
                    >
                      Enregistrer mes préférences
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
