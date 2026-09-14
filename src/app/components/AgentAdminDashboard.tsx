import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Clock3,
  Copy,
  History,
  KeyRound,
  Loader2,
  Mail,
  MessageSquareText,
  Pencil,
  RefreshCw,
  Save,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

type Channel = 'email' | 'sms';
type DraftStatus = 'draft' | 'approved' | 'rejected';

type DraftRecord = {
  id: string;
  channel: Channel;
  customerMessage: string;
  draft: string;
  recipient: string;
  subject: string;
  status: DraftStatus;
  createdAt: string;
  updatedAt: string;
  history: Array<{ action: string; at: string }>;
};

type Integrations = {
  orange: { incoming: boolean; outgoing: boolean; mode: 'draft_only' };
  sms: { outgoing: boolean; mode: 'draft_only' };
};

const API_ROOT = `https://${projectId}.supabase.co/functions/v1/make-server-497309b8`;

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

function statusLabel(status: DraftStatus) {
  if (status === 'approved') return 'Approuvé';
  if (status === 'rejected') return 'Refusé';
  return 'À valider';
}

function statusClasses(status: DraftStatus) {
  if (status === 'approved') return 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200';
  if (status === 'rejected') return 'border-red-400/40 bg-red-400/10 text-red-200';
  return 'border-amber-300/40 bg-amber-300/10 text-amber-100';
}

interface AgentAdminDashboardProps {
  onBack: () => void;
}

