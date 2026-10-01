#!/usr/bin/env python3
"""Lot 2 (à lancer APRES apply_lot1.py) : projets, photo d'accueil, parcours, textes alternance, CV Axians.
Usage :  python apply_lot2.py src/App.jsx      (sauvegarde App.jsx.bak2)
"""
import sys, shutil, re

path = sys.argv[1] if len(sys.argv) > 1 else "src/App.jsx"
src = open(path, encoding="utf-8").read()
if "HoverReveal" in src:
    sys.exit("Lot 2 déjà appliqué. Rien à faire.")
if "TiltCard" not in src:
    sys.exit("Lance d'abord apply_lot1.py (le lot 2 s'appuie dessus).")
shutil.copy(path, path + ".bak2")


def need(s):
    if s not in src:
        sys.exit("Ancre introuvable : " + s)


def sub(old, new):
    global src
    if old not in src:
        print("  (ignoré, texte absent) :", old[:60])
    src = src.replace(old, new, 1)


def block(start, end, new):
    global src
    need(start); need(end)
    i = src.index(start); j = src.index(end, i)
    src = src[:i] + new + src[j:]


# ---------------------------------------------------------------- composants hors App
COMP = r'''const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* Photo d'accueil : la 2e photo se révèle en traînée fluide sous le curseur puis s'efface */
const HoverReveal = ({ base, reveal }) => {
  const cv = useRef(null);
  useEffect(() => {
    const c = cv.current, host = c.closest('.group'), ctx = c.getContext('2d');
    const m = document.createElement('canvas'), mx = m.getContext('2d');
    const img = new Image(); img.src = reveal;
    let w = 0, h = 0, last = null, idle = 0, raf = 0, run = false;
    const size = () => { const d = Math.min(window.devicePixelRatio || 1, 2); w = c.width = m.width = c.clientWidth * d; h = c.height = m.height = c.clientHeight * d; };
    const tick = () => {
      mx.globalCompositeOperation = 'destination-out'; mx.fillStyle = 'rgba(0,0,0,0.04)'; mx.fillRect(0, 0, w, h);
      mx.globalCompositeOperation = 'source-over';
      ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, w, h);
      if (img.complete && img.width) {
        const s = Math.max(w / img.width, h / img.height);
        ctx.drawImage(img, (w - img.width * s) / 2, (h - img.height * s) / 2, img.width * s, img.height * s);
        ctx.globalCompositeOperation = 'destination-in'; ctx.drawImage(m, 0, 0);
      }
      if (++idle > 260) { run = false; mx.clearRect(0, 0, w, h); ctx.clearRect(0, 0, w, h); return; }
      raf = requestAnimationFrame(tick);
    };
    const move = (e) => {
      const r = c.getBoundingClientRect(), d = w / r.width;
      const x = (e.clientX - r.left) * d, y = (e.clientY - r.top) * d, R = 95 * d;
      const p = last || { x, y }, n = Math.max(1, Math.ceil(Math.hypot(x - p.x, y - p.y) / (R * 0.3)));
      for (let i = 1; i <= n; i++) {
        const px = p.x + ((x - p.x) * i) / n, py = p.y + ((y - p.y) * i) / n;
        const g = mx.createRadialGradient(px, py, 0, px, py, R);
        g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)');
        mx.fillStyle = g; mx.beginPath(); mx.arc(px, py, R, 0, 7); mx.fill();
      }
      last = { x, y }; idle = 0;
      if (!run) { run = true; raf = requestAnimationFrame(tick); }
    };
    const out = () => { last = null; };
    size(); window.addEventListener('resize', size);
    host.addEventListener('pointermove', move); host.addEventListener('pointerleave', out);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', out); };
  }, [reveal]);
  return (
    <div className="absolute inset-0">
      <img src={base} alt="Emmanuel LOKADI" className="w-full h-full object-cover grayscale" />
      <canvas ref={cv} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

/* Projets : pile en éventail qui se range en grille au défilement + pastille qui suit le curseur */
const LabsGrid = ({ items, onOpen, onContact }) => {
  const box = useRef(null), pill = useRef(null), cards = useRef([]);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, on: 0 });
  useEffect(() => {
    const tilt = [-9, 4, 7, -5];
    const upd = () => {
      const b = box.current; if (!b) return;
      const top = b.getBoundingClientRect().top, vh = window.innerHeight;
      const e = 1 - Math.pow(1 - clamp((vh * 0.9 - top) / (vh * 0.7)), 3);
      cards.current.forEach((el, i) => {
        if (!el) return;
        const dx = b.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2), dy = i * 14 - el.offsetTop;
        el.style.transform = `translate3d(${dx * (1 - e)}px, ${dy * (1 - e)}px, 0) rotate(${tilt[i % 4] * (1 - e)}deg) scale(${0.92 + 0.08 * e})`;
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
      <div ref={box} className="relative grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-12">
        {items.map((p, i) => (
          <div key={p.id} ref={(el) => (cards.current[i] = el)} onClick={() => onOpen(p)} onMouseMove={track}
            onMouseEnter={() => (pos.current.on = 1)} onMouseLeave={() => (pos.current.on = 0)}
            className="group cursor-pointer will-change-transform" style={{ zIndex: 10 - i }}>
            <div className="relative overflow-hidden rounded-3xl aspect-[4/3] border border-white/10 bg-zinc-900 shadow-2xl">
              <img src={p.screenshots[0]} alt={p.title} className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {p.tags.slice(0, 2).map((t) => <span key={t} className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider">{t}</span>)}
              </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div><h4 className="font-black text-lg md:text-xl">{p.title}</h4><p className="text-zinc-500 text-xs md:text-sm mt-1">{p.shortDesc}</p></div>
              <span className="flex items-center gap-1 text-xs text-zinc-400 group-hover:text-white whitespace-nowrap transition-colors">Consulter <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
            </div>
          </div>
        ))}
        <div ref={pill} className="absolute top-0 left-0 z-50 pointer-events-none px-4 py-2 rounded-full bg-white text-black text-xs font-bold shadow-2xl" style={{ opacity: 0 }}>Voir le lab</div>
      </div>
      <div className="mt-14 text-center">
        <button onClick={onContact} className="group inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors">Un projet en tête ? Discutons-en <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
      </div>
    </div>
  );
};

/* Parcours : frise verticale, photos en cadre biseauté, logos d'écoles */
const PARCOURS = [
  { period: '2023 — 2024', title: 'Baccalauréat Scientifique Série C', school: 'Complexe Le Prestige', place: 'Yaoundé, Cameroun', logo: '/prestige.png', photo: '/photo.jpeg', accent: '#F59E0B', badge: 'Bac S', text: 'Les fondations : rigueur scientifique et logique.' },
  { period: '2023 — 2025', title: 'Bachelor Tronc Commun Informatique', school: 'Keyce Informatique', place: 'Yaoundé, Cameroun', logo: '/keyce.png', photo: '/1.jpeg', accent: '#3B82F6', badge: '1re & 2e année', text: 'Deux années pour poser les bases : réseau, système et développement.' },
  { period: '2025 — 2026', title: 'Bachelor Administration Systèmes & Réseaux', school: 'Keyce Informatique', place: 'Toulouse, France', logo: '/keyce.png', photo: '/3.jpeg', accent: '#10B981', badge: '2e année FR', text: 'Spécialisation : Proxmox, Active Directory, Zabbix, VPN IPsec.' },
  { period: '2026 — 2027', title: 'Bachelor en alternance — Technicien Réseau & Télécom', school: 'Axians France', place: 'France', logo: '/axians.png', photo: '/5.jpeg', accent: '#A855F7', badge: 'En cours', text: 'Vidéosurveillance, Smart city, fibre optique et chantiers télécoms.' },
];

const Parcours = () => {
  const root = useRef(null);
  const [prog, setProg] = useState(0);
  const [seen, setSeen] = useState({});
  useEffect(() => {
    const onScroll = () => { const r = root.current.getBoundingClientRect(); setProg(clamp((window.innerHeight * 0.6 - r.top) / r.height)); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setSeen((s) => ({ ...s, [e.target.dataset.i]: true }))), { threshold: 0.25 });
    root.current.querySelectorAll('[data-i]').forEach((n) => io.observe(n));
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);
  const cut = 'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)';
  return (
    <div ref={root} className="relative">
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
      <div className="absolute left-5 md:left-1/2 top-0 w-px" style={{ height: `${prog * 100}%`, background: 'linear-gradient(#F59E0B, #3B82F6, #10B981, #A855F7)', boxShadow: '0 0 12px rgba(59,130,246,0.6)' }} />
      {PARCOURS.map((s, i) => {
        const odd = i % 2 === 1, on = seen[i];
        return (
          <div key={i} data-i={i} className="relative grid md:grid-cols-2 gap-6 md:gap-20 items-center py-8 md:py-14 pl-12 md:pl-0">
            <span className="absolute left-5 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45 border-2 border-black transition-all duration-700 z-10" style={{ background: on ? s.accent : '#3f3f46', boxShadow: on ? `0 0 18px ${s.accent}` : 'none' }} />
            <div className={`${odd ? 'md:order-2' : 'md:order-1'} transition-all duration-[1100ms] ease-out ${on ? 'opacity-100 translate-x-0' : `opacity-0 ${odd ? 'translate-x-16' : '-translate-x-16'}`}`}>
              <div className="p-px" style={{ clipPath: cut, background: `linear-gradient(135deg, ${s.accent}, transparent 65%)` }}>
                <div className="group relative aspect-[4/3] overflow-hidden bg-black" style={{ clipPath: cut }}>
                  <img src={s.photo} alt={s.title} className={`w-full h-full object-cover transition-all duration-[1400ms] ease-out group-hover:scale-105 ${on ? 'scale-100 grayscale-0' : 'scale-125 grayscale'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 w-14 h-14 rounded-xl bg-white/95 p-2 shadow-xl"><img src={s.logo} alt={s.school} className="w-full h-full object-contain" /></div>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md" style={{ color: s.accent, background: `${s.accent}25`, border: `1px solid ${s.accent}55` }}>{s.badge}</span>
                </div>
              </div>
            </div>
            <div className={`${odd ? 'md:order-1 md:text-right' : 'md:order-2'} space-y-2 transition-all duration-[1100ms] delay-200 ease-out ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-[11px] font-mono font-bold tracking-widest" style={{ color: s.accent }}>{s.period}</p>
              <h3 className="serif-title text-2xl md:text-3xl leading-tight">{s.title}</h3>
              <p className="text-sm font-bold text-zinc-300">{s.school} <span className="text-zinc-600">·</span> <span className="text-zinc-500 font-medium">{s.place}</span></p>
              <p className="text-sm text-zinc-500 max-w-md md:inline-block">{s.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* Barre de progression de lecture */
const ScrollBar = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => setP(clamp(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)));
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f);
  }, []);
  return <div className="fixed top-0 left-0 h-[3px] z-[60] pointer-events-none" style={{ width: `${p * 100}%`, background: 'linear-gradient(90deg,#3B82F6,#A855F7)', boxShadow: '0 0 10px #3B82F6' }} />;
};

'''
need("const App = () => {")
src = src.replace("const App = () => {", COMP + "const App = () => {", 1)
sub("{/* Navigation */}", "<ScrollBar />\n\n      {/* Navigation */}")

