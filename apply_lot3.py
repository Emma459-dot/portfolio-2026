#!/usr/bin/env python3
"""Lot 3 (après lots 1 et 2) : correctifs + éventail des projets + FR/EN, mode clair/sombre, compteurs, etc.
Usage :  python apply_lot3.py src/App.jsx      (sauvegarde App.jsx.bak3)
"""
import sys, shutil, re

path = sys.argv[1] if len(sys.argv) > 1 else "src/App.jsx"
src = open(path, encoding="utf-8").read()
if "MagneticFX" in src:
    sys.exit("Lot 3 déjà appliqué.")
if "HoverReveal" not in src:
    sys.exit("Lance d'abord apply_lot1.py puis apply_lot2.py.")
shutil.copy(path, path + ".bak3")


def sub(old, new, all_=False):
    global src
    if old not in src:
        print("  (ignoré, texte absent) :", old[:70]); return
    src = src.replace(old, new) if all_ else src.replace(old, new, 1)


def block(start, end, new):
    global src
    if start not in src or end not in src:
        sys.exit("Ancre introuvable : " + start + " / " + end)
    i = src.index(start); j = src.index(end, i)
    src = src[:i] + new + src[j:]


# ------------------------------------------------------------------ 1) effet photo d'accueil : image introuvable / mauvaise extension
sub("const img = new Image(); img.src = reveal;", r'''const img = new Image();
    const list = [reveal, reveal.replace('.jpg', '.jpeg'), reveal.replace('.jpg', '.png')]; let k = 0;
    img.onload = () => console.info('[HoverReveal] image chargée :', list[k]);
    img.onerror = () => { console.warn('[HoverReveal] image introuvable :', list[k]); if (++k < list.length) img.src = list[k]; };
    img.src = list[0];''')

# ------------------------------------------------------------------ 2) polices : on garde celles du site
src = re.sub(r"@import url\('https://fonts\.googleapis\.com[^;]*;", "", src)
sub(".serif-title { font-family: 'Fraunces', Georgia, serif; font-weight: 800; letter-spacing: -0.02em; }", ".serif-title { font-weight: 900; letter-spacing: -0.025em; }")

