'use client'
import { useState } from 'react'

/* ─── CONTENT ───────────────────────────────────────────────────── */
const de = {
  navBrand1: 'OpenClaw', navBrand2: 'Hosting',
  navHow: 'So funktioniert\'s', navPricing: 'Preise', navFaq: 'FAQ',
  navCta: 'Jetzt starten',

  badge: '🇨🇭 In der Schweiz gehostet',
  h1a: 'Ihr KI-Assistent.',
  h1b: 'Läuft 24/7.',
  h1c: 'Ohne Aufwand.',
  sub: 'OpenClaw auf Ihrem eigenen Server – wir richten alles ein, warten ihn und halten ihn am Laufen. Sie chatten einfach los. Auf Deutsch.',
  cta: 'Jetzt starten – ab CHF 19/Mt.',
  ghost: 'Mehr erfahren',
  n1: '✓ Kein Technikwissen nötig',
  n2: '✓ Jederzeit kündbar',
  n3: '✓ Setup in < 10 Min.',
  trustBanner: '🔒 Wir speichern Ihren API-Schlüssel und Telegram-Token nie auf unseren Systemen — sie werden ausschliesslich auf Ihrem eigenen, privaten Server in der Schweiz gespeichert.',

  chatMessages: [
    { bot: true, text: 'Guten Morgen! Hier Ihr Tagesbriefing:' },
    { bot: true, text: '📧 2 neue E-Mails — 1 dringend\n📅 3 Termine heute (9:00 / 14:00 / 16:30)\n🌤️ 11°C in Zürich, sonnig' },
    { bot: false, text: 'Fasse dieses YouTube-Video zusammen: https://youtu.be/dQw4w9WgXcQ' },
    { bot: true, text: '📺 Zusammenfassung: Das Video erklärt die wichtigsten Trends in der KI-Automatisierung für 2026 — besonders interessant ab Minute 4:30 zum Thema Agenten-Workflows. Soll ich die Kernpunkte als Liste aufbereiten?' },
  ],

  costLabel: '💡 Transparente Gesamtkosten — weil wir nichts verstecken',
  costUs: 'Hosting: CHF 19–59/Mt.',
  costApi: 'KI-API direkt bei Ihrem Anbieter: ca. CHF 5–20/Mt.',
  costTotal: 'Gesamtkosten typisch: CHF 24–79/Mt.',

  stat1n: '< 10 Min', stat1l: 'bis zur Inbetriebnahme',
  stat2n: '24/7', stat2l: 'Verfügbarkeit angestrebt',
  stat3n: '🇨🇭', stat3l: 'In der Schweiz gehostet',
  stat4n: 'ab CHF 19', stat4l: 'pro Monat',

  howLabel: 'So einfach geht\'s', howH2: 'In 3 Schritten live',
  howSub: 'Kein Terminal. Kein SSH. Kein Technikwissen. Wir erledigen alles.',
  s1t: '1. Plan wählen & bezahlen',
  s1d: 'Wählen Sie Ihren Plan und bezahlen Sie bequem mit TWINT, Visa oder Mastercard. Innerhalb weniger Minuten erhalten Sie eine Bestätigung.',
  s2t: '2. Onboarding-Formular ausfüllen',
  s2d: 'Sie teilen uns den Telegram-Bot-Token und Ihren KI-API-Schlüssel mit. Wir führen Sie Schritt für Schritt durch den Prozess — dauert ca. 5 Minuten.',
  s3t: '3. Ihr Assistent ist online',
  s3d: 'Wir richten Ihren privaten Server in der Schweiz ein und senden Ihnen eine Bestätigungs-E-Mail. Ihr 24/7-Assistent ist bereit.',

  dashLabel: 'Ihr persönliches Dashboard', dashH2: 'Alles auf einen Blick — nur für Sie.',
  dashSub: 'Jeder Kunde erhält ein persönliches, passwortgeschütztes Dashboard. Sicher, nur über einen privaten Link erreichbar — niemand sonst hat Zugang.',
  dashPoints: [
    '🔒 Zugänglich nur mit Ihrem persönlichen Link — kein Login, kein gemeinsamer Server',
    '🇨🇭 Dashboard läuft auf Ihrem eigenen Server in der Schweiz',
    '🌤️ Live-Wetter für Ihren Standort (anpassbar)',
    '🤖 Status Ihres Assistenten in Echtzeit',
    '🔗 Übersicht aller möglichen Integrationen mit Telegram-Befehlen',
    '⚙️ Modell wechseln und Einstellungen anpassen — direkt im Browser',
  ],
  ucLabel: 'Was Ihr Assistent kann', ucH2: 'Ein Assistent. Unzählige Aufgaben.',
  ucSub: 'OpenClaw verbindet sich mit Ihren Tools und arbeitet proaktiv — nicht nur dann, wenn Sie etwas fragen.',
  ucs: [
    { icon:'📧', t:'E-Mail-Management', d:'Tägliches Briefing, Antworten entwerfen, wichtige Mails priorisieren und Postfach automatisch sortieren.', ex:'"Welche Mails brauchen heute meine Antwort?"' },
    { icon:'📅', t:'Kalender & Meetings', d:'Termine abfragen, Verfügbarkeit prüfen, Erinnerungen setzen und Meetings direkt aus dem Chat heraus organisieren.', ex:'"Buche ein Meeting mit Max nächste Woche"' },
    { icon:'📺', t:'YouTube & Web zusammenfassen', d:'YouTube-Videos, Webseiten, PDFs und Nachrichtenartikel in Sekunden auf das Wesentliche reduzieren.', ex:'"Fasse dieses YouTube-Video zusammen: [URL]"' },
    { icon:'⚡', t:'Automatisierungen & Cron-Jobs', d:'Tägliche Briefings, Preisalarme, Newsletter-Zusammenfassungen und Erinnerungen — vollautomatisch, ohne Ihr Zutun.', ex:'"Täglich um 8 Uhr: Wetter + Kalender + Top-Mails"' },
    { icon:'🎙️', t:'Sprachnachrichten & Diktate', d:'Spracheingabe während der Fahrt: Notizen diktieren, transkribieren lassen, Aufgaben erstellen — alles ohne Tippen.', ex:'"Erstelle eine Aufgabe aus dieser Sprachnotiz"' },
    { icon:'📊', t:'Wöchentliche Reports', d:'Umsatzübersichten, Projektfortschritte oder Team-Updates — automatisch aus Ihren Daten zusammengestellt und per Telegram geliefert.', ex:'"Erstelle meinen Wochenbericht"' },
    { icon:'📰', t:'News & Branchen-Monitoring', d:'Täglich kuratierte News zu Ihren Themen — kein Nachrichtenflut, nur was wirklich relevant ist.', ex:'"Was ist heute in der KI-Welt passiert?"' },
    { icon:'✍️', t:'Texte & Inhalte erstellen', d:'Blog-Artikel, Social-Media-Posts, Produktbeschreibungen, Angebote und E-Mails auf Knopfdruck — markenkonform und mehrsprachig.', ex:'"Schreibe einen LinkedIn-Post über unser neues Produkt"' },
    { icon:'🔗', t:'Tool-Integrationen', d:'Gmail, Google Calendar, Google Sheets, Notion, JIRA, Slack, WordPress, Shopify und viele mehr — nahtlos verbunden.', ex:'"Erstelle ein JIRA-Ticket für diesen Bug"' },
    { icon:'📈', t:'Finanz- & Markt-Monitoring', d:'Portfolio-Überblick, Währungskurse, Aktienalarme und wöchentliche Finanz-Briefings — alles in Telegram.', ex:'"Wie steht mein Portfolio heute?"' },
    { icon:'🌍', t:'Sprachen & Übersetzungen', d:'Texte übersetzen, Fremdsprachen üben mit täglichen Vokabel-Briefings, Sprachnotizen auf Deutsch erhalten.', ex:'"Übersetze diese E-Mail auf Englisch und Französisch"' },
    { icon:'👤', t:'Persönlicher Alltags-Assistent', d:'Reiseplanung, Restaurantsuche, Rezeptideen, Einkaufslisten, Arzttermine koordinieren — alles bequem per Telegram.', ex:'"Plane mein Wochenende in Zürich"' },
  ],

  secLabel: 'Sicherheit', secH2: 'Ihre Daten sind sicher. Wirklich.',
  secSub: 'Wir wissen, dass die Frage nach Sicherheit berechtigt ist. Hier sind die konkreten Antworten.',
  secItems: [
    {
      icon: '🔑',
      title: 'API-Schlüssel: direkt auf Ihren Server',
      desc: 'Ihr KI-API-Schlüssel wird beim Onboarding einmalig übertragen und direkt auf Ihrem privaten Server gespeichert. Wir sehen ihn nicht, speichern ihn nicht und haben danach keinen Zugriff darauf.',
    },
    {
      icon: '🖥️',
      title: 'Ihr eigener, isolierter Server',
      desc: 'Jeder Kunde erhält einen eigenen, vollständig isolierten Server in der Schweiz. Keine geteilte Infrastruktur, kein gemeinsamer Speicher — Ihre Daten liegen nur bei Ihnen.',
    },
    {
      icon: '🇨🇭',
      title: 'Datenhaltung in der Schweiz',
      desc: 'Ihr Server läuft bei einem Schweizer Anbieter und unterliegt dem Schweizer Datenschutzgesetz (nDSG) sowie der DSGVO. Keine Weitergabe an Dritte, keine Daten ausserhalb der Schweiz/EU.',
    },
    {
      icon: '🔒',
      title: 'Telegram-Token: ausschliesslich auf Ihrem Server',
      desc: 'Ihr Telegram-Bot-Token wird ebenfalls nur auf Ihrem Server gespeichert. OpenClaw kommuniziert damit direkt mit Telegram — ohne Umweg über unsere Infrastruktur.',
    },
    {
      icon: '👁️',
      title: 'Wir lesen Ihre Nachrichten nicht',
      desc: 'Wir haben technisch keinen Zugriff auf Ihre Chat-Verläufe. Alle Gespräche mit Ihrem Assistenten laufen verschlüsselt zwischen Telegram und Ihrem Server ab.',
    },
    {
      icon: '🚫',
      title: 'Kein Vendor Lock-in',
      desc: 'OpenClaw ist Open Source. Wenn Sie den Dienst beenden, können Sie Ihren Server und alle Daten jederzeit mitnehmen oder löschen lassen. Keine Abhängigkeit von uns.',
    },
  ],

  pLabel: 'Preise', pH2: 'Einfach. Transparent. Fair.',
  pNote: '⚠️ Was Sie uns bezahlen: den Betrieb Ihres privaten Servers in der Schweiz (CHF 19–59/Mt.). Was Sie separat bezahlen: Ihren eigenen API-Schlüssel direkt bei Ihrem KI-Anbieter (ca. CHF 5–20/Mt. je nach Nutzung). Diese Kosten gehen direkt an Anthropic, OpenAI oder Google — wir sehen diese Daten nie.',

  p1n: 'Starter', p1d: 'Für Einsteiger und Privatpersonen',
  p1p: '19', p1a: '→ CHF 180/Jahr (2 Monate gratis)',
  p1fs: ['2 vCPU · 4 GB RAM · 50 GB SSD', '🇨🇭 Privater Server in der Schweiz', 'Telegram, Discord & WhatsApp', '🎙️ Sprachnotizen (Whisper vorinstalliert)', 'Automatische Updates, Monitoring & tägliche Backups', 'E-Mail-Support (48 Std.)', 'Jederzeit kündbar'],
  p1ds: ['Kein Dashboard', 'Kein Onboarding-Call'],
  p1cta: 'Starter wählen',

  p2badge: 'EMPFOHLEN', p2n: 'Pro', p2d: 'Für Power-User und Freelancer',
  p2p: '34', p2a: '→ CHF 320/Jahr (2 Monate gratis)',
  p2fs: ['4 vCPU · 8 GB RAM · 80 GB SSD', '🇨🇭 Privater Server in der Schweiz', 'Telegram, Discord & WhatsApp', '🎙️ Sprachnotizen (Whisper vorinstalliert)', 'Automatische Updates, Monitoring & tägliche Backups', '✅ Persönliches Dashboard (nur für Sie zugänglich)', 'E-Mail-Support (24 Std.)', 'Jederzeit kündbar'],
  p2ds: ['Kein Onboarding-Call'],
  p2cta: 'Pro wählen',

  p3badge: 'BUSINESS', p3n: 'Business', p3d: 'Für Unternehmen und Teams',
  p3p: '59', p3a: '→ CHF 560/Jahr (2 Monate gratis)',
  p3fs: ['8 vCPU · 16 GB RAM · 80 GB SSD', '🇨🇭 Privater Server in der Schweiz', 'Telegram, Discord & WhatsApp', '🎙️ Sprachnotizen (Whisper vorinstalliert)', 'Automatische Updates, Monitoring & tägliche Backups', '✅ Persönliches Dashboard (nur für Sie zugänglich)', 'Prioritäts-Support (< 24 Std.)', '30-minütiger Onboarding-Call auf Deutsch', 'Einrichtung von Custom Skills & Automationen', 'Jederzeit kündbar'],
  p3cta: 'Business wählen',

  cLabel: 'Vergleich', cH2: 'Warum nicht selbst hosten?',
  cHead: ['Merkmal', 'Selbst-Hosting', 'OpenClaw Hosting (CH)'],
  cRows: [
    ['Setup-Zeit', '60+ Min. (SSH, Linux, Node.js)', '< 10 Minuten'],
    ['Technisches Wissen', 'Linux, SSH, CLI erforderlich', 'Nicht nötig'],
    ['Updates', 'Manuell — eigene Verantwortung', 'Automatisch'],
    ['Serverstandort', 'Unbekannt / international', '🇨🇭 In der Schweiz'],
    ['Datenschutz', 'Je nach VPS-Anbieter', 'DSGVO & nDSG-konform'],
    ['Support', 'OpenClaw-Community (English)', 'Persönlicher Support auf Deutsch'],
    ['Uptime-Monitoring', 'Selbst einrichten', 'Inklusive'],
    ['Preis', 'CHF 5–15/Mt. VPS + Ihre Zeit', 'ab CHF 19/Mt. — alles inklusive'],
  ],

  fLabel: 'FAQ', fH2: 'Häufige Fragen',
  faqs: [
    ['Brauche ich technisches Wissen?', 'Nein. Wir richten alles für Sie ein. Sie benötigen lediglich einen Telegram-Account und einen API-Schlüssel Ihres KI-Anbieters — das dauert ca. 5 Minuten, und wir führen Sie Schritt für Schritt durch den Prozess.'],
    ['Was ist ein API-Schlüssel?', 'Ihr Assistent benötigt Zugang zu einem KI-Modell (Claude, GPT-4 oder Gemini). Diesen Schlüssel erstellen Sie kostenlos auf der Website des jeweiligen Anbieters. Die Nutzungskosten (~CHF 5–20/Mt.) werden direkt dort abgerechnet.'],
    ['Wo werden meine Daten gespeichert?', 'Ihr Server läuft in der Schweiz — vollständig DSGVO- und nDSG-konform. Ihren API-Schlüssel speichern wir nie; er wird direkt auf Ihren Server übertragen und verbleibt dort.'],
    ['Welchen KI-Anbieter kann ich nutzen?', 'OpenClaw unterstützt Claude (Anthropic), GPT-4 (OpenAI) und Gemini (Google). Wir empfehlen Claude Haiku für budgetfreundliche Nutzung (~CHF 5/Mt.) oder Claude Sonnet für maximale Qualität (~CHF 15–20/Mt.).'],
    ['Kann ich jederzeit kündigen?', 'Ja, beim Monatsabo ohne Mindestlaufzeit. Beim Jahresabo läuft der bezahlte Zeitraum bis zum Ende aus. Kein Abo verlängert sich ohne Ihre Zustimmung. Keine versteckten Gebühren.'],
    ['Was ist OpenClaw?', 'OpenClaw ist die beliebteste Open-Source-KI-Assistenten-Plattform mit über 200\'000 GitHub-Stars. Sie ist vollständig erweiterbar, läuft auf Ihrem eigenen Server und verbindet sich mit Telegram, Discord und WhatsApp.'],
    ['Was passiert bei OpenClaw-Updates?', 'Wir testen neue Versionen zuerst und spielen Updates automatisch ein — ohne Unterbruch. Sie müssen nichts tun.'],
    ['Bieten Sie Support auf Deutsch?', 'Ja — auf Deutsch und Englisch. Kein automatisierter Chatbot, sondern echte Menschen, die OpenClaw selbst täglich nutzen.'],
  ],

  finalH2a: 'Bereit für Ihren', finalH2b: 'persönlichen KI-Assistenten?',
  finalSub: 'Kein Technikwissen nötig. Wir richten alles ein — in unter 10 Minuten.',
  finalCta: 'Jetzt anfragen',
  finalNote: 'Oder schreiben Sie uns: support@openclaw-consulting.ch',

  footerCopy: '© 2026 ',
  footerPrivacy: 'Datenschutz', footerImprint: 'Impressum',
}

