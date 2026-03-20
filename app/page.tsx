'use client'
import { useState } from 'react'

/* ─── CONTENT ───────────────────────────────────────────────────── */
const de = {
  navBrand1: 'OpenClaw', navBrand2: 'Hosting',
  navHow: 'So funktioniert\'s', navPricing: 'Preise', navFaq: 'FAQ', navContact: 'Kontakt', navAbout: 'Über uns', navVergleich: 'Vergleich', navSkills: 'Skills',
  navCta: 'Jetzt starten',

  badge: '🇨🇭 In der Schweiz gehostet',
  h1a: 'Ihr KI-Assistent.',
  h1b: 'Fertig eingerichtet.',
  h1c: 'Direkt loslegen.',
  sub: 'Kein Linux-Wissen nötig. Kein Setup-Stress. Ihr persönlicher OpenClaw-Assistent läuft in ~30 Minuten — auf Ihrem eigenen Schweizer Server, mit Gmail, Kalender, Sprache und Web-Suche bereits eingerichtet.',
  cta: 'Jetzt starten – ab CHF 19/Mt.',
  ghost: 'Mehr erfahren',
  n1: '✓ Kein Technikwissen nötig',
  n2: '✓ Jederzeit kündbar',
  n3: '✓ Assistent live in ~30 Min.',
  trustBanner: '🔒 Ihre Zugangsdaten und persönlichen Daten verlassen nie unsere Infrastruktur — alles wird ausschliesslich auf Ihrem eigenen, privaten Server in der Schweiz gespeichert.',

  chatMessages: [
    { bot: true, text: 'Guten Morgen! Hier Ihr Tagesbriefing:' },
    { bot: true, text: '📧 2 neue E-Mails — 1 dringend\n📅 3 Termine heute (9:00 / 14:00 / 16:30)\n🌤️ 11°C in Zürich, sonnig' },
    { bot: false, text: 'Fasse dieses YouTube-Video zusammen: https://youtu.be/yIKxXRks4Jo' },
    { bot: true, text: '📺 YouTube-Zusammenfassung:\n• Echte Anwendungsfälle: Emails automatisch triagieren, Kalender managen, Leads in CRM übertragen, Proposals aus Meeting-Notizen generieren\n• Ein Nutzer betreibt seinen gesamten Content-Kanal auf Autopilot — Recherche, Skript, Video, Post\n• Fazit: Menschen, die das beherrschen, sind laut Video 200× produktiver als die, die es nicht tun' },
  ],

  costLabel: '💡 Transparente Gesamtkosten — weil wir nichts verstecken',
  costUs: 'Hosting: CHF 19–59/Mt.',
  costApi: 'KI-API direkt bei Ihrem Anbieter: ca. CHF 5–20/Mt.',
  costTotal: 'Gesamtkosten typisch: CHF 24–79/Mt.',

  stat1n: '~30 Min', stat1l: 'bis Ihr Assistent live ist',
  stat2n: '24/7', stat2l: 'Verfügbarkeit angestrebt',
  stat3n: '🇨🇭', stat3l: 'In der Schweiz gehostet',
  stat4n: 'ab CHF 19', stat4l: 'pro Monat',

  howLabel: 'So einfach geht\'s', howH2: 'In 3 Schritten live',
  howSub: 'Kein Terminal. Kein SSH. Kein Technikwissen. Wir erledigen alles.',
  s1t: '1. Plan wählen & bezahlen',
  s1d: 'Wählen Sie Ihren Plan und bezahlen Sie bequem mit TWINT, Visa oder Mastercard. Innerhalb weniger Minuten erhalten Sie eine Bestätigung.',
  s2t: '2. Onboarding-Formular ausfüllen',
  s2d: 'Sie teilen uns Ihren Messenger-Zugang (Telegram, WhatsApp oder Discord) und Ihren KI-API-Schlüssel mit. Wir führen Sie Schritt für Schritt durch den Prozess — dauert ca. 5–10 Minuten.',
  s3t: '3. Ihr Assistent ist online',
  s3d: 'Wir richten Ihren privaten Server in der Schweiz vollautomatisch ein. In der Regel ist Ihr Assistent innerhalb von 30 Minuten einsatzbereit.',

  dashLabel: 'Ihr persönliches Dashboard', dashH2: 'Alles auf einen Blick — nur für Sie.',
  dashSub: 'Im Pro- und Business-Plan erhalten Sie ein persönliches Dashboard — nur über Ihren privaten Link erreichbar, ausschliesslich auf Ihrem eigenen Server in der Schweiz.',
  dashPoints: [
    '🏠 Übersicht: Wetter, Assistenten-Status, Schnellbefehle und letzte Aktivitäten',
    '🚀 Erste Schritte: Geführte Einrichtung mit Fortschrittsanzeige — Gmail, Telegram, Sprache, Briefing',
    '🔗 Funktionen: Alle Integrationen auf einen Blick — mit Einrichtungsanleitung direkt im Browser',
    '💳 Abo & Rechnung: Aktueller Plan, Preisübersicht, Upgrade oder Kündigung per Knopfdruck',
    '⚙️ Einstellungen: Modell wechseln, API-Schlüssel aktualisieren, Assistenten anpassen',
    '🔒 Nur mit Ihrem persönlichen Link erreichbar — kein Login, kein gemeinsamer Server',
  ],
  ucLabel: 'Was Ihr Assistent kann', ucH2: 'Ein Assistent. Unzählige Aufgaben.',
  ucSub: 'OpenClaw verbindet sich mit Ihren Tools und arbeitet proaktiv — nicht nur dann, wenn Sie etwas fragen.',
  ucs: [
    { icon:'📧', t:'E-Mail-Management', d:'Tägliches Briefing, Antworten entwerfen, wichtige Mails priorisieren und Postfach automatisch sortieren.', ex:'"Welche Mails brauchen heute meine Antwort?"' },
    { icon:'📅', t:'Kalender & Meetings', d:'Termine abfragen, Verfügbarkeit prüfen, Erinnerungen setzen und Meetings direkt aus dem Chat heraus organisieren.', ex:'"Buche ein Meeting mit Max nächste Woche"' },
    { icon:'📺', t:'YouTube & Web zusammenfassen', d:'YouTube-Videos, Webseiten, PDFs und Nachrichtenartikel in Sekunden auf das Wesentliche reduzieren.', ex:'"Fasse dieses YouTube-Video zusammen: [URL]"' },
    { icon:'⚡', t:'Automatisierungen & Cron-Jobs', d:'Tägliche Briefings, Preisalarme, Newsletter-Zusammenfassungen und Erinnerungen — vollautomatisch, ohne Ihr Zutun.', ex:'"Täglich um 8 Uhr: Wetter + Kalender + Top-Mails"' },
    { icon:'🎙️', t:'Voice-Chat mit Ihrem Assistenten', d:'Senden Sie Sprachnachrichten und erhalten Sie Antworten — per Text oder Sprache. Diktieren, fragen, anweisen: ganz ohne Tippen.', ex:'"[Sprachnachricht] Was steht heute in meinem Kalender?"' },
    { icon:'📊', t:'Wöchentliche Reports', d:'Umsatzübersichten, Projektfortschritte oder Team-Updates — automatisch aus Ihren Daten zusammengestellt und per Telegram geliefert.', ex:'"Erstelle meinen Wochenbericht"' },
    { icon:'📰', t:'News & Branchen-Monitoring', d:'Täglich kuratierte News zu Ihren Themen — kein Nachrichtenflut, nur was wirklich relevant ist.', ex:'"Was ist heute in der KI-Welt passiert?"' },
    { icon:'✍️', t:'Texte & Inhalte erstellen', d:'Blog-Artikel, Social-Media-Posts, Produktbeschreibungen, Angebote und E-Mails auf Knopfdruck — markenkonform und mehrsprachig.', ex:'"Schreibe einen LinkedIn-Post über unser neues Produkt"' },
    { icon:'🔗', t:'Tool-Integrationen', d:'Gmail, Google Calendar, Google Sheets, Notion, JIRA, Slack, WordPress, Shopify und viele mehr — nahtlos verbunden.', ex:'"Erstelle ein JIRA-Ticket für diesen Bug"' },
    { icon:'📈', t:'Finanz- & Markt-Monitoring', d:'Portfolio-Überblick, Währungskurse, Aktienalarme und wöchentliche Finanz-Briefings — alles in Telegram.', ex:'"Wie steht mein Portfolio heute?"' },
    { icon:'🌍', t:'Sprachen & Übersetzungen', d:'Texte übersetzen, Fremdsprachen üben mit täglichen Vokabel-Briefings, Sprachnotizen auf Deutsch erhalten.', ex:'"Übersetze diese E-Mail auf Englisch und Französisch"' },
    { icon:'👤', t:'Persönlicher Alltags-Assistent', d:'Reiseplanung, Restaurantsuche, Rezeptideen, Einkaufslisten, Arzttermine koordinieren — alles bequem per Telegram.', ex:'"Plane mein Wochenende in Zürich"' },
  ],

  testimonialsLabel: 'Was unsere Kunden sagen', testimonialsH2: 'Echte Menschen. Echte Ergebnisse.',
  testimonials: [
    { name: 'Markus F.', role: 'Selbstständiger Berater, Bern', text: 'Ich diktiere jetzt meine Meeting-Notizen ins Telefon und der Bot erstellt daraus saubere Zusammenfassungen. Was früher 30 Minuten dauerte, geht jetzt in 2 Minuten.' },
    { name: 'Laura W.', role: 'Freelance-Grafikerin, Genf', text: 'Das Setup hat buchstäblich 8 Minuten gedauert. Jetzt bekomme ich jeden Morgen mein E-Mail-Briefing direkt in Telegram — ohne auch nur einmal eine Mail zu öffnen.' },
    { name: 'Stefan H.', role: 'KMU-Inhaber, St. Gallen', text: 'Als jemand ohne IT-Hintergrund war ich skeptisch. Aber nach dem Onboarding-Call lief alles. Der Support auf Deutsch macht den grossen Unterschied zu amerikanischen Anbietern.' },
  ],

  secLabel: 'Sicherheit', secH2: 'Ihre Daten sind sicher. Wirklich.',
  secSub: 'Wir wissen, dass die Frage nach Sicherheit berechtigt ist. Hier sind die konkreten Antworten.',
  secItems: [
    {
      icon: '🔑',
      title: 'Zugangsdaten gehören nur Ihnen',
      desc: 'Ihre API-Schlüssel, Bot-Token und Verbindungsdaten werden beim Onboarding einmalig übertragen und direkt auf Ihrem privaten Server abgelegt. Wir sehen sie nicht, speichern sie nicht und haben danach keinen Zugriff darauf.',
    },
    {
      icon: '🖥️',
      title: 'Ihr eigener, isolierter Server',
      desc: 'Jeder Kunde erhält einen eigenen, vollständig isolierten Server in der Schweiz. Keine geteilte Infrastruktur — Ihre Daten liegen ausschliesslich bei Ihnen.',
    },
    {
      icon: '🇨🇭',
      title: 'Datenhaltung in der Schweiz',
      desc: 'Ihr Server läuft bei einem Schweizer Anbieter und unterliegt dem Schweizer Datenschutzgesetz (nDSG) sowie der DSGVO. Keine Weitergabe an Dritte, keine Daten ausserhalb der Schweiz.',
    },
    {
      icon: '🔒',
      title: 'Nachrichten bleiben privat',
      desc: 'Wir haben technisch keinen Zugriff auf Ihre Gespräche. Alle Unterhaltungen mit Ihrem Assistenten laufen direkt zwischen Ihrem Messaging-Kanal und Ihrem eigenen Server ab.',
    },
    {
      icon: '👁️',
      title: 'Kein Tracking, kein Training',
      desc: 'Wir analysieren Ihre Nutzung nicht und trainieren keine KI-Modelle mit Ihren Daten. Was auf Ihrem Server passiert, bleibt auf Ihrem Server.',
    },
    {
      icon: '🚫',
      title: 'Kein Vendor Lock-in',
      desc: 'OpenClaw ist Open Source. Wenn Sie den Dienst beenden, nehmen Sie Ihren Server und alle Daten mit. Keine Abhängigkeit, kein Datenverlust.',
    },
  ],

  pLabel: 'Preise', pH2: 'Einfach. Transparent. Fair.',
  pNote: '⚠️ Was Sie uns bezahlen: den Betrieb Ihres privaten Servers in der Schweiz (CHF 19–59/Mt.). Was Sie separat bezahlen: Ihren eigenen API-Schlüssel direkt bei Ihrem KI-Anbieter (ca. CHF 5–20/Mt. je nach Nutzung). Diese Kosten gehen direkt an Anthropic, OpenAI oder Google — wir sehen diese Daten nie.',

  p1n: 'Starter', p1d: 'Für den Einstieg und den persönlichen Alltag',
  p1p: '19', p1a: '→ CHF 180/Jahr (günstiger)',
  p1fs: ['2 vCPU · 4 GB RAM · 50 GB SSD', '🇨🇭 Privater Server in der Schweiz', 'Telegram, Discord & WhatsApp', '🎙️ Voice-Chat: Sprache senden, Text oder Sprache empfangen', 'Automatische Updates, Monitoring & tägliche Backups', 'E-Mail-Support (48 Std.)', 'Jederzeit kündbar'],
  p1ds: ['Kein Dashboard', 'Kein Onboarding-Call'],
  p1cta: 'Starter wählen',

  p2badge: 'EMPFOHLEN', p2n: 'Pro', p2d: 'Für alle, die KI täglich produktiv einsetzen',
  p2p: '34', p2a: '→ CHF 320/Jahr (günstiger)',
  p2fs: ['4 vCPU · 8 GB RAM · 80 GB SSD', '🇨🇭 Privater Server in der Schweiz', 'Telegram, Discord & WhatsApp', '🎙️ Voice-Chat: Sprache senden, Text oder Sprache empfangen', 'Automatische Updates, Monitoring & tägliche Backups', '✅ Persönliches Dashboard (nur für Sie zugänglich)', 'E-Mail-Support (24 Std.)', 'Jederzeit kündbar'],
  p2ds: ['Kein Onboarding-Call'],
  p2cta: 'Pro wählen',

  p3badge: 'BUSINESS', p3n: 'Business', p3d: 'Für anspruchsvolle Workloads und maximale Leistung',
  p3p: '59', p3a: '→ CHF 560/Jahr (günstiger)',
  p3fs: ['8 vCPU · 16 GB RAM · 80 GB SSD', '🇨🇭 Privater Server in der Schweiz', 'Telegram, Discord & WhatsApp', '🎙️ Voice-Chat: Sprache senden, Text oder Sprache empfangen', 'Automatische Updates, Monitoring & tägliche Backups', '✅ Persönliches Dashboard (nur für Sie zugänglich)', 'Prioritäts-Support (< 24 Std.)', 'Einrichtung von Custom Skills & Automationen', 'Jederzeit kündbar'],
  p3fsAnnualExtra: '📞 30-minütiger Onboarding-Call auf Deutsch',
  p3cta: 'Business wählen',

  cLabel: 'Vergleich', cH2: 'Warum nicht selbst hosten?',
  cHead: ['Merkmal', 'Selbst-Hosting', 'OpenClaw Hosting (CH)'],
  cRows: [
    ['Setup-Zeit', '60+ Min. (SSH, Linux, Node.js)', '~30 Minuten (vollautomatisch)'],
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
    ['Brauche ich technisches Wissen?', 'Kein bisschen. Sie füllen ein Formular aus — wir erledigen den Rest. Kein Terminal, kein SSH, keine Konfigurationsdateien. Das Onboarding dauert etwa 5–10 Minuten, und wir begleiten Sie dabei.'],
    ['Was ist ein API-Schlüssel?', 'Ihr Assistent braucht ein KI-Modell im Hintergrund — Claude, GPT-4 oder Gemini. Den Schlüssel dafür erstellen Sie gratis direkt beim Anbieter. Die Nutzungskosten (~CHF 5–20/Mt.) werden dort abgerechnet und haben nichts mit unserem Hosting-Preis zu tun.'],
    ['Wo werden meine Daten gespeichert?', 'Ausschliesslich auf Ihrem eigenen, privaten Server in der Schweiz — DSGVO- und nDSG-konform. Ihre Zugangsdaten und Gesprächsdaten verlassen diesen Server nie.'],
    ['Welche KI-Modelle werden unterstützt?', 'Sie können zwischen Claude (Anthropic), GPT-4 (OpenAI) und Gemini (Google) wählen — und jederzeit wechseln. Für den Einstieg empfehlen wir Claude Haiku (~CHF 5/Mt.), für anspruchsvollere Aufgaben Claude Sonnet (~CHF 15–20/Mt.).'],
    ['Kann ich jederzeit kündigen?', 'Ja — jederzeit. Die aktuelle Aboperiode läuft bis zum Ende aus, danach wird nichts mehr belastet. Keine versteckten Gebühren.'],
    ['Was genau ist OpenClaw?', 'OpenClaw ist eine quelloffene KI-Plattform, die auf Ihrem eigenen Server läuft und sich mit Telegram, Discord und WhatsApp verbindet. Sie ist modular erweiterbar und wird aktiv weiterentwickelt. Wir übernehmen das Hosting — Sie nutzen sie einfach.'],
    ['Was passiert bei OpenClaw-Updates?', 'Wir prüfen neue Versionen intern, bevor wir sie ausrollen — und spielen Updates automatisch auf Ihren Server. Kein Unterbruch, keine Aktion Ihrerseits erforderlich.'],
    ['Gibt es Support auf Deutsch?', 'Ja, auf Deutsch und Englisch. Sie erreichen uns per E-Mail und erhalten eine persönliche Antwort — kein Bot, kein Ticket-Labyrinth.'],
  ],

  finalH2a: 'Bereit für Ihren', finalH2b: 'persönlichen KI-Assistenten?',
  finalSub: 'Kein Technikwissen nötig. Vollautomatisches Setup — Ihr Assistent ist in ~30 Minuten live.',
  finalCta: 'Jetzt anfragen',
  finalNote: 'Oder direkt per E-Mail: support@openclaw-consulting.ch',

  footerCopy: '© 2026 ',
  footerPrivacy: 'Datenschutz', footerImprint: 'Impressum', footerAgb: 'AGB', footerAbout: 'Über uns',
}

