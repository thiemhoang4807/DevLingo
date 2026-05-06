// --- IMPORT ASSETS ---
// Bronze
import bronze1 from "../assets/badges/Bronze 1.svg";
import bronze2 from "../assets/badges/Bronze 2.svg";
import bronze3 from "../assets/badges/Bronze 3.svg";

// Silver
import silver1 from "../assets/badges/Silver 1.svg";
import silver2 from "../assets/badges/Silver 2.svg";
import silver3 from "../assets/badges/Silver 3.svg";

// Gold
import gold1 from "../assets/badges/Gold 1.svg";
import gold2 from "../assets/badges/Gold 2.svg";
import gold3 from "../assets/badges/Gold 3.svg";

// Diamond
import diamond1 from "../assets/badges/Diamond 1.svg";
import diamond2 from "../assets/badges/Diamond 2.svg";
import diamond3 from "../assets/badges/Diamond 3.svg";

// Emerald
import emerald1 from "../assets/badges/Emerald 1.svg";
import emerald2 from "../assets/badges/Emerald 2.svg";
import emerald3 from "../assets/badges/Emerald 3.svg";

// Amethyst
import amethyst1 from "../assets/badges/Amethyst 1.svg";
import amethyst2 from "../assets/badges/Amethyst 2.svg";
import amethyst3 from "../assets/badges/Amethyst 3.svg";

// Ruby
import ruby1 from "../assets/badges/Ruby 1.svg";
import ruby2 from "../assets/badges/Ruby 2.svg";
import ruby3 from "../assets/badges/Ruby 3.svg";

// Quartz
import quartz1 from "../assets/badges/Quartz 1.svg";
import quartz2 from "../assets/badges/Quartz 2.svg";
import quartz3 from "../assets/badges/Quartz 3.svg";

// Sapphire
import sapphire1 from "../assets/badges/Sapphire 1.svg";
import sapphire2 from "../assets/badges/Sapphire 2.svg";
import sapphire3 from "../assets/badges/Sapphire 3.svg";

// Obsidian
import obsidian1 from "../assets/badges/Obsidian 1.svg";
import obsidian2 from "../assets/badges/Obsidian 2.svg";
import obsidian3 from "../assets/badges/Obsidian 3.svg";

// --- EXPORT MAP ---
export const BADGE_MAP: Record<string, string[]> = {
  bronze: [bronze1, bronze2, bronze3],
  silver: [silver1, silver2, silver3],
  gold: [gold1, gold2, gold3],
  diamond: [diamond1, diamond2, diamond3],
  emerald: [emerald1, emerald2, emerald3],
  amethyst: [amethyst1, amethyst2, amethyst3],
  ruby: [ruby1, ruby2, ruby3],
  quartz: [quartz1, quartz2, quartz3],
  sapphire: [sapphire1, sapphire2, sapphire3],
  obsidian: [obsidian1, obsidian2, obsidian3],
};

/**
 * Hàm hỗ trợ lấy badge dựa trên rank và tier (1-3)
 */
export const getBadgeUrl = (rank: string, tier: number): string => {
  const normalizedRank = rank.toLowerCase();
  if (BADGE_MAP[normalizedRank] && tier >= 1 && tier <= 3) {
    return BADGE_MAP[normalizedRank][tier - 1];
  }
  return bronze1; // Mặc định trả về Bronze 1 nếu không tìm thấy
};