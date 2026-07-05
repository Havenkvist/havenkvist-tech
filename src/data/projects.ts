import type { Locale } from "@/i18n/config";

export type ProjectId =
  | "healthcare-messaging-system"
  | "realtime-fullstack-applications"
  | "havenkvist-tech-platform";

// "employment" = day-job work for an employer, "freelance" = paid client work
// through Havenkvist Tech, "personal" = self-directed/own project.
export type ProjectType = "employment" | "freelance" | "personal";

export interface ProjectLocalizedContent {
  company: string;
  title: string;
  role: string;
  description: string;
}

export interface Project {
  id: ProjectId;
  type: ProjectType;
  current: boolean;
  technologies: string[];
  content: Record<Locale, ProjectLocalizedContent>;
}

export const projects: Project[] = [
  {
    id: "healthcare-messaging-system",
    type: "employment",
    current: false,
    technologies: ["React", "TypeScript", "JavaScript", "GraphQL", "SQL"],
    content: {
      en: {
        company: "Kintella",
        title: "Healthcare Messaging & Ticket System",
        role: "Fullstack Developer",
        description:
          "Developed a core messaging and ticketing platform enabling users to securely contact staff at various care centers. Contributed across frontend, backend, and database architecture.",
      },
      da: {
        company: "Kintella",
        title: "Beskedsystem & Ticketsystem til Sundhedssektoren",
        role: "Fullstack-udvikler",
        description:
          "Udviklede en central besked- og ticketplatform, der gør det muligt for brugere at kontakte personale på forskellige plejecentre sikkert. Bidrog på tværs af frontend, backend og databasearkitektur.",
      },
    },
  },
  {
    id: "realtime-fullstack-applications",
    type: "employment",
    current: true,
    technologies: ["Elixir", "Phoenix LiveView", "HEEx/HTML", "SQL"],
    content: {
      en: {
        company: "Current Role",
        title: "Real-time Fullstack Web Applications",
        role: "Fullstack Developer",
        description:
          "Designing and implementing fullstack solutions across real-time user interfaces, performant backend logic, and robust database architectures within an agile development team.",
      },
      da: {
        company: "Nuværende stilling",
        title: "Realtids Fullstack-webapplikationer",
        role: "Fullstack-udvikler",
        description:
          "Designer og implementerer fullstack-løsninger på tværs af realtids-brugergrænseflader, performant backend-logik og robuste databasearkitekturer i et agilt udviklingsteam.",
      },
    },
  },
  {
    id: "havenkvist-tech-platform",
    type: "freelance",
    current: true,
    technologies: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Resend API", "Vercel"],
    content: {
      en: {
        company: "Havenkvist Tech",
        title: "Havenkvist Tech – Freelance Platform",
        role: "Founder & Lead Engineer",
        description:
          "Built a high-performance, i18n host-mapped business platform. Features include automated DNS localized routing (.dk/.com), advanced local SEO structure, server-side form validation, and decoupled preview/production deployment pipelines.",
      },
      da: {
        company: "Havenkvist Tech",
        title: "Havenkvist Tech – Freelance-platform",
        role: "Stifter & Lead Engineer",
        description:
          "Byggede en højtydende, i18n host-mappet forretningsplatform. Funktioner inkluderer automatisk DNS-baseret sprogrouting (.dk/.com), avanceret lokal SEO-struktur, server-side formularvalidering og adskilte preview/produktions-deploy-pipelines.",
      },
    },
  },
];

export function getProjectContent(project: Project, locale: Locale): ProjectLocalizedContent {
  return project.content[locale];
}