# ------------------------------------------------------------------ 3) nouveaux composants
COMP = r'''const T = {
  fr: {
    badge: "Alternant chez Axians France", h1a: "Technicien", h1b: "Systèmes & Réseaux", heroA: "Je suis", heroB: ". Je conçois des infrastructures virtualisées robustes et supervisées.",
    contact: "ME CONTACTER", cv: "Mon CV", about: "Qui suis-je ?", aboutLabel: "A Propos", mes: "Mes", mon: "Mon", labs: "Labs", journey: "Parcours", certs: "Certifications", soft: "Soft Skills", skills: "Compétences",
    desc: "Technicien systèmes et réseaux, je me passionne pour les infrastructures IT et, plus encore, pour les télécoms : fibre optique, VoIP, supervision de liens et de sites. Formé à Keyce Informatique Toulouse et en 3e année de Bachelor au CESI École d'ingénieurs, je suis aujourd'hui alternant chez Axians France. J'y mets en service et fais évoluer des infrastructures réseaux et télécoms, avec la rigueur, l'autonomie et le sens du terrain acquis chez Sphere Telecom et dans mes labs virtualisés.",
    expTitle: "Expériences professionnelles", axTitle: "Alternant Technicien Réseaux et Télécoms", spTitle: "Technicien Informatique", now: "Actuellement", recent: "Stage · Récent", more: "Voir le détail", less: "Réduire", close: "Fermer",
    view: "Voir le lab", consult: "Consulter", cta: "Un projet en tête ? Discutons-en", deal: "Scrolle pour déployer", status: "Statut : En alternance chez Axians France", hire: "Me Recruter",
    school: "Ecole Actuelle", schoolName: "CESI École d'ingénieurs", year: "3e année · Alternance", cLabs: "Labs réalisés", cCerts: "Certifications", cTech: "Technologies", cComp: "Expériences pro",
  },
  en: {
    badge: "Apprentice at Axians France", h1a: "Technician", h1b: "Systems & Networks", heroA: "I'm", heroB: ". I design robust, monitored virtualized infrastructures.",
    contact: "CONTACT ME", cv: "My CV", about: "Who am I?", aboutLabel: "About", mes: "My", mon: "My", labs: "Labs", journey: "Journey", certs: "Certifications", soft: "Soft Skills", skills: "Skills",
    desc: "A systems and networks technician, I'm passionate about IT infrastructure and, even more, about telecoms: fiber optics, VoIP, link and site monitoring. Trained at Keyce Informatique Toulouse and now in my 3rd Bachelor year at CESI engineering school, I'm currently an apprentice at Axians France, where I commission and evolve network and telecom infrastructures, with the rigor, autonomy and field sense gained at Sphere Telecom and in my virtualized labs.",
    expTitle: "Professional experience", axTitle: "Networks & Telecom Technician (Apprentice)", spTitle: "IT Technician", now: "Current", recent: "Internship · Recent", more: "See details", less: "Collapse", close: "Close",
    view: "View lab", consult: "View", cta: "Got a project in mind? Let's talk", deal: "Scroll to deal the cards", status: "Status: apprentice at Axians France", hire: "Hire me",
    school: "Current school", schoolName: "CESI Engineering School", year: "Year 3 · Apprenticeship", cLabs: "Labs built", cCerts: "Certifications", cTech: "Technologies", cComp: "Work experiences",
  },
};

/* Boutons magnétiques : tout élément portant data-magnetic est attiré par le curseur */
const MagneticFX = () => {
  useEffect(() => {
    const f = (e) => document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const r = el.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = Math.hypot(dx, dy) < Math.max(r.width, r.height) * 0.9 ? `translate(${dx * 0.3}px, ${dy * 0.3}px)` : '';
    });
    window.addEventListener('mousemove', f); return () => window.removeEventListener('mousemove', f);
  }, []);
  return null;
};

/* Compteurs animés */
const Counters = ({ items }) => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [v, setV] = useState(items.map(() => 0));
  useEffect(() => { const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.4 }); io.observe(ref.current); return () => io.disconnect(); }, []);
  useEffect(() => {
    if (!on) return;
    const t0 = performance.now(); let raf;
    const f = (now) => { const k = clamp((now - t0) / 1600), e = 1 - Math.pow(1 - k, 3); setV(items.map((it) => Math.round(it.n * e))); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf);
  }, [on]);
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((it, i) => (
        <div key={i} className="text-center p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-500">
          <p className="text-4xl md:text-5xl font-black text-blue-400">{v[i]}</p>
          <p className="mt-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500">{it.label}</p>
        </div>
      ))}
    </div>
  );
};

'''
sub("const App = () => {", COMP + "const App = () => {")

