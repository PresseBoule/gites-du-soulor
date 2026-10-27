# Assistant web : architecture, vérifications et déploiement

État de la préparation : 27 octobre 2026. Aucune modification de production effectuée.

## Dépôts et architecture vérifiés

- Site vitrine : https://github.com/PresseBoule/les-gites-du-soulor, base 1651e4e7e2fb5acbf6e822e31fe3f73c2a5056dc.
- Widget : `src/components/AgentWidget.tsx`, conversations publiques sur `make-server-497309b8/agent/chat`.
- Réservations et agent : ce dépôt, base 51ebaab78574a89a056d16ec1ee466c5c0921394.
- Le widget et le calendrier utilisent le même projet Supabase `mdmwkojncfnqlxdxrxqo`.
- Réservations du site : table `kv_store_497309b8`, clés `booking:{gite}:*`. Les statuts pending, accepted et les anciens statuts absents bloquent les nuits. Les statuts rejected/cancelled ne bloquent pas.
- Source externe : export ICS Airbnb configuré par les secrets `AIRBNB_ICAL_SOUM`, `AIRBNB_ICAL_TECH`, `AIRBNB_ICAL_SUYEN`, `AIRBNB_ICAL_ESTAING`.
- API Hono sous Deno ; UI React/Vite ; site et calendrier publiés séparément sur Netlify. Les deux copies serveur du dépôt restent identiques par test.

Lecture seule de l’API en ligne le 27 octobre 2026 : santé HTTP 200 et les quatre calendriers HTTP 200, avec les sources site ET airbnb. Nombres de plages bloquantes reçues : Soum 41, Tech 23, Suyen 37, Estaing 27. Aucune coordonnée client affichée ou enregistrée. Cela confirme le fonctionnement de la fusion en ligne à cet instant ; cela ne valide pas encore le nouveau parseur contre les flux ICS bruts privés.

## Comportement proposé

Les neuf périodes fournies pour le 18/12/2026 au 01/09/2027 étaient déjà sur main. Elles sont maintenant partagées entre le serveur et l’interface. Bornes : arrivée incluse, départ exclu. Aucune saison par défaut pour une date non renseignée.

Règle confirmée par le propriétaire dans cette conversation : chaque nuit suit sa propre saison. Pour un séjour d’au moins deux nuits, le tarif nocturne dégressif existant s’applique à chaque nuit ; pour une nuit seule, le tarif singleNight existant s’applique. Les tarifs hebdomadaires existants sont exactement sept fois le tarif nocturne dégressif. L’ancien supplément artificiel sur la huitième nuit disparaît.

Exemples : du 05/02/2027 au 07/02/2027 = 125 + 150 = 275 € ; du 02/05 au 06/05/2027 = 140 + 125 + 125 + 140 = 530 €. Huit nuits basse saison = 1 000 €.

Une nuit sans tarif configuré donne un tarif à confirmer, mais n’empêche pas la vérification de disponibilité. Aucune nouvelle période n’est inventée après le 01/09/2027 ni dans les trous du calendrier antérieur.

À chaque demande : lecture des réservations Supabase avec contrôle du nombre exact de résultats, lecture ICS sans cache applicatif, validation des dates et des statuts, puis contrôle des chevauchements. Une erreur, une source absente ou une réponse tronquée donne un état inconnu (`available: null`), jamais une disponibilité positive.

Le parseur accepte les événements Airbnb sur des dates entières, les lignes repliées et CRLF. Les événements annulés sont ignorés. Un format horaire non pris en charge, un événement incomplet, une date impossible ou une récurrence provoque un refus explicite de conclure. Les réservations anciennes en horodatage UTC sont interprétées en Europe/Paris.

Le modèle extrait uniquement une intention, les gîtes et les dates via un appel d’outil imposé. Les réponses finales proviennent de modèles de texte contrôlés côté serveur ; les disponibilités et prix ne sont pas rédigés librement par le modèle. Les questions générales utilisent uniquement les rubriques officielles déjà présentes ; les autres points sont renvoyés au gérant. L’historique des réponses assistant n’est pas utilisé comme preuve. Sans gîte précis, les quatre sont vérifiés ; une année absente doit être demandée, avec un contrôle supplémentaire côté serveur contre une année absente des messages utilisateur. L’interprétation exacte des dates en langage naturel reste à valider avec le modèle réel.

La réponse montre les dates vérifiées et, pour une disponibilité positive, l’heure de vérification. Elle rappelle qu’un flux ICS peut refléter un délai de synchronisation Airbnb. Une consultation en direct du flux ne garantit pas un verrou de réservation et ne confirme pas de réservation.

Référence du contrat d’appel d’outil : https://developers.openai.com/api/docs/guides/function-calling (schéma strict et appel forcé).

## Vérifications locales

