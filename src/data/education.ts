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
  {
    id: "sdu-it-electronics",
    completed: false,
    content: {
      en: {
        program: "IT & Electronics Engineering",
        institution: "University of Southern Denmark (SDU)",
        note: "2 years completed",
      },
      da: {
        program: "IT- og Elektronikingeniør",
        institution: "Syddansk Universitet (SDU)",
        note: "2 års studie gennemført",
      },
    },
  },
];