# ------------------------------------------------------------------ 4) projets : paquet dans un coin, distribué carte par carte pendant que la section reste épinglée
LABS = r'''/* Projets : paquet de cartes dans le coin, distribué carte par carte (section épinglée) + pastille curseur */
const LabsGrid = ({ items, onOpen, onContact, t }) => {
  const wrap = useRef(null), box = useRef(null), pill = useRef(null), hint = useRef(null), cells = useRef([]), cards = useRef([]);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, on: 0 });
  useEffect(() => {
    const back = (q) => 1 + 2.70158 * Math.pow(q - 1, 3) + 1.70158 * Math.pow(q - 1, 2);
    const upd = () => {
      const w = wrap.current, b = box.current; if (!w || !b) return;
      const desk = window.innerWidth >= 768, r = w.getBoundingClientRect(), br = b.getBoundingClientRect();
      const p = desk ? clamp(((100 - r.top) / (r.height - 780)) * 1.08) : 1;
      if (hint.current) hint.current.style.opacity = desk && p < 0.03 ? 1 : 0;
      cards.current.forEach((el, i) => {
        const cell = cells.current[i]; if (!el || !cell) return;
        if (!desk) { el.style.transform = ''; return; }
        const e = back(clamp((p - i * 0.2) / 0.4)), u = 1 - e, cr = cell.getBoundingClientRect();
        const dx = 70 + i * 5 - (cr.left - br.left + cr.width / 2), dy = 70 + i * 5 - (cr.top - br.top + cr.height / 2);
        el.style.transform = `translate3d(${dx * u}px, ${dy * u}px, 0) rotate(${(-14 + i * 9) * u}deg) rotateY(${-55 * u}deg) scale(${1 - 0.58 * u})`;
      });
    };
    let raf;
    const loop = () => {
      const s = pos.current; s.x += (s.tx - s.x) * 0.18; s.y += (s.ty - s.y) * 0.18;
      if (pill.current) { pill.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%) scale(${s.on ? 1 : 0.4})`; pill.current.style.opacity = s.on ? 1 : 0; }
      raf = requestAnimationFrame(loop);
    };
    upd(); loop();
    window.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', upd); window.removeEventListener('resize', upd); };
  }, []);
  const track = (e) => { const r = box.current.getBoundingClientRect(); pos.current.tx = e.clientX - r.left; pos.current.ty = e.clientY - r.top; };
  return (
    <div>
      <div ref={wrap} className="md:h-[260vh]">
        <div className="md:sticky md:top-24">
          <div ref={box} className="relative grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 md:gap-y-6 max-w-[860px] mx-auto" style={{ perspective: 1400 }}>
            {items.map((p, i) => (
              <div key={p.id} ref={(el) => (cells.current[i] = el)} className="relative">
                <div className="hidden md:block absolute inset-0 rounded-3xl border border-dashed border-white/10" />
                <div ref={(el) => (cards.current[i] = el)} onClick={() => onOpen(p)} onMouseMove={track} onMouseEnter={() => (pos.current.on = 1)} onMouseLeave={() => (pos.current.on = 0)}
                  className="group relative cursor-pointer will-change-transform" style={{ zIndex: 10 - i }}>
                  <div className="relative overflow-hidden rounded-3xl aspect-[16/10] border border-white/10 bg-zinc-900 shadow-2xl">
                    <img src={p.screenshots[0]} alt={p.title} className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">{p.tags.slice(0, 2).map((g) => <span key={g} className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider">{g}</span>)}</div>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div><h4 className="font-black text-base md:text-lg">{p.title}</h4><p className="text-zinc-500 text-xs mt-0.5">{p.shortDesc}</p></div>
                    <span className="flex items-center gap-1 text-xs text-zinc-400 group-hover:text-white whitespace-nowrap transition-colors">{t.consult} <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={hint} className="hidden md:block absolute left-4 top-[190px] z-20 pointer-events-none text-[10px] font-bold uppercase tracking-widest text-zinc-500 transition-opacity duration-500">{t.deal} ↓</div>
            <div ref={pill} className="absolute top-0 left-0 z-50 pointer-events-none px-4 py-2 rounded-full bg-white text-black text-xs font-bold shadow-2xl" style={{ opacity: 0 }}>{t.view}</div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <button onClick={onContact} className="group inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors">{t.cta} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
      </div>
    </div>
  );
};

'''
block("/* Projets :", "/* Parcours :", LABS)
sub("onContact={() => setShowContactModal(true)} />", "onContact={() => setShowContactModal(true)} t={t} />")

