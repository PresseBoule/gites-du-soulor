import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Route de test santé
app.get('/make-server-497309b8/health', (c) => {
  return c.json({ success: true, message: 'Server is running' });
});

// Fonction pour envoyer un email de confirmation de réservation
async function sendBookingEmail(bookingData: {
  gite: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  price: number;
  season: string;
}) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  
  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured');
    return { success: false, error: 'Email service not configured' };
  }

  const formatDate = (dateString: string) => {
    // Parser la date au format YYYY-MM-DD sans conversion UTC
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const nights = Math.ceil((new Date(bookingData.endDate).getTime() - new Date(bookingData.startDate).getTime()) / (1000 * 60 * 60 * 24));

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3d4f5c 0%, #4a5c6a 100%); color: #c9a77c; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
        .detail-label { font-weight: bold; color: #3d4f5c; }
        .detail-value { color: #555; }
        .total { background: #3d4f5c; color: #c9a77c; padding: 15px; margin-top: 20px; border-radius: 5px; text-align: center; font-size: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px;">NOUVELLE RÉSERVATION</h1>
          <p style="margin: 10px 0 0 0; color: #e8e8e8;">Les Gîtes du Soulor</p>
        </div>
        <div class="content">
          <h2 style="color: #3d4f5c; margin-top: 0;">Détails de la réservation</h2>
          
          <div style="margin: 20px 0;">
            <div class="detail-row">
              <span class="detail-label">Gîte :</span>
              <span class="detail-value">${bookingData.gite}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Arrivée :</span>
              <span class="detail-value">${formatDate(bookingData.startDate)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Départ :</span>
              <span class="detail-value">${formatDate(bookingData.endDate)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Durée :</span>
              <span class="detail-value">${nights} nuit${nights > 1 ? 's' : ''}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Saison :</span>
              <span class="detail-value">${bookingData.season}</span>
            </div>
          </div>

          <h2 style="color: #3d4f5c;">Informations client</h2>
          <div style="margin: 20px 0;">
            <div class="detail-row">
              <span class="detail-label">Nom :</span>
              <span class="detail-value">${bookingData.customerName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email :</span>
              <span class="detail-value">${bookingData.customerEmail}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Téléphone :</span>
              <span class="detail-value">${bookingData.customerPhone}</span>
            </div>
          </div>

          <div class="total">
            <strong>Total : ${bookingData.price}€</strong>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Les Gîtes du Soulor <onboarding@resend.dev>',
        to: ['spanazol@wanadoo.fr'],
        subject: `Nouvelle réservation - ${bookingData.gite} - ${bookingData.customerName}`,
        html: emailHtml,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Error sending email:', result);
      return { success: false, error: result };
    }

    console.log('Email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: String(error) };
  }
}

// Fonction pour normaliser le nom du gîte pour la clé de base de données
function normalizeGiteName(gite: string): string {
  const mapping: { [key: string]: string } = {
    'Le Soum': 'soum',
    'Le Tech': 'tech',
    'Le Suyen': 'suyen',
    "L'Estaing": 'estaing',
  };
  return mapping[gite] || gite.toLowerCase();
}

// Récupérer toutes les réservations pour un gîte
app.get('/make-server-497309b8/bookings/:gite', async (c) => {
  try {
    const gite = c.req.param('gite');
    console.log(`[SERVER] Fetching bookings for gite: ${gite}`);
    const normalizedGite = normalizeGiteName(gite);
    const prefix = `booking:${normalizedGite}:`;
    console.log(`[SERVER] Searching with prefix: ${prefix}`);
    
    const bookings = await kv.getByPrefix(prefix);
    console.log(`[SERVER] Found ${bookings?.length || 0} bookings:`, JSON.stringify(bookings));
    
    return c.json({ success: true, bookings: bookings || [] });
  } catch (error) {
    console.error('[SERVER] Error fetching bookings:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return c.json({ success: false, error: `Error fetching bookings: ${errorMessage}`, bookings: [] }, 500);
  }
});

// Créer une nouvelle réservation
app.post('/make-server-497309b8/bookings', async (c) => {
  try {
    const body = await c.req.json();
    const { gite, startDate, endDate, customerName, customerEmail, customerPhone, price, season } = body;
    
    if (!gite || !startDate || !endDate || !customerName || !customerEmail) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }
    
    // Normaliser le nom du gîte pour la clé
    const normalizedGite = normalizeGiteName(gite);
    
    // Vérifier les conflits de dates
    const prefix = `booking:${normalizedGite}:`;
    const existingBookings = await kv.getByPrefix(prefix);
    
    // Normalise une date ISO UTC ou YYYY-MM-DD vers la date locale France (Europe/Paris)
    // Le serveur Deno tourne en UTC, donc on utilise Intl pour obtenir la vraie date locale
    const toLocalDate = (d: string): string => {
      if (!d) return '';
      if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
      return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Paris' }).format(new Date(d));
    };

    const newStart = toLocalDate(startDate);
    const newEnd = toLocalDate(endDate);

    for (const booking of existingBookings) {
      const bookingStart = toLocalDate(booking.startDate);
      const bookingEnd = toLocalDate(booking.endDate);

      // Départ = arrivée de la prochaine réservation → check-out matin / check-in soir, pas de conflit
      if (newEnd === bookingStart) continue;

      if (newStart < bookingEnd && newEnd > bookingStart) {
        return c.json({
          success: false,
          error: 'Ces dates sont déjà réservées pour ce gîte'
        }, 409);
      }
    }
    
    // Créer la réservation avec la clé normalisée
    const bookingId = `booking:${normalizedGite}:${Date.now()}`;
    const bookingData = {
      id: bookingId,
      gite, // On garde le nom complet pour l'affichage
      startDate,
      endDate,
      customerName,
      customerEmail,
      customerPhone,
      price,
      season,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(bookingId, bookingData);
    
    // Envoyer l'email de confirmation au gérant
    const emailResult = await sendBookingEmail(bookingData);
    
    if (!emailResult.success) {
      console.error('Failed to send email, but booking was created:', emailResult.error);
      // On continue même si l'email échoue, la réservation est créée
    }
    
    return c.json({ success: true, booking: bookingData, emailSent: emailResult.success });
  } catch (error) {
    console.log('Error creating booking:', error);
    return c.json({ success: false, error: `Error creating booking: ${error}` }, 500);
  }
});

// Supprimer une réservation
app.delete('/make-server-497309b8/bookings/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    await kv.del(id);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting booking:', error);
    return c.json({ success: false, error: `Error deleting booking: ${error}` }, 500);
  }
});

Deno.serve(app.fetch);