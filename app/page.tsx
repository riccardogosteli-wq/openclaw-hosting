'use client'

import { useState } from 'react'

const de = {
  navBrand: 'OpenClaw Hosting',
  navHow: 'So funktioniert\'s',
  navPricing: 'Preise',
  navFaq: 'FAQ',
  navCta: 'Jetzt starten',

  heroBadge: '🇨🇭 In der Schweiz gehostet',
  heroH1: 'Ihr KI-Assistent. Läuft 24/7. Ohne Aufwand.',
  heroSub: 'OpenClaw läuft auf Ihrem eigenen Server – wir richten alles ein, warten ihn und halten ihn am Laufen. Sie chatten einfach los.',
  heroCta: 'Jetzt starten – CHF 24/Mo',
  heroGhost: 'Mehr erfahren',
  heroNote1: 'Kein Technikwissen nötig.',
  heroNote2: 'Jederzeit kündbar.',
  heroNote3: 'Setup in unter 10 Minuten.',

  costTitle: '💡 Transparente Gesamtkosten',
  costHosting: 'Hosting bei uns: CHF 24/Mo',
  costApi: 'KI-API direkt bei Anthropic/OpenAI: ca. CHF 5–20/Mo je nach Nutzung',
  costTotal: 'Gesamtkosten realistisch: CHF 29–44/Mo für einen 24/7-KI-Assistenten',

  howLabel: 'So einfach geht\'s',
  howH2: 'In 3 Schritten online',
  howSub: 'Kein Terminal. Kein SSH. Kein Technikwissen. Wir erledigen alles.',
  step1Title: 'Plan wählen & bezahlen',
  step1Desc: 'Wählen Sie Ihren Plan, bezahlen Sie bequem mit TWINT, Visa oder Mastercard – und wir erhalten sofort Ihre Bestellung.',
  step2Title: 'Onboarding-Formular ausfüllen',
  step2Desc: 'Sie teilen uns Ihren Telegram-Bot-Token und Ihren KI-API-Schlüssel mit. Das dauert ca. 5 Minuten – wir zeigen Ihnen wie.',
  step3Title: 'Ihr Agent startet',
  step3Desc: 'Wir richten Ihren persönlichen OpenClaw-Server ein und senden Ihnen eine Bestätigungs-E-Mail. Ihr Assistent ist bereit.',

  usecasesLabel: 'Was Ihr Assistent kann',
  usecasesH2: 'Ein Assistent. Unzählige Aufgaben.',
  uc1Title: 'E-Mails verwalten',
  uc1Desc: 'Tägliches E-Mail-Briefing, Entwürfe schreiben, wichtige Nachrichten hervorheben.',
  uc2Title: 'Kalender & Meetings',
  uc2Desc: 'Termine prüfen, Erinnerungen senden, Verfügbarkeit koordinieren.',
  uc3Title: 'Recherche & Zusammenfassungen',
  uc3Desc: 'Webseiten, PDFs und Nachrichten auf Knopfdruck zusammenfassen.',
  uc4Title: 'Automatisierungen',
  uc4Desc: 'Cron-Jobs, tägliche Briefings, Preisalerts – alles automatisch.',
  uc5Title: 'Sprachnachrichten',
  uc5Desc: 'Sprachnotizen aufnehmen, transkribieren lassen und als Text weiterverarbeiten.',
  uc6Title: 'Ihr eigener Workflow',
  uc6Desc: 'OpenClaw ist vollständig anpassbar. Wir helfen Ihnen beim Setup Ihrer Automationen.',

  pricingLabel: 'Preise',
  pricingH2: 'Einfach. Transparent. Fair.',
  pricingNote: '⚠️ Was Sie bei uns bezahlen: das Hosting und die Verwaltung Ihres Servers (CHF 24–44/Mo). Was Sie separat bei Anthropic, OpenAI oder Google bezahlen: Ihren eigenen API-Schlüssel für die KI-Nutzung (ca. CHF 5–20/Mo). Diese Kosten gehen direkt an Ihren KI-Anbieter – wir sehen diese Daten nie.',

  plan1Badge: '',
  plan1Name: 'Starter',
  plan1Desc: 'Perfekt für Einsteiger und Einzelpersonen',
  plan1Price: '24',
  plan1Annual: '→ CHF 220/Jahr (2 Monate gratis)',
  plan1F1: 'Eigener, dedizierter OpenClaw-Server',
  plan1F2: 'Telegram & Discord verbunden',
  plan1F3: 'Automatische Updates',
  plan1F4: 'E-Mail-Support (48h)',
  plan1F5: 'Jederzeit kündbar',
  plan1Dim1: 'Kein WhatsApp-Anschluss',
  plan1Dim2: 'Kein Onboarding-Call',
  plan1Cta: 'Starter wählen',

  plan2Badge: 'EMPFOHLEN',
  plan2Name: 'Pro',
  plan2Desc: 'Für Unternehmen & anspruchsvolle Nutzer',
  plan2Price: '44',
  plan2Annual: '→ CHF 400/Jahr (2 Monate gratis)',
  plan2F1: 'Eigener, dedizierter OpenClaw-Server',
  plan2F2: 'Telegram, Discord & WhatsApp',
  plan2F3: 'Automatische Updates & Monitoring',
  plan2F4: 'Prioritäts-Support (24h)',
  plan2F5: '30-Min. Onboarding-Call mit uns',
  plan2F6: 'Custom Skills & Automationen Setup',
  plan2F7: 'Jederzeit kündbar',
  plan2Cta: 'Pro wählen',

  compLabel: 'Vergleich',
  compH2: 'Warum nicht selbst hosten?',
  compCol1: 'Merkmal',
  compCol2: 'Selbst-Hosting',
  compCol3: 'OpenClaw Hosting',
  compRow1: ['Setup-Zeit', '60+ Minuten (SSH, Node.js, Server)', '< 10 Minuten'],
  compRow2: ['Technisches Wissen', 'Linux, SSH, CLI nötig', 'Nicht nötig'],
  compRow3: ['Updates', 'Manuell, Sie sind verantwortlich', 'Automatisch'],
  compRow4: ['Serverstandort', 'Je nach VPS-Anbieter', '🇨🇭 Schweiz / 🇪🇺 EU'],
  compRow5: ['Support', 'OpenClaw Community', 'Persönlicher Support auf Deutsch'],
  compRow6: ['Preis', 'CHF 5–15/Mo VPS + Ihre Zeit', 'CHF 24/Mo all-in'],
  compRow7: ['Uptime-Monitoring', 'Selbst einrichten', 'Inklusive'],

  faqLabel: 'Häufige Fragen',
  faqH2: 'Alles Wichtige auf einen Blick',
  faq1Q: 'Brauche ich technisches Wissen?',
  faq1A: 'Nein. Wir richten alles für Sie ein. Sie brauchen nur einen Telegram-Account und einen API-Schlüssel von Ihrem KI-Anbieter – das dauert 5 Minuten, wir zeigen Ihnen wie.',
  faq2Q: 'Was ist der API-Schlüssel und was kostet er?',
  faq2A: 'Ihr KI-Assistent braucht einen Zugang zu einem KI-Modell (Claude, GPT-4 oder Gemini). Diesen Schlüssel erstellen Sie selbst auf der Website Ihres Anbieters. Die Kosten sind nutzungsabhängig – typisch CHF 5–20/Mo für moderate Nutzung.',
  faq3Q: 'Wo sind meine Daten gespeichert?',
  faq3A: 'Ihr Server läuft in der Schweiz oder Deutschland (EU) – vollständig DSGVO/nDSG-konform. Ihren API-Schlüssel speichern wir nie – er geht direkt auf Ihren Server.',
  faq4Q: 'Welchen KI-Anbieter kann ich nutzen?',
  faq4A: 'OpenClaw unterstützt Claude (Anthropic), GPT-4 (OpenAI) und Gemini (Google). Wir empfehlen Claude Haiku für budgetfreundliche Nutzung oder Claude Sonnet für maximale Qualität.',
  faq5Q: 'Kann ich jederzeit kündigen?',
  faq5A: 'Ja. Keine Mindestlaufzeit beim Monatsabo. Beim Jahresabo läuft der Rest der Laufzeit aus. Kein versteckter Ärger.',
  faq6Q: 'Was passiert, wenn OpenClaw aktualisiert wird?',
  faq6A: 'Wir testen neue OpenClaw-Versionen zuerst und spielen Updates automatisch ein – ohne Downtime. Sie müssen nichts tun.',
  faq7Q: 'Wie komme ich mit meinem Assistenten in Kontakt?',
  faq7A: 'Über Telegram (alle Pläne), Discord (alle Pläne) oder WhatsApp (Pro-Plan). Einfach Nachricht schicken – wie mit einem Menschen.',
  faq8Q: 'Bieten Sie Support auf Deutsch?',
  faq8A: 'Ja – auf Deutsch und Englisch. Kein automatisierter Chatbot, sondern echte Menschen, die OpenClaw kennen und nutzen.',

  footerText: '© 2026 Alexandra Gosteli Digital Solutions · ',
  footerLink: 'openclaw-consulting.ch',
  footerPrivacy: 'Datenschutz',
  footerImprint: 'Impressum',
}