# ------------------------------------------------------------------ 5) parcours : CESI en 3e année + FR/EN
PAR = r'''const PARCOURS = [
  { period: '2023 — 2024', title: ['Baccalauréat Scientifique Série C', 'Scientific Baccalaureate (Series C)'], school: 'Complexe Le Prestige', place: ['Yaoundé, Cameroun', 'Yaoundé, Cameroon'], logo: '/prestige.png', photo: '/photo.jpeg', accent: '#F59E0B', badge: 'Bac S', text: ['Les fondations : rigueur scientifique et logique.', 'The foundations: scientific rigor and logic.'] },
  { period: '2023 — 2025', title: ['Bachelor Tronc Commun Informatique', 'Bachelor – IT Core Curriculum'], school: 'Keyce Informatique', place: ['Yaoundé, Cameroun', 'Yaoundé, Cameroon'], logo: '/keyce.png', photo: '/1.jpeg', accent: '#3B82F6', badge: ['1re & 2e année', 'Years 1 & 2'], text: ['Deux années pour poser les bases : réseau, système et développement.', 'Two years of fundamentals: networking, systems and development.'] },
  { period: '2025 — 2026', title: ['Bachelor Administration Systèmes & Réseaux', 'Bachelor – Systems & Network Administration'], school: 'Keyce Informatique', place: 'Toulouse, France', logo: '/keyce.png', photo: '/3.jpeg', accent: '#10B981', badge: ['2e année FR', 'Year 2 (France)'], text: ['Spécialisation : Proxmox, Active Directory, Zabbix, VPN IPsec.', 'Specialization: Proxmox, Active Directory, Zabbix, IPsec VPN.'] },
  { period: '2026 — 2027', title: ['3e année de Bachelor en alternance', 'Bachelor Year 3 – Apprenticeship'], school: "CESI École d'ingénieurs", place: ['Alternance chez Axians France', 'Apprenticeship at Axians France'], logo: '/cesi.png', photo: '/5.jpeg', accent: '#A855F7', badge: ['En cours', 'Ongoing'], text: ['Technicien Réseaux et Télécoms : vidéosurveillance, Smart city, fibre optique, chantiers.', 'Networks & Telecom Technician: CCTV, Smart city, fiber optics, field work.'] },
];

'''
block("const PARCOURS = [", "const Parcours = () => {", PAR)
sub("const Parcours = () => {", "const Parcours = ({ lang = 'fr' }) => {\n  const pk = (v) => (Array.isArray(v) ? v[lang === 'en' ? 1 : 0] : v);")
sub("alt={s.title}", "alt={pk(s.title)}")
sub('leading-tight">{s.title}</h3>', 'leading-tight">{pk(s.title)}</h3>')
sub("{s.badge}</span>", "{pk(s.badge)}</span>")
sub("<span className=\"text-zinc-500 font-medium\">{s.place}</span>", "<span className=\"text-zinc-500 font-medium\">{pk(s.place)}</span>")
sub("md:inline-block\">{s.text}</p>", "md:inline-block\">{pk(s.text)}</p>")
sub('<img src={s.logo} alt={s.school} className="w-full h-full object-contain" />', "<img src={s.logo} alt={s.school} onError={(e) => { e.currentTarget.src = '/axians.png'; }} className=\"w-full h-full object-contain\" />")
sub("<Parcours />", "<Parcours lang={lang} />")

# ------------------------------------------------------------------ 6) état global : langue, thème, fondu d'onglet
STATE = r'''
  const [lang, setLang] = useState('fr');
  const [theme, setTheme] = useState('dark');
  const [fading, setFading] = useState(false);
  const t = T[lang];
  const switchTab = (tab) => { if (tab === activeTab) return; setFading(true); setTimeout(() => { setActiveTab(tab); window.scrollTo(0, 0); setFading(false); }, 260); };
  useEffect(() => { document.documentElement.classList.toggle('theme-light', theme === 'light'); document.documentElement.lang = lang; }, [theme, lang]);'''
sub("const panelRef = useRef(null);", "const panelRef = useRef(null);" + STATE)
src = re.sub(r"setActiveTab\('(portfolio|cv)'\)", r"switchTab('\1')", src)
sub('<main className="relative z-10 w-full min-h-screen">', '<main className="relative z-10 w-full min-h-screen transition-opacity duration-300" style={{ opacity: fading ? 0 : 1 }}>')
sub(".animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }", """.animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        html { transition: filter .5s ease; }
        html.theme-light { filter: invert(1) hue-rotate(180deg); }
        html.theme-light img, html.theme-light video, html.theme-light canvas { filter: invert(1) hue-rotate(180deg); }""")

# ------------------------------------------------------------------ 7) spot lumineux + bascule FR/EN + thème
sub("<ScrollBar />", r'''<ScrollBar /><MagneticFX />
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{ background: `radial-gradient(520px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(96,165,250,0.13), transparent 60%)` }} />
      <div className="fixed bottom-5 right-5 z-[70] flex items-center gap-1 p-1.5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10">
        <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="px-3 py-2 rounded-xl text-xs font-black text-zinc-200 hover:bg-white/10 transition-colors">{lang === 'fr' ? 'EN' : 'FR'}</button>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Theme" className="px-3 py-2 rounded-xl text-sm text-zinc-200 hover:bg-white/10 transition-colors">{theme === 'dark' ? '☀' : '☾'}</button>
      </div>''')
