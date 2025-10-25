import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as reservations from "./reservations.tsx";
import { sendReservationNotification, sendGuestConfirmationEmail } from "./email.tsx";

const app = new Hono();

// Enable logger
app.use("*", logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Health check endpoint
app.get("/make-server-09db1ac7/health", (c) => {
  return c.json({ status: "ok" });
});

// Admin: Clear all reservations (use with caution!)
app.delete("/make-server-09db1ac7/admin/clear-all", async (c) => {
  try {
    // Get all reservation keys
    const allReservations = await reservations.getAllReservations().catch(() => []);
    
    // Delete each one
    for (const reservation of allReservations) {
      if (reservation?.id) {
        await reservations.deleteReservation(reservation.id);
      }
    }
    
    return c.json({ 
      success: true, 
      message: `Cleared ${allReservations.length} reservations`,
      count: allReservations.length 
    });
  } catch (error) {
    console.error("Error clearing reservations:", error);
    return c.json({ success: false, error: error.message || "Failed to clear reservations" }, 500);
  }
});

// Get all reservations
app.get("/make-server-09db1ac7/reservations", async (c) => {
  try {
    const allReservations = await reservations.getAllReservations();
    return c.json({ success: true, data: allReservations });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return c.json({ success: false, error: "Failed to fetch reservations" }, 500);
  }
});

// Get a single reservation
app.get("/make-server-09db1ac7/reservations/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const reservation = await reservations.getReservation(id);
    
    if (!reservation) {
      return c.json({ success: false, error: "Reservation not found" }, 404);
    }
    
    return c.json({ success: true, data: reservation });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return c.json({ success: false, error: "Failed to fetch reservation" }, 500);
  }
});

// Create a new reservation
app.post("/make-server-09db1ac7/reservations", async (c) => {
  try {
    const body = await c.req.json();
    const { giteId, giteName, guestName, guestEmail, guestPhone, checkIn, checkOut, guests, notes } = body;

    // Validate required fields
    if (!guestName || !checkIn || !checkOut || !giteId || !giteName) {
      return c.json(
        { success: false, error: "Missing required fields: giteId, giteName, guestName, checkIn, checkOut" },
        400
      );
    }

    // Check for date conflicts for this specific gite
    const hasConflict = await reservations.checkDateConflict(checkIn, checkOut, giteId);
    if (hasConflict) {
      return c.json(
        { success: false, error: "Ces dates sont déjà réservées pour ce gîte. Veuillez choisir d'autres dates." },
        409
      );
    }

    // Create the reservation
    const reservation = await reservations.createReservation({
      giteId,
      giteName,
      guestName,
      guestEmail: guestEmail || "",
      guestPhone: guestPhone || "",
      checkIn,
      checkOut,
      guests: guests || 1,
      notes: notes || "",
    });

    // Send email notification to manager (don't fail if email fails)
    const managerEmailSent = await sendReservationNotification(reservation, false);
    if (!managerEmailSent) {
      console.warn("Failed to send manager notification for reservation:", reservation.id);
    }

    // Send confirmation email to guest (don't fail if email fails)
    const guestEmailSent = await sendGuestConfirmationEmail(reservation);
    if (!guestEmailSent) {
      console.warn("Failed to send guest confirmation email for reservation:", reservation.id);
    }

    return c.json({ 
      success: true, 
      data: reservation, 
      managerEmailSent,
      guestEmailSent 
    }, 201);
  } catch (error) {
    console.error("Error creating reservation:", error);
    return c.json({ success: false, error: "Failed to create reservation" }, 500);
  }
});

// Update a reservation
app.put("/make-server-09db1ac7/reservations/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { guestName, guestEmail, guestPhone, checkIn, checkOut, guests, notes } = body;

    // Check if reservation exists
    const existing = await reservations.getReservation(id);
    if (!existing) {
      return c.json({ success: false, error: "Reservation not found" }, 404);
    }

    // If dates changed, check for conflicts
    if (checkIn || checkOut) {
      const newCheckIn = checkIn || existing.checkIn;
      const newCheckOut = checkOut || existing.checkOut;
      const hasConflict = await reservations.checkDateConflict(newCheckIn, newCheckOut, id);
      
      if (hasConflict) {
        return c.json(
          { success: false, error: "Ces dates sont déjà réservées. Veuillez choisir d'autres dates." },
          409
        );
      }
    }

    // Update the reservation
    const updated = await reservations.updateReservation(id, {
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      notes,
    });

    if (!updated) {
      return c.json({ success: false, error: "Failed to update reservation" }, 500);
    }

    // Send email notification (don't fail if email fails)
    const emailSent = await sendReservationNotification(updated, true);
    if (!emailSent) {
      console.warn("Failed to send email notification for updated reservation:", updated.id);
    }

    return c.json({ success: true, data: updated, emailSent });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return c.json({ success: false, error: "Failed to update reservation" }, 500);
  }
});

// Delete a reservation
app.delete("/make-server-09db1ac7/reservations/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const success = await reservations.deleteReservation(id);
    
    if (!success) {
      return c.json({ success: false, error: "Reservation not found" }, 404);
    }
    
    return c.json({ success: true, message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return c.json({ success: false, error: "Failed to delete reservation" }, 500);
  }
});



Deno.serve(app.fetch);