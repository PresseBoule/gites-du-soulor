import { motion } from 'motion/react';
import { Mountain, MapPin, Compass, Calendar, Heart, Sparkles, Home, Sun, Snowflake, Car } from 'lucide-react';
import { Link } from 'react-router'; // Changé de 'react-router-dom' à 'react-router'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export function GiteValAzunPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Gîte Val d'Azun - Location 2 Personnes avec Bain Nordique | Les Gîtes du Soulor</title>
        <meta name="description" content="Louez un gîte 2 personnes au cœur du Val d'Azun, Hautes-Pyrénées. Bain nordique, sauna, randonnée. Séjour nature à Arrens-Marsous. Réservation en ligne." />
        <meta name="keywords" content="gîte val d'azun, location val d'azun, hébergement val d'azun, gîte pyrénées, gîte 2 personnes val d'azun" />
        <link rel="canonical" href="https://lesgitesdusoulor.fr/gite-val-azun" />
      </Helmet>

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2d3843]/50 to-transparent" />
          
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
                <Mountain className="w-16 h-16 text-[#c4a574] mx-auto" />
              </motion.div>
              <h1 className="text-5xl text-white mb-4" style={{ fontFamily: 'serif' }}>
                Gîte Val d'Azun
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Votre hébergement de charme au cœur de la vallée préservée du Val d'Azun
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contenu SEO Principal */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-invert prose-lg max-w-none"
              >
                {/* Introduction */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-8">
                  <h2 className="text-3xl text-white mb-6" style={{ fontFamily: 'serif' }}>
                    Location de Gîte dans le Val d'Azun
                  </h2>
                  
                  <p className="text-white/90 leading-relaxed mb-6">
                    Le <strong className="text-[#c4a574]">Val d'Azun</strong> est l'une des vallées les plus préservées et authentiques des <strong className="text-[#c4a574]">Hautes-Pyrénées</strong>. Situé entre le célèbre <strong>Col du Soulor</strong> et le <strong>Col d'Aubisque</strong>, cette vallée offre des paysages époustouflants et une nature intacte. Les Gîtes du Soulor, situés à <strong className="text-[#c4a574]">Arrens-Marsous</strong>, vous proposent <strong>4 gîtes pour 2 personnes</strong> idéalement placés pour découvrir toutes les richesses de cette région exceptionnelle.
                  </p>

                  <p className="text-white/80 leading-relaxed mb-6">
                    Que vous soyez <strong>amateur de randonnée</strong>, <strong>passionné de cyclisme</strong> (le Tour de France passe régulièrement par les cols du Val d'Azun), ou simplement à la recherche d'un <strong>séjour ressourçant en montagne</strong>, notre gîte Val d'Azun est le point de départ idéal pour vos aventures pyrénéennes.
                  </p>
                </div>

                {/* Pourquoi le Val d'Azun */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-8">
                  <h2 className="text-2xl text-white mb-6" style={{ fontFamily: 'serif' }}>
                    Pourquoi choisir un gîte dans le Val d'Azun ?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-3 flex items-center gap-2">
                        <Mountain className="w-5 h-5" />
                        Nature Préservée
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Le Val d'Azun fait partie du <strong className="text-white">Parc National des Pyrénées</strong>. Vous êtes au cœur d'une zone protégée où la faune et la flore sont exceptionnelles : marmottes, isards, vautours, aigles royaux, et une flore alpine remarquable.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-3 flex items-center gap-2">
                        <Compass className="w-5 h-5" />
                        Cols Mythiques
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Le <strong className="text-white">Col du Soulor</strong> (1474m) et le <strong className="text-white">Col d'Aubisque</strong> (1709m) sont accessibles en voiture, vélo ou à pied. Ces cols offrent des panoramas à 360° sur la chaîne des Pyrénées, du Pic du Midi au Pic d'Anie.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-3 flex items-center gap-2">
                        <Sun className="w-5 h-5" />
                        Randonnées Exceptionnelles
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Le Val d'Azun est le paradis des randonneurs : <strong className="text-white">Lac d'Estaing</strong>, <strong className="text-white">Lac d'Ilhéou</strong>, <strong className="text-white">Lacs d'Arrémoulit</strong>, <strong className="text-white">Cirque du Litor</strong>... Des dizaines de sentiers balisés pour tous les niveaux.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-3 flex items-center gap-2">
                        <Snowflake className="w-5 h-5" />
                        Ski en Hiver
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        En hiver, le Val d'Azun donne accès aux <strong className="text-white">stations de ski d'Hautacam</strong> (15 min), <strong className="text-white">Cauterets</strong> (35 min), et le <strong className="text-white">Grand Tourmalet</strong> (La Mongie / Barèges, 40 min). Ski alpin, ski de fond, raquettes...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nos gîtes dans le Val d'Azun */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-8">
                  <h2 className="text-2xl text-white mb-6" style={{ fontFamily: 'serif' }}>
                    Nos Gîtes 2 Personnes dans le Val d'Azun
                  </h2>
                  
                  <p className="text-white/90 leading-relaxed mb-6">
                    Les Gîtes du Soulor vous proposent <strong className="text-[#c4a574]">4 hébergements indépendants</strong> pour 2 personnes, situés au pied du Col du Soulor à Arrens-Marsous. Chaque gîte porte le nom d'un sommet emblématique du Val d'Azun :
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#c4a574]/10 to-transparent border border-[#c4a574]/20">
                      <h3 className="text-lg text-[#c4a574] mb-2">🏔️ Le Suyen</h3>
                      <p className="text-white/70 text-sm">
                        Du nom du pic de Suyen (2341m), sommet panoramique accessible depuis le col du Soulor.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#c4a574]/10 to-transparent border border-[#c4a574]/20">
                      <h3 className="text-lg text-[#c4a574] mb-2">🏔️ Le Tech</h3>
                      <p className="text-white/70 text-sm">
                        En référence au gave de Tech, affluent du gave d'Azun qui arrose la vallée.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#c4a574]/10 to-transparent border border-[#c4a574]/20">
                      <h3 className="text-lg text-[#c4a574] mb-2">🏔️ L'Estaing</h3>
                      <p className="text-white/70 text-sm">
                        Du nom du magnifique lac d'Estaing, joyau du Val d'Azun accessible en 2h de marche.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#c4a574]/10 to-transparent border border-[#c4a574]/20">
                      <h3 className="text-lg text-[#c4a574] mb-2">🏔️ Le Soum</h3>
                      <p className="text-white/70 text-sm">
                        "Soum" signifie "sommet" en gascon. Ce gîte célèbre les nombreux sommets du Val d'Azun.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-[#5a7a9f]/10 to-transparent border border-[#5a7a9f]/20">
                    <h3 className="text-xl text-white mb-4">Équipements de nos gîtes Val d'Azun</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/80 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-[#c4a574] mt-1">✓</span>
                        <span>Cuisine entièrement équipée (lave-vaisselle, four, plaques, réfrigérateur)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c4a574] mt-1">✓</span>
                        <span>Salle de bain moderne avec douche italienne</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c4a574] mt-1">✓</span>
                        <span>Literie haut de gamme (160x200 ou 2x80x200)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c4a574] mt-1">✓</span>
                        <span>Salon cosy avec TV écran plat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c4a574] mt-1">✓</span>
                        <span>Wi-Fi gratuit haut débit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c4a574] mt-1">✓</span>
                        <span>Parking privé gratuit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c4a574] mt-1">✓</span>
                        <span>Accès bain nordique chauffé au feu de bois</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c4a574] mt-1">✓</span>
                        <span>Accès sauna traditionnel</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Activités dans le Val d'Azun */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-8">
                  <h2 className="text-2xl text-white mb-6" style={{ fontFamily: 'serif' }}>
                    Que faire dans le Val d'Azun ?
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-2">🥾 Randonnée Pédestre</h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-2">
                        Le Val d'Azun compte plus de <strong className="text-white">100 km de sentiers balisés</strong>. Randonnées incontournables :
                      </p>
                      <ul className="text-white/70 text-sm space-y-1 ml-4">
                        <li>• Lac d'Estaing (2h, facile) : lac glaciaire magnifique</li>
                        <li>• Lac d'Ilhéou (3h, moyen) : panorama exceptionnel</li>
                        <li>• Cirque du Litor (4h, moyen) : cirque glaciaire sauvage</li>
                        <li>• Col d'Ilhéou (5h, difficile) : haute montagne à 2716m</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-2">🚴 Cyclisme et Cols</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Les <strong className="text-white">cyclistes</strong> adorent le Val d'Azun : montées du <strong>Col du Soulor</strong> et <strong>Col d'Aubisque</strong> (étapes mythiques du Tour de France), routes panoramiques, circuits VTT et VTT électrique.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-2">⛷️ Ski et Sports d'Hiver</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        En hiver : ski alpin à <strong className="text-white">Hautacam</strong>, <strong className="text-white">Cauterets</strong>, <strong className="text-white">Barèges-La Mongie</strong>. Ski de fond et raquettes sur les plateaux du Val d'Azun.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg text-[#c4a574] mb-2">🧗 Via Ferrata et Escalade</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Via ferrata de Bious (parcours sportif), nombreuses voies d'escalade dans la vallée.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Villages du Val d'Azun */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-8">
                  <h2 className="text-2xl text-white mb-6" style={{ fontFamily: 'serif' }}>
                    Villages et Patrimoine du Val d'Azun
                  </h2>
                  
                  <p className="text-white/90 leading-relaxed mb-4">
                    Le Val d'Azun est composé de <strong className="text-[#c4a574]">5 villages</strong> authentiques :
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5">
                      <h3 className="text-white mb-2">📍 Arrens-Marsous</h3>
                      <p className="text-white/70 text-sm">Village principal, cœur du Val d'Azun. Commerces, services, départ de randonnées.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <h3 className="text-white mb-2">📍 Artalens-Souin</h3>
                      <p className="text-white/70 text-sm">Village pittoresque avec son église romane classée.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <h3 className="text-white mb-2">📍 Aucun</h3>
                      <p className="text-white/70 text-sm">Village thermal, station verte, accès au lac de Gaube.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <h3 className="text-white mb-2">📍 Bun</h3>
                      <p className="text-white/70 text-sm">Petit village de montagne authentique.</p>
                    </div>
                  </div>
                </div>

                {/* Infos pratiques */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#c4a574]/10 to-[#5a7a9f]/10 border border-[#c4a574]/20">
                  <h2 className="text-2xl text-white mb-6" style={{ fontFamily: 'serif' }}>
                    Infos Pratiques - Accès au Val d'Azun
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg text-[#c4a574] mb-3 flex items-center gap-2">
                        <Car className="w-5 h-5" />
                        En Voiture
                      </h3>
                      <ul className="text-white/80 text-sm space-y-2">
                        <li>• Depuis <strong>Lourdes</strong> : 30 min (25 km via D821)</li>
                        <li>• Depuis <strong>Pau</strong> : 1h (60 km via A64 puis D821)</li>
                        <li>• Depuis <strong>Tarbes</strong> : 45 min (50 km)</li>
                        <li>• Depuis <strong>Toulouse</strong> : 2h15 (185 km via A64)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg text-[#c4a574] mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Adresse
                      </h3>
                      <p className="text-white/80 text-sm mb-3">
                        <strong className="text-white">Les Gîtes du Soulor</strong><br />
                        42 route du Soulor<br />
                        65400 Arrens-Marsous<br />
                        Val d'Azun, Hautes-Pyrénées
                      </p>
                      <p className="text-white/70 text-sm">
                        GPS : 42.9653° N, 0.1892° O
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Réservation */}
                <div className="text-center mt-12">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="https://gite-soulor-reservation.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c4a574] to-[#b89560] text-white rounded-full font-medium hover:shadow-lg hover:shadow-[#c4a574]/30 transition-all duration-300"
                    >
                      <Calendar className="w-5 h-5" />
                      Réserver votre gîte dans le Val d'Azun
                    </Link>
                  </motion.div>
                  <p className="text-white/60 text-sm mt-4">
                    Tarifs : Week-end dès 400€ • Semaine dès 150€/nuit
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}