sub("<a href={`mailto:${user.email}`} className=\"group/btn", "<a data-magnetic href={`mailto:${user.email}`} className=\"group/btn")
sub('<button onClick={() => setShowContactModal(true)} className="bg-blue-600 hover:bg-blue-500', '<button data-magnetic onClick={() => setShowContactModal(true)} className="bg-blue-600 hover:bg-blue-500')

# ------------------------------------------------------------------ 8) compteurs
sub("{/* PARCOURS — frise verticale */}", "<Counters items={[{ n: projects.length, label: t.cLabs }, { n: certifications.length + 1, label: t.cCerts }, { n: allSkillsFlat.length, label: t.cTech }, { n: experiences.length, label: t.cComp }]} />\n\n            {/* PARCOURS — frise verticale */}")

# ------------------------------------------------------------------ 9) textes (FR/EN + intitulés + CESI)
sub("<span>Alternant Réseau & Télécom · Axians France</span>", "<span>{t.badge}</span>")
sub("<span>Alternance · Axians France</span>", "<span>{t.badge}</span>")
sub('uppercase">Technicien</h1>', 'uppercase">{t.h1a}</h1>')
sub('bg-clip-text text-transparent">Systemes & Reseaux</h1>', 'bg-clip-text text-transparent">{t.h1b}</h1>')
sub('>Je suis <span className="text-white font-semibold">Emmanuel LOKADI</span>. Je concois des infrastructures virtualisees robustes et supervisees.</p>',
    '>{t.heroA} <span className="text-white font-semibold">Emmanuel LOKADI</span>{t.heroB}</p>')
sub("<span>ME CONTACTER</span>", "<span>{t.contact}</span>", True)
sub(">Mon CV</button>", ">{t.cv}</button>")
sub(">Qui suis-je ?</h2>", ">{t.about}</h2>")
sub(">A Propos</p>", ">{t.aboutLabel}</p>")
sub("{user.description}", "{t.desc}")
sub(">Ecole Actuelle</p>", ">{t.school}</p>")
sub('leading-tight">{user.school}</p>', 'leading-tight">{t.schoolName}</p>')
sub(">2eme annee</span>", ">{t.year}</span>")
sub('<span className="text-zinc-600">Mes</span> Labs', '<span className="text-zinc-600">{t.mes}</span> {t.labs}')
sub('<span className="text-zinc-600">Mon</span> Parcours', '<span className="text-zinc-600">{t.mon}</span> {t.journey}')
sub('<span className="text-zinc-600">Mes</span> Certifications', '<span className="text-zinc-600">{t.mes}</span> {t.certs}')
sub('<span className="text-zinc-600">Mes</span> Soft Skills', '<span className="text-zinc-600">{t.mes}</span> {t.soft}')
sub('<span className="text-zinc-600">Mes</span> Competences', '<span className="text-zinc-600">{t.mes}</span> {t.skills}')
sub(">Expériences professionnelles</h2>", ">{t.expTitle}</h2>")
sub("title: 'Alternant Technicien Réseau & Télécom'", "title: t.axTitle")
sub("badge: 'Actuellement'", "badge: t.now")
sub("title: 'Technicien Informatique'", "title: t.spTitle")
sub("badge: 'Stage · Récent'", "badge: t.recent")
sub("'Réduire' : 'Voir le détail'", "t.less : t.more")
sub('<span className="hidden sm:inline">Fermer</span>', '<span className="hidden sm:inline">{t.close}</span>')
sub("Statut : En alternance chez Axians", "{t.status}")
sub(">Me Recruter</button>", ">{t.hire}</button>")
sub("Alternant Technicien Reseau & Telecom</h4>", "{t.axTitle}</h4>")
sub('{ title: "Bachelor Administrateur Systemes & Reseaux", sub: "Ecole de destination (Sept. 2026)"', '{ title: "Bachelor 3e annee en alternance", sub: "CESI Ecole d\'ingenieurs · Axians France (Sept. 2026)"')

open(path, "w", encoding="utf-8").write(src)
print("OK — lot 3 appliqué sur", path, "(sauvegarde :", path + ".bak3)")
