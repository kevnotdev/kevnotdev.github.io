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
    title: "I direct, agents build",
    body: "I write the spec, design the screens and review every change. Claude Code and Codex write most of the code, so one person can ship full apps with real backends.",
  },
  {
    title: "Stack",
    body: "TypeScript, React and Next.js on the web. Expo and React Native for cross-platform mobile, Swift for native iOS. Postgres, Prisma and Supabase behind them.",
  },
  {
    title: "Real apps, not mockups",
    body: "The projects here are full builds with backend logic, workflows, and integrations like Etsy, OpenAI and text messaging.",
  },
  {
    title: "Fast iteration",
    body: "Agents let me try an idea in an afternoon, so I spend my time on what matters: does it actually work for the person using it?",
  },
];

const process = [
  { n: "01", title: "Understand", body: "Start with the people and the job they’re trying to get done, not the feature list." },
  { n: "02", title: "Simplify", body: "Map the flow, then cut it down until every step earns its place." },
  { n: "03", title: "Build", body: "Agents write most of the code from my specs. I review, test and steer every change." },
  { n: "04", title: "Refine", body: "Use it, watch others use it, and fix whatever trips them up." },
];

type Feature = {
  id: string;
  name: string;
  kicker: string;
  tagline: string;
  description: string;
  points: string[];
  stack?: string;
  href: string;
  linkLabel?: string;
  note?: string;
};