export function AgentAdminDashboard({ onBack }: AgentAdminDashboardProps) {
  const [token, setToken] = useState(() => sessionStorage.getItem('soulor-admin-token') || '');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [drafts, setDrafts] = useState<DraftRecord[]>([]);
  const [integrations, setIntegrations] = useState<Integrations | null>(null);
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState<Channel>('email');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [filter, setFilter] = useState<'all' | DraftStatus>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');

  const filteredDrafts = useMemo(
    () => (filter === 'all' ? drafts : drafts.filter((draft) => draft.status === filter)),
    [drafts, filter],
  );

  async function adminFetch(path: string, init?: RequestInit, suppliedToken = token) {
    const response = await fetch(`${API_ROOT}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
        'x-admin-token': suppliedToken,
        ...(init?.headers || {}),
      },
    });
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || 'Une erreur est survenue');
    return data;
  }

  async function loadDashboard(suppliedToken = token) {
    setLoading(true);
    try {
      const [draftData, integrationData] = await Promise.all([
        adminFetch('/admin/agent/drafts', undefined, suppliedToken),
        adminFetch('/admin/agent/integrations', undefined, suppliedToken),
      ]);
      setDrafts(draftData.drafts || []);
      setIntegrations(integrationData.integrations);
      setAuthenticated(true);
      sessionStorage.setItem('soulor-admin-token', suppliedToken);
    } catch (error) {
      setAuthenticated(false);
      sessionStorage.removeItem('soulor-admin-token');
      toast.error(error instanceof Error ? error.message : 'Accès refusé');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) void loadDashboard(token);
    // La reconnexion automatique ne doit s'exécuter qu'au chargement de l'écran.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createDraft() {
    if (!message.trim()) return toast.error('Colle d’abord le message du client.');
    setCreating(true);
    try {
      const data = await adminFetch('/admin/agent/draft', {
        method: 'POST',
        body: JSON.stringify({ message, channel, recipient, subject }),
      });
      setDrafts((current) => [data.draft, ...current]);
      setMessage('');
      setRecipient('');
      setSubject('');
      toast.success('Brouillon créé. Il doit encore être relu.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Impossible de créer le brouillon');
    } finally {
      setCreating(false);
    }
  }

  async function updateDraft(id: string, changes: Partial<Pick<DraftRecord, 'draft' | 'status'>>) {
    try {
      const data = await adminFetch(`/admin/agent/drafts/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
      });
      setDrafts((current) => current.map((item) => (item.id === id ? data.draft : item)));
      setEditingId(null);
      toast.success(
        changes.status === 'approved'
          ? 'Brouillon approuvé, mais pas envoyé.'
          : changes.status === 'rejected'
            ? 'Brouillon refusé.'
            : 'Modification enregistrée.',
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Mise à jour impossible');
    }
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#263746] via-[#3d4f5c] to-[#263746] px-4 py-10 text-[#e8e8e8]">
        <div className="mx-auto max-w-lg">
          <button onClick={onBack} className="mb-8 flex items-center gap-2 text-sm text-[#c9a77c] hover:text-white">
            <ArrowLeft size={18} /> Retour au calendrier
          </button>
          <section className="rounded-2xl border border-[#c9a77c]/30 bg-[#20313f]/90 p-7 shadow-2xl">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a77c]/15 text-[#c9a77c]">
              <KeyRound size={24} />
            </div>
            <h1 className="text-2xl font-light text-[#c9a77c]">Gestion de l’agent</h1>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Saisis le jeton administrateur Supabase. Il reste uniquement dans cet onglet et n’est jamais enregistré dans le site.
            </p>
            <label className="mt-6 block text-sm text-[#c9a77c]" htmlFor="admin-token">Jeton administrateur</label>
            <input
              id="admin-token"
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && token && void loadDashboard(token)}
              className="mt-2 w-full rounded-lg border border-[#c9a77c]/35 bg-[#172633] px-4 py-3 outline-none focus:border-[#c9a77c]"
              autoComplete="off"
            />
            <button
              onClick={() => void loadDashboard(token)}
              disabled={!token || loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#c9a77c] px-4 py-3 font-medium text-[#20313f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              Ouvrir le tableau de gestion
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#263746] px-4 py-8 text-[#e8e8e8]">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <button onClick={onBack} className="mb-3 flex items-center gap-2 text-sm text-[#c9a77c] hover:text-white">
              <ArrowLeft size={17} /> Retour au calendrier
            </button>
            <h1 className="text-3xl font-light text-[#c9a77c]">Agent — Gîtes du Soulor</h1>
            <p className="mt-1 text-sm text-slate-300">Les validations sont enregistrées. Aucun message n’est envoyé automatiquement.</p>
          </div>
          <button onClick={() => void loadDashboard()} className="flex items-center gap-2 rounded-lg border border-[#c9a77c]/30 px-4 py-2 text-sm text-[#c9a77c] hover:bg-white/5">
            <RefreshCw size={16} /> Actualiser
          </button>
        </header>

        <section className="mb-6 grid gap-3 sm:grid-cols-3">
          <StatusCard label="Réception Orange" ready={Boolean(integrations?.orange.incoming)} detail="Lecture des e-mails" />
          <StatusCard label="Envoi Orange" ready={Boolean(integrations?.orange.outgoing)} detail="Mode brouillon uniquement" />
          <StatusCard label="Envoi SMS" ready={Boolean(integrations?.sms.outgoing)} detail="Mode brouillon uniquement" />
        </section>

        <section className="mb-8 rounded-2xl border border-[#c9a77c]/25 bg-[#20313f] p-5 shadow-xl md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <MessageSquareText className="text-[#c9a77c]" size={22} />
            <div>
              <h2 className="text-xl text-[#c9a77c]">Nouveau message client</h2>
              <p className="text-sm text-slate-400">En attendant Orange, colle ici l’e-mail ou le SMS reçu.</p>
            </div>
          </div>
          <div className="mb-4 flex gap-2">
            {(['email', 'sms'] as Channel[]).map((item) => (
              <button
                key={item}
                onClick={() => setChannel(item)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${channel === item ? 'border-[#c9a77c] bg-[#c9a77c]/15 text-[#c9a77c]' : 'border-white/10 text-slate-300'}`}
              >
                {item === 'email' ? <Mail size={16} /> : <Smartphone size={16} />}
                {item === 'email' ? 'E-mail' : 'SMS'}
              </button>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder={channel === 'email' ? 'Adresse du client (facultatif)' : 'Numéro du client (facultatif)'} className="rounded-lg border border-white/10 bg-[#172633] px-4 py-3 outline-none focus:border-[#c9a77c]" />
            {channel === 'email' && <input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Objet de l’e-mail (facultatif)" className="rounded-lg border border-white/10 bg-[#172633] px-4 py-3 outline-none focus:border-[#c9a77c]" />}
          </div>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Colle le message complet du client…" rows={6} className="mt-4 w-full resize-y rounded-lg border border-white/10 bg-[#172633] px-4 py-3 outline-none focus:border-[#c9a77c]" />
          <button onClick={() => void createDraft()} disabled={creating || !message.trim()} className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#c9a77c] px-5 py-3 font-medium text-[#20313f] disabled:cursor-not-allowed disabled:opacity-50">
            {creating ? <Loader2 className="animate-spin" size={18} /> : <Pencil size={18} />}
            Préparer le brouillon
          </button>
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <History className="text-[#c9a77c]" size={22} />
              <h2 className="text-xl text-[#c9a77c]">Historique des brouillons</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'draft', 'approved', 'rejected'] as const).map((item) => (
                <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-3 py-1.5 text-xs ${filter === item ? 'bg-[#c9a77c] text-[#20313f]' : 'bg-white/5 text-slate-300'}`}>
                  {item === 'all' ? 'Tous' : statusLabel(item)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredDrafts.length === 0 && <div className="rounded-xl border border-dashed border-white/15 p-10 text-center text-slate-400">Aucun brouillon dans cette catégorie.</div>}
            {filteredDrafts.map((item) => (
              <article key={item.id} className="rounded-2xl border border-white/10 bg-[#20313f] p-5 shadow-lg md:p-6">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/5 p-2 text-[#c9a77c]">{item.channel === 'email' ? <Mail size={18} /> : <Smartphone size={18} />}</div>
                    <div>
                      <p className="text-sm text-slate-200">{item.recipient || 'Destinataire non renseigné'}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-500"><Clock3 size={12} /> {formatDate(item.createdAt)}</p>
                    </div>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs ${statusClasses(item.status)}`}>{statusLabel(item.status)}</span>
                </div>

                {item.subject && <p className="mb-3 text-sm text-[#c9a77c]">Objet : {item.subject}</p>}
                <details className="mb-4 rounded-lg bg-[#172633]/70 p-4">
                  <summary className="cursor-pointer text-sm text-slate-300">Message reçu</summary>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-400">{item.customerMessage}</p>
                </details>

                {editingId === item.id ? (
                  <textarea value={editedText} onChange={(event) => setEditedText(event.target.value)} rows={7} className="w-full resize-y rounded-lg border border-[#c9a77c]/40 bg-[#172633] px-4 py-3 leading-6 outline-none focus:border-[#c9a77c]" />
                ) : (
                  <div className="whitespace-pre-wrap rounded-lg border border-white/10 bg-[#172633] p-4 text-sm leading-6 text-slate-200">{item.draft}</div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {editingId === item.id ? (
                    <>
                      <button onClick={() => void updateDraft(item.id, { draft: editedText, status: 'draft' })} className="flex items-center gap-2 rounded-lg bg-[#c9a77c] px-4 py-2 text-sm text-[#20313f]"><Save size={16} /> Enregistrer</button>
                      <button onClick={() => setEditingId(null)} className="rounded-lg border border-white/15 px-4 py-2 text-sm">Annuler</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditingId(item.id); setEditedText(item.draft); }} className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5"><Pencil size={15} /> Modifier</button>
                      <button onClick={() => navigator.clipboard.writeText(item.draft).then(() => toast.success('Brouillon copié.'))} className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5"><Copy size={15} /> Copier</button>
                      {item.status !== 'approved' && <button onClick={() => void updateDraft(item.id, { status: 'approved' })} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white"><Check size={16} /> Approuver</button>}
                      {item.status !== 'rejected' && <button onClick={() => void updateDraft(item.id, { status: 'rejected' })} className="flex items-center gap-2 rounded-lg bg-red-500/15 px-4 py-2 text-sm text-red-200"><X size={16} /> Refuser</button>}
                    </>
                  )}
                </div>
                <p className="mt-3 text-xs text-slate-500">{item.history?.length || 1} action(s) enregistrée(s) — approuver ne déclenche aucun envoi.</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusCard({ label, ready, detail }: { label: string; ready: boolean; detail: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#20313f] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-200">{label}</p>
        <span className={`h-2.5 w-2.5 rounded-full ${ready ? 'bg-emerald-400' : 'bg-amber-300'}`} />
      </div>
      <p className="mt-1 text-xs text-slate-500">{ready ? 'Identifiants présents — activation volontaire requise' : detail}</p>
    </div>
  );
}