const en = {
  navBrand: 'OpenClaw Hosting',
  navHow: 'How it works',
  navPricing: 'Pricing',
  navFaq: 'FAQ',
  navCta: 'Get started',

  heroBadge: '🇨🇭 Hosted in Switzerland',
  heroH1: 'Your AI assistant. Running 24/7. Zero hassle.',
  heroSub: 'OpenClaw runs on your own private server — we set it up, maintain it, and keep it running. You just chat.',
  heroCta: 'Get started – CHF 24/mo',
  heroGhost: 'Learn more',
  heroNote1: 'No technical skills needed.',
  heroNote2: 'Cancel anytime.',
  heroNote3: 'Live in under 10 minutes.',

  costTitle: '💡 Full cost transparency',
  costHosting: 'Hosting with us: CHF 24/mo',
  costApi: 'AI API directly with Anthropic/OpenAI: approx. CHF 5–20/mo depending on usage',
  costTotal: 'Realistic total: CHF 29–44/mo for a 24/7 AI assistant',

  howLabel: 'How it works',
  howH2: 'Live in 3 steps',
  howSub: 'No terminal. No SSH. No technical knowledge required. We handle everything.',
  step1Title: 'Choose a plan & pay',
  step1Desc: 'Pick your plan and pay with TWINT, Visa or Mastercard — we\'ll receive your order instantly.',
  step2Title: 'Fill in the onboarding form',
  step2Desc: 'Share your Telegram bot token and AI API key. Takes about 5 minutes — we\'ll show you how.',
  step3Title: 'Your agent goes live',
  step3Desc: 'We set up your personal OpenClaw server and send you a confirmation email. Your assistant is ready.',

  usecasesLabel: 'What your assistant can do',
  usecasesH2: 'One assistant. Countless tasks.',
  uc1Title: 'Email management',
  uc1Desc: 'Daily email briefings, draft replies, highlight important messages.',
  uc2Title: 'Calendar & meetings',
  uc2Desc: 'Check availability, set reminders, coordinate schedules.',
  uc3Title: 'Research & summaries',
  uc3Desc: 'Summarize websites, PDFs and news on demand.',
  uc4Title: 'Automation',
  uc4Desc: 'Cron jobs, daily briefings, price alerts — fully automated.',
  uc5Title: 'Voice messages',
  uc5Desc: 'Record voice notes, get transcriptions and process them as text.',
  uc6Title: 'Your own workflow',
  uc6Desc: 'OpenClaw is fully customizable. We help you set up your automations.',

  pricingLabel: 'Pricing',
  pricingH2: 'Simple. Transparent. Fair.',
  pricingNote: '⚠️ What you pay us: hosting and server management (CHF 24–44/mo). What you pay separately to Anthropic, OpenAI or Google: your own API key for AI usage (approx. CHF 5–20/mo). These costs go directly to your AI provider — we never see that data.',

  plan1Badge: '',
  plan1Name: 'Starter',
  plan1Desc: 'Perfect for individuals and beginners',
  plan1Price: '24',
  plan1Annual: '→ CHF 220/year (2 months free)',
  plan1F1: 'Your own dedicated OpenClaw server',
  plan1F2: 'Telegram & Discord connected',
  plan1F3: 'Automatic updates',
  plan1F4: 'Email support (48h)',
  plan1F5: 'Cancel anytime',
  plan1Dim1: 'No WhatsApp connection',
  plan1Dim2: 'No onboarding call',
  plan1Cta: 'Choose Starter',

  plan2Badge: 'RECOMMENDED',
  plan2Name: 'Pro',
  plan2Desc: 'For businesses & power users',
  plan2Price: '44',
  plan2Annual: '→ CHF 400/year (2 months free)',
  plan2F1: 'Your own dedicated OpenClaw server',
  plan2F2: 'Telegram, Discord & WhatsApp',
  plan2F3: 'Automatic updates & uptime monitoring',
  plan2F4: 'Priority support (24h)',
  plan2F5: '30-min onboarding call with us',
  plan2F6: 'Custom skills & automation setup',
  plan2F7: 'Cancel anytime',
  plan2Cta: 'Choose Pro',

  compLabel: 'Comparison',
  compH2: 'Why not self-host?',
  compCol1: 'Feature',
  compCol2: 'Self-hosting',
  compCol3: 'OpenClaw Hosting',
  compRow1: ['Setup time', '60+ minutes (SSH, Node.js, server)', '< 10 minutes'],
  compRow2: ['Technical knowledge', 'Linux, SSH, CLI required', 'Not required'],
  compRow3: ['Updates', 'Manual, your responsibility', 'Automatic'],
  compRow4: ['Server location', 'Depends on VPS provider', '🇨🇭 Switzerland / 🇪🇺 EU'],
  compRow5: ['Support', 'OpenClaw community', 'Personal support in English & German'],
  compRow6: ['Price', 'CHF 5–15/mo VPS + your time', 'CHF 24/mo all-in'],
  compRow7: ['Uptime monitoring', 'Set up yourself', 'Included'],

  faqLabel: 'FAQ',
  faqH2: 'Everything you need to know',
  faq1Q: 'Do I need technical skills?',
  faq1A: 'No. We set everything up for you. You just need a Telegram account and an API key from your AI provider — that takes 5 minutes and we\'ll show you how.',
  faq2Q: 'What is an API key and what does it cost?',
  faq2A: 'Your AI assistant needs access to an AI model (Claude, GPT-4, or Gemini). You create this key yourself on your provider\'s website. Costs are usage-based — typically CHF 5–20/mo for moderate use.',
  faq3Q: 'Where is my data stored?',
  faq3A: 'Your server runs in Switzerland or Germany (EU) — fully GDPR/nDSG compliant. We never store your API key — it goes directly onto your server.',
  faq4Q: 'Which AI provider can I use?',
  faq4A: 'OpenClaw supports Claude (Anthropic), GPT-4 (OpenAI) and Gemini (Google). We recommend Claude Haiku for budget-friendly use or Claude Sonnet for maximum quality.',
  faq5Q: 'Can I cancel anytime?',
  faq5A: 'Yes. No minimum term on monthly plans. Annual plans run until the end of the period. No hidden fees or surprises.',
  faq6Q: 'What happens when OpenClaw updates?',
  faq6A: 'We test new OpenClaw versions first and roll out updates automatically — zero downtime. You don\'t need to do anything.',
  faq7Q: 'How do I talk to my assistant?',
  faq7A: 'Via Telegram (all plans), Discord (all plans), or WhatsApp (Pro plan). Just send a message — like texting a person.',
  faq8Q: 'Do you offer German-language support?',
  faq8A: 'Yes — in both German and English. No automated chatbots, just real people who actually use and understand OpenClaw.',

  footerText: '© 2026 Alexandra Gosteli Digital Solutions · ',
  footerLink: 'openclaw-consulting.ch',
  footerPrivacy: 'Privacy',
  footerImprint: 'Imprint',
}