# ---------------------------------------------------------------- photo d'accueil
m = re.search(r'<img src="/photo2\.png"[^>]*/>', src)
if not m:
    sys.exit("Ancre introuvable : <img src=\"/photo2.png\" ... />")
src = src[:m.start()] + '<HoverReveal base="/photo2.png" reveal="/moi11.jpg" />' + src[m.end():]

# ---------------------------------------------------------------- parcours + projets
HEAD = '''<div className="flex items-center space-x-4 md:space-x-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight"><span className="text-zinc-600">Mon</span> Parcours</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
              </div>'''
block("{/* ===================== PARCOURS", "{/* Labs */}",
      '{/* PARCOURS — frise verticale */}\n            <div className="pt-8 md:pt-12 space-y-8 md:space-y-12" id="parcours">\n              ' + HEAD + '\n              <Parcours />\n            </div>\n\n            ')
block("{/* Labs */}", "{/* Vidéo GLPI */}",
      '{/* Labs */}\n            <div className="pt-8 md:pt-12 space-y-6 md:space-y-10" id="projects">\n              ' + HEAD.replace("Mon", "Mes").replace("Parcours", "Labs") + '\n              <LabsGrid items={projects} onOpen={setSelectedProject} onContact={() => setShowContactModal(true)} />\n            </div>\n\n            ')

