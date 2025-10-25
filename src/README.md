# 🏔️ Les Gîtes du Soulor - Système de Réservation

Application de réservation en ligne pour les gîtes dans les Hautes-Pyrénées.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

---

## ✨ Fonctionnalités

- 📅 **Calendrier interactif** avec périodes de tarification saisonnière
- 🎨 **Design élégant** avec thème sombre et typographie Playfair Display
- 📱 **100% Responsive** - Fonctionne sur mobile, tablette et desktop
- 🚫 **Blocage automatique** des dates réservées
- ⚡ **Simple et rapide** - Pas de configuration compliquée

---

## 🚀 Déploiement sur Netlify

### Méthode rapide

1. **Connectez votre repository GitHub à Netlify**
2. **Configuration de build** :
   - Build command : `npm run build`
   - Publish directory : `dist`
3. **Déployez** !

Pour plus de détails, consultez **[DEPLOIEMENT_NETLIFY.md](./DEPLOIEMENT_NETLIFY.md)**

---

## 💻 Développement local

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Builder pour la production
npm run build
```

---

## 📊 Tarification

### Weekend (Vendredi 16h → Dimanche 11h)
- Basse saison : 400€
- Moyenne saison : 425€
- Haute saison : 450€

### Semaine (Dimanche 16h → Vendredi 11h)
- Basse saison : 150€/nuit
- Moyenne saison : 165€/nuit
- Haute saison : 180€/nuit

### Semaine complète
- Basse saison : 1150€
- Moyenne saison : 1250€
- Haute saison : 1350€

---

## 🎯 Architecture

Application **front-end only** utilisant :
- ⚛️ **React** + **TypeScript**
- 🎨 **Tailwind CSS v4**
- 📦 **localStorage** pour le stockage des réservations
- 🗓️ **date-fns** pour la gestion des dates

---

## 📝 Note importante

Les réservations sont stockées **localement dans le navigateur** de chaque utilisateur. C'est parfait pour un prototype ou un usage personnel, mais pour un site public, vous aurez besoin d'un backend centralisé.

---

## 📞 Contact

Pour toute question : **spanazol@wanadoo.fr**

---

## 📄 Licence

Tous droits réservés - Les Gîtes du Soulor © 2025
