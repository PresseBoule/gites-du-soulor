# 🚀 Déploiement sur Netlify - Les Gîtes du Soulor

Guide simple pour déployer votre application de réservation sur Netlify.

---

## ✅ Prérequis

- Un compte GitHub
- Un compte Netlify (gratuit sur https://netlify.com)
- Votre code sur GitHub

---

## 📤 Étape 1 : Mettre le code sur GitHub

### Si ce n'est pas déjà fait :

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Application de réservation Les Gîtes du Soulor"

# Créer un repository sur GitHub, puis :
git remote add origin https://github.com/VOTRE_NOM/gites-soulor.git
git branch -M main
git push -u origin main
```

---

## 🌐 Étape 2 : Déployer sur Netlify

### Option A : Via l'interface Netlify (recommandé)

1. Allez sur https://app.netlify.com
2. Cliquez sur **"Add new site"** → **"Import an existing project"**
3. Choisissez **GitHub**
4. Sélectionnez votre repository **gites-soulor**
5. Configurez le build :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
   - **Node version** : 18 (déjà configuré dans `.nvmrc`)
6. Cliquez sur **"Deploy site"**

### Option B : Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod
```

---

## ⚙️ Configuration (optionnelle)

### Personnaliser le nom du site

1. Dans Netlify Dashboard → **Site settings**
2. **Site details** → **Change site name**
3. Choisissez par exemple : `gites-du-soulor`
4. Votre site sera accessible sur : `https://gites-du-soulor.netlify.app`

### Ajouter un nom de domaine personnalisé

1. **Domain settings** → **Add custom domain**
2. Suivez les instructions pour configurer votre DNS

---

## 🔄 Mises à jour automatiques

Une fois connecté à GitHub, **chaque fois que vous faites un `git push`**, Netlify redéploie automatiquement votre site !

```bash
# Faire des modifications
# ...

# Commit et push
git add .
git commit -m "Amélioration du calendrier"
git push

# Netlify redéploie automatiquement ! ✨
```

---

## ✅ Vérifier que tout fonctionne

Après le déploiement :

1. Ouvrez votre site : `https://votre-site.netlify.app`
2. Testez une réservation :
   - Sélectionnez des dates
   - Remplissez le formulaire
   - Validez
3. Les dates devraient être bloquées dans le calendrier

---

## 🐛 Problèmes courants

### ❌ Erreur de build : "Cannot find module"

**Solution** : Vérifiez que toutes les dépendances sont dans `package.json`

```bash
npm install
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push
```

### ❌ Page blanche après déploiement

**Solution** : Vérifiez les logs de build dans Netlify Dashboard → **Deploys** → Cliquez sur le déploiement → **Deploy log**

### ❌ Les réservations disparaissent

C'est **normal** ! Les réservations sont stockées dans le navigateur (localStorage). Chaque visiteur a ses propres données.

Pour un stockage partagé, il faudrait un backend (ce que nous avons enlevé pour simplifier).

---

## 📊 Voir les réservations

Les réservations sont stockées localement dans le navigateur. Pour les voir :

1. Ouvrez la console (F12)
2. Tapez : `JSON.parse(localStorage.getItem('gites-soulor-reservations'))`

---

## 🆘 Support

- **Documentation Netlify** : https://docs.netlify.com
- **Contact** : spanazol@wanadoo.fr

---

## 🎉 C'est tout !

Votre application est maintenant en ligne et accessible 24/7 !
