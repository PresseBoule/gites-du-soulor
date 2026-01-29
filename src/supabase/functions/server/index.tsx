import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-66cb1054/health", (c) => {
  return c.json({ status: "ok" });
});

// ========================================
// ROUTES ADMIN - Gestion du contenu
// ========================================

// Authentification admin avec limitation de tentatives
app.post("/make-server-66cb1054/admin/login", async (c) => {
  try {
    const { password } = await c.req.json();
    const clientIP = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
    
    // Vérifier le nombre de tentatives échouées
    const failedAttemptsKey = `login_attempts_${clientIP}`;
    const failedAttempts = (await kv.get(failedAttemptsKey) as number) || 0;
    
    // Bloquer après 5 tentatives échouées pendant 15 minutes
    if (failedAttempts >= 5) {
      const lockoutTime = (await kv.get(`lockout_time_${clientIP}`) as number) || 0;
      const currentTime = Date.now();
      
      if (currentTime - lockoutTime < 15 * 60 * 1000) { // 15 minutes
        const remainingMinutes = Math.ceil((15 * 60 * 1000 - (currentTime - lockoutTime)) / 60000);
        return c.json({ 
          success: false, 
          message: `Trop de tentatives échouées. Réessayez dans ${remainingMinutes} minute(s)` 
        }, 429);
      } else {
        // Réinitialiser après le délai
        await kv.del(failedAttemptsKey);
        await kv.del(`lockout_time_${clientIP}`);
      }
    }
    
    // Récupérer le mot de passe stocké (par défaut: "admin123")
    const storedPassword = await kv.get("admin_password") || "qdttu4vs";
    
    if (password === storedPassword) {
      // Réinitialiser les tentatives en cas de succès
      await kv.del(failedAttemptsKey);
      await kv.del(`lockout_time_${clientIP}`);
      return c.json({ success: true, message: "Connexion réussie" });
    } else {
      // Incrémenter les tentatives échouées
      const newFailedAttempts = failedAttempts + 1;
      await kv.set(failedAttemptsKey, newFailedAttempts);
      
      if (newFailedAttempts >= 5) {
        await kv.set(`lockout_time_${clientIP}`, Date.now());
      }
      
      return c.json({ 
        success: false, 
        message: `Mot de passe incorrect (${newFailedAttempts}/5 tentatives)` 
      }, 401);
    }
  } catch (error) {
    console.log("Erreur lors de la connexion admin:", error);
    return c.json({ success: false, message: `Erreur serveur: ${error}` }, 500);
  }
});

// Changer le mot de passe admin
app.post("/make-server-66cb1054/admin/change-password", async (c) => {
  try {
    const { oldPassword, newPassword } = await c.req.json();
    
    const storedPassword = await kv.get("admin_password") || "admin123";
    
    if (oldPassword !== storedPassword) {
      return c.json({ success: false, message: "Ancien mot de passe incorrect" }, 401);
    }
    
    await kv.set("admin_password", newPassword);
    return c.json({ success: true, message: "Mot de passe modifié avec succès" });
  } catch (error) {
    console.log("Erreur lors du changement de mot de passe:", error);
    return c.json({ success: false, message: `Erreur serveur: ${error}` }, 500);
  }
});

// Récupérer tout le contenu
app.get("/make-server-66cb1054/content", async (c) => {
  try {
    const keys = ["tarifs", "gites", "contact", "social", "hero", "infoCards", "wellness", "navigation", "texts"];
    const values = await kv.mget(keys);
    
    const content: any = {};
    keys.forEach((key, index) => {
      content[key] = values[index] || null;
    });
    
    return c.json({ success: true, content });
  } catch (error) {
    console.log("Erreur lors de la récupération du contenu:", error);
    return c.json({ success: false, message: `Erreur serveur: ${error}` }, 500);
  }
});

// Sauvegarder tout le contenu (protégé) - POST et PUT
const saveContentHandler = async (c) => {
  try {
    const { password, content } = await c.req.json();
    
    // Vérifier le mot de passe
    const storedPassword = await kv.get("admin_password") || "admin123";
    if (password !== storedPassword) {
      return c.json({ success: false, message: "Non autorisé" }, 401);
    }
    
    // Sauvegarder chaque section
    const promises = Object.entries(content).map(([key, value]) => 
      kv.set(key, value)
    );
    
    await Promise.all(promises);
    
    return c.json({ success: true, message: "Contenu sauvegardé avec succès" });
  } catch (error) {
    console.log("Erreur lors de la sauvegarde du contenu:", error);
    return c.json({ success: false, message: `Erreur serveur: ${error}` }, 500);
  }
};

app.post("/make-server-66cb1054/admin/content", saveContentHandler);
app.put("/make-server-66cb1054/admin/content", saveContentHandler);

// Sauvegarder une section spécifique
app.post("/make-server-66cb1054/admin/content/:section", async (c) => {
  try {
    const section = c.req.param("section");
    const { password, data } = await c.req.json();
    
    // Vérifier le mot de passe
    const storedPassword = await kv.get("admin_password") || "admin123";
    if (password !== storedPassword) {
      return c.json({ success: false, message: "Non autorisé" }, 401);
    }
    
    await kv.set(section, data);
    
    return c.json({ success: true, message: `Section ${section} sauvegardée` });
  } catch (error) {
    console.log(`Erreur lors de la sauvegarde de la section:`, error);
    return c.json({ success: false, message: `Erreur serveur: ${error}` }, 500);
  }
});

// Réinitialiser le contenu aux valeurs par défaut (protégé)
app.post("/make-server-66cb1054/admin/reset-content", async (c) => {
  try {
    const { password } = await c.req.json();
    
    // Vérifier le mot de passe
    const storedPassword = await kv.get("admin_password") || "admin123";
    if (password !== storedPassword) {
      return c.json({ success: false, message: "Non autorisé" }, 401);
    }
    
    // Supprimer toutes les clés de contenu pour forcer l'utilisation des valeurs par défaut
    const keys = ["tarifs", "gites", "contact", "social", "hero", "infoCards", "wellness"];
    const promises = keys.map(key => kv.del(key));
    await Promise.all(promises);
    
    return c.json({ success: true, message: "Contenu réinitialisé aux valeurs par défaut" });
  } catch (error) {
    console.log("Erreur lors de la réinitialisation du contenu:", error);
    return c.json({ success: false, message: `Erreur serveur: ${error}` }, 500);
  }
});

Deno.serve(app.fetch);