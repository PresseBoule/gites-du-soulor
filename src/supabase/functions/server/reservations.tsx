import * as kv from "./kv_store.tsx";

export interface ReservationData {
  id: string;
  giteId: string;
  giteName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guests: number;
  notes: string;
  status: "pending" | "approved" | "refused";
  createdAt: string;
}

const RESERVATION_PREFIX = "reservation:";
const RESERVATION_LIST_KEY = "reservations:all";

// Get all reservations
export async function getAllReservations(): Promise<ReservationData[]> {
  const values = await kv.getByPrefix(RESERVATION_PREFIX);
  console.log(`🔍 Récupération des réservations: ${values.length} trouvée(s)`);
  return values
    .map((item) => item as ReservationData)
    .filter((reservation) => {
      // Filter out null, undefined, or invalid reservations
      const isValid = (
        reservation &&
        typeof reservation === 'object' &&
        reservation.id &&
        reservation.checkIn &&
        reservation.checkOut &&
        reservation.guestName
      );
      if (!isValid) {
        console.warn('⚠️ Réservation invalide filtrée:', reservation);
      }
      return isValid;
    });
}

// Get a single reservation by ID (with optional giteId for faster lookup)
export async function getReservation(id: string, giteId?: string): Promise<ReservationData | null> {
  if (giteId) {
    const reservation = await kv.get(`${RESERVATION_PREFIX}${giteId}:${id}`);
    return reservation as ReservationData | null;
  }
  
  // Fallback: search all reservations
  const allReservations = await getAllReservations();
  return allReservations.find(r => r.id === id) || null;
}

// Create a new reservation
export async function createReservation(
  data: Omit<ReservationData, "id" | "createdAt" | "status">
): Promise<ReservationData> {
  const id = crypto.randomUUID();
  const reservation: ReservationData = {
    ...data,
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  // Store with gite-specific prefix for easier filtering
  await kv.set(`${RESERVATION_PREFIX}${data.giteId}:${id}`, reservation);
  return reservation;
}

// Update an existing reservation
export async function updateReservation(
  id: string,
  data: Partial<Omit<ReservationData, "id" | "createdAt">>
): Promise<ReservationData | null> {
  const existing = await getReservation(id);
  if (!existing) return null;

  const updated: ReservationData = {
    ...existing,
    ...data,
  };

  await kv.set(`${RESERVATION_PREFIX}${id}`, updated);
  return updated;
}

// Delete a reservation
export async function deleteReservation(id: string): Promise<boolean> {
  const existing = await getReservation(id);
  if (!existing) return false;

  await kv.del(`${RESERVATION_PREFIX}${id}`);
  return true;
}

// Check if dates conflict with existing reservations for a specific gite
export async function checkDateConflict(
  checkIn: string,
  checkOut: string,
  giteId?: string,
  excludeId?: string
): Promise<boolean> {
  const reservations = await getAllReservations();
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  for (const reservation of reservations) {
    if (excludeId && reservation.id === excludeId) continue;
    
    // Only check conflicts for the same gite
    if (giteId && reservation.giteId !== giteId) continue;
    
    // Additional safety check
    if (!reservation.checkIn || !reservation.checkOut) continue;

    const existingCheckIn = new Date(reservation.checkIn);
    const existingCheckOut = new Date(reservation.checkOut);

    // Check if dates overlap
    const hasConflict =
      (checkInDate >= existingCheckIn && checkInDate < existingCheckOut) ||
      (checkOutDate > existingCheckIn && checkOutDate <= existingCheckOut) ||
      (checkInDate <= existingCheckIn && checkOutDate >= existingCheckOut);

    if (hasConflict) return true;
  }

  return false;
}

// Update reservation status
export async function updateReservationStatus(
  id: string,
  status: "approved" | "refused"
): Promise<ReservationData | null> {
  return await updateReservation(id, { status });
}
