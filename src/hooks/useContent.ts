import { useState, useEffect } from 'react';
import { SiteContent, defaultContent } from '../types/content';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function useContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-66cb1054/content`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Erreur lors du chargement du contenu');
        }

        const data = await response.json();
        
        if (data.success) {
          // Fusionner avec le contenu par défaut pour les valeurs manquantes
          const mergedContent = {
            tarifs: data.content.tarifs || defaultContent.tarifs,
            gites: data.content.gites || defaultContent.gites,
            contact: data.content.contact || defaultContent.contact,
            social: data.content.social || defaultContent.social,
            hero: data.content.hero || defaultContent.hero,
            infoCards: data.content.infoCards || defaultContent.infoCards,
            wellness: data.content.wellness || defaultContent.wellness,
            navigation: data.content.navigation || defaultContent.navigation,
            texts: { ...defaultContent.texts, ...data.content.texts },
          };
          
          setContent(mergedContent);
        }
      } catch (err) {
        console.error('Erreur de chargement du contenu:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        // Utiliser le contenu par défaut en cas d'erreur
        setContent(defaultContent);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  const refreshContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-66cb1054/content`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors du chargement du contenu');
      }

      const data = await response.json();
      
      if (data.success) {
        const mergedContent = {
          tarifs: data.content.tarifs || defaultContent.tarifs,
          gites: data.content.gites || defaultContent.gites,
          contact: data.content.contact || defaultContent.contact,
          social: data.content.social || defaultContent.social,
          hero: data.content.hero || defaultContent.hero,
          infoCards: data.content.infoCards || defaultContent.infoCards,
          wellness: data.content.wellness || defaultContent.wellness,
          navigation: data.content.navigation || defaultContent.navigation,
          texts: { ...defaultContent.texts, ...data.content.texts },
        };
        
        setContent(mergedContent);
      }
    } catch (err) {
      console.error('Erreur de rafraîchissement du contenu:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return { content, loading, error, refreshContent };
}
