import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease },
};

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node",
  "Prisma",
  "Postgres",
  "BullMQ",
  "OpenAI",
  "Framer Motion",
  "Vite",
  "Codex",
  "Claude Code",
];

const project = {
  title: "AutoPawPrints",
  blurb:
    "A workflow app for handling Etsy pet portrait orders from payment through upload, review, and delivery.",
  outcome:
    "It pulls the order flow into one place instead of juggling messages, uploads, approvals, and fulfillment by hand.",
  details:
    "The app uses Etsy OAuth and webhooks, token-based upload links, Prisma with Postgres, and image processing with OpenAI, sharp, and pdf-lib.",
  stack: ["Next.js 15", "TypeScript", "Prisma", "Postgres", "BullMQ", "OpenAI"],
  href: "https://github.com/pawprintstogoco-ship-it/autopawprints",
};

const pipeline = [
  { label: "Paid", hint: "Etsy webhook" },
  { label: "Upload", hint: "Token link" },
  { label: "Review", hint: "AI + approval" },
  { label: "Delivered", hint: "PDF + email" },
];

const orders = [
  { id: "#4821", pet: "Biscuit", kind: "Golden retriever", step: 3 },
  { id: "#4819", pet: "Miso", kind: "Tabby cat", step: 2 },
  { id: "#4816", pet: "Pepper", kind: "Border collie", step: 1 },
];

function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4.5 11.5l7-7m0 0H6m5.5 0V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function PipelineMock() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % pipeline.length), 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar">
        <span />
        <span />
        <span />
        <div className="mock-url">autopawprints.app/orders</div>
      </div>

      <div className="mock-body">
        <div className="pipeline">
          <div className="pipeline-track">
            <motion.div
              className="pipeline-fill"
              animate={{ width: `${(active / (pipeline.length - 1)) * 100}%` }}
              transition={{ duration: 0.9, ease }}
            />
          </div>
          {pipeline.map((step, i) => (
            <div className={`pipe-step ${i <= active ? "is-done" : ""}`} key={step.label}>
              <motion.div
                className="pipe-dot"
                animate={i === active ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {i < active ? "✓" : i + 1}
              </motion.div>
              <strong>{step.label}</strong>
              <small>{step.hint}</small>
            </div>
          ))}
        </div>

        <div className="order-list">
          {orders.map((o, i) => (
            <motion.div
              className="order-row"
              key={o.id}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease }}
            >
              <div className="order-avatar">{o.pet[0]}</div>
              <div className="order-meta">
                <strong>
                  {o.pet} <span>{o.id}</span>
                </strong>
                <small>{o.kind}</small>
              </div>
              <span className={`order-status s${o.step}`}>{pipeline[o.step].label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="page-shell">
        <div className="bg" aria-hidden="true">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="orb orb-c" />
          <div className="grid-lines" />
          <div className="noise" />
        </div>

        <motion.header
          className="topbar"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <a className="brand" href="#top">
            <span className="brand-mark">K</span>
            <span>Kevin</span>
          </a>
          <nav>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav-cta" href="https://github.com/kevnotdev">
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        </motion.header>

        <main id="top">
          <motion.section className="hero" variants={container} initial="hidden" animate="show">
            <motion.div className="status-pill" variants={item}>
              <span className="pulse" />
              Developer portfolio · building with TypeScript, Codex &amp; Claude Code
            </motion.div>

            <motion.h1 variants={item}>
              I build web products that are{" "}
              <em className="accent">clean, useful,</em> and easy to work with.
            </motion.h1>

            <motion.div className="hero-bottom" variants={item}>
              <p className="hero-copy">
                Most of my work sits somewhere between product UI and internal tools. I care about
                clear interfaces, smooth flows, and shipping things that actually help the people
                using them.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  View selected work
                  <Arrow />
                </a>
                <a className="button button-secondary" href="https://github.com/kevnotdev">
                  <GitHubIcon />
                  Open GitHub
                </a>
              </div>
            </motion.div>
          </motion.section>

          <motion.div
            className="marquee"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="marquee-track">
              {[...stack, ...stack].map((t, i) => (
                <span key={i} aria-hidden={i >= stack.length}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <section className="projects-section" id="work">
            <motion.div className="section-heading" {...reveal}>
              <span className="eyebrow">
                <span className="eyebrow-num">01</span> Selected work
              </span>
              <h2>
                Here’s one project that shows the <em className="accent">kind of work</em> I like
                doing.
              </h2>
            </motion.div>

            <motion.article className="project-card" onMouseMove={spotlight} {...reveal}>
              <div className="project-text">
                <div className="project-header">
                  <span className="card-label">Case study</span>
                  <span className="project-year">Full-stack · Workflow</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-blurb">{project.blurb}</p>

                <dl className="project-facts">
                  <div>
                    <dt>Outcome</dt>
                    <dd>{project.outcome}</dd>
                  </div>
                  <div>
                    <dt>Under the hood</dt>
                    <dd>{project.details}</dd>
                  </div>
                </dl>

                <div className="tag-row">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <a className="text-link" href={project.href}>
                  View on GitHub <Arrow />
                </a>
              </div>

              <PipelineMock />
            </motion.article>
          </section>

          <section className="about-section" id="about">
            <motion.div className="section-heading" {...reveal}>
              <span className="eyebrow">
                <span className="eyebrow-num">02</span> About
              </span>
            </motion.div>

            <div className="bento">
              <motion.article className="bento-card bento-large" onMouseMove={spotlight} {...reveal}>
                <span className="card-label">Approach</span>
                <h2>
                  I like software that feels <em className="accent">simple on the surface</em> and
                  solid underneath.
                </h2>
                <p>
                  I tend to focus on products with a lot of moving parts: dashboards, workflows,
                  internal tools, and customer-facing flows that need to be clear without feeling
                  heavy.
                </p>
              </motion.article>

              <motion.article
                className="bento-card"
                onMouseMove={spotlight}
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.08 }}
              >
                <span className="card-label">Stack</span>
                <div className="big-mark">TS</div>
                <p>
                  I mostly work in TypeScript with React and Next.js. I also use tools like Codex
                  and Claude Code as part of the build process, especially for iteration and
                  implementation speed.
                </p>
              </motion.article>

              <motion.article
                className="bento-card"
                onMouseMove={spotlight}
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.16 }}
              >
                <span className="card-label">Delivery</span>
                <div className="big-mark">
                  <span className="mini-flow">
                    <i /> <i /> <i />
                  </span>
                </div>
                <p>
                  This site is a static portfolio on GitHub Pages, but the projects I want to
                  showcase here are fuller app builds with backend logic, workflows, and
                  integrations.
                </p>
              </motion.article>
            </div>
          </section>

          <motion.section className="contact-panel" id="contact" {...reveal}>
            <div className="contact-glow" aria-hidden="true" />
            <span className="eyebrow eyebrow-light">
              <span className="eyebrow-num">03</span> Contact
            </span>
            <h2>
              If you’re building a product and need someone who cares about both UI and
              implementation, <em className="accent">let’s talk.</em>
            </h2>
            <div className="contact-links">
              <a className="button button-light" href="https://github.com/kevnotdev">
                <GitHubIcon />
                github.com/kevnotdev
              </a>
              <a className="button button-ghost" href={project.href}>
                View AutoPawPrints
                <Arrow />
              </a>
            </div>
          </motion.section>
        </main>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Kevin</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </MotionConfig>
  );
}
