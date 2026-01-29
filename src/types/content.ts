// Types pour le contenu modifiable du site

export interface PriceItem {
  season: string;
  price: string;
  unit?: string;
  icon: string;
  color: string;
}

export interface TarifOption {
  type: string;
  subtitle: string;
  note?: string;
  icon: string;
  prices: PriceItem[];
}

export interface Equipement {
  nom: string;
  icone: string;
}

export interface Gite {
  nom: string;
  description: string;
  capacite: string;
  superficie?: string;
  equipements?: Equipement[];
  image?: string; // Image principale de la carte
  gallery?: string[]; // Galerie de photos
  color?: string; // Couleur de thème (gradient)
  accentColor?: string; // Couleur d'accent
  hasBalcony?: boolean; // Possède un balcon
  inConstruction?: boolean; // En travaux
}

export interface Contact {
  telephone: string;
  email: string;
  adresse: string;
  entreprise?: string;
  siret?: string;
  description?: string;
}

export interface Social {
  instagram: string;
  tiktok: string;
  instagramHandle?: string;
  tiktokHandle?: string;
}

export interface Hero {
  titre: string;
  sousTitre: string;
  description?: string;
  badge: string;
  imageMain?: string;
  imageSecondaire?: string;
}

export interface InfoCard {
  icon: string;
  title: string;
  description: string;
}

export interface WellnessFeature {
  title: string;
  description: string;
}

export interface Wellness {
  titre?: string;
  description?: string;
  features?: WellnessFeature[];
}

export interface NavItem {
  label: string;
  id: string;
}

export interface Texts {
  siteName?: string;
  // Info section
  infoSectionTitre?: string;
  // Règlement
  reglementTitre?: string;
  ageMinTitre?: string;
  ageMinDescription?: string;
  animauxTitre?: string;
  animauxDescription?: string;
  // Footer
  footerDescription?: string;
  footerLiensRapides?: string;
  footerContact?: string;
  footerSuivez?: string;
  footerMentions?: string;
  footerCopyright?: string;
  // Contact
  contactTitre?: string;
  contactDescription?: string;
  contactNom?: string;
  contactEmail?: string;
  contactTelephone?: string;
  contactAdresse?: string;
  contactMessage?: string;
  contactEnvoyer?: string;
  // Map
  mapTitre?: string;
  mapDescription?: string;
  mapItineraire?: string;
  // Cookie
  cookieTitre?: string;
  cookieDescription?: string;
  cookieAccepter?: string;
  cookieRefuser?: string;
}

export interface SiteContent {
  tarifs?: TarifOption[];
  gites?: Gite[];
  contact?: Contact;
  social?: Social;
  hero?: Hero;
  infoCards?: InfoCard[];
  wellness?: Wellness;
  navigation?: NavItem[];
  texts?: Texts;
}