export default function Home() {
  const [lang, setLang] = useState<'de'|'en'>('de')
  const t = lang === 'de' ? de : en

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="#" className="nav-brand">{t.navBrand}</a>
          <div className="nav-links">
            <a href="#how">{t.navHow}</a>
            <a href="#pricing">{t.navPricing}</a>
            <a href="#faq">{t.navFaq}</a>
            <button className="lang-btn" onClick={() => setLang(l => l === 'de' ? 'en' : 'de')}>
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <a href="#pricing" className="nav-cta">{t.navCta}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">{t.heroBadge}</div>
          <h1>{t.heroH1}</h1>
          <p className="hero-sub">{t.heroSub}</p>
          <div className="hero-actions">
            <a href="#pricing" className="btn-primary">{t.heroCta}</a>
            <a href="#how" className="btn-ghost">{t.heroGhost}</a>
          </div>
          <p className="hero-note">
            <strong>{t.heroNote1}</strong> &nbsp;{t.heroNote2} &nbsp;{t.heroNote3}
          </p>
        </div>
      </section>

      {/* COST TRANSPARENCY STRIP */}
      <div className="cost-strip">
        <div className="container cost-strip-inner">
          <span>💡 {lang === 'de' ? 'Transparente Gesamtkosten' : 'Full cost transparency'}:</span>
          <strong>{t.costHosting}</strong>
          <span className="cost-sep">+</span>
          <span>{t.costApi}</span>
          <span className="cost-sep">=</span>
          <strong>{t.costTotal}</strong>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <div className="container">
          <div className="section-label">{t.howLabel}</div>
          <h2>{t.howH2}</h2>
          <p className="section-sub">{t.howSub}</p>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>{t.step1Title}</h3>
              <p>{t.step1Desc}</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>{t.step2Title}</h3>
              <p>{t.step2Desc}</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>{t.step3Title}</h3>
              <p>{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="use-cases">
        <div className="container">
          <div className="section-label">{t.usecasesLabel}</div>
          <h2>{t.usecasesH2}</h2>
          <div className="use-cases-grid" style={{marginTop:'2rem'}}>
            {[
              {icon:'📧', title:t.uc1Title, desc:t.uc1Desc},
              {icon:'📅', title:t.uc2Title, desc:t.uc2Desc},
              {icon:'🔍', title:t.uc3Title, desc:t.uc3Desc},
              {icon:'⚡', title:t.uc4Title, desc:t.uc4Desc},
              {icon:'🎙️', title:t.uc5Title, desc:t.uc5Desc},
              {icon:'🛠️', title:t.uc6Title, desc:t.uc6Desc},
            ].map((uc, i) => (
              <div key={i} className="use-case-card">
                <div className="use-case-icon">{uc.icon}</div>
                <h3>{uc.title}</h3>
                <p>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-label">{t.pricingLabel}</div>
          <h2>{t.pricingH2}</h2>
          <div className="pricing-note">{t.pricingNote}</div>
          <div className="plans">
            {/* Starter */}
            <div className="plan">
              {t.plan1Badge && <span className="plan-badge">{t.plan1Badge}</span>}
              <h3>{t.plan1Name}</h3>
              <p className="plan-desc">{t.plan1Desc}</p>
              <div className="plan-price">
                <span className="amount">CHF {t.plan1Price}</span>
                <span className="per">/mo</span>
              </div>
              <p className="plan-annual">{t.plan1Annual}</p>
              <ul className="plan-features">
                <li>{t.plan1F1}</li>
                <li>{t.plan1F2}</li>
                <li>{t.plan1F3}</li>
                <li>{t.plan1F4}</li>
                <li>{t.plan1F5}</li>
                <li className="dim">{t.plan1Dim1}</li>
                <li className="dim">{t.plan1Dim2}</li>
              </ul>
              <a href="mailto:hello@openclaw-consulting.ch?subject=OpenClaw Hosting Starter" className="plan-cta ghost">{t.plan1Cta}</a>
            </div>
            {/* Pro */}
            <div className="plan featured">
              <span className="plan-badge">{t.plan2Badge}</span>
              <h3>{t.plan2Name}</h3>
              <p className="plan-desc">{t.plan2Desc}</p>
              <div className="plan-price">
                <span className="amount">CHF {t.plan2Price}</span>
                <span className="per">/mo</span>
              </div>
              <p className="plan-annual">{t.plan2Annual}</p>
              <ul className="plan-features">
                <li>{t.plan2F1}</li>
                <li>{t.plan2F2}</li>
                <li>{t.plan2F3}</li>
                <li>{t.plan2F4}</li>
                <li>{t.plan2F5}</li>
                <li>{t.plan2F6}</li>
                <li>{t.plan2F7}</li>
              </ul>
              <a href="mailto:hello@openclaw-consulting.ch?subject=OpenClaw Hosting Pro" className="plan-cta">{t.plan2Cta}</a>
            </div>
          </div>
          <p style={{marginTop:'1.5rem', fontSize:'0.85rem', color:'var(--dim)'}}>
            {lang === 'de'
              ? '💳 Zahlung via TWINT, Visa & Mastercard. Abrechnung über Payrexx – sicher und Swiss-hosted.'
              : '💳 Payment via TWINT, Visa & Mastercard. Billed via Payrexx – secure and Swiss-hosted.'}
          </p>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="comparison" id="compare">
        <div className="container">
          <div className="section-label">{t.compLabel}</div>
          <h2>{t.compH2}</h2>
          <div style={{overflowX:'auto', marginTop:'2rem'}}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>{t.compCol1}</th>
                  <th>{t.compCol2}</th>
                  <th>{t.compCol3}</th>
                </tr>
              </thead>
              <tbody>
                {[t.compRow1, t.compRow2, t.compRow3, t.compRow4, t.compRow5, t.compRow6, t.compRow7].map((row, i) => (
                  <tr key={i}>
                    <td>{row[0]}</td>
                    <td className="no">{row[1]}</td>
                    <td className="us">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-label">{t.faqLabel}</div>
          <h2>{t.faqH2}</h2>
          <div className="faq-grid" style={{marginTop:'2rem'}}>
            {[
              {q:t.faq1Q, a:t.faq1A},
              {q:t.faq2Q, a:t.faq2A},
              {q:t.faq3Q, a:t.faq3A},
              {q:t.faq4Q, a:t.faq4A},
              {q:t.faq5Q, a:t.faq5A},
              {q:t.faq6Q, a:t.faq6A},
              {q:t.faq7Q, a:t.faq7A},
              {q:t.faq8Q, a:t.faq8A},
            ].map((f, i) => (
              <div key={i} className="faq-item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{padding:'5rem 0', textAlign:'center', background:'var(--surface)', borderTop:'1px solid var(--border)'}}>
        <div className="container">
          <h2 style={{fontSize:'2rem', marginBottom:'1rem'}}>
            {lang === 'de' ? 'Bereit für Ihren KI-Assistenten?' : 'Ready for your AI assistant?'}
          </h2>
          <p style={{color:'var(--muted)', marginBottom:'2rem', fontSize:'1.05rem'}}>
            {lang === 'de'
              ? 'Kein Techniker nötig. Wir richten alles ein – in unter 10 Minuten.'
              : 'No tech skills needed. We set everything up — in under 10 minutes.'}
          </p>
          <a href="mailto:hello@openclaw-consulting.ch?subject=OpenClaw Hosting" className="btn-primary" style={{fontSize:'1.1rem', padding:'1rem 2.5rem'}}>
            {lang === 'de' ? 'Jetzt anfragen' : 'Get in touch'}
          </a>
          <p style={{marginTop:'1rem', fontSize:'0.85rem', color:'var(--dim)'}}>
            {lang === 'de' ? 'Oder schreiben Sie uns: hello@openclaw-consulting.ch' : 'Or email us: hello@openclaw-consulting.ch'}
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>
            {t.footerText}
            <a href={`https://${t.footerLink}`}>{t.footerLink}</a>
            {' · '}
            <a href="/datenschutz">{t.footerPrivacy}</a>
            {' · '}
            <a href="/impressum">{t.footerImprint}</a>
          </p>
        </div>
      </footer>
    </>
  )
}
