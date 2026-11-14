import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const principles = [
  {
    icon: "eye",
    title: "Clarity over cleverness.",
    body: "If someone has to stop and think about how to use it, the design isn’t done. Every screen should answer one question: what do I do next?",
  },
  {
    icon: "steps",
    title: "Fewer steps. Always.",
    body: "The best flow is the one with nothing left to remove. I look for the extra click, the extra form field, the extra decision, and take it out.",
  },
  {
    icon: "pulse",
    title: "Feedback at every moment.",
    body: "Loading, saving, failing, done. People should never wonder what just happened. Good states make software feel trustworthy.",
  },
  {
    icon: "spark",
    title: "Details add up.",
    body: "Spacing, type, motion, empty states, error copy. No single detail makes a product feel great, but all of them together do.",
  },
];

const process = [
  { n: "01", title: "Understand", body: "Start with the people and the job they’re trying to get done, not the feature list." },
  { n: "02", title: "Simplify", body: "Map the flow, then cut it down until every step earns its place." },
  { n: "03", title: "Build", body: "TypeScript, React, and Next.js, moving fast with Codex and Claude Code in the loop." },
  { n: "04", title: "Refine", body: "Use it, watch others use it, and polish the rough edges until it feels effortless." },
];

type Feature = {
  id: string;
  name: string;
  kicker: string;
  tagline: string;
  description: string;
  points: string[];
  stack: string;
  href: string;
  note?: string;
};

const features: Feature[] = [
  {
    id: "paw",
    name: "AutoPawPrints",
    kicker: "Order workflow · Web app",
    tagline: "A messy, manual process, made calm.",
    description:
      "A workflow app for Etsy pet portrait orders, from payment through upload, review, and delivery.",
    points: [
      "Payment, uploads, approvals, and delivery live in one flow instead of scattered messages.",
      "Customers send their photos through a secure, token-based link.",
      "Every portrait passes a clear review step before it goes out.",
    ],
    stack: "Next.js 15 · TypeScript · Prisma · Postgres · BullMQ · OpenAI",
    href: "https://github.com/pawprintstogoco-ship-it/autopawprints",
  },
  {
    id: "nset",
    name: "nSet",
    kicker: "Strength training · iOS & Android",
    tagline: "Log the work. See the progress.",
    description:
      "An nSuns-style training tracker designed to be fast enough to use between sets.",
    points: [
      "Prescriptions generated from your training maxes, with the math out in the open.",
      "Local-first, so there’s no account to create before you can start logging.",
      "Compare lifts with friends, built privacy-first instead of as a public feed.",
    ],
    stack: "Expo · React Native · TypeScript · Expo Router · SQLite · Supabase",
    href: "https://github.com/kevnotdev/nset",
  },
  {
    id: "tax",
    name: "TaxPilot",
    kicker: "Small business tax · Web app",
    tagline: "Corporate taxes, in plain language.",
    description:
      "A guided T2 corporate tax return for small incorporated businesses in Canada.",
    points: [
      "One plain-language question per screen, from income to the year-end balance sheet.",
      "Reads last year’s return from a PDF and shows which line each carried number came from.",
      "Shows what the tax rules saved you, and checks that hold filing until the books tie.",
    ],
    stack: "Next.js 15 · React 19 · TypeScript · Tailwind · pdf.js",
    href: "https://github.com/kevnotdev/sbtax",
    note: "In development. Filing is a labelled demo until CRA certification.",
  },
];

const inTheWorks = ["Ohiru", "YourTurn", "Cue", "Shot Arc"];

const pipeline = ["Paid", "Upload", "Review", "Delivered"];

const orders = [
  { id: "4821", pet: "Biscuit", kind: "Golden retriever", step: 3 },
  { id: "4819", pet: "Miso", kind: "Tabby cat", step: 2 },
  { id: "4816", pet: "Pepper", kind: "Border collie", step: 1 },
];