const en: typeof de = {
  navBrand1: 'OpenClaw', navBrand2: 'Hosting',
  navHow: 'How it works', navPricing: 'Pricing', navFaq: 'FAQ',
  navCta: 'Get started',

  badge: '🇨🇭 Hosted in Geneva · Infomaniak datacenter',
  h1a: 'Your AI assistant.',
  h1b: 'Running 24/7.',
  h1c: 'Zero hassle.',
  sub: 'OpenClaw on your own private server — we set it up, maintain it, and keep it running. You just chat.',
  cta: 'Get started – from CHF 19/mo',
  ghost: 'Learn more',
  n1: '✓ No technical skills needed',
  n2: '✓ Cancel anytime',
  n3: '✓ Live in < 10 min',
  trustBanner: '🔒 We never store your API key or Telegram token on our systems — they are stored exclusively on your own private server in Switzerland.',

  chatMessages: [
    { bot: true, text: 'Good morning! Here\'s your daily briefing:' },
    { bot: true, text: '📧 2 new emails — 1 urgent\n📅 3 meetings today (9:00 / 14:00 / 16:30)\n🌤️ 11°C in Zurich, sunny' },
    { bot: false, text: 'Summarize this YouTube video: https://youtu.be/dQw4w9WgXcQ' },
    { bot: true, text: '📺 Summary: The video covers the most important AI automation trends for 2026 — especially interesting from minute 4:30 on agent workflows. Want me to list the key points?' },
  ],

  costLabel: '💡 Full cost transparency — because we hide nothing',
  costUs: 'Hosting with us: CHF 19–59/mo',
  costApi: 'AI API separately at Anthropic/OpenAI: approx. CHF 5–20/mo',
  costTotal: 'Realistic total: CHF 24–79/mo',

  stat1n: '< 10 min', stat1l: 'until you\'re live',
  stat2n: '24/7', stat2l: 'target uptime',
  stat3n: '🇨🇭', stat3l: 'Hosted in Switzerland',
  stat4n: 'from CHF 19', stat4l: 'per month',

  howLabel: 'How it works', howH2: 'Live in 3 steps',
  howSub: 'No terminal. No SSH. No technical knowledge required. We handle everything.',
  s1t: '1. Choose a plan & pay',
  s1d: 'Pick your plan and pay with TWINT, Visa, or Mastercard. You\'ll receive a confirmation within minutes.',
  s2t: '2. Fill the onboarding form (5 min)',
  s2d: 'Share your Telegram bot token and AI API key. We\'ll show you step-by-step where to find them.',
  s3t: '3. Your assistant goes live',
  s3d: 'We set up your private Infomaniak server in Geneva and send you a confirmation. Your 24/7 assistant is ready.',

  dashLabel: 'Your personal dashboard', dashH2: 'Everything at a glance — just for you.',
  dashSub: 'Every customer gets a personal, password-protected dashboard. Secure, accessible only via a private link — nobody else has access.',
  dashPoints: [
    '🔒 Accessible only with your personal link — no login, no shared server',
    '🇨🇭 Dashboard runs on your own server in Switzerland',
    '🌤️ Live weather for your location (customisable)',
    '🤖 Real-time status of your assistant',
    '🔗 Overview of all integrations with Telegram commands',
    '⚙️ Switch AI model and adjust settings — right in the browser',
  ],
  ucLabel: 'What your assistant can do', ucH2: 'One assistant. Countless tasks.',
  ucSub: 'OpenClaw connects to your tools and works proactively — not just when you ask.',
  ucs: [
    { icon:'📧', t:'Email management', d:'Daily briefings, draft replies, prioritize important messages and auto-sort your inbox.', ex:'"Which emails need my reply today?"' },
    { icon:'📅', t:'Calendar & meetings', d:'Check availability, set reminders, coordinate meetings and book appointments directly from chat.', ex:'"Schedule a meeting with Max next week"' },
    { icon:'📺', t:'YouTube & web summaries', d:'Summarize YouTube videos, websites, PDFs and news articles in seconds — just send the URL.', ex:'"Summarize this YouTube video: [URL]"' },
    { icon:'⚡', t:'Automation & cron jobs', d:'Daily briefings, price alerts, newsletter summaries and reminders — fully automated, no action required.', ex:'"Every morning at 8: weather + calendar + top emails"' },
    { icon:'🎙️', t:'Voice notes & dictation', d:'Dictate while driving: create notes, transcribe them, create tasks — all without typing.', ex:'"Create a task from this voice note"' },
    { icon:'📊', t:'Weekly reports', d:'Revenue overviews, project progress or team updates — automatically compiled from your data and delivered via Telegram.', ex:'"Create my weekly report"' },
    { icon:'📰', t:'News & industry monitoring', d:'Daily curated news on your topics — no information overload, only what\'s truly relevant.', ex:'"What happened in AI today?"' },
    { icon:'✍️', t:'Content creation', d:'Blog posts, social media content, product descriptions, proposals and emails on demand — brand-consistent and multilingual.', ex:'"Write a LinkedIn post about our new product"' },
    { icon:'🔗', t:'Tool integrations', d:'Gmail, Google Calendar, Sheets, Notion, JIRA, Slack, WordPress, Shopify and many more — seamlessly connected.', ex:'"Create a JIRA ticket for this bug"' },
    { icon:'📈', t:'Finance & market monitoring', d:'Portfolio overview, exchange rates, stock alerts and weekly financial briefings — all in Telegram.', ex:'"How is my portfolio today?"' },
    { icon:'🌍', t:'Languages & translations', d:'Translate texts, practice languages with daily vocabulary briefings, receive voice notes transcribed in your language.', ex:'"Translate this email to English and French"' },
    { icon:'👤', t:'Personal daily assistant', d:'Travel planning, restaurant search, recipe ideas, shopping lists, appointment coordination — conveniently via Telegram.', ex:'"Plan my weekend in Zurich"' },
  ],

  secLabel: 'Security', secH2: 'Your data is safe. For real.',
  secSub: 'We know security questions are legitimate. Here are the concrete answers.',
  secItems: [
    {
      icon: '🔑',
      title: 'API key: straight to your server',
      desc: 'Your AI API key is transferred once during onboarding and stored directly on your private server. We never see it, never store it, and have no access to it afterwards.',
    },
    {
      icon: '🖥️',
      title: 'Your own isolated server',
      desc: 'Every customer gets their own fully isolated server in Switzerland. No shared infrastructure, no shared storage — your data lives only with you.',
    },
    {
      icon: '🇨🇭',
      title: 'Data stored in Switzerland',
      desc: 'Your server runs with a Swiss provider and is subject to Swiss data protection law (nDSG) and GDPR. No data shared with third parties, no data outside Switzerland/EU.',
    },
    {
      icon: '🔒',
      title: 'Telegram token: only on your server',
      desc: 'Your Telegram bot token is also stored exclusively on your server. OpenClaw communicates directly with Telegram — no detour through our infrastructure.',
    },
    {
      icon: '👁️',
      title: 'We cannot read your messages',
      desc: 'We have no technical access to your chat history. All conversations with your assistant are encrypted between Telegram and your server.',
    },
    {
      icon: '🚫',
      title: 'No vendor lock-in',
      desc: 'OpenClaw is open source. If you cancel, you can take your server and all data with you or have it deleted. No dependency on us.',
    },
  ],

  pLabel: 'Pricing', pH2: 'Simple. Transparent. Fair.',
  pNote: '⚠️ What you pay us: running your private server in Switzerland (CHF 19–59/mo). What you pay separately: your own API key directly to your AI provider (approx. CHF 5–20/mo depending on usage). These costs go directly to Anthropic, OpenAI or Google — we never see that data.',

  p1n: 'Starter', p1d: 'For individuals and beginners',
  p1p: '19', p1a: '→ CHF 180/year (2 months free)',
  p1fs: ['2 vCPU · 4 GB RAM · 50 GB SSD', '🇨🇭 Private server in Switzerland', 'Telegram, Discord & WhatsApp', '🎙️ Voice notes (Whisper pre-installed)', 'Automatic updates, monitoring & daily backups', 'Email support (48h)', 'Cancel anytime'],
  p1ds: ['No dashboard', 'No onboarding call'],
  p1cta: 'Choose Starter',

  p2badge: 'RECOMMENDED', p2n: 'Pro', p2d: 'For power users & freelancers',
  p2p: '34', p2a: '→ CHF 320/year (2 months free)',
  p2fs: ['4 vCPU · 8 GB RAM · 80 GB SSD', '🇨🇭 Private server in Switzerland', 'Telegram, Discord & WhatsApp', '🎙️ Voice notes (Whisper pre-installed)', 'Automatic updates, monitoring & daily backups', '✅ Personal dashboard (private access only)', 'Email support (24h)', 'Cancel anytime'],
  p2ds: ['No onboarding call'],
  p2cta: 'Choose Pro',

  p3badge: 'BUSINESS', p3n: 'Business', p3d: 'For companies & teams',
  p3p: '59', p3a: '→ CHF 560/year (2 months free)',
  p3fs: ['8 vCPU · 16 GB RAM · 80 GB SSD', '🇨🇭 Private server in Switzerland', 'Telegram, Discord & WhatsApp', '🎙️ Voice notes (Whisper pre-installed)', 'Automatic updates, monitoring & daily backups', '✅ Personal dashboard (private access only)', 'Priority support (< 24h)', '30-min onboarding call in German or English', 'Custom skills & automation setup included', 'Cancel anytime'],
  p3cta: 'Choose Business',

  cLabel: 'Comparison', cH2: 'Why not self-host?',
  cHead: ['Feature', 'Self-hosting', 'OpenClaw Hosting (CH)'],
  cRows: [
    ['Setup time', '60+ min (SSH, Linux, Node.js)', '< 10 minutes'],
    ['Technical knowledge', 'Linux, SSH, CLI required', 'Not required'],
    ['Updates', 'Manual — your responsibility', 'Automatic'],
    ['Server location', 'Unknown / international', '🇨🇭 Infomaniak, Geneva (Switzerland)'],
    ['Privacy', 'Depends on VPS provider', 'GDPR & nDSG compliant'],
    ['Support', 'OpenClaw community (English only)', 'Personal support in German & English'],
    ['Uptime monitoring', 'Set up yourself', 'Included'],
    ['Price', 'CHF 5–15/mo VPS + your time', 'from CHF 19/mo — all inclusive'],
  ],

  fLabel: 'FAQ', fH2: 'Frequently asked questions',
  faqs: [
    ['Do I need technical skills?', 'No. We set everything up for you. You just need a Telegram account and an API key from your AI provider — that takes about 5 minutes and we\'ll walk you through it.'],
    ['What is an API key?', 'Your assistant needs access to an AI model (Claude, GPT-4, or Gemini). You create this key for free on your provider\'s website. Usage costs (~CHF 5–20/mo) are billed directly by them.'],
    ['Where is my data stored?', 'Your server runs at Infomaniak in Geneva, Switzerland — fully GDPR and nDSG compliant. We never store your API key — it\'s transferred directly to your server.'],
    ['Which AI provider can I use?', 'OpenClaw supports Claude (Anthropic), GPT-4 (OpenAI) and Gemini (Google). We recommend Claude Haiku for budget-friendly use (~CHF 5/mo) or Claude Sonnet for maximum quality (~CHF 15–20/mo).'],
    ['Can I cancel anytime?', 'Yes, no minimum term on monthly plans. Annual plans run until the end of the paid period. No subscription auto-renews without your consent. No hidden fees.'],
    ['What is OpenClaw?', 'OpenClaw is the most popular open-source AI agent platform with 200,000+ GitHub stars. It is fully extensible, runs on your own private server, and connects to Telegram, Discord and WhatsApp.'],
    ['What happens when OpenClaw updates?', 'We test new versions first and roll out updates automatically — zero downtime. You don\'t need to do anything.'],
    ['Do you offer German-language support?', 'Yes — in both German and English. No automated chatbot, just real people who use OpenClaw themselves every day.'],
  ],

  finalH2a: 'Ready for your', finalH2b: 'personal AI assistant?',
  finalSub: 'No tech skills needed. We set everything up — in under 10 minutes.',
  finalCta: 'Get in touch',
  finalNote: 'Or email us: support@openclaw-consulting.ch',

  footerCopy: '© 2026 ',
  footerPrivacy: 'Privacy', footerImprint: 'Imprint',
}

