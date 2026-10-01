#!/usr/bin/env python3
"""Lot 4 (après lots 1-3) : correctifs, scène Compétences animée, + 3 nouveautés (topologie, terminal, palette Ctrl+K).
Usage :  python apply_lot4.py src/App.jsx      (sauvegarde App.jsx.bak4)
"""
import sys, shutil, re

path = sys.argv[1] if len(sys.argv) > 1 else "src/App.jsx"
src = open(path, encoding="utf-8").read()
if "SkillScene" in src:
    sys.exit("Lot 4 déjà appliqué.")
if "MagneticFX" not in src:
    sys.exit("Lance d'abord les lots 1, 2 et 3.")
shutil.copy(path, path + ".bak4")


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


# 1) CAUSE du défilement sans déploiement : overflow-x-hidden sur la racine casse position: sticky
sub("selection:bg-blue-500/30 overflow-x-hidden\">", "selection:bg-blue-500/30\" style={{ overflowX: 'clip' }}>")

# 2) mode clair : on garde le niveau de gris des photos (classes grayscale de Tailwind)
sub("html.theme-light img, html.theme-light video, html.theme-light canvas { filter: invert(1) hue-rotate(180deg); }",
    "html.theme-light img, html.theme-light video, html.theme-light canvas { filter: invert(1) hue-rotate(180deg) var(--tw-grayscale,); }")

# 3) éventail des projets : interrupteur de secours
sub("const LabsGrid = ", "const LABS_DEAL = true; // passe à false pour revenir à une simple grille\nconst LabsGrid = ")
sub("const desk = window.innerWidth >= 768, r = w.getBoundingClientRect()", "const desk = LABS_DEAL && window.innerWidth >= 768, r = w.getBoundingClientRect()")
sub('<div ref={wrap} className="md:h-[260vh]">', "<div ref={wrap} className={LABS_DEAL ? 'md:h-[260vh]' : ''}>")
sub('<div className="md:sticky md:top-24">', "<div className={LABS_DEAL ? 'md:sticky md:top-24' : ''}>")

# 4) parcours : photos + double logo CESI / Axians
i = src.index("const PARCOURS = ["); j = src.index("const Parcours = ", i)
mp = {"/photo.jpeg": "/3.jpeg", "/1.jpeg": "/photo.jpeg", "/3.jpeg": "/1.jpeg"}
seg = re.sub(r"photo: '(/[^']+)'", lambda m: "photo: '" + mp.get(m.group(1), m.group(1)) + "'", src[i:j])
seg = seg.replace("logo: '/cesi.png',", "logo: '/cesi.png', logos: ['/cesi.png', '/axians.png'],")
src = src[:i] + seg + src[j:]
src = re.sub(r'<div className="absolute bottom-4 left-4 w-14 h-14[^>]*>.*?</div>',
             '<div className="absolute bottom-4 left-4 flex gap-2">{(s.logos || [s.logo]).map((lg) => (<div key={lg} className="w-14 h-14 rounded-xl bg-white/95 p-2 shadow-xl"><img src={lg} alt={s.school} onError={(e) => { e.currentTarget.style.display = \'none\'; }} className="w-full h-full object-contain" /></div>))}</div>',
             src, count=1)

# 5) « Qui suis-je »
FR = ("Je suis Emmanuel Lokadi, alternant réseaux et télécoms chez Axians France, du groupe Vinci Energies, et en parallèle en 3e année de Bachelor Administration des Systèmes et Réseaux au sein du CESI École d'ingénieurs. "
      "J'ai la chance de travailler aujourd'hui sur des missions autour de la configuration d'équipements, notamment des pare-feux (Cisco, Fortinet), des switchs et des routeurs, "
      "ainsi que sur des travaux de fibre optique, mais aussi sur la configuration de systèmes de vidéosurveillance et de Smart cities.")
EN = ("I'm Emmanuel Lokadi, a networks and telecoms apprentice at Axians France, part of the Vinci Energies group, while also in my 3rd year of a Bachelor in Systems and Network Administration at CESI engineering school. "
      "I'm lucky to work today on missions around equipment configuration, notably firewalls (Cisco, Fortinet), switches and routers, "
      "as well as fiber optic works, and also the configuration of video surveillance and Smart city systems.")
texts = iter([FR, EN])
src = re.sub(r'desc: "[^"\n]*",', lambda m: 'desc: "' + next(texts) + '",', src, count=2)

