import { ReservationData } from "./reservations.tsx";
import { calculatePrice, formatPrice } from "./pricing.tsx";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFICATION_EMAIL = "spanazol@wanadoo.fr";
const SUPABASE_PROJECT_ID = Deno.env.get("SUPABASE_URL")?.split("//")[1]?.split(".")[0] || "";
const BASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-09db1ac7`;

// Send confirmation email to the guest after booking request
export async function sendGuestConfirmationEmail(
  reservation: ReservationData
): Promise<boolean> {
  if (!RESEND_API_KEY || RESEND_API_KEY.trim() === "") {
    console.warn("⚠️ RESEND_API_KEY not configured. Cannot send guest confirmation email.");
    return false;
  }

  if (!reservation.guestEmail || reservation.guestEmail.trim() === "") {
    console.warn("⚠️ No guest email provided. Cannot send confirmation email.");
    return false;
  }

  try {
    const checkInDate = new Date(reservation.checkIn).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const checkOutDate = new Date(reservation.checkOut).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const nights = Math.ceil(
      (new Date(reservation.checkOut).getTime() - new Date(reservation.checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const pricingDetails = calculatePrice(new Date(reservation.checkIn), new Date(reservation.checkOut));

    const subject = `✅ Demande reçue - Les Gîtes du Soulor`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
              color: #e8dcc4;
              padding: 30px 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-family: 'Playfair Display', serif;
              letter-spacing: 2px;
            }
            .content {
              background: #fff;
              padding: 30px;
              border: 2px solid #4a5568;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .status-box {
              background: #d1fae5;
              border-left: 4px solid #10b981;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .status-box h2 {
              margin: 0 0 10px 0;
              color: #065f46;
              font-size: 20px;
            }
            .status-box p {
              margin: 0;
              color: #065f46;
            }
            .info-block {
              background: #f7fafc;
              border-left: 4px solid #e8dcc4;
              padding: 15px;
              margin: 20px 0;
            }
            .info-row {
              display: flex;
              padding: 8px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .info-label {
              font-weight: 600;
              color: #2c3e50;
              min-width: 150px;
            }
            .info-value {
              color: #4a5568;
            }
            .next-steps {
              background: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .next-steps h3 {
              margin: 0 0 10px 0;
              color: #92400e;
              font-size: 18px;
            }
            .next-steps p {
              margin: 0;
              color: #78350f;
              line-height: 1.8;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e2e8f0;
              color: #718096;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>LES GÎTES DU SOULOR</h1>
          </div>
          <div class="content">
            <p style="font-size: 16px; color: #2c3e50;">
              Bonjour ${reservation.guestName},
            </p>
            
            <div class="status-box">
              <h2>✅ Votre demande a bien été reçue !</h2>
              <p>
                Nous avons bien reçu votre demande de réservation pour les Gîtes du Soulor. 
                Merci pour votre confiance !
              </p>
            </div>

            <div class="info-block">
              <h2 style="margin-top: 0; color: #2c3e50; font-size: 18px;">📅 Récapitulatif de votre demande</h2>
              <div class="info-row">
                <div class="info-label">Arrivée :</div>
                <div class="info-value">${checkInDate}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Départ :</div>
                <div class="info-value">${checkOutDate}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Durée :</div>
                <div class="info-value">${nights} ${nights === 1 ? "nuit" : "nuits"}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Nombre de personnes :</div>
                <div class="info-value">${reservation.guests} ${reservation.guests === 1 ? "personne" : "personnes"}</div>
              </div>
            </div>

            ${
              pricingDetails
                ? `
            <div class="info-block" style="background: #eff6ff; border-left-color: #3b82f6;">
              <h2 style="margin-top: 0; color: #2c3e50; font-size: 18px;">💰 Estimation tarifaire</h2>
              <div class="info-row">
                <div class="info-label">Tarif indicatif :</div>
                <div class="info-value" style="font-size: 20px; font-weight: 700; color: #3b82f6;">
                  ${formatPrice(pricingDetails.total)}
                </div>
              </div>
              <div class="info-row">
                <div class="info-label">Détails :</div>
                <div class="info-value" style="font-size: 13px;">${pricingDetails.breakdown}</div>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b; font-style: italic;">
                * Tarif indicatif sujet à confirmation
              </p>
            </div>
            `
                : ""
            }

            <div class="next-steps">
              <h3>📋 Prochaines étapes</h3>
              <p>
                <strong>Le gérant vous recontactera au plus vite</strong> pour :<br>
                • Confirmer la disponibilité de vos dates<br>
                • Vous fournir un devis personnalisé et détaillé<br>
                • Répondre à toutes vos questions<br>
                • Finaliser votre réservation
              </p>
            </div>

            <p style="color: #4a5568; margin-top: 20px;">
              En attendant, si vous avez des questions, n'hésitez pas à nous contacter directement à 
              <a href="mailto:${NOTIFICATION_EMAIL}" style="color: #2c3e50; font-weight: 600;">${NOTIFICATION_EMAIL}</a>
            </p>

            <p style="color: #4a5568; margin-top: 20px;">
              Nous avons hâte de vous accueillir dans les Hautes-Pyrénées ! 🏔️
            </p>

            <div class="footer">
              <p>Les Gîtes du Soulor - Hautes-Pyrénées</p>
              <p style="margin-top: 5px;">Capacité : 2 personnes</p>
              <p style="margin-top: 10px; font-size: 11px;">
                <strong>ID de demande :</strong> ${reservation.id}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Les Gîtes du Soulor <onboarding@resend.dev>",
        to: [reservation.guestEmail],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to send guest confirmation email: ${response.status}`);
      console.error(`Error details: ${errorText}`);
      return false;
    }

    const result = await response.json();
    console.log("✅ Guest confirmation email sent successfully to", reservation.guestEmail);
    console.log("📧 Email ID:", result.id);
    return true;
  } catch (error) {
    console.error("❌ Unexpected error sending guest confirmation email:", error);
    return false;
  }
}