- `npm test` : 19 scénarios, calendriers et modèle simulés, exécutant les fonctions de production et le gestionnaire HTTP quote.
- Tests des neuf périodes, tarifs mixtes, huit nuits, dates invalides/passées, changement d’heure, conflits, statuts, quatre gîtes, erreurs Supabase/ICS, absence de source, données tronquées, absence de tarif et refus d’une réponse du modèle sans outil.
- Test de cohérence des copies serveur et du calcul partagé avec l’UI.
- `npm run build` : compilation du calendrier React/Vite.
- `npx --yes deno check --node-modules-dir=none --no-lock supabase/functions/server/index.tsx` : vérification des imports et types du serveur.

Les dépendances ont été installées avec les scripts d’installation désactivés. Le dépôt ne disposait d’aucun lockfile à la base. Aucun appel payant au modèle réel ni changement des calendriers, réservations ou secrets de production effectué.

## Validation avant production — reste à faire

1. Confirmer l’accès de déploiement au projet Supabase et à Netlify. Le compte GitHub connecté a le droit admin sur le dépôt ; ce droit ne prouve pas l’autorisation Supabase/Netlify. Ne pas fusionner ou déployer avant accord du propriétaire.
2. Préparer un projet Supabase de test isolé, avec les variables SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY de CE projet de test. Ne jamais donner de droits d’écriture sur la base de production à cet environnement.
3. Configurer les quatre secrets ICS dans l’environnement de test via les réglages sécurisés Supabase, sans les mettre dans Git. Le mode `CALENDAR_SOURCE_{GITE}=site_only` est réservé à un gîte réellement sans calendrier externe après confirmation explicite. Les quatre gîtes actuels ont une source Airbnb observée ; ne pas activer ce mode pour contourner une panne.
4. Configurer OPENAI_API_KEY et le modèle autorisé existant via Supabase Secrets. Aucun secret n’est requis côté navigateur au-delà de la clé publique habituelle.
5. Déployer uniquement dans le projet de test, sous le nom `make-server-497309b8`, dont le point d’entrée est fourni. Vérifier les quatre ICS réels, comparer des dates occupées du site et d’Airbnb avec les calendriers du gérant, et simuler une panne. Ne pas exporter de données personnelles de production pour les tests.
6. Tester le widget contre la fonction de test avec les formulations réelles : dates avec année, année manquante, dates sur plusieurs messages, changement de gîte, deux saisons, période non tarifée, injection de fausses disponibilités dans l’historique. Vérifier aussi qu’une demande refusée n’est jamais annoncée disponible.
7. Vérifier que le tarif affiché par le calendrier et le serveur est identique sur des séjours mixtes, puis obtenir l’accord final avant fusion ou déploiement de production. GitHub et Netlify peuvent être reliés par un déploiement automatique : conserver la proposition en brouillon jusque-là.

Après accord : déployer la fonction Supabase au même nom et compiler/publier l’UI du calendrier, puisque la règle de tarif nuit par nuit touche les deux. Le widget du site vitrine conserve son API actuelle. Prévoir le retour au commit de base et à la version précédente de la fonction en cas de problème.

## Audit du déploiement actif et diagnostic séparé — 27 octobre 2026

Le code réellement déployé a été exporté en lecture seule depuis Supabase et conservé localement dans `soulor-deployed-audit/` (hors dépôt). Son `index.tsx` a pour SHA256 `EBD5F1C2C515D49D61BF1A272B6F19743760F19910F2C249C367E1D7C388BD63`.

Constat confirmé : la fonction active ne contient aucune période 2027 et son outil s’arrête avant de lire les calendriers quand le tarif n’est pas configuré. Cela explique la réponse actuelle pour janvier 2027. Les quatre noms AIRBNB_ICAL_* et OPENAI_API_KEY sont présents dans Supabase Secrets ; aucune valeur secrète n’a été révélée ou modifiée.

Un diagnostic distinct, `soulor-availability-preview`, est préparé localement. Il réutilise les fonctions de disponibilité testées et les secrets ICS existants, mais n’expose que GET /health et POST /quote, avec l’authentification publique/serveur existante. Il ne comporte aucun appel au modèle, envoi d’e-mail, écriture ou suppression de réservation. La fonction active et le widget restent inchangés. L’installation de ce diagnostic dans le projet actif nécessite l’accord du propriétaire ; aucune installation effectuée à ce stade.

Le test supplémentaire vérifie que ses fonctions sont exactement celles du code revu, sans route d’écriture ou de modèle : 20 tests réussis au total. Le point d’entrée diagnostic passe aussi `deno check`. Le générateur est `scripts/generate-availability-preview.mjs` ; sa sortie est versionnée pour revue.

Après accord et installation du diagnostic, comparer les quatre gîtes sur des dates occupées/libres avec la source existante, vérifier les tarifs mixtes et les périodes non tarifées. Ce diagnostic valide les sources réelles et les calculs ; il ne constitue pas encore un test du nouveau dialogue avec le modèle réel. Ne pas le présenter comme une validation complète de l’assistant ni fusionner la PR sur cette seule base.
