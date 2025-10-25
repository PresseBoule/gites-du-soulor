import { AlertCircle, Mail, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

export function EmailConfigHelp() {
  return (
    <Alert 
      className="border-2 mb-6"
      style={{
        backgroundColor: "var(--cottage-darker)",
        borderColor: "#d97706",
      }}
    >
      <AlertCircle className="h-5 w-5" style={{ color: "#f59e0b" }} />
      <AlertTitle className="text-white ml-2">
        Configuration des emails requise
      </AlertTitle>
      <AlertDescription className="mt-2" style={{ color: "var(--cottage-light)" }}>
        <p className="mb-3">
          Pour recevoir les notifications de réservation par email, vous devez configurer votre clé API Resend.
        </p>
        
        <div className="space-y-2 mb-4 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-white">1.</span>
            <span>Créez un compte gratuit sur Resend (100 emails/jour)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-white">2.</span>
            <span>Générez une clé API dans votre tableau de bord</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-white">3.</span>
            <span>La clé doit commencer par "re_"</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-white">4.</span>
            <span>Configurez la clé via la variable d'environnement RESEND_API_KEY</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-2 text-white hover:bg-white/10"
            style={{ borderColor: "#f59e0b" }}
            onClick={() => window.open("https://resend.com/signup", "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Créer un compte Resend
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-2 text-white hover:bg-white/10"
            style={{ borderColor: "#f59e0b" }}
            onClick={() => window.open("https://resend.com/api-keys", "_blank")}
          >
            <Mail className="mr-2 h-4 w-4" />
            Gérer mes clés API
          </Button>
        </div>

        <p className="mt-3 text-xs" style={{ color: "#9ca3af" }}>
          💡 Sans configuration, les réservations seront enregistrées mais aucun email ne sera envoyé.
        </p>
      </AlertDescription>
    </Alert>
  );
}
