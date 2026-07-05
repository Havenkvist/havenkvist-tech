const FAKE_CODE = `import { db } from "./db";
import type { Client } from "./types";

export async function createProject(client: Client) {
  const project = await db.projects.create({
    data: {
      name: client.name,
      domain: client.domain,
      plan: "starter",
      launchDate: new Date(),
    },
  });

  await sendWelcomeEmail(client.email, project);
  return project;
}

export function calculateInvoice(hours: number, rate = 850) {
  const subtotal = hours * rate;
  const vat = subtotal * 0.25;
  return { subtotal, vat, total: subtotal + vat };
}

// Deploy to production
export async function deploy(target: "staging" | "production") {
  console.log(\`Deploying to \${target}...\`);
  await build();
  await publish(target);
  return { status: "success", target };
}`;

const TOKEN_REGEX =
  /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|\b(const|let|var|function|async|await|return|import|export|from|default|new|type|interface|public)\b|\b([a-zA-Z_$][\w$]*)(?=\()|\b(\d+(?:\.\d+)?)\b/g;

function tokenizeLine(line: string, key: number) {
  const parts: { text: string; className?: string }[] = [];
  let lastIndex = 0;

  for (const match of line.matchAll(TOKEN_REGEX)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({ text: line.slice(lastIndex, index) });
    }

    const [full, comment, string, keyword, fn, number] = match;
    if (comment) parts.push({ text: full, className: "text-emerald-400/70" });
    else if (string) parts.push({ text: full, className: "text-amber-300/70" });
    else if (keyword) parts.push({ text: full, className: "text-sky-400/80" });
    else if (fn) parts.push({ text: full, className: "text-violet-300/70" });
    else if (number) parts.push({ text: full, className: "text-orange-300/70" });

    lastIndex = index + full.length;
  }

  if (lastIndex < line.length) parts.push({ text: line.slice(lastIndex) });

  return (
    <div key={key} className="whitespace-pre">
      {parts.map((part, i) => (
        <span key={i} className={part.className}>
          {part.text}
        </span>
      ))}
    </div>
  );
}

function CodeColumn({ offset }: { offset: number }) {
  const lines = FAKE_CODE.split("\n");
  const tiledLines = [...lines, "", "", ...lines];

  return (
    <div className="w-[26rem] shrink-0" style={{ marginTop: offset }}>
      {tiledLines.map((line, i) => tokenizeLine(line, i))}
    </div>
  );
}

export default function CodeBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 select-none overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center blur-[1.5px]">
        <div className="flex w-[170%] -rotate-2 gap-16 font-mono text-[11px] leading-5 text-white/[0.16] sm:text-xs sm:leading-6 md:text-sm">
          <CodeColumn offset={0} />
          <CodeColumn offset={-120} />
          <CodeColumn offset={60} />
          <CodeColumn offset={-60} />
        </div>
      </div>
    </div>
  );
}