# ---------------------------------------------------------------- textes « recherche d'alternance »
sub("<span>Recherche Alternance 12 mois - Sept. 2026</span>", "<span>Alternant Réseau & Télécom · Axians France</span>")
sub("<span>Recherche Alternance 12 mois</span>", "<span>Alternance · Axians France</span>")
sub("Statut : Prêt pour l'alternance", "Statut : En alternance chez Axians")
src = re.sub(r"Je suis ouvert a une opportunite.*?septembre 2026</span>\.",
             'Actuellement en alternance chez <span className="text-blue-400 font-bold">Axians France</span>, ouvert aux échanges et aux collaborations.', src, count=1, flags=re.S)
sub("['Je recherche','Alternance']", "['Situation','Alternant Axians']")
sub("k==='Je recherche'", "k==='Situation'")

# ---------------------------------------------------------------- CV : Axians
sub("{currentJob.company} (2026 - Actuel)", "{currentJob.company} (Stage)")
AX = '''<div className="relative pl-6 md:pl-8 border-l-2 border-blue-600">
                        <div className="absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-600" />
                        <h4 className="font-bold text-lg md:text-xl">Alternant Technicien Reseau & Telecom</h4>
                        <p className="text-blue-400 font-bold uppercase text-[8px] md:text-[10px] tracking-widest mt-1 md:mt-2">Axians France (Sept. 2026 - Actuel)</p>
                        <ul className="text-zinc-400 mt-3 md:mt-4 text-xs md:text-sm space-y-2">
                          {experiences[0].missions.map((m, i) => (<li key={i} className="flex items-start space-x-2 md:space-x-3"><CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 mt-0.5 flex-shrink-0" /><span>{m.text}</span></li>))}
                        </ul>
                      </div>
                      '''
sub('<div className="relative pl-6 md:pl-8 border-l-2 border-emerald-600">', AX + '<div className="relative pl-6 md:pl-8 border-l-2 border-emerald-600">')

open(path, "w", encoding="utf-8").write(src)
print("OK — lot 2 appliqué sur", path, "(sauvegarde :", path + ".bak2)")