/* ─── PAGE ──────────────────────────────────────────────────────── */
export default function Home() {
  const [lang, setLang] = useState<'de'|'en'>('de')
  const [billing, setBilling] = useState<'monthly'|'annual'>('monthly')
  const t = lang === 'de' ? de : en

  return (
    <>
      {/* NAV */}
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="#" className="nav-brand">{t.navBrand1}<span>{t.navBrand2}</span></a>
          <div className="nav-links">
            <a href="#how">{t.navHow}</a>
            <a href="#pricing">{t.navPricing}</a>
            <a href="#faq">{t.navFaq}</a>
            <button className="lang-btn" onClick={() => setLang(l => l==='de'?'en':'de')}>{lang==='de'?'EN':'DE'}</button>
            <a href="#pricing" className="nav-cta">{t.navCta}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div className="hero-badge">{t.badge}</div>
            <h1>
              {t.h1a}<br/>
              <em>{t.h1b}</em><br/>
              {t.h1c}
            </h1>
            <p className="hero-sub">{t.sub}</p>
            <div className="hero-actions">
              <a href="#pricing" className="btn-primary">{t.cta}</a>
              <a href="#how" className="btn-ghost">{t.ghost}</a>
            </div>
            <div className="hero-notes">
              {[t.n1, t.n2, t.n3].map((n,i) => (
                <span key={i} className="hero-note-item"><span>✓</span>{n.replace('✓ ','')}</span>
              ))}
            </div>
            <div className="trust-banner">{t.trustBanner}</div>
          </div>
          {/* Chat demo */}
          <div className="chat-demo">
            <div className="chat-header">
              <div className="chat-dot"/>
              <span className="chat-title">OpenClaw Assistant</span>
              <span className="chat-status">● {lang==='de'?'Online':'Online'}</span>
            </div>
            <div className="chat-body">
              {t.chatMessages.map((m,i) => (
                <div key={i} className={`msg ${m.bot?'bot':'user'}`}>
                  <div className="msg-bubble" style={{whiteSpace:'pre-line'}}>{m.text}</div>
                  <div className="msg-time">{['07:01','07:01','07:02','07:02'][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COST STRIP */}
      <div className="cost-strip">
        <div className="container cost-strip-inner">
          <span>{t.costLabel}:</span>
          <strong>{t.costUs}</strong>
          <span className="cost-sep">+</span>
          <span>{t.costApi}</span>
          <span className="cost-sep">=</span>
          <strong>{t.costTotal}</strong>
        </div>
      </div>

      {/* STATS */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {[
              {n:t.stat1n, l:t.stat1l},
              {n:t.stat2n, l:t.stat2l},
              {n:t.stat3n, l:t.stat3l},
              {n:t.stat4n, l:t.stat4l},
            ].map((s,i) => (
              <div key={i} className="stat-card">
                <span className="stat-num">{s.n}</span>
                <span className="stat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="how" id="how">
        <div className="container">
          <div className="section-label">{t.howLabel}</div>
          <h2 className="section-h2">{t.howH2}</h2>
          <p className="section-sub">{t.howSub}</p>
          <div className="steps">
            {[[t.s1t,t.s1d],[t.s2t,t.s2d],[t.s3t,t.s3d]].map(([title,desc],i) => (
              <div key={i} className="step">
                <div className="step-num">{i+1}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section style={{padding:'5rem 0', background:'var(--surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
        <div className="container">
          <div className="section-label">{t.dashLabel}</div>
          <h2 className="section-h2">{t.dashH2}</h2>
          <p className="section-sub">{t.dashSub}</p>
          <div className="dashboard-preview-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center'}}>
            {/* Screenshot */}
            <div className="dashboard-screenshot" style={{borderRadius:'12px', overflow:'hidden', border:'1px solid var(--border)', boxShadow:'0 8px 40px rgba(15,23,20,0.12)'}}>
              <img src="/dashboard-preview.jpg" alt="OpenClaw Dashboard Preview" style={{width:'100%', display:'block'}} />
            </div>
            {/* Points */}
            <div style={{display:'flex', flexDirection:'column', gap:'0.85rem'}}>
              {t.dashPoints.map((p, i) => (
                <div key={i} style={{display:'flex', alignItems:'flex-start', gap:'0.75rem', padding:'0.85rem 1rem', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'9px', fontSize:'0.9rem', color:'var(--text)', lineHeight:1.55}}>
                  {p}
                </div>
              ))}
              <div style={{marginTop:'0.5rem', padding:'0.9rem 1rem', background:'rgba(181,245,66,0.06)', border:'1px solid rgba(181,245,66,0.2)', borderRadius:'9px', fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.6}}>
                <strong style={{color:'var(--accent)'}}>🔒 Technisch gesichert:</strong> {lang==='de'
                  ? 'Das Dashboard ist nur über einen einzigartigen, privaten Link erreichbar. Kein Passwort das man vergessen kann — niemand anderes kann auf Ihr Dashboard zugreifen.'
                  : 'The dashboard is only accessible via a unique, private link. No password to forget — nobody else can access your dashboard.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="use-cases" id="use-cases">
        <div className="container">
          <div className="section-label">{t.ucLabel}</div>
          <h2 className="section-h2">{t.ucH2}</h2>
          <p className="section-sub">{t.ucSub}</p>
          <div className="uc-grid">
            {t.ucs.map((uc,i) => (
              <div key={i} className="uc-card">
                <div className="uc-icon">{uc.icon}</div>
                <h3>{uc.t}</h3>
                <p>{uc.d}</p>
                <p className="uc-example">{uc.ex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="security" id="security">
        <div className="container">
          <div className="section-label">{t.secLabel}</div>
          <h2 className="section-h2">{t.secH2}</h2>
          <p className="section-sub">{t.secSub}</p>
          <div className="sec-grid">
            {t.secItems.map((item, i) => (
              <div key={i} className="sec-card">
                <div className="sec-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-label">{t.pLabel}</div>
          <h2 className="section-h2">{t.pH2}</h2>

          {/* Billing toggle */}
          <div style={{display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'2rem', flexWrap:'wrap'}}>
            <button
              onClick={() => setBilling('monthly')}
              style={{padding:'0.45rem 1.1rem', borderRadius:'7px', border:'1.5px solid', fontWeight:600, fontSize:'0.88rem', cursor:'pointer', transition:'all 0.15s',
                background: billing==='monthly' ? 'var(--green)' : 'transparent',
                color: billing==='monthly' ? '#fff' : 'var(--slate)',
                borderColor: billing==='monthly' ? 'var(--green)' : 'var(--border)'
              }}>
              {lang==='de' ? 'Monatlich' : 'Monthly'}
            </button>
            <button
              onClick={() => setBilling('annual')}
              style={{padding:'0.45rem 1.1rem', borderRadius:'7px', border:'1.5px solid', fontWeight:600, fontSize:'0.88rem', cursor:'pointer', transition:'all 0.15s',
                background: billing==='annual' ? 'var(--green)' : 'transparent',
                color: billing==='annual' ? '#fff' : 'var(--slate)',
                borderColor: billing==='annual' ? 'var(--green)' : 'var(--border)'
              }}>
              {lang==='de' ? 'Jährlich' : 'Annual'}
            </button>
            {billing==='annual' && (
              <span style={{background:'#dcfce7', color:'#14532d', padding:'0.2rem 0.65rem', borderRadius:'99px', fontSize:'0.78rem', fontWeight:700}}>
                🎉 {lang==='de' ? '2 Monate gratis' : '2 months free'}
              </span>
            )}
          </div>

          <div className="pricing-transparency">
            <strong>⚠️ {lang==='de'?'Wichtig':'Important'}:</strong> {t.pNote}
          </div>
          <div className="plans plans-3">
            {[
              { plan:'starter', featured:false, badge:null, badgeStyle:{},
                name:t.p1n, desc:t.p1d,
                price: billing==='annual' ? 15 : 19,
                annual: billing==='annual' ? (lang==='de'?'CHF 180/Jahr abgerechnet':'CHF 180/year billed') : (lang==='de'?'→ CHF 180/Jahr (2 Monate gratis)':'→ CHF 180/year (2 months free)'),
                features:t.p1fs, dims:t.p1ds, cta:t.p1cta,
                href: billing==='annual'
                  ? (process.env.NEXT_PUBLIC_PAYREXX_STARTER_ANNUAL||'/onboarding?plan=starter&billing=annual')
                  : (process.env.NEXT_PUBLIC_PAYREXX_STARTER||'/onboarding?plan=starter'),
                ctaClass:'plan-cta outline'
              },
              { plan:'pro', featured:true, badge:t.p2badge, badgeStyle:{},
                name:t.p2n, desc:t.p2d,
                price: billing==='annual' ? 27 : 34,
                annual: billing==='annual' ? (lang==='de'?'CHF 320/Jahr abgerechnet':'CHF 320/year billed') : (lang==='de'?'→ CHF 320/Jahr (2 Monate gratis)':'→ CHF 320/year (2 months free)'),
                features:t.p2fs, dims:t.p2ds, cta:t.p2cta,
                href: billing==='annual'
                  ? (process.env.NEXT_PUBLIC_PAYREXX_PRO_ANNUAL||'/onboarding?plan=pro&billing=annual')
                  : (process.env.NEXT_PUBLIC_PAYREXX_PRO||'/onboarding?plan=pro'),
                ctaClass:'plan-cta'
              },
              { plan:'business', featured:false, badge:t.p3badge, badgeStyle:{background:'var(--ink2)', color:'#fff'},
                name:t.p3n, desc:t.p3d,
                price: billing==='annual' ? 47 : 59,
                annual: billing==='annual' ? (lang==='de'?'CHF 560/Jahr abgerechnet':'CHF 560/year billed') : (lang==='de'?'→ CHF 560/Jahr (2 Monate gratis)':'→ CHF 560/year (2 months free)'),
                features:t.p3fs, dims:[], cta:t.p3cta,
                href: billing==='annual'
                  ? (process.env.NEXT_PUBLIC_PAYREXX_BUSINESS_ANNUAL||'/onboarding?plan=business&billing=annual')
                  : (process.env.NEXT_PUBLIC_PAYREXX_BUSINESS||'/onboarding?plan=business'),
                ctaClass:'plan-cta outline'
              },
            ].map((p) => (
              <div key={p.plan} className={`plan${p.featured?' featured':''}`}>
                {p.badge && <span className="plan-badge" style={p.badgeStyle}>{p.badge}</span>}
                <h3>{p.name}</h3>
                <p className="plan-desc">{p.desc}</p>
                <div className="plan-price">
                  <span className="amount">CHF {p.price}</span>
                  <span className="per">{lang==='de'?'/Mt.':'/mo'}</span>
                </div>
                <p className="plan-annual" style={{color: billing==='annual'?'var(--green2)':'var(--muted)', fontWeight: billing==='annual'?700:400}}>
                  {p.annual}
                </p>
                <ul className="plan-features">
                  {p.features.map((f: string,i: number) => <li key={i}>{f}</li>)}
                  {(p.dims||[]).map((f: string,i: number) => <li key={i} className="dim">{f}</li>)}
                </ul>
                <a href={p.href} className={p.ctaClass}>{p.cta}</a>
              </div>
            ))}
          </div>
          <p style={{marginTop:'1.5rem', fontSize:'0.83rem', color:'var(--dim)'}}>
            {lang==='de'
              ? '💳 Zahlung via TWINT, Visa & Mastercard über Payrexx — sicher und in der Schweiz verarbeitet.'
              : '💳 Payment via TWINT, Visa & Mastercard through Payrexx — secure and processed in Switzerland.'}
          </p>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="comparison" id="compare">
        <div className="container">
          <div className="section-label">{t.cLabel}</div>
          <h2 className="section-h2">{t.cH2}</h2>
          <div style={{overflowX:'auto', marginTop:'2rem'}}>
            <table className="compare-table">
              <thead>
                <tr>{t.cHead.map((h,i) => <th key={i}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {t.cRows.map((row,i) => (
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
          <div className="section-label">{t.fLabel}</div>
          <h2 className="section-h2">{t.fH2}</h2>
          <div className="faq-grid" style={{marginTop:'2rem'}}>
            {t.faqs.map(([q,a],i) => (
              <div key={i} className="faq-item">
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>{t.finalH2a} <em>{t.finalH2b}</em></h2>
          <p>{t.finalSub}</p>
          <a href="mailto:support@openclaw-consulting.ch?subject=OpenClaw Hosting" className="btn-primary" style={{fontSize:'1.05rem', padding:'0.95rem 2.5rem'}}>{t.finalCta}</a>
          <p style={{marginTop:'1rem', fontSize:'0.83rem', color:'var(--dim)'}}>{t.finalNote}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>{t.footerCopy}<a href="https://openclaw-consulting.ch">openclaw-consulting.ch</a> · <a href="/datenschutz">{t.footerPrivacy}</a> · <a href="/impressum">{t.footerImprint}</a></p>
        </div>
      </footer>
    </>
  )
}
