# Backend - Les Gîtes du Soulor

Cette fonction Edge s'appelle `server` en local mais doit être déployée sous le nom `make-server-09db1ac7`.

## 🚀 Déploiement via CLI

### Option 1 : Renommer temporairement (recommandé)

```bash
# Depuis la racine du projet
cd supabase/functions
mv server make-server-09db1ac7
supabase functions deploy make-server-09db1ac7
mv make-server-09db1ac7 server
```

### Option 2 : Script de déploiement

Ajoutez dans `package.json` :
```json
"scripts": {
  "deploy:backend": "cd supabase/functions && mv server make-server-09db1ac7 && supabase functions deploy make-server-09db1ac7 && mv make-server-09db1ac7 server"
}
```

Puis :
```bash
npm run deploy:backend
```

## 📁 Structure

- `index.tsx` - Point d'entrée (routes)
- `reservations.tsx` - Logique des réservations
- `email.tsx` - Envoi d'emails via Resend
- `pricing.tsx` - Calcul des tarifs saisonniers
- `kv_store.tsx` - Accès à la base de données
- `deno.json` - Configuration Deno

## 🔑 Secrets requis

- `RESEND_API_KEY` - Clé API Resend pour les emails
- `SUPABASE_URL` - Auto-configuré
- `SUPABASE_SERVICE_ROLE_KEY` - Auto-configuré

## 📖 Plus d'infos

Voir `/DEPLOIEMENT_CLI.md` pour le guide complet.
