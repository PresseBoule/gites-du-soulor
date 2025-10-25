import { isWithinInterval } from "date-fns";

export type Season = "low" | "mid" | "high" | null;

interface SeasonPeriod {
  start: Date;
  end: Date;
  season: Season;
}

// Define all season periods for 2025-2026
const seasonPeriods: SeasonPeriod[] = [
  // Low Season
  { start: new Date(2025, 10, 2), end: new Date(2025, 11, 19), season: "low" }, // Nov 2 - Dec 19, 2025
  { start: new Date(2026, 0, 4), end: new Date(2026, 1, 8), season: "low" }, // Jan 4 - Feb 8, 2026
  { start: new Date(2026, 2, 8), end: new Date(2026, 3, 3), season: "low" }, // Mar 8 - Apr 3, 2026
  { start: new Date(2026, 4, 3), end: new Date(2026, 4, 14), season: "low" }, // May 3 - May 14, 2026
  { start: new Date(2026, 4, 17), end: new Date(2026, 4, 22), season: "low" }, // May 17 - May 22, 2026
  { start: new Date(2026, 4, 26), end: new Date(2026, 5, 26), season: "low" }, // May 26 - Jun 26, 2026
  { start: new Date(2026, 8, 25), end: new Date(2026, 9, 16), season: "low" }, // Sep 25 - Oct 16, 2026

  // Mid Season
  { start: new Date(2025, 9, 17), end: new Date(2025, 10, 2), season: "mid" }, // Oct 17 - Nov 2, 2025
  { start: new Date(2026, 3, 3), end: new Date(2026, 4, 3), season: "mid" }, // Apr 3 - May 3, 2026
  { start: new Date(2026, 4, 14), end: new Date(2026, 4, 17), season: "mid" }, // May 14 - May 17, 2026
  { start: new Date(2026, 4, 22), end: new Date(2026, 4, 26), season: "mid" }, // May 22 - May 26, 2026
  { start: new Date(2026, 7, 30), end: new Date(2026, 8, 25), season: "mid" }, // Aug 30 - Sep 25, 2026
  { start: new Date(2026, 9, 16), end: new Date(2026, 10, 1), season: "mid" }, // Oct 16 - Nov 1, 2026

  // High Season
  { start: new Date(2025, 11, 19), end: new Date(2026, 0, 4), season: "high" }, // Dec 19, 2025 - Jan 4, 2026
  { start: new Date(2026, 1, 8), end: new Date(2026, 2, 8), season: "high" }, // Feb 8 - Mar 8, 2026
  { start: new Date(2026, 5, 26), end: new Date(2026, 7, 30), season: "high" }, // Jun 26 - Aug 30, 2026
];

export function getSeasonForDate(date: Date): Season {
  for (const period of seasonPeriods) {
    if (
      isWithinInterval(date, {
        start: period.start,
        end: period.end,
      })
    ) {
      return period.season;
    }
  }
  return null;
}

export function getSeasonLabel(season: Season): string {
  switch (season) {
    case "low":
      return "Basse saison";
    case "mid":
      return "Moyenne saison";
    case "high":
      return "Haute saison";
    default:
      return "";
  }
}

export function getSeasonColor(season: Season): { bg: string; border: string; text: string } {
  switch (season) {
    case "low":
      return {
        bg: "rgba(100, 150, 200, 0.15)",
        border: "#6496c8",
        text: "#89b4d8",
      };
    case "mid":
      return {
        bg: "rgba(200, 150, 100, 0.15)",
        border: "#c89664",
        text: "#d8b489",
      };
    case "high":
      return {
        bg: "rgba(200, 100, 100, 0.15)",
        border: "#c86464",
        text: "#d88989",
      };
    default:
      return {
        bg: "",
        border: "",
        text: "",
      };
  }
}