const features: Feature[] = [
  {
    id: "turn",
    name: "yourturn",
    kicker: "Restaurant host stand · Web app",
    tagline: "Reservations and walk-ins, one host stand.",
    description:
      "I designed the host stand around one screen, so staff can handle bookings and walk-ins without switching views.",
    points: [
      "Bookings and the walk-in waitlist live side by side on one screen.",
      "Guests get a text when their table is ready, so nobody hovers at the door.",
      "Plain restaurant words throughout: bookings, walk-ins, host stand.",
    ],
    href: "https://yourturn.to",
    linkLabel: "Visit yourturn.to",
  },
  {
    id: "paw",
    name: "AutoPawPrints",
    kicker: "Order workflow · Web app",
    tagline: "Etsy orders, from payment to delivery.",
    description:
      "A workflow app for handling Etsy pet portrait orders from payment through upload, review, and delivery.",
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

const inTheWorks = [
  { name: "Ohiru", note: "Private project" },
  { name: "Cue", note: "Private project" },
  { name: "Shot Arc", note: "iOS · Swift" },
  { name: "Little Faces", note: "iOS · Swift" },
];

const pipeline = ["Paid", "Upload", "Review", "Delivered"];

const orders = [
  { id: "4821", pet: "Biscuit", kind: "Golden retriever", step: 3 },
  { id: "4819", pet: "Miso", kind: "Tabby cat", step: 2 },
  { id: "4816", pet: "Pepper", kind: "Border collie", step: 1 },
];


function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TurnVisual() {
  const parties = [
    { name: "Lee", size: 4, wait: "Ready", ready: true },
    { name: "Okafor", size: 2, wait: "12 min", ready: false },
    { name: "Martin", size: 6, wait: "25 min", ready: false },
  ];
  return (
    <div className="v-turn">
      <div className="v-card">
        <div className="v-card-head">
          <strong>Waitlist</strong>
          <span>3 parties</span>
        </div>
        {parties.map((p) => (
          <div className="v-row" key={p.name}>
            <div className="turn-size">{p.size}</div>
            <div className="row-meta">
              <strong>{p.name}</strong>
              <small>Party of {p.size}</small>
            </div>
            <span className={`status ${p.ready ? "s3" : "s0"}`}>{p.wait}</span>
          </div>
        ))}
        <div className="turn-btn">Text Lee: your table is ready</div>
      </div>
    </div>
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
            <span className={`status s${o.step}`}>{pipeline[o.step]}</span>
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
        <p className="tax-progress">
          Step 5 of {steps.length} · {steps[4]}
        </p>
        <div className="tax-bar">
          <span style={{ width: `${(5 / steps.length) * 100}%` }} />
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

const hostParties = [
  { name: "Lee", size: 4, wait: "Ready" },
  { name: "Okafor", size: 2, wait: "12 min" },
  { name: "Martin", size: 6, wait: "25 min" },
  { name: "Silva", size: 3, wait: "31 min" },
];

function ProductShot() {
  const [texted, setTexted] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setTexted((t) => !t), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="device" aria-hidden="true">
      <div className="device-bar">
        <span />
        <span />
        <span />
        <div className="device-url">yourturn.to</div>
      </div>
      <div className="device-body">
        <aside className="device-side">
          <strong>Tonight</strong>
          <span className="is-on">Waitlist</span>
          <span>Bookings</span>
          <span>Seated</span>
        </aside>
        <div className="device-main">
          <div className="host-head">
            <div>
              <strong>Waitlist</strong>
              <small>4 parties · about 14 min average wait</small>
            </div>
            <span className="host-add">Add walk-in</span>
          </div>
          <div className="rows">
            {hostParties.map((p, i) => (
              <div className="row" key={p.name}>
                <div className="turn-size">{p.size}</div>
                <div className="row-meta">
                  <strong>{p.name}</strong>
                  <small>Party of {p.size}</small>
                </div>
                {i === 0 ? (
                  <span className={`status ${texted ? "s2" : "s3"}`}>
                    {texted ? "Text sent" : "Table ready"}
                  </span>
                ) : (
                  <span className="status s0">{p.wait}</span>
                )}
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
            <a href="#design">About</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
            <a className="nav-gh" href="https://github.com/kevnotdev">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero">
          <div className="hero-inner">
          <motion.p
            className="hero-kicker"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            Product builder · Built with AI coding agents
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            I build web products that are clean, useful, and{" "}
            <em className="serif">easy to work with.</em>
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          >
            I design and ship web and mobile apps with agentic coding tools like Claude Code and
            Codex. I care about clear interfaces, smooth flows, and shipping things that actually
            help the people using them.
          </motion.p>
          <motion.div
            className="hero-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            <a className="btn" href="#work">
              View selected work <Chevron />
            </a>
            <a className="link" href="https://github.com/kevnotdev">
              Open GitHub <Chevron />
            </a>
          </motion.div>
          </div>

          <motion.div ref={heroRef} className="hero-shot" style={{ scale: shotScale }}>
            <ProductShot />
          </motion.div>
        </section>

        {/* Statement */}
        <section className="statement" id="design">
          <Reveal>
            <p className="statement-kicker">Approach</p>
            <h2>
              I like software that feels simple on the surface
              <br />
              <span className="dim">
                and <em className="serif">solid</em> underneath.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="statement-body">
              I tend to focus on products with a lot of moving parts: dashboards, workflows, internal
              tools, and customer-facing flows that need to be clear without feeling heavy.
            </p>
          </Reveal>
        </section>

        {/* Principles */}
        <section className="principles" id="how">
          <Reveal className="section-head">
            <h2>How I build with AI</h2>
            <p>I bring the product thinking and design. AI coding agents help me build it, fast.</p>
          </Reveal>
          <div className="tiles">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="tile">
                <span className="tile-n">{String(i + 1).padStart(2, "0")}</span>
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
            <h2>Here are a few projects that show the kind of work I like doing.</h2>
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
                  {f.stack && <p className="feature-stack">{f.stack}</p>}
                  {f.note && <p className="feature-note">{f.note}</p>}
                  <a className="link" href={f.href}>
                    {f.linkLabel ?? "View on GitHub"} <Chevron />
                  </a>
                </div>
                <div className="feature-visual" aria-hidden="true">
                  {f.id === "turn" && <TurnVisual />}
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
              {inTheWorks.map(({ name, note }) => (
                <div className="works-tile" key={name}>
                  <span className="works-mono">{name[0]}</span>
                  <strong>{name}</strong>
                  <small>{note}</small>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Process */}
        <section className="process" id="process">
          <Reveal className="section-head">
            <h2>How I work</h2>
            <p>From first question to shipped code.</p>
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
              Always happy to talk products, design and building with AI.{" "}
              <em className="serif">Say hello.</em>
            </h2>
            <p>The best way to reach me is through GitHub.</p>
            <div className="hero-links">
              <a className="btn" href="https://github.com/kevnotdev">
                github.com/kevnotdev
              </a>
              <a className="link" href="https://yourturn.to">
                Visit yourturn.to <Chevron />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>Designed by Kevin, built with Claude Code.</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </MotionConfig>
  );
}
