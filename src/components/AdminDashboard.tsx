import { useState, useEffect } from 'react';
import { Save, LogOut, AlertCircle, CheckCircle, Settings, Home, DollarSign, Mountain, Phone, Share2 } from 'lucide-react';
import { SiteContent, defaultContent } from '../types/content';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'hero' | 'gites' | 'tarifs' | 'contact' | 'social' | 'password';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  
  // Changement de mot de passe
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const password = sessionStorage.getItem('admin_password') || '';

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-66cb1054/content`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setContent({
          tarifs: data.content.tarifs || defaultContent.tarifs,
          gites: data.content.gites || defaultContent.gites,
          contact: data.content.contact || defaultContent.contact,
          social: data.content.social || defaultContent.social,
          hero: data.content.hero || defaultContent.hero,
        });
      }
    } catch (err) {
      console.error('Erreur de chargement:', err);
      showMessage('error', 'Erreur de chargement du contenu');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-66cb1054/admin/content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ password, content }),
        }
      );

      const data = await response.json();

      if (data.success) {
        showMessage('success', '✅ Contenu sauvegardé avec succès !');
      } else {
        showMessage('error', data.message || 'Erreur lors de la sauvegarde');
      }
    } catch (err) {
      console.error('Erreur de sauvegarde:', err);
      showMessage('error', 'Erreur de connexion au serveur');
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      showMessage('error', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 12) {
      showMessage('error', 'Le mot de passe doit contenir au moins 12 caractères');
      return;
    }

    // Validation de la complexité du mot de passe
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      showMessage('error', 'Le mot de passe doit contenir : majuscules, minuscules, chiffres et caractères spéciaux');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-66cb1054/admin/change-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (data.success) {
        showMessage('success', 'Mot de passe modifié avec succès !');
        sessionStorage.setItem('admin_password', newPassword);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showMessage('error', data.message);
      }
    } catch (err) {
      console.error('Erreur:', err);
      showMessage('error', 'Erreur de connexion');
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#3a4a5a] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero' as TabType, label: 'Accueil', icon: Home },
    { id: 'gites' as TabType, label: 'Gîtes', icon: Mountain },
    { id: 'tarifs' as TabType, label: 'Tarifs', icon: DollarSign },
    { id: 'contact' as TabType, label: 'Contact', icon: Phone },
    { id: 'social' as TabType, label: 'Réseaux', icon: Share2 },
    { id: 'password' as TabType, label: 'Sécurité', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#3a4a5a]">
      {/* Header */}
      <header className="bg-[#2a3a4a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white">Administration</h1>
            <p className="text-white/70 text-sm">Les Gîtes du Soulor</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={saveContent}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-[#c4a574] hover:bg-[#b89564] text-[#3a4a5a] rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Message de notification */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div
            className={`flex items-center gap-3 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-500/20 border border-green-500/50 text-green-200'
                : 'bg-red-500/20 border border-red-500/50 text-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {message.text}
          </div>
        </div>
      )}

      {/* Navigation par onglets */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#c4a574] text-[#3a4a5a]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          {activeTab === 'hero' && (
            <HeroEditor content={content} setContent={setContent} />
          )}
          {activeTab === 'gites' && (
            <GitesEditor content={content} setContent={setContent} />
          )}
          {activeTab === 'tarifs' && (
            <TarifsEditor content={content} setContent={setContent} />
          )}
          {activeTab === 'contact' && (
            <ContactEditor content={content} setContent={setContent} />
          )}
          {activeTab === 'social' && (
            <SocialEditor content={content} setContent={setContent} />
          )}
          {activeTab === 'password' && (
            <PasswordEditor
              oldPassword={oldPassword}
              setOldPassword={setOldPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              onSave={changePassword}
              saving={saving}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Composants éditeurs pour chaque section
function HeroEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-white mb-4">Section d'accueil</h2>
      
      <div>
        <label className="block text-white/90 mb-2">Titre principal</label>
        <input
          type="text"
          value={content.hero.titre}
          onChange={(e) => setContent({ ...content, hero: { ...content.hero, titre: e.target.value } })}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2">Sous-titre</label>
        <input
          type="text"
          value={content.hero.sousTitre}
          onChange={(e) => setContent({ ...content, hero: { ...content.hero, sousTitre: e.target.value } })}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2">Description</label>
        <textarea
          value={content.hero.description}
          onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
          rows={4}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2">Badge localisation</label>
        <input
          type="text"
          value={content.hero.badge}
          onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>
    </div>
  );
}

function GitesEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-white mb-4">Gestion des gîtes</h2>
      
      {content.gites.map((gite, index) => (
        <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-[#c4a574] mb-4">{gite.nom}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/90 mb-2 text-sm">Description</label>
              <textarea
                value={gite.description}
                onChange={(e) => {
                  const newGites = [...content.gites];
                  newGites[index] = { ...gite, description: e.target.value };
                  setContent({ ...content, gites: newGites });
                }}
                rows={3}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/90 mb-2 text-sm">Capacité</label>
                <input
                  type="text"
                  value={gite.capacite}
                  onChange={(e) => {
                    const newGites = [...content.gites];
                    newGites[index] = { ...gite, capacite: e.target.value };
                    setContent({ ...content, gites: newGites });
                  }}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
                />
              </div>

              <div>
                <label className="block text-white/90 mb-2 text-sm">Superficie</label>
                <input
                  type="text"
                  value={gite.superficie}
                  onChange={(e) => {
                    const newGites = [...content.gites];
                    newGites[index] = { ...gite, superficie: e.target.value };
                    setContent({ ...content, gites: newGites });
                  }}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <p className="text-white/50 text-sm">
        💡 Les équipements des gîtes ne sont pas modifiables ici pour préserver la cohérence du design
      </p>
    </div>
  );
}

function TarifsEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-white mb-4">Gestion des tarifs</h2>
      
      {content.tarifs.map((tarif, index) => (
        <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-[#c4a574] mb-4">{tarif.saison}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 mb-2 text-sm">Période</label>
              <input
                type="text"
                value={tarif.periode}
                onChange={(e) => {
                  const newTarifs = [...content.tarifs];
                  newTarifs[index] = { ...tarif, periode: e.target.value };
                  setContent({ ...content, tarifs: newTarifs });
                }}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 text-sm">Prix par nuit (€)</label>
              <input
                type="number"
                value={tarif.prixNuit}
                onChange={(e) => {
                  const newTarifs = [...content.tarifs];
                  newTarifs[index] = { ...tarif, prixNuit: Number(e.target.value) };
                  setContent({ ...content, tarifs: newTarifs });
                }}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 text-sm">Prix par semaine (€)</label>
              <input
                type="number"
                value={tarif.prixSemaine}
                onChange={(e) => {
                  const newTarifs = [...content.tarifs];
                  newTarifs[index] = { ...tarif, prixSemaine: Number(e.target.value) };
                  setContent({ ...content, tarifs: newTarifs });
                }}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/90 mb-2 text-sm">Description</label>
              <input
                type="text"
                value={tarif.description}
                onChange={(e) => {
                  const newTarifs = [...content.tarifs];
                  newTarifs[index] = { ...tarif, description: e.target.value };
                  setContent({ ...content, tarifs: newTarifs });
                }}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-white mb-4">Informations de contact</h2>
      
      <div>
        <label className="block text-white/90 mb-2">Téléphone</label>
        <input
          type="tel"
          value={content.contact.telephone}
          onChange={(e) => setContent({ ...content, contact: { ...content.contact, telephone: e.target.value } })}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2">Email</label>
        <input
          type="email"
          value={content.contact.email}
          onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2">Adresse</label>
        <input
          type="text"
          value={content.contact.adresse}
          onChange={(e) => setContent({ ...content, contact: { ...content.contact, adresse: e.target.value } })}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <p className="text-white/90 mb-2">Entreprise : {content.contact.entreprise}</p>
        <p className="text-white/70 text-sm">SIRET : {content.contact.siret}</p>
        <p className="text-white/50 text-xs mt-2">Les informations légales ne sont pas modifiables</p>
      </div>
    </div>
  );
}

function SocialEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-white mb-4">Réseaux sociaux</h2>
      
      <div>
        <label className="block text-white/90 mb-2">Instagram</label>
        <input
          type="url"
          value={content.social.instagram}
          onChange={(e) => setContent({ ...content, social: { ...content.social, instagram: e.target.value } })}
          placeholder="https://www.instagram.com/votre_compte"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2">TikTok</label>
        <input
          type="url"
          value={content.social.tiktok}
          onChange={(e) => setContent({ ...content, social: { ...content.social, tiktok: e.target.value } })}
          placeholder="https://www.tiktok.com/@votre_compte"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
        <p className="text-blue-200 text-sm">
          💡 Assurez-vous que les liens commencent par https://
        </p>
      </div>
    </div>
  );
}

function PasswordEditor({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onSave,
  saving,
}: {
  oldPassword: string;
  setOldPassword: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-white mb-4">Changer le mot de passe</h2>
      
      <div>
        <label className="block text-white/90 mb-2">Ancien mot de passe</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2">Nouveau mot de passe</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <div>
        <label className="block text-white/90 mb-2">Confirmer le nouveau mot de passe</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c4a574]"
        />
      </div>

      <button
        onClick={onSave}
        disabled={saving || !oldPassword || !newPassword || !confirmPassword}
        className="w-full py-3 bg-[#c4a574] hover:bg-[#b89564] disabled:bg-[#c4a574]/50 text-[#3a4a5a] rounded-lg transition-colors"
      >
        {saving ? 'Modification...' : 'Changer le mot de passe'}
      </button>

      <div className="space-y-3">
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
          <p className="text-yellow-200 text-sm">
            ⚠️ Conservez votre nouveau mot de passe en lieu sûr. Vous en aurez besoin pour accéder à cette interface.
          </p>
        </div>
        
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
          <p className="text-blue-200 text-sm mb-2">
            ✅ <strong>Mot de passe fort requis :</strong>
          </p>
          <ul className="text-blue-200 text-xs space-y-1 ml-4">
            <li>• Minimum 12 caractères</li>
            <li>• Au moins une majuscule</li>
            <li>• Au moins une minuscule</li>
            <li>• Au moins un chiffre</li>
            <li>• Au moins un caractère spécial (!@#$%...)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
