import { getSeasonColor } from "../utils/seasons";

export function SeasonLegend() {
  const seasons = [
    { key: "low", label: "Basse saison" },
    { key: "mid", label: "Moyenne saison" },
    { key: "high", label: "Haute saison" },
  ] as const;

  return (
    <div
      className="border-2 rounded-lg p-4 sm:p-6"
      style={{
        backgroundColor: "var(--cottage-darker)",
        borderColor: "var(--cottage-border)",
      }}
    >
      <h3
        className="text-white mb-4 text-center text-sm sm:text-base"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Périodes tarifaires 2025-2026
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {seasons.map((season) => {
          const colors = getSeasonColor(season.key);
          return (
            <div
              key={season.key}
              className="flex items-center gap-3 p-3 rounded-lg border"
              style={{
                backgroundColor: colors.bg,
                borderColor: colors.border,
              }}
            >
              <div
                className="w-6 h-6 rounded-full border-2 flex-shrink-0"
                style={{
                  backgroundColor: colors.bg,
                  borderColor: colors.border,
                }}
              />
              <span className="text-xs sm:text-sm" style={{ color: colors.text }}>
                {season.label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-center mt-4" style={{ color: "var(--cottage-light)" }}>
        Les tarifs varient selon la période. Consultez les dates colorées dans le calendrier.
      </p>
    </div>
  );
}
