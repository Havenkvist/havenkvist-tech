import type { Locale } from "@/i18n/config";

export type EducationId = "datamatiker-zealand" | "sdu-it-electronics";

export interface EducationLocalizedContent {
  program: string;
  institution: string;
  note?: string;
}

export interface EducationEntry {
  id: EducationId;
  completed: boolean;
  content: Record<Locale, EducationLocalizedContent>;
}

export const education: EducationEntry[] = [
  {
    id: "datamatiker-zealand",
    completed: true,
    content: {
      en: {
        program: "Computer Science (Datamatiker, AP Degree)",
        institution: "Zealand (Erhvervsakademi Sjælland), Denmark",
      },
      da: {
        program: "Datamatiker (erhvervsakademiuddannelse)",
        institution: "Zealand (Erhvervsakademi Sjælland)",
      },
    },
  },
];