// Contenu par défaut (celui actuellement dans le site)
export const defaultContent: SiteContent = {
  tarifs: [
    {
      type: 'Week-End',
      subtitle: 'Vendredi 16h à Dimanche 11h',
      icon: 'Moon',
      prices: [
        { season: 'Basse Saison', price: '400€', icon: 'Leaf', color: 'from-green-400/20 to-emerald-600/20' },
        { season: 'Moyenne', price: '425€', icon: 'Sun', color: 'from-yellow-400/20 to-orange-500/20' },
        { season: 'Haute Saison', price: '450€', icon: 'Snowflake', color: 'from-blue-400/20 to-cyan-600/20' },
      ],
    },
    {
      type: 'Séjour en Semaine',
      subtitle: 'Dimanche 16h au Vendredi 11h',
      note: 'MINIMUM 2 NUITS',
      icon: 'Calendar',
      prices: [
        { season: 'Basse Saison', price: '150€', unit: 'la nuit', icon: 'Leaf', color: 'from-green-400/20 to-emerald-600/20' },
        { season: 'Moyenne', price: '165€', unit: 'la nuit', icon: 'Sun', color: 'from-yellow-400/20 to-orange-500/20' },
        { season: 'Haute Saison', price: '180€', unit: 'la nuit', icon: 'Snowflake', color: 'from-blue-400/20 to-cyan-600/20' },
      ],
    },
    {
      type: 'La Semaine',
      subtitle: 'Séjour complet 7 jours',
      icon: 'Sunrise',
      prices: [
        { season: 'Basse Saison', price: '1150€', icon: 'Leaf', color: 'from-green-400/20 to-emerald-600/20' },
        { season: 'Moyenne', price: '1250€', icon: 'Sun', color: 'from-yellow-400/20 to-orange-500/20' },
        { season: 'Haute Saison', price: '1350€', icon: 'Snowflake', color: 'from-blue-400/20 to-cyan-600/20' },
      ],
    },
  ],
  gites: [
    {
      nom: 'Le Suyen',
      description: 'Un espace intimiste et chaleureux, conçu pour votre confort',
      capacite: '2 personnes',
      image: 'https://i.postimg.cc/FFcpb6LX/7588570501155327596.jpg',
      gallery: [
        'https://i.postimg.cc/FFcpb6LX/7588570501155327596.jpg',
        'https://i.postimg.cc/15788m3S/1666003494124778229.jpg',
        'https://i.postimg.cc/sDL2VTTv/7554293390262409348.jpg',
        'https://i.postimg.cc/hG1g7s1K/6942157828982581794.jpg',
        'https://i.postimg.cc/kGkLHRvk/6609466444016411442.jpg',
        'https://i.postimg.cc/9M0SFY8m/8216737013434007532.jpg',
        'https://i.postimg.cc/htgK4NV2/5729882537124453531.jpg',
        'https://i.postimg.cc/W3qBw7Md/2870535881177773093.jpg',
        'https://i.postimg.cc/zXrsTK3f/7058983745362409722.jpg',
        'https://i.postimg.cc/t4r80ckK/3080693530078709151.jpg',
        'https://i.postimg.cc/sDsLMz09/3181144357257313940.jpg',
      ],
      color: 'from-amber-500/20 to-orange-600/20',
      accentColor: '#d4b584',
      hasBalcony: true,
      inConstruction: false,
    },
    {
      nom: 'Le Tech',
      description: 'Un espace intimiste et chaleureux, conçu pour votre confort',
      capacite: '2 personnes',
      image: 'https://i.postimg.cc/sfQJLy0X/2856943310074011028.jpg',
      gallery: [
        'https://i.postimg.cc/gcQgcr6h/8792647096264011841.jpg',
        'https://i.postimg.cc/P5zyM4Vx/1458763402424585270.jpg',
        'https://i.postimg.cc/3w8BfvPh/1945866297861919455.jpg',
        'https://i.postimg.cc/nzM1ptFD/3523331367990396970.jpg',
        'https://i.postimg.cc/vBjtmSTC/8031039626966426336.jpg',
        'https://i.postimg.cc/QCTkKkWg/3084952756933343499.jpg',
        'https://i.postimg.cc/sfQJLy0X/2856943310074011028.jpg',
        'https://i.postimg.cc/bY7RcMKx/4999626590109787033.jpg',
        'https://i.postimg.cc/cLZM631G/2969122625866992685.jpg',
        'https://i.postimg.cc/bwT0nvdZ/6649940378765655062.jpg',
        'https://i.postimg.cc/kgcNS5DZ/6553876054002977520.jpg',
        'https://i.postimg.cc/nLSvdw4Z/2597272950687853845.jpg',
        'https://i.postimg.cc/rmd57Cjh/4961846973339871349.jpg',
        'https://i.postimg.cc/sgV73RKM/2048309499798741627.jpg',
        'https://i.postimg.cc/HkB5xPhg/6994973893995733369.jpg',
      ],
      color: 'from-blue-500/20 to-cyan-600/20',
      accentColor: '#7a9fbf',
      hasBalcony: true,
      inConstruction: false,
    },
    {
      nom: "L'Estaing",
      description: 'Gîte en cours de rénovation. Bientôt disponible pour votre confort.',
      capacite: '2 personnes',
      image: 'https://images.unsplash.com/photo-1686987537277-516791dabf61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHJlbm92YXRpb24lMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzYxODE4MjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gallery: [
        'https://images.unsplash.com/photo-1686987537277-516791dabf61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHJlbm92YXRpb24lMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzYxODE4MjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1578177154072-bbbd429d496f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVtb2RlbGluZyUyMHdvcmt8ZW58MXx8fHwxNzYxODE4MjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1674649207083-281c2517ab49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGNvbnN0cnVjdGlvbiUyMHdvcmtlcnN8ZW58MXx8fHwxNzYxODE4MjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1698889670684-0f4a7aa7cba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMHJlbm92YXRpb24lMjBwcm9ncmVzc3xlbnwxfHx8fDE3NjE4MTgyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1673978484081-18d9ad5df5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwaW5kb29yfGVufDF8fHx8MTc2MTgxODI2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ],
      color: 'from-emerald-500/20 to-teal-600/20',
      accentColor: '#8fb89f',
      hasBalcony: false,
      inConstruction: true,
    },
    {
      nom: 'Le Soum',
      description: 'Un espace intimiste et chaleureux, conçu pour votre confort',
      capacite: '2 personnes',
      image: 'https://i.postimg.cc/SKksq5yk/unnamed.jpg',
      gallery: [
        'https://i.postimg.cc/nVQdbwMg/193423021054318720.jpg',
        'https://i.postimg.cc/yYs0QfRB/image0000001.jpg',
        'https://i.postimg.cc/cH7rfSXr/8498337449415672384.jpg',
        'https://i.postimg.cc/xjtdQg7L/8536361466365823395.jpg',
        'https://i.postimg.cc/SKksq5yk/unnamed.jpg',
        'https://i.postimg.cc/kGkzC0Pf/6106559327515509978.jpg',
        'https://i.postimg.cc/J0BYppBw/4217731294211821747.jpg',
        'https://i.postimg.cc/GpmCX1LM/1187468967096333346.jpg',
        'https://i.postimg.cc/CK13jH7b/3434186147300656811.jpg',
        'https://i.postimg.cc/BQ0RhGNT/3327490492765906103.jpg',
        'https://i.postimg.cc/CL7rmnRw/unnamed-1.jpg',
        'https://i.postimg.cc/4dNCHhPc/5266744024645977021.jpg',
        'https://i.postimg.cc/rpT2cHtK/8971786132493604003.jpg',
      ],
      color: 'from-purple-500/20 to-pink-600/20',
      accentColor: '#b89fc4',
      hasBalcony: true,
      inConstruction: false,
    },
  ],
  contact: {
    telephone: "06 45 79 59 39",
    email: "spanazol@wanadoo.fr",
    adresse: "42 route du Soulor, 65400 Arrens-Marsous, France",
    entreprise: "SARL Les Artigaux",
    siret: "851 041 590 00015",
    description: "N'hésitez pas à nous contacter pour toute question concernant nos gîtes, les tarifs ou pour effectuer une réservation."
  },
  social: {
    instagram: "https://www.instagram.com/les_gites_du_soulor/",
    tiktok: "https://www.tiktok.com/@les_gites_du_soulor",
    instagramHandle: "@les_gites_du_soulor",
    tiktokHandle: "@les_gites_du_soulor"
  },
  hero: {
    titre: "Les Gîtes du Soulor",
    sousTitre: "Votre Refuge d'Exception au Cœur des Pyrénées",
    description: "Découvrez nos 4 gîtes de charme nichés dans les montagnes pyrénéennes. Un havre de paix où tradition et modernité se rencontrent pour vous offrir un séjour inoubliable.",
    badge: "Arrens-Marsous, Hautes-Pyrénées",
    imageMain: "https://i.postimg.cc/BZMLXsYh/2022-10-10.jpg",
    imageSecondaire: "https://i.postimg.cc/Dzpf7yyS/Les-Artigaux-appartements.jpg"
  },
  infoCards: [
    {
      icon: 'Calendar',
      title: 'Culture et Sobriété',
      description: 'Vous découvrirez une ambiance chaleureuse alliant confort moderne et charme authentique, avec des équipements éco-responsables pour un séjour en harmonie avec la nature.',
    },
    {
      icon: 'Home',
      title: 'Au Cœur des Sommets',
      description: 'Situés à proximité des plus belles randonnées des Pyrénées, nos gîtes vous offrent un accès en moins de 30min aux pistes de ski en hiver et aux sentiers de montagne en été.',
    },
    {
      icon: 'Map',
      title: "Un Accueil Respectueux",
      description: "Notre équipe est à votre écoute pour rendre votre séjour inoubliable. Nous vous accompagnons dans la découverte de la région et partageons nos meilleures adresses locales.",
    },
  ],
  wellness: {
    titre: "Espace Bien-Être",
    description: "Après vos journées en montagne, ressourcez-vous dans notre espace bien-être privatif",
    features: [
      {
        title: "Bain Nordique",
        description: "Plongez dans une expérience de détente unique avec notre bain nordique chauffé au feu de bois, face aux sommets enneigés."
      },
      {
        title: "Sauna",
        description: "Profitez de notre sauna traditionnel en bois pour une relaxation profonde et une expérience bien-être authentique en montagne."
      }
    ]
  },
  navigation: [
    { label: 'Accueil', id: 'hero' },
    { label: 'Tarifs', id: 'pricing' },
    { label: 'Nos Gîtes', id: 'gites' },
    { label: 'Bien-être', id: 'wellness' },
    { label: 'Localisation', id: 'location-map' },
    { label: 'Contact', id: 'contact' },
  ],
  texts: {
    siteName: "LES GÎTES DU SOULOR",
    // Info section
    infoSectionTitre: "Quelques informations pour un séjour serein",
    // Règlement
    reglementTitre: "Règlement des Gîtes",
    ageMinTitre: "Âge Minimum",
    ageMinDescription: "Nos gîtes sont inadaptés pour les enfants de moins de 17 ans. Nous vous remercions de votre compréhension.",
    animauxTitre: "Animaux Non Admis",
    animauxDescription: "Les animaux ne sont pas acceptés dans nos gîtes afin de garantir le confort de tous nos visiteurs.",
    // Footer
    footerDescription: "Découvrez nos gîtes d'exception au cœur des Pyrénées. Un havre de paix où tradition et modernité se rencontrent.",
    footerLiensRapides: "Liens Rapides",
    footerContact: "Contact",
    footerSuivez: "Suivez-nous",
    footerMentions: "Mentions Légales",
    footerCopyright: "Tous droits réservés",
    // Contact
    contactTitre: "Contactez-nous",
    contactDescription: "N'hésitez pas à nous contacter pour toute question concernant nos gîtes, les tarifs ou pour effectuer une réservation.",
    contactNom: "Votre nom",
    contactEmail: "Votre email",
    contactTelephone: "Votre téléphone",
    contactAdresse: "Adresse",
    contactMessage: "Votre message",
    contactEnvoyer: "Envoyer",
    // Map
    mapTitre: "Notre Localisation",
    mapDescription: "Situés au cœur des Pyrénées, à Arrens-Marsous",
    mapItineraire: "Obtenir l'itinéraire",
    // Cookie
    cookieTitre: "Cookies & Confidentialité",
    cookieDescription: "Nous utilisons des cookies pour améliorer votre expérience de navigation. En continuant à utiliser notre site, vous acceptez notre utilisation des cookies.",
    cookieAccepter: "Accepter",
    cookieRefuser: "Refuser",
  }
};