# 6) on retire le tableau de statistiques
src = re.sub(r"<Counters items=\{\[.*?\]\} />\s*", "", src, count=1, flags=re.S)

# 7) nouveaux composants
COMP = r'''const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

const SkillCard = ({ s }) => (
  <div className="group relative w-full h-full rounded-2xl border border-white/15 backdrop-blur-xl overflow-hidden transition-transform duration-500 hover:-translate-y-3 hover:scale-105"
    style={{ background: `linear-gradient(160deg, ${s.color}40, rgba(255,255,255,0.05) 60%)`, boxShadow: `0 25px 50px -20px ${s.color}88` }}>
    <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
    <div className="flex flex-col items-center justify-center gap-3 h-full p-4 text-center">
      <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: s.color }}>{s.cat}</span>
      <img src={s.icon} alt={s.name} className="w-14 h-14 object-contain" />
      <span className="text-sm font-black leading-tight">{s.name}</span>
    </div>
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md p-4 flex items-center text-[11px] leading-relaxed text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{s.desc}</div>
  </div>
);

/* Compétences : scène épinglée — les cartes passent d'un éventail à une rangée, puis une pile, puis une grille */
const SkillScene = ({ skills, lang }) => {
  const wrap = useRef(null), box = useRef(null), els = useRef([]);
  const [stage, setStage] = useState(0);
  const n = skills.length;
  const H = lang === 'en'
    ? ['My skills, from virtualization to fiber.', 'A stack built for production.', 'Everything connects.', 'One goal: reliable, monitored infrastructure.']
    : ['Mes compétences, de la virtualisation à la fibre.', 'Une stack pensée pour la production.', 'Tout se connecte.', 'Un objectif : une infrastructure fiable et supervisée.'];
  useEffect(() => {
    const segs = [[0, 0.1, 0, 0], [0.1, 0.38, 0, 1], [0.38, 0.48, 1, 1], [0.48, 0.66, 1, 2], [0.66, 0.88, 2, 3], [0.88, 1.01, 3, 3]];
    const top = Math.ceil(n / 2);
    const layouts = (w) => {
      const s = clamp(w / 900, 0.6, 1), L = [[], [], [], []];
      skills.forEach((_, i) => {
        const tt = i - (n - 1) / 2, isTop = i < top;
        L[0].push({ x: w * 0.22 + tt * 36 * s, y: tt * 15, r: tt * 4, s: 1 });
        L[1].push({ x: tt * 92 * s, y: tt * tt * 3.5 + 10, r: tt * 5, s: 1.04 });
        L[2].push({ x: i % 2 ? 5 : -5, y: 10 - i * 2.2, r: ((i % 3) - 1) * 5, s: 0.96 });
        L[3].push({ x: (isTop ? i - (top - 1) / 2 : i - top - (n - top - 1) / 2) * 150 * s, y: isTop ? -75 : 125, r: 0, s: 0.9 });
      });
      return L;
    };
    const upd = () => {
      const w = wrap.current, b = box.current; if (!w || !b) return;
      const desk = window.innerWidth >= 768, r = w.getBoundingClientRect();
      const p = clamp((100 - r.top) / (r.height - 700)), L = layouts(b.clientWidth);
      const sg = segs.find((x) => p < x[1]) || segs[5], raw = sg[2] === sg[3] ? 0 : clamp((p - sg[0]) / (sg[1] - sg[0]));
      els.current.forEach((el, i) => {
        if (!el) return;
        const k = sg[2] === sg[3] ? 0 : ease(clamp(raw * 1.3 - (i / n) * 0.3)), A = L[sg[2]][i], B = L[sg[3]][i], m = (a, c) => a + (c - a) * k;
        el.style.transform = `translate(-50%, -50%) translate3d(${m(A.x, B.x)}px, ${m(A.y, B.y)}px, 0) rotate(${m(A.r, B.r)}deg) scale(${m(A.s, B.s)})`;
      });
      setStage(p < 0.3 ? 0 : p < 0.58 ? 1 : p < 0.8 ? 2 : 3);
    };
    upd(); window.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd);
    return () => { window.removeEventListener('scroll', upd); window.removeEventListener('resize', upd); };
  }, [n]);
  return (
    <div ref={wrap} className="md:h-[340vh]">
      <style>{`@keyframes blurIn { from { opacity: 0; filter: blur(14px); transform: translateY(12px); } to { opacity: 1; filter: blur(0); transform: none; } } .blur-in { animation: blurIn .7s ease-out both; }`}</style>
      <div className="md:sticky md:top-24">
        <div ref={box} className="relative hidden md:block h-[560px]">
          <div className={`absolute z-30 pointer-events-none ${stage === 0 ? 'left-0 top-1/2 -translate-y-1/2 max-w-[42%] text-left' : 'inset-x-0 top-0 text-center'}`}>
            <h3 key={stage} className="blur-in text-3xl md:text-5xl font-black tracking-tight leading-[1.05]">{H[stage]}</h3>
          </div>
          {skills.map((s, i) => (
            <div key={s.name} ref={(el) => (els.current[i] = el)} className="absolute left-1/2 top-1/2 w-[150px] h-[190px] will-change-transform" style={{ zIndex: i + 1 }}><SkillCard s={s} /></div>
          ))}
        </div>
        <div className="md:hidden grid grid-cols-2 gap-3">{skills.map((s) => <div key={s.name} className="h-[170px]"><SkillCard s={s} /></div>)}</div>
      </div>
    </div>
  );
};

/* Topologie réseau animée */
const TOPO = [
  { id: 'fibre', x: 70, y: 170, c: '#F97316', n: 'Fibre FTTH/FTTO', d: ['Liens fibre supervisés et travaux de raccordement.', 'Supervised fiber links and connection works.'] },
  { id: 'fw', x: 230, y: 170, c: '#EF4444', n: 'Pare-feu', d: ['FortiGate, Cisco : règles, VPN IPsec site-à-site.', 'FortiGate, Cisco: rules, site-to-site IPsec VPN.'] },
  { id: 'sw', x: 400, y: 170, c: '#3B82F6', n: 'Switch / Routeur', d: ['Configuration de switchs et routeurs, VLAN, routage.', 'Switch and router configuration, VLANs, routing.'] },
  { id: 'cam', x: 400, y: 40, c: '#A855F7', n: 'Vidéosurveillance', d: ['Mise en service de caméras, Smart city, contrôle d’accès.', 'CCTV commissioning, Smart city, access control.'] },
  { id: 'voip', x: 400, y: 300, c: '#10B981', n: 'Téléphonie 3CX', d: ['Serveurs 3CX, téléphones IP Yealink et DECT Gigaset.', '3CX servers, Yealink IP phones and Gigaset DECT.'] },
  { id: 'pve', x: 590, y: 50, c: '#E07010', n: 'Proxmox', d: ['Virtualisation : VM et conteneurs LXC.', 'Virtualization: VMs and LXC containers.'] },
  { id: 'zbx', x: 590, y: 170, c: '#DC143C', n: 'Zabbix', d: ['Supervision, dashboards et alertes.', 'Monitoring, dashboards and alerting.'] },
  { id: 'ad', x: 590, y: 290, c: '#0078D4', n: 'Active Directory', d: ['AD DS, GPO, RODC, DNS/DHCP.', 'AD DS, GPO, RODC, DNS/DHCP.'] },
];
const Topology = ({ lang }) => {
  const [h, setH] = useState(null);
  const by = Object.fromEntries(TOPO.map((o) => [o.id, o]));
  const links = [['fibre', 'fw'], ['fw', 'sw'], ['sw', 'cam'], ['sw', 'voip'], ['sw', 'pve'], ['sw', 'zbx'], ['sw', 'ad']];
  const cur = by[h];
  return (
    <div className="rounded-2xl md:rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 md:p-8">
      <svg viewBox="0 0 660 340" className="w-full h-auto">
        {links.map(([a, b], i) => { const A = by[a], B = by[b], d = `M${A.x},${A.y} L${B.x},${B.y}`; return (
          <g key={i}><path d={d} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
            <circle r="3.5" fill={B.c}><animateMotion dur={`${2.4 + (i % 3) * 0.5}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" path={d} /></circle>
            <circle r="3.5" fill={A.c}><animateMotion dur={`${2.8 + (i % 3) * 0.4}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M${B.x},${B.y} L${A.x},${A.y}`} /></circle></g>); })}
        {TOPO.map((o) => (
          <g key={o.id} onMouseEnter={() => setH(o.id)} onMouseLeave={() => setH(null)} style={{ cursor: 'pointer' }}>
            <circle cx={o.x} cy={o.y} r={h === o.id ? 34 : 28} fill="#0a0a0a" stroke={o.c} strokeWidth="2" style={{ transition: 'all .3s', filter: `drop-shadow(0 0 ${h === o.id ? 14 : 6}px ${o.c})` }} />
            <circle cx={o.x} cy={o.y} r="6" fill={o.c} />
            <text x={o.x} y={o.y + 50} textAnchor="middle" fill="#a1a1aa" fontSize="12" fontWeight="700">{o.n}</text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-center text-sm min-h-[1.5rem]" style={{ color: cur ? cur.c : '#71717a' }}>{cur ? cur.d[lang === 'en' ? 1 : 0] : (lang === 'en' ? 'Hover a node to see what I do on it.' : 'Survole un équipement pour voir ce que j’y fais.')}</p>
    </div>
  );
};

/* Terminal interactif */
const Terminal = ({ lang }) => {
  const en = lang === 'en';
  const CMD = {
    help: 'help · whoami · show skills · show labs · show exp · ping axians · contact · clear',
    whoami: en ? 'Emmanuel Lokadi — networks & telecoms apprentice at Axians France, CESI engineering school.' : 'Emmanuel Lokadi — alternant réseaux et télécoms chez Axians France, CESI École d’ingénieurs.',
    'show skills': 'Proxmox · VMware · Linux · Windows Server · Zabbix · Stork · Docker · VPN IPsec · GLPI',
    'show labs': 'Kea/Bind9 + Stork · Zabbix + AD RODC · VPN IPsec · GLPI',
    'show exp': 'Axians France (now) · Sphere Telecom (internship)',
    'ping axians': 'Reply from axians.fr: bytes=32 time=1ms TTL=64 — ' + (en ? 'apprenticeship: OK' : 'alternance : OK'),
    contact: 'emmalokadi19@gmail.com',
  };
  const [lines, setLines] = useState(['Portfolio-OS v1.0 — ' + (en ? 'type "help"' : 'tape "help"')]);
  const [val, setVal] = useState('');
  const box = useRef(null);
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [lines]);
  const run = (cmd) => {
    const c = cmd.trim().toLowerCase(); if (!c) return;
    if (c === 'clear') return setLines([]);
    setLines((l) => [...l, '$ ' + c, CMD[c] || (en ? 'command not found: ' + c : 'commande introuvable : ' + c)]);
  };
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden font-mono">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"><span className="w-3 h-3 rounded-full bg-red-500/70" /><span className="w-3 h-3 rounded-full bg-yellow-500/70" /><span className="w-3 h-3 rounded-full bg-emerald-500/70" /><span className="ml-3 text-[10px] text-zinc-600 uppercase tracking-widest">emmanuel@portfolio:~</span></div>
      <div ref={box} className="h-56 overflow-y-auto p-4 text-xs md:text-sm space-y-1">
        {lines.map((l, i) => <div key={i} className={l.startsWith('$') ? 'text-blue-400' : 'text-zinc-400'}>{l}</div>)}
      </div>
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/5">
        <span className="text-emerald-400 text-sm">$</span>
        <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { run(val); setVal(''); } }} placeholder="help" className="flex-1 bg-transparent outline-none text-sm text-zinc-200 placeholder:text-zinc-700" />
      </div>
      <div className="flex flex-wrap gap-2 px-4 pb-4">{['whoami', 'show skills', 'show labs', 'ping axians', 'contact'].map((c) => <button key={c} onClick={() => run(c)} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">{c}</button>)}</div>
    </div>
  );
};

/* Palette de commandes (Ctrl/⌘ + K) */
const Palette = ({ open, onClose, items, lang }) => {
  const [q, setQ] = useState(''), [sel, setSel] = useState(0), inp = useRef(null);
  const L = (x) => x[lang === 'en' ? 1 : 0];
  const list = items.filter((i) => L(i.label).toLowerCase().includes(q.toLowerCase()));
  useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(() => inp.current && inp.current.focus(), 50); } }, [open]);
  if (!open) return null;
  const run = (it) => { onClose(); it.run(); };
  const key = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, list.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter' && list[sel]) run(list[sel]);
  };
  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4 bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <input ref={inp} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} onKeyDown={key} placeholder={lang === 'en' ? 'Go to… (↑ ↓ Enter)' : 'Aller à… (↑ ↓ Entrée)'} className="w-full px-5 py-4 bg-transparent outline-none border-b border-white/10 text-sm text-white placeholder:text-zinc-600" />
        <div className="max-h-72 overflow-y-auto p-2">
          {list.map((it, i) => <button key={i} onMouseEnter={() => setSel(i)} onClick={() => run(it)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${i === sel ? 'bg-blue-600 text-white' : 'text-zinc-400'}`}>{L(it.label)}</button>)}
        </div>
      </div>
    </div>
  );
};

'''
sub("const App = () => {", COMP + "const App = () => {")