export async function sendReservationNotification(
  reservation: ReservationData,
  isUpdate: boolean = false
): Promise<boolean> {
  if (!RESEND_API_KEY || RESEND_API_KEY.trim() === "") {
    console.warn("⚠️ RESEND_API_KEY environment variable is not set or empty. Email notification will be skipped.");
    console.warn("To enable email notifications, please configure your Resend API key.");
    return false;
  }

  // Validate API key format (Resend keys start with "re_")
  if (!RESEND_API_KEY.startsWith("re_")) {
    console.error("❌ RESEND_API_KEY appears to be invalid (should start with 're_')");
    console.error("Please check your API key at https://resend.com/api-keys");
    return false;
  }

  try {
    const checkInDate = new Date(reservation.checkIn).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const checkOutDate = new Date(reservation.checkOut).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const nights = Math.ceil(
      (new Date(reservation.checkOut).getTime() - new Date(reservation.checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // Calculate pricing
    const pricingDetails = calculatePrice(new Date(reservation.checkIn), new Date(reservation.checkOut));

    const subject = isUpdate
      ? `Modification de demande - ${reservation.guestName}`
      : `Nouvelle demande de réservation - ${reservation.guestName}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
              color: #e8dcc4;
              padding: 30px 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-family: 'Playfair Display', serif;
              letter-spacing: 2px;
            }
            .content {
              background: #fff;
              padding: 30px;
              border: 2px solid #4a5568;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .info-block {
              background: #f7fafc;
              border-left: 4px solid #e8dcc4;
              padding: 15px;
              margin: 20px 0;
            }
            .info-row {
              display: flex;
              padding: 8px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .info-label {
              font-weight: 600;
              color: #2c3e50;
              min-width: 150px;
            }
            .info-value {
              color: #4a5568;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e2e8f0;
              color: #718096;
              font-size: 12px;
            }
            .badge {
              display: inline-block;
              background: #e8dcc4;
              color: #2c3e50;
              padding: 4px 12px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 600;
              margin-left: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${isUpdate ? "📝 MODIFICATION DE DEMANDE" : "🎉 NOUVELLE DEMANDE DE RÉSERVATION"}</h1>
          </div>
          <div class="content">
            <p style="font-size: 16px; color: #2c3e50;">
              ${isUpdate ? "Une demande de réservation a été modifiée" : "Une nouvelle demande de réservation a été reçue"} pour votre gîte.
            </p>
            
            <div class="info-block">
              <h2 style="margin-top: 0; color: #2c3e50; font-size: 18px;">👤 Informations du client</h2>
              <div class="info-row">
                <div class="info-label">Nom :</div>
                <div class="info-value">${reservation.guestName}</div>
              </div>
              ${
                reservation.guestEmail
                  ? `
              <div class="info-row">
                <div class="info-label">Email :</div>
                <div class="info-value"><a href="mailto:${reservation.guestEmail}">${reservation.guestEmail}</a></div>
              </div>
              `
                  : ""
              }
              ${
                reservation.guestPhone
                  ? `
              <div class="info-row">
                <div class="info-label">Téléphone :</div>
                <div class="info-value"><a href="tel:${reservation.guestPhone}">${reservation.guestPhone}</a></div>
              </div>
              `
                  : ""
              }
              <div class="info-row">
                <div class="info-label">Nombre de personnes :</div>
                <div class="info-value">${reservation.guests} ${reservation.guests === 1 ? "personne" : "personnes"}</div>
              </div>
            </div>

            <div class="info-block">
              <h2 style="margin-top: 0; color: #2c3e50; font-size: 18px;">📅 Détails du séjour</h2>
              <div class="info-row">
                <div class="info-label">Arrivée :</div>
                <div class="info-value">${checkInDate}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Départ :</div>
                <div class="info-value">${checkOutDate}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Durée :</div>
                <div class="info-value">
                  ${nights} ${nights === 1 ? "nuit" : "nuits"}
                  <span class="badge">${nights} ${nights === 1 ? "NUIT" : "NUITS"}</span>
                </div>
              </div>
            </div>

            ${
              pricingDetails
                ? `
            <div class="info-block" style="background: #fef3c7; border-left-color: #f59e0b;">
              <h2 style="margin-top: 0; color: #2c3e50; font-size: 18px;">💰 Tarif de la réservation</h2>
              <div class="info-row">
                <div class="info-label">Montant total :</div>
                <div class="info-value" style="font-size: 24px; font-weight: 700; color: #f59e0b;">
                  ${formatPrice(pricingDetails.total)}
                </div>
              </div>
              <div class="info-row">
                <div class="info-label">Détails :</div>
                <div class="info-value">${pricingDetails.breakdown}</div>
              </div>
            </div>
            `
                : ""
            }

            ${
              reservation.notes
                ? `
            <div class="info-block">
              <h2 style="margin-top: 0; color: #2c3e50; font-size: 18px;">📝 Notes</h2>
              <p style="margin: 0; white-space: pre-wrap;">${reservation.notes}</p>
            </div>
            `
                : ""
            }

            <div style="margin-top: 30px; padding: 20px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0 0 10px 0; font-size: 16px; color: #1e40af; font-weight: 600;">
                📋 Action requise
              </p>
              <p style="margin: 0; color: #1e3a8a; line-height: 1.6;">
                Veuillez recontacter le client au plus vite pour lui fournir un devis personnalisé et confirmer les détails de sa réservation.
              </p>
            </div>

            <div class="footer">
              <p>Cette notification a été générée automatiquement par votre système de gestion des Gîtes du Soulor.</p>
              <p style="margin-top: 10px;">
                <strong>ID de demande :</strong> ${reservation.id}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Réservations Gîte <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to send email via Resend API: ${response.status}`);
      console.error(`Error details: ${errorText}`);
      
      if (response.status === 401) {
        console.error("🔑 Authentication Error: Your Resend API key is invalid or expired.");
        console.error("Please verify your API key at: https://resend.com/api-keys");
        console.error("Make sure the key:");
        console.error("  1. Starts with 're_'");
        console.error("  2. Was copied correctly without extra spaces");
        console.error("  3. Has not been revoked or expired");
      } else if (response.status === 429) {
        console.error("📊 Rate Limit: You have exceeded your email quota.");
        console.error("Free tier: 100 emails/day. Check usage at https://resend.com/overview");
      }
      
      return false;
    }

    const result = await response.json();
    console.log("✅ Email sent successfully to", NOTIFICATION_EMAIL);
    console.log("📧 Email ID:", result.id);
    return true;
  } catch (error) {
    console.error("❌ Unexpected error sending email notification:", error);
    return false;
  }
}