function Icon({ name }: { name: string }) {
  const common = {
    width: 36,
    height: 36,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "steps":
      return (
        <svg {...common}>
          <path d="M4 18h5v-5h5V8h6" />
          <path d="m17 5 3 3-3 3" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path d="M3 12h4l2.5-6 5 12L17 12h4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
        </svg>
      );
  }
}

function Chevron() {
  return (
    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden="true">
      <path d="m1.5 1.5 5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PawVisual() {
  return (
    <div className="v-paw">
      <div className="v-card">
        <div className="v-card-head">
          <strong>Today</strong>
          <span>3 orders</span>
        </div>
        {orders.map((o) => (
          <div className="v-row" key={o.id}>
            <div className="avatar">{o.pet[0]}</div>
            <div className="row-meta">
              <strong>{o.pet}</strong>
              <small>{o.kind}</small>
            </div>
            <span className={`badge b${o.step}`}>{pipeline[o.step]}</span>
          </div>
        ))}
        <div className="v-progress">
          <span style={{ width: "72%" }} />
        </div>
        <small className="v-foot">72% of this week’s orders delivered</small>
      </div>
    </div>
  );
}

function NsetVisual() {
  const [set, setSet] = useState(3);
  useEffect(() => {
    const id = window.setInterval(() => setSet((s) => (s + 1) % 5), 1600);
    return () => window.clearInterval(id);
  }, []);
  const weights = [225, 245, 265, 275, 255];

  return (
    <div className="v-nset">
      <div className="phone">
        <div className="phone-status">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        <p className="phone-title">Bench Press</p>
        <p className="phone-sub">Week 3 · Day 1</p>
        <div className="seg">
          <span className="on">Bench</span>
          <span>Squat</span>
          <span>Deadlift</span>
        </div>
        <div className="marks">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={i === set ? "dot" : "bar"} />
          ))}
        </div>
        <p className="phone-set">
          Set {set + 1} of 5
        </p>
        <div className="stepper">
          <span>−</span>
          <strong>
            {weights[set]} <small>lb</small>
          </strong>
          <span>+</span>
        </div>
        <div className="phone-btn">Complete Set</div>
      </div>
    </div>
  );
}

function TaxVisual() {
  const steps = ["Company", "Income", "Expenses", "Equipment", "Balances", "Review", "File"];
  return (
    <div className="v-tax">
      <div className="v-card">
        <div className="tax-steps">
          {steps.map((s, i) => (
            <span key={s} className={i < 4 ? "done" : i === 4 ? "now" : ""}>
              {s}
            </span>
          ))}
        </div>
        <p className="tax-q">Do the books tie?</p>
        <div className="tax-cols">
          <div>
            <small>Has</small>
            <strong>$84,210</strong>
          </div>
          <div className="tax-eq">=</div>
          <div>
            <small>Owes, plus what’s yours</small>
            <strong>$84,210</strong>
          </div>
        </div>
        <div className="tax-ok">
          <span>✓</span> Balanced. You’re ready to review.
        </div>
      </div>
    </div>
  );
}

