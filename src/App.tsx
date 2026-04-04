import { motion } from "framer-motion";

type Project = {
  title: string;
  blurb: string;
  outcome: string;
  details: string;
  stack: string[];
  href: string;
};

const projects: Project[] = [
  {
    title: "AutoPawPrints",
    blurb:
      "An internal commerce workflow for turning Etsy pet portrait orders into a structured, AI-assisted production pipeline.",
    outcome:
      "Connected order intake, secure customer uploads, admin review, rerendering, reminders, and digital delivery in one flow.",
    details:
      "Built around Etsy OAuth and order-paid webhooks, with tokenized upload links, Prisma-backed persistence, and image processing that can use OpenAI, sharp, and pdf-lib.",
    stack: ["Next.js 15", "TypeScript", "Prisma", "Postgres", "BullMQ", "OpenAI"],
    href: "https://github.com/pawprintstogoco-ship-it/autopawprints",
  },
];

const stats = [
  { value: "1", label: "Featured case study" },
  { value: "100%", label: "Static-site deployable" },
  { value: "Live", label: "AI-assisted workflow thinking" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function App() {
  return (
    <div className="page-shell">
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" />
          <span>Kevin Lo</span>
        </div>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <motion.section
          className="hero"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p className="eyebrow" variants={item}>
            Product-minded developer
          </motion.p>

          <motion.h1 variants={item}>
            I build clean, modern interfaces that feel premium and ship reliably on the web.
          </motion.h1>

          <motion.p className="hero-copy" variants={item}>
            I build product-focused web experiences with a strong UX bar and a bias toward real
            operational usefulness. This site is deployed as a static frontend, so it runs cleanly
            on GitHub Pages while still using modern React, TypeScript, and Framer Motion.
          </motion.p>

          <motion.div className="hero-actions" variants={item}>
            <a className="button button-primary" href="#work">
              View selected work
            </a>
            <a className="button button-secondary" href="#contact">
              Let&apos;s talk
            </a>
          </motion.div>

          <motion.div className="stat-row" variants={container}>
            {stats.map((stat) => (
              <motion.div className="stat-card" key={stat.label} variants={item}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <section className="feature-grid" id="about">
          <motion.article
            className="feature-card feature-large"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="card-label">Approach</span>
            <h2>Design-forward engineering with a bias toward clarity.</h2>
            <p>
              I like products that look intentional, move with restraint, and make complicated
              things feel simple. My focus is building interfaces that are both visually sharp and
              operationally solid, especially when they sit close to real business workflows.
            </p>
          </motion.article>

          <motion.article
            className="feature-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="card-label">Stack</span>
            <p>
              TypeScript, React, Next.js, backend workflow integration, and frontend systems that
              feel polished instead of improvised.
            </p>
          </motion.article>

          <motion.article
            className="feature-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="card-label">Delivery</span>
            <p>
              Fast static deployment for the portfolio itself, with room to showcase more complex
              app work behind it.
            </p>
          </motion.article>
        </section>

        <section className="projects-section" id="work">
          <div className="section-heading">
            <span className="eyebrow">Selected work</span>
            <h2>Projects presented like product case studies, not just repo links.</h2>
          </div>

          <motion.div
            className="projects-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
          >
            {projects.map((project) => (
              <motion.article className="project-card" key={project.title} variants={item}>
                <div className="project-glow" aria-hidden="true" />
                <div className="project-header">
                  <span className="card-label">Case study</span>
                  <a href={project.href}>Open</a>
                </div>
                <h3>{project.title}</h3>
                <p>{project.blurb}</p>
                <p className="project-outcome">{project.outcome}</p>
                <p className="project-details">{project.details}</p>
                <div className="tag-row">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <motion.section
          className="contact-panel"
          id="contact"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="eyebrow">Contact</span>
            <h2>Have a product, portfolio, or frontend system that needs a higher bar?</h2>
          </div>
          <div className="contact-links">
            <a href="https://github.com/kevnotdev">github.com/kevnotdev</a>
            <a href="https://github.com/pawprintstogoco-ship-it/autopawprints">
              View AutoPawPrints
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