const en: typeof de = {
  navBrand1: 'OpenClaw', navBrand2: 'Hosting',
  navHow: 'How it works', navPricing: 'Pricing', navFaq: 'FAQ', navContact: 'Contact', navAbout: 'About', navVergleich: 'Compare', navSkills: 'Skills',
  navCta: 'Get started',

  badge: '🇨🇭 Hosted in Geneva · Infomaniak datacenter',
  h1a: 'Your AI assistant.',
  h1b: 'Fully set up.',
  h1c: 'Ready to go.',
  sub: 'No Linux. No server config. Your personal OpenClaw assistant is live in ~30 minutes — on your own Swiss server, with Gmail, calendar, voice and web search already configured.',
  cta: 'Get started – from CHF 19/mo',
  ghost: 'Learn more',
  n1: '✓ No technical skills needed',
  n2: '✓ Cancel anytime',
  n3: '✓ Assistant live in ~30 min',
  trustBanner: '🔒 Your credentials and personal data never leave your infrastructure — everything is stored exclusively on your own private server in Switzerland.',

  chatMessages: [
    { bot: true, text: 'Good morning! Here\'s your daily briefing:' },
    { bot: true, text: '📧 2 new emails — 1 urgent\n📅 3 meetings today (9:00 / 14:00 / 16:30)\n🌤️ 11°C in Zurich, sunny' },
    { bot: false, text: 'Summarize this YouTube video: https://youtu.be/yIKxXRks4Jo' },
    { bot: true, text: '📺 YouTube Summary:\n• Real use cases: auto-triage emails, manage calendar, push leads to CRM, generate proposals from meeting notes\n• One user runs his entire content channel on autopilot — research, script, video, post\n• Takeaway: people who master this are 200× more productive than those who don\'t' },
  ],

  costLabel: '💡 Full cost transparency — because we hide nothing',
  costUs: 'Hosting with us: CHF 19–59/mo',
  costApi: 'AI API separately at Anthropic/OpenAI: approx. CHF 5–20/mo',
  costTotal: 'Realistic total: CHF 24–79/mo',

  stat1n: '~30 min', stat1l: 'until your assistant is live',
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
  s3d: 'We automatically set up your private server in Switzerland. Your assistant is usually ready within 30 minutes.',

  dashLabel: 'Your personal dashboard', dashH2: 'Everything at a glance — just for you.',
  dashSub: 'Included in the Pro and Business plans: a personal dashboard, accessible only via your private link — running exclusively on your own server in Switzerland.',
  dashPoints: [
    '🏠 Overview: weather, assistant status, quick commands and recent activity',
    '🚀 Getting started: guided setup with progress bar — Gmail, Telegram, language, briefing',
    '🔗 Features: all integrations at a glance — with step-by-step setup guides in the browser',
    '💳 Plan & Billing: current plan, pricing overview, upgrade or cancel in one click',
    '⚙️ Settings: switch AI model, update API key, customise your assistant',
    '🔒 Accessible only with your personal link — no login, no shared server',
  ],
  ucLabel: 'What your assistant can do', ucH2: 'One assistant. Countless tasks.',
  ucSub: 'OpenClaw connects to your tools and works proactively — not just when you ask.',
  ucs: [
    { icon:'📧', t:'Email management', d:'Daily briefings, draft replies, prioritize important messages and auto-sort your inbox.', ex:'"Which emails need my reply today?"' },
    { icon:'📅', t:'Calendar & meetings', d:'Check availability, set reminders, coordinate meetings and book appointments directly from chat.', ex:'"Schedule a meeting with Max next week"' },
    { icon:'📺', t:'YouTube & web summaries', d:'Summarize YouTube videos, websites, PDFs and news articles in seconds — just send the URL.', ex:'"Summarize this YouTube video: [URL]"' },
    { icon:'⚡', t:'Automation & cron jobs', d:'Daily briefings, price alerts, newsletter summaries and reminders — fully automated, no action required.', ex:'"Every morning at 8: weather + calendar + top emails"' },
    { icon:'🎙️', t:'Voice chat with your assistant', d:'Send voice messages and receive replies — by text or voice. Dictate, ask, instruct: no typing required.', ex:'"[Voice message] What\'s on my calendar today?"' },
    { icon:'📊', t:'Weekly reports', d:'Revenue overviews, project progress or team updates — automatically compiled from your data and delivered via Telegram.', ex:'"Create my weekly report"' },
    { icon:'📰', t:'News & industry monitoring', d:'Daily curated news on your topics — no information overload, only what\'s truly relevant.', ex:'"What happened in AI today?"' },
    { icon:'✍️', t:'Content creation', d:'Blog posts, social media content, product descriptions, proposals and emails on demand — brand-consistent and multilingual.', ex:'"Write a LinkedIn post about our new product"' },
    { icon:'🔗', t:'Tool integrations', d:'Gmail, Google Calendar, Sheets, Notion, JIRA, Slack, WordPress, Shopify and many more — seamlessly connected.', ex:'"Create a JIRA ticket for this bug"' },
    { icon:'📈', t:'Finance & market monitoring', d:'Portfolio overview, exchange rates, stock alerts and weekly financial briefings — all in Telegram.', ex:'"How is my portfolio today?"' },
    { icon:'🌍', t:'Languages & translations', d:'Translate texts, practice languages with daily vocabulary briefings, receive voice notes transcribed in your language.', ex:'"Translate this email to English and French"' },
    { icon:'👤', t:'Personal daily assistant', d:'Travel planning, restaurant search, recipe ideas, shopping lists, appointment coordination — conveniently via Telegram.', ex:'"Plan my weekend in Zurich"' },
  ],

  testimonialsLabel: 'What our customers say', testimonialsH2: 'Real people. Real results.',
  testimonials: [
    { name: 'Markus F.', role: 'Independent Consultant, Bern', text: 'I dictate my meeting notes into my phone and the bot creates clean summaries from them. What used to take 30 minutes now takes 2.' },
    { name: 'Laura W.', role: 'Freelance Graphic Designer, Geneva', text: 'Setup literally took 8 minutes. Now I get my email briefing every morning directly in Telegram — without opening a single email.' },
    { name: 'Stefan H.', role: 'SME Owner, St. Gallen', text: 'As someone with no IT background I was skeptical. But after the onboarding call everything worked. German-language support makes a huge difference vs US providers.' },
  ],

  secLabel: 'Security', secH2: 'Your data is safe. For real.',
  secSub: 'We know security questions are legitimate. Here are the concrete answers.',
  secItems: [
    {
      icon: '🔑',
      title: 'Your credentials belong to you',
      desc: 'API keys, bot tokens and connection details are transferred once during onboarding and stored directly on your private server. We never see them, never store them, and have no access afterwards.',
    },
    {
      icon: '🖥️',
      title: 'Your own isolated server',
      desc: 'Every customer gets their own fully isolated server in Switzerland. No shared infrastructure — your data lives exclusively with you.',
    },
    {
      icon: '🇨🇭',
      title: 'Data stored in Switzerland',
      desc: 'Your server runs with a Swiss provider, subject to Swiss data protection law (nDSG) and GDPR. No data shared with third parties, nothing outside Switzerland.',
    },
    {
      icon: '🔒',
      title: 'Your conversations stay private',
      desc: 'We have no technical access to your messages. All conversations with your assistant flow directly between your messaging channel and your own server.',
    },
    {
      icon: '👁️',
      title: 'No tracking, no training',
      desc: 'We don\'t analyse your usage or train AI models on your data. What happens on your server stays on your server.',
    },
    {
      icon: '🚫',
      title: 'No vendor lock-in',
      desc: 'OpenClaw is open source. If you cancel, your server and all data come with you. No dependency, no data loss.',
    },
  ],

  pLabel: 'Pricing', pH2: 'Simple. Transparent. Fair.',
  pNote: '⚠️ What you pay us: running your private server in Switzerland (CHF 19–59/mo). What you pay separately: your own API key directly to your AI provider (approx. CHF 5–20/mo depending on usage). These costs go directly to Anthropic, OpenAI or Google — we never see that data.',

  p1n: 'Starter', p1d: 'For getting started and everyday personal use',
  p1p: '19', p1a: '→ CHF 180/year (save more)',
  p1fs: ['2 vCPU · 4 GB RAM · 50 GB SSD', '🇨🇭 Private server in Switzerland', 'Telegram, Discord & WhatsApp', '🎙️ Voice chat: send voice, receive text or voice replies', 'Automatic updates, monitoring & daily backups', 'Email support (48h)', 'Cancel anytime'],
  p1ds: ['No dashboard', 'No onboarding call'],
  p1cta: 'Choose Starter',

  p2badge: 'RECOMMENDED', p2n: 'Pro', p2d: 'For those who rely on AI every single day',
  p2p: '34', p2a: '→ CHF 320/year (save more)',
  p2fs: ['4 vCPU · 8 GB RAM · 80 GB SSD', '🇨🇭 Private server in Switzerland', 'Telegram, Discord & WhatsApp', '🎙️ Voice chat: send voice, receive text or voice replies', 'Automatic updates, monitoring & daily backups', '✅ Personal dashboard (private access only)', 'Email support (24h)', 'Cancel anytime'],
  p2ds: ['No onboarding call'],
  p2cta: 'Choose Pro',

  p3badge: 'BUSINESS', p3n: 'Business', p3d: 'For demanding workloads and maximum performance',
  p3p: '59', p3a: '→ CHF 560/year (save more)',
  p3fs: ['8 vCPU · 16 GB RAM · 80 GB SSD', '🇨🇭 Private server in Switzerland', 'Telegram, Discord & WhatsApp', '🎙️ Voice chat: send voice, receive text or voice replies', 'Automatic updates, monitoring & daily backups', '✅ Personal dashboard (private access only)', 'Priority support (< 24h)', 'Custom skills & automation setup included', 'Cancel anytime'],
  p3fsAnnualExtra: '📞 30-min onboarding call in German or English',
  p3cta: 'Choose Business',

  cLabel: 'Comparison', cH2: 'Why not self-host?',
  cHead: ['Feature', 'Self-hosting', 'OpenClaw Hosting (CH)'],
  cRows: [
    ['Setup time', '60+ min (SSH, Linux, Node.js)', '~30 min (fully automated)'],
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
    ['Do I need technical skills?', 'Not at all. You fill in a form — we handle the rest. No terminal, no SSH, no config files. The onboarding takes about 5 minutes and we guide you through every step.'],
    ['What is an API key?', 'Your assistant needs an AI model running in the background — Claude, GPT-4, or Gemini. You create that key directly with the provider for free. Usage costs (~CHF 5–20/mo) are billed by them separately and have nothing to do with our hosting fee.'],
    ['Where is my data stored?', 'Exclusively on your own private server in Switzerland — fully GDPR and nDSG compliant. Your credentials and conversation data never leave that server.'],
    ['Which AI models are supported?', 'You can choose between Claude (Anthropic), GPT-4 (OpenAI) and Gemini (Google) — and switch anytime. We recommend Claude Haiku for getting started (~CHF 5/mo) or Claude Sonnet for more demanding tasks (~CHF 15–20/mo).'],
    ['Can I cancel anytime?', 'Yes — anytime. Your current billing period runs to the end, then nothing more is charged. No hidden fees.'],
    ['What exactly is OpenClaw?', 'OpenClaw is an open-source AI platform that runs on your own server and connects to Telegram, Discord and WhatsApp. It\'s modular, actively developed, and free to use. We take care of the hosting — you just use it.'],
    ['What happens when OpenClaw updates?', 'We review new versions internally before rolling them out — then push updates to your server automatically. No downtime, nothing you need to do.'],
    ['Is there support in English?', 'Yes, in both German and English. You reach us by email and get a personal reply — no bot, no ticket labyrinth.'],
  ],

  finalH2a: 'Ready for your', finalH2b: 'personal AI assistant?',
  finalSub: 'No tech skills needed. Fully automated setup — your assistant is live in ~30 minutes.',
  finalCta: 'Get in touch',
  finalNote: 'Or email us directly: support@openclaw-consulting.ch',

  footerCopy: '© 2026 ',
  footerPrivacy: 'Privacy', footerImprint: 'Imprint', footerAgb: 'Terms', footerAbout: 'About',
}