function ProductShot() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % pipeline.length), 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="device" aria-hidden="true">
      <div className="device-bar">
        <span />
        <span />
        <span />
        <div className="device-url">autopawprints.app/orders</div>
      </div>
      <div className="device-body">
        <aside className="device-side">
          <strong>Orders</strong>
          <span className="is-on">All orders</span>
          <span>Awaiting upload</span>
          <span>In review</span>
          <span>Delivered</span>
        </aside>
        <div className="device-main">
          <div className="steps">
            {pipeline.map((s, i) => (
              <div key={s} className={`step ${i <= active ? "on" : ""}`}>
                <div className="step-dot">{i < active ? "✓" : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
            <div className="steps-line">
              <motion.div
                className="steps-fill"
                animate={{ width: `${(active / (pipeline.length - 1)) * 100}%` }}
                transition={{ duration: 0.8, ease }}
              />
            </div>
          </div>
          <div className="rows">
            {orders.map((o) => (
              <div className="row" key={o.id}>
                <div className="avatar">{o.pet[0]}</div>
                <div className="row-meta">
                  <strong>{o.pet}</strong>
                  <small>
                    {o.kind} · #{o.id}
                  </small>
                </div>
                <span className={`badge b${o.step}`}>{pipeline[o.step]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const shotScale = useTransform(scrollYProgress, [0.2, 0.55], [0.9, 1]);

  return (
    <MotionConfig reducedMotion="user">
      <header className="nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#top">
            Kevin
          </a>
          <nav>
            <a href="#design">Design</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav-gh" href="https://github.com/kevnotdev">
            GitHub
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero">
          <motion.p
            className="hero-kicker"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            Kevin · Product designer &amp; developer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            Design that
            <br />
            gets out of the way.
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          >
            I design and build web products where the experience is the feature. Clear, calm, and
            easy to use, so people can focus on what they came to do.
          </motion.p>
          <motion.div
            className="hero-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            <a className="pill" href="#work">
              See the work
            </a>
            <a className="link" href="#design">
              How I think about design <Chevron />
            </a>
          </motion.div>

          <motion.div ref={heroRef} className="hero-shot" style={{ scale: shotScale }}>
            <ProductShot />
          </motion.div>
        </section>

        {/* Statement */}
        <section className="statement" id="design">
          <Reveal>
            <p className="statement-kicker">Design philosophy</p>
            <h2>
              Good design is quiet.
              <br />
              <span className="dim">You notice it most when it’s missing.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="statement-body">
              Most of my work sits between product UI and internal tools: dashboards, workflows,
              and customer-facing flows with a lot of moving parts. My job is to make all of that
              feel simple on the surface and solid underneath.
            </p>
          </Reveal>
        </section>

        {/* Principles */}
        <section className="principles">
          <Reveal className="section-head">
            <h2>What good UX means to me.</h2>
            <p>Four principles behind everything I build.</p>
          </Reveal>
          <div className="tiles">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="tile">
                <div className="tile-icon">
                  <Icon name={p.icon} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Work */}
        <section className="work" id="work">
          <Reveal className="section-head">
            <p className="kicker">Selected work</p>
            <h2>Things I’ve designed and built.</h2>
            <p>Different problems, same goal: make the hard part feel easy.</p>
          </Reveal>

          <div className="features">
            {features.map((f, i) => (
              <Reveal key={f.id} className={`feature feature-${f.id} ${i % 2 ? "flip" : ""}`}>
                <div className="feature-text">
                  <p className="feature-kicker">{f.kicker}</p>
                  <h3>{f.name}</h3>
                  <p className="feature-tagline">{f.tagline}</p>
                  <p className="feature-desc">{f.description}</p>
                  <ul>
                    {f.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <p className="feature-stack">{f.stack}</p>
                  {f.note && <p className="feature-note">{f.note}</p>}
                  <a className="link" href={f.href}>
                    View on GitHub <Chevron />
                  </a>
                </div>
                <div className="feature-visual" aria-hidden="true">
                  {f.id === "paw" && <PawVisual />}
                  {f.id === "nset" && <NsetVisual />}
                  {f.id === "tax" && <TaxVisual />}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="works">
            <p className="works-label">Also in the works</p>
            <div className="works-grid">
              {inTheWorks.map((name) => (
                <div className="works-tile" key={name}>
                  <span className="works-mono">{name[0]}</span>
                  <strong>{name}</strong>
                  <small>Private project</small>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Process */}
        <section className="process" id="process">
          <Reveal className="section-head">
            <h2>How I work.</h2>
            <p>From first question to final polish.</p>
          </Reveal>
          <div className="process-grid">
            {process.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="process-step">
                <span className="process-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="contact" id="contact">
          <Reveal>
            <h2>
              Let’s make something
              <br />
              people enjoy using.
            </h2>
            <p>
              If you’re building a product and need someone who cares about both the design and the
              implementation, I’d love to hear about it.
            </p>
            <div className="hero-links">
              <a className="pill" href="https://github.com/kevnotdev">
                Say hello on GitHub
              </a>
              <a className="link" href="#work">
                See the work <Chevron />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>Designed and built by Kevin.</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </MotionConfig>
  );
}
