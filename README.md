
  # Calendrier de réservation gîte

  This is a code bundle for Calendrier de réservation gîte. The original project is available at https://www.figma.com/design/U8FAFTvImFsWFhwBPFd9jz/Calendrier-de-r%C3%A9servation-g%C3%AEte.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Réservations et agent

  L'API publique des disponibilités ne renvoie que le gîte, les dates et le statut bloquant. Les coordonnées clients sont accessibles uniquement via les routes `/admin/*` protégées par l'en-tête `x-admin-token`.

  Variables à configurer dans les secrets de la fonction Supabase :

  - `RESEND_API_KEY` : envoi des notifications de demande ;
  - `ADMIN_API_TOKEN` : secret long et aléatoire pour le futur tableau de gestion et l'agent.
  - `ICAL_FEED_TOKEN` : secret placé dans les quatre URL de calendrier à importer dans Airbnb ;
  - `AIRBNB_ICAL_SOUM`, `AIRBNB_ICAL_TECH`, `AIRBNB_ICAL_SUYEN`, `AIRBNB_ICAL_ESTAING` : URL iCal exportée par chaque annonce Airbnb.
  - `OPENAI_API_KEY` : clé API utilisée uniquement côté serveur pour générer les brouillons ;
  - `OPENAI_MODEL` : modèle de rédaction, `gpt-5.6-luna` par défaut.

  Les nouvelles demandes sont enregistrées avec le statut `pending`. Les anciennes entrées sans statut restent considérées comme acceptées afin de ne libérer aucune date existante.

  L'endpoint `POST /make-server-497309b8/quote` vérifie la disponibilité et calcule le tarif côté serveur. Les tarifs ne doivent jamais être fournis ou décidés par un agent IA.

  Le flux à importer dans Airbnb suit la forme `/make-server-497309b8/calendar/{gite}/{ICAL_FEED_TOKEN}.ics`. Il ne contient aucune donnée personnelle.

  L'endpoint protégé `POST /make-server-497309b8/admin/agent/draft` prépare une réponse e-mail ou SMS. Il ne l'envoie jamais automatiquement. L'agent dispose d'un seul outil : la vérification déterministe des disponibilités et du tarif.