# 8) section Compétences -> scène animée
block("{/* ===================== COMPETENCES", "{/* ===================== EXPERIENCES",
      '''{/* COMPETENCES — scène épinglée */}
            <div className="pt-8 md:pt-12 space-y-6 md:space-y-10" id="skills">
              <div className="flex items-center space-x-4 md:space-x-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight"><span className="text-zinc-600">{t.mes}</span> {t.skills}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <SkillScene lang={lang} skills={Object.values(skillCategories).flatMap((c) => c.skills.map((s) => ({ ...s, cat: c.name })))} />
            </div>

            ''')

# 9) nouvelles sections avant le dashboard
H = '<div className="flex items-center space-x-4 md:space-x-6"><h2 className="text-3xl md:text-5xl font-black tracking-tight"><span className="text-zinc-600">{lang === \'en\' ? \'%s\' : \'%s\'}</span> {lang === \'en\' ? \'%s\' : \'%s\'}</h2><div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" /></div>'
NEW = ('{/* Topologie */}\n            <div id="topo" className="pt-8 md:pt-12 space-y-6 md:space-y-10">' + H % ("My", "Mon", "Infrastructure", "Infra") +
       '<Topology lang={lang} /></div>\n\n            {/* Terminal */}\n            <div id="terminal" className="pt-8 md:pt-12 space-y-6 md:space-y-10">' + H % ("My", "Mon", "Terminal", "Terminal") +
       '<Terminal lang={lang} /></div>\n\n            ')