/* ─── PAGE ──────────────────────────────────────────────────────── */
export default function Home() {
  const [lang, setLang] = useState<'de'|'en'>(() => {
    if (typeof window !== 'undefined') return (localStorage.getItem('lang') as 'de'|'en') || 'de'
    return 'de'
  })
  const [billing, setBilling] = useState<'monthly'|'annual'>('annual')
  const t = lang === 'de' ? de : en

  return (
    <>
      {/* NAV */}
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="/" className="nav-brand">{t.navBrand1}<span>{t.navBrand2}</span></a>
          <div className="nav-links">
            <a href="#how">{t.navHow}</a>
            <a href="#pricing">{t.navPricing}</a>
            <a href="/vergleich">{t.navVergleich}</a>
            <a href="/skills">{t.navSkills}</a>
            <a href="#faq">{t.navFaq}</a>
            <a href="/contact">{t.navContact}</a>
            <a href="/ueber-uns">{t.navAbout}</a>
            <button className="lang-btn" onClick={() => setLang(l => { const n = l==='de'?'en':'de'; localStorage.setItem('lang', n); return n })}>{lang==='de'?'EN':'DE'}</button>
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
          {/* Screenshot — full width */}
          <div style={{borderRadius:'14px', overflow:'hidden', border:'1px solid var(--border)', boxShadow:'0 12px 48px rgba(15,23,20,0.13)', marginBottom:'2.5rem'}}>
            <img src="/dashboard-preview.jpg" alt="OpenClaw Dashboard Preview" style={{width:'100%', display:'block'}} />
          </div>
          {/* Bullets — 3 col grid */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem'}} className="dash-points-grid">
            {t.dashPoints.map((p, i) => (
              <div key={i} style={{padding:'1rem 1.1rem', background:'var(--white)', border:'1px solid var(--border)', borderRadius:'10px', fontSize:'0.88rem', color:'var(--slate)', lineHeight:1.6}}>
                {p}
              </div>
            ))}
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

      {/* TESTIMONIALS */}
      <section style={{padding:'5rem 0', background:'var(--light)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
        <div className="container">
          <div className="section-label">{t.testimonialsLabel}</div>
          <h2 className="section-h2">{t.testimonialsH2}</h2>
          <div className="testimonials-grid" style={{marginTop:'2rem'}}>
            {t.testimonials.map((tm, i) => (
              <div key={i} style={{background:'var(--white)', border:'1px solid var(--border)', borderRadius:'12px', padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
                <div style={{fontSize:'1.5rem', color:'var(--green)'}}>❝</div>
                <p style={{color:'var(--slate)', fontSize:'0.92rem', lineHeight:1.7, flex:1, fontStyle:'italic'}}>
                  {tm.text}
                </p>
                <div style={{borderTop:'1px solid var(--border)', paddingTop:'0.85rem'}}>
                  <p style={{fontWeight:700, fontSize:'0.9rem', color:'var(--ink)'}}>{tm.name}</p>
                  <p style={{fontSize:'0.8rem', color:'var(--dim)'}}>{tm.role}</p>
                </div>
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
          <div style={{display:'inline-flex', alignItems:'center', gap:'0', marginBottom:'2rem', background:'#f1f5f9', borderRadius:'10px', padding:'4px'}}>
            <button
              onClick={() => setBilling('monthly')}
              style={{padding:'0.45rem 1.25rem', borderRadius:'7px', border:'none', fontWeight:600, fontSize:'0.88rem', cursor:'pointer', transition:'all 0.15s',
                background: billing==='monthly' ? '#fff' : 'transparent',
                color: billing==='monthly' ? 'var(--ink)' : 'var(--slate)',
                boxShadow: billing==='monthly' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
              }}>
              {lang==='de' ? 'Monatlich' : 'Monthly'}
            </button>
            <button
              onClick={() => setBilling('annual')}
              style={{padding:'0.45rem 1.25rem', borderRadius:'7px', border:'none', fontWeight:600, fontSize:'0.88rem', cursor:'pointer', transition:'all 0.15s',
                background: billing==='annual' ? 'var(--green)' : 'transparent',
                color: billing==='annual' ? '#fff' : 'var(--slate)',
                boxShadow: billing==='annual' ? '0 1px 4px rgba(18,168,120,0.3)' : 'none'
              }}>
              {lang==='de' ? 'Jährlich' : 'Annual'}
            </button>
            <span style={{marginLeft:'0.6rem', background:'#dcfce7', color:'#14532d', padding:'0.2rem 0.6rem', borderRadius:'99px', fontSize:'0.75rem', fontWeight:700, whiteSpace:'nowrap'}}>
              {lang==='de' ? 'Günstiger' : 'Save more'}
            </span>
          </div>

          <div className="pricing-transparency">
            <strong>⚠️ {lang==='de'?'Wichtig':'Important'}:</strong> {t.pNote}
          </div>
          <div className="plans plans-3">
            {[
              { plan:'starter', featured:false, badge:null, badgeStyle:{},
                name:t.p1n, desc:t.p1d,
                price: billing==='annual' ? 15 : 19,
                annual: billing==='annual' ? (lang==='de'?'CHF 180/Jahr abgerechnet':'CHF 180/year billed') : (lang==='de'?'→ CHF 180/Jahr (günstiger)':'→ CHF 180/year (save more)'),
                features:t.p1fs, dims:t.p1ds, cta:t.p1cta,
                href: billing==='annual'
                  ? (process.env.NEXT_PUBLIC_PAYREXX_STARTER_ANNUAL||'/onboarding?plan=starter&billing=annual')
                  : (process.env.NEXT_PUBLIC_PAYREXX_STARTER||'/onboarding?plan=starter'),
                ctaClass:'plan-cta outline'
              },
              { plan:'pro', featured:true, badge:t.p2badge, badgeStyle:{},
                name:t.p2n, desc:t.p2d,
                price: billing==='annual' ? 27 : 34,
                annual: billing==='annual' ? (lang==='de'?'CHF 320/Jahr abgerechnet':'CHF 320/year billed') : (lang==='de'?'→ CHF 320/Jahr (günstiger)':'→ CHF 320/year (save more)'),
                features:t.p2fs, dims:t.p2ds, cta:t.p2cta,
                href: billing==='annual'
                  ? (process.env.NEXT_PUBLIC_PAYREXX_PRO_ANNUAL||'/onboarding?plan=pro&billing=annual')
                  : (process.env.NEXT_PUBLIC_PAYREXX_PRO||'/onboarding?plan=pro'),
                ctaClass:'plan-cta'
              },
              { plan:'business', featured:false, badge:t.p3badge, badgeStyle:{background:'var(--ink2)', color:'#fff'},
                name:t.p3n, desc:t.p3d,
                price: billing==='annual' ? 47 : 59,
                annual: billing==='annual' ? (lang==='de'?'CHF 560/Jahr abgerechnet':'CHF 560/year billed') : (lang==='de'?'→ CHF 560/Jahr (günstiger)':'→ CHF 560/year (save more)'),
                features: billing==='annual' ? [...t.p3fs, t.p3fsAnnualExtra] : t.p3fs, dims:[], cta:t.p3cta,
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
                <button
                  className={p.ctaClass}
                  style={{cursor:'pointer', textAlign:'center'}}
                  onClick={async () => {
                    const btn = document.activeElement as HTMLButtonElement
                    if (btn) { btn.textContent = lang==='de'?'Wird geladen...':'Loading...'; btn.disabled = true }
                    try {
                      const r = await fetch('/api/checkout', {
                        method: 'POST',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({plan: p.plan, billing, lang})
                      })
                      const d = await r.json()
                      if (d.checkoutUrl) window.location.href = d.checkoutUrl
                      else alert('Fehler: ' + (d.error || 'Unbekannt'))
                    } catch {
                      if (btn) { btn.textContent = p.cta; btn.disabled = false }
                      alert('Verbindungsfehler')
                    }
                  }}
                >{p.cta}</button>
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

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Brauche ich technisches Wissen?", "acceptedAnswer": { "@type": "Answer", "text": "Kein bisschen. Sie füllen ein Formular aus — wir erledigen den Rest. Kein Terminal, kein SSH, keine Konfigurationsdateien. Das Onboarding dauert etwa 5–10 Minuten." } },
              { "@type": "Question", "name": "Was ist ein API-Schlüssel?", "acceptedAnswer": { "@type": "Answer", "text": "Ihr Assistent braucht ein KI-Modell im Hintergrund — Claude, GPT-4 oder Gemini. Den Schlüssel dafür erstellen Sie gratis direkt beim Anbieter. Die Nutzungskosten (~CHF 5–20/Mt.) werden dort abgerechnet." } },
              { "@type": "Question", "name": "Wo werden meine Daten gespeichert?", "acceptedAnswer": { "@type": "Answer", "text": "Ausschliesslich auf Ihrem eigenen, privaten Server in der Schweiz — DSGVO- und nDSG-konform. Ihre Zugangsdaten und Gesprächsdaten verlassen diesen Server nie." } },
              { "@type": "Question", "name": "Welche KI-Modelle werden unterstützt?", "acceptedAnswer": { "@type": "Answer", "text": "Sie können zwischen Claude (Anthropic), GPT-4 (OpenAI) und Gemini (Google) wählen — und jederzeit wechseln. Für den Einstieg empfehlen wir Claude Haiku (~CHF 5/Mt.)." } },
              { "@type": "Question", "name": "Kann ich jederzeit kündigen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja — jederzeit. Die aktuelle Aboperiode läuft bis zum Ende aus, danach wird nichts mehr belastet. Keine versteckten Gebühren." } },
              { "@type": "Question", "name": "Was genau ist OpenClaw?", "acceptedAnswer": { "@type": "Answer", "text": "OpenClaw ist eine quelloffene KI-Plattform, die auf Ihrem eigenen Server läuft und sich mit Telegram, Discord und WhatsApp verbindet. Wir übernehmen das Hosting — Sie nutzen sie einfach." } },
              { "@type": "Question", "name": "Gibt es Support auf Deutsch?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, auf Deutsch und Englisch. Sie erreichen uns per E-Mail und erhalten eine persönliche Antwort — kein Bot, kein Ticket-Labyrinth." } }
            ]
          })
        }}
      />

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
          <a href="/contact" className="btn-primary" style={{fontSize:'1.05rem', padding:'0.95rem 2.5rem'}}>{t.finalCta}</a>
          <p style={{marginTop:'1rem', fontSize:'0.83rem', color:'var(--dim)'}}>{t.finalNote}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>{t.footerCopy}<a href="https://openclaw-consulting.ch">openclaw-consulting.ch</a> · <a href="/datenschutz">{t.footerPrivacy}</a> · <a href="/impressum">{t.footerImprint}</a> · <a href="/agb">{t.footerAgb}</a> · <a href="/ueber-uns">{t.footerAbout}</a></p>
        </div>
      </footer>
    </>
  )
}