sub("{/* Dashboard */}", NEW + "{/* Dashboard */}")

# 10) palette : état, éléments, bouton
STATE = r'''
  const [pal, setPal] = useState(false);
  const go = (id) => { const f = () => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); }; if (activeTab !== 'portfolio') { switchTab('portfolio'); setTimeout(f, 700); } else f(); };
  const palItems = [
    { label: ['À propos', 'About'], run: () => go('about') }, { label: ['Parcours', 'Journey'], run: () => go('parcours') },
    { label: ['Labs / Projets', 'Labs / Projects'], run: () => go('projects') }, { label: ['Compétences', 'Skills'], run: () => go('skills') },
    { label: ['Expériences', 'Experience'], run: () => go('current-job') }, { label: ['Infrastructure', 'Infrastructure'], run: () => go('topo') },
    { label: ['Terminal', 'Terminal'], run: () => go('terminal') }, { label: ['Certifications', 'Certifications'], run: () => go('certifications') },
    { label: ['Ouvrir mon CV', 'Open my CV'], run: () => switchTab('cv') }, { label: ['Télécharger le CV (PDF)', 'Download CV (PDF)'], run: () => handleDownloadCV() },
    { label: ['Basculer clair / sombre', 'Toggle light / dark'], run: () => setTheme((v) => (v === 'dark' ? 'light' : 'dark')) },
    { label: ['Passer en anglais / français', 'Switch to French / English'], run: () => setLang((v) => (v === 'fr' ? 'en' : 'fr')) },
  ];
  useEffect(() => { const k = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPal((v) => !v); } }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);'''
sub("const t = T[lang];", "const t = T[lang];" + STATE)
sub("<MagneticFX />", "<MagneticFX /><Palette open={pal} onClose={() => setPal(false)} items={palItems} lang={lang} />")
sub("{theme === 'dark' ? '☀' : '☾'}</button>", "{theme === 'dark' ? '☀' : '☾'}</button>\n        <button onClick={() => setPal(true)} className=\"px-3 py-2 rounded-xl text-[11px] font-black text-zinc-200 hover:bg-white/10 transition-colors\">⌘K</button>")

open(path, "w", encoding="utf-8").write(src)
print("OK — lot 4 appliqué sur", path, "(sauvegarde :", path + ".bak4)")
