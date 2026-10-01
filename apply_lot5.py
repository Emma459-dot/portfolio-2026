#!/usr/bin/env python3
"""Lot 5 (après lots 1-4) : titre « Réseaux et Télécoms », photo en mode clair, + intro « boot », titre « decode », rail de navigation fibre.
Usage :  python apply_lot5.py src/App.jsx      (sauvegarde App.jsx.bak5)
"""
import sys, shutil

path = sys.argv[1] if len(sys.argv) > 1 else "src/App.jsx"
src = open(path, encoding="utf-8").read()
if "const Boot" in src:
    sys.exit("Lot 5 déjà appliqué.")
if "SkillScene" not in src:
    sys.exit("Lance d'abord les lots 1 à 4.")
shutil.copy(path, path + ".bak5")


def sub(old, new):
    global src
    if old not in src:
        print("  (ignoré, texte absent) :", old[:70]); return
    src = src.replace(old, new, 1)


# 1) grand titre + autres mentions
sub('h1b: "Systèmes & Réseaux"', 'h1b: "Réseaux et Télécoms"')
sub('h1b: "Systems & Networks"', 'h1b: "Networks & Telecoms"')
sub(">Technicien Systemes & Reseaux</p>", ">Technicien Réseaux et Télécoms</p>")
sub("Technicien Systemes & Reseaux passionne par les infrastructures IT.", "Technicien Réseaux et Télécoms passionné par les infrastructures IT.")
sub('title: "Technicien Systemes et Reseaux"', 'title: "Technicien Réseaux et Télécoms"')

# 2) mode clair : photos en noir et blanc puis couleur au survol (règles explicites, prioritaires)
sub("html { transition: filter .5s ease; }",
    r"""html { transition: filter .5s ease; }
        html.theme-light img.grayscale { filter: invert(1) hue-rotate(180deg) grayscale(1) !important; }
        html.theme-light .group:hover img.group-hover\\:grayscale-0 { filter: invert(1) hue-rotate(180deg) !important; }""")

# 3) composants
COMP = r'''/* Titre qui se « décode » (caractères qui se résolvent) */
const Decode = ({ text, start = true }) => {
  const [out, setOut] = useState(text);
  const id = useRef(0);
  const run = () => {
    const chars = '01#$%<>/'; let f = 0; clearInterval(id.current);
    id.current = setInterval(() => {
      f++;
      setOut(text.split('').map((c, i) => (c === ' ' || f > i * 1.6 + 6 ? c : chars[Math.floor(Math.random() * chars.length)])).join(''));
      if (f > text.length * 1.6 + 8) { clearInterval(id.current); setOut(text); }
    }, 35);
  };
  useEffect(() => { if (start) run(); else setOut(text); return () => clearInterval(id.current); }, [text, start]);
  return <span onMouseEnter={run}>{out}</span>;
};

/* Intro « boot » façon équipement réseau (cliquable pour passer) */
const Boot = ({ lang, onDone }) => {
  const steps = lang === 'en'
    ? ['Initializing system…', 'Fiber link FTTH: UP', 'IPsec tunnel: ESTABLISHED', 'Zabbix monitoring: 0 alerts', 'Profile: Emmanuel Lokadi — Networks & Telecoms']
    : ['Initialisation du système…', 'Lien fibre FTTH : UP', 'Tunnel IPsec : ESTABLISHED', 'Supervision Zabbix : 0 alerte', 'Profil : Emmanuel Lokadi — Réseaux et Télécoms'];
  const [n, setN] = useState(0), [out, setOut] = useState(false);
  const finish = () => { if (out) return; setOut(true); setTimeout(onDone, 600); };
  useEffect(() => { const t = setInterval(() => setN((v) => v + 1), 420); return () => clearInterval(t); }, []);
  useEffect(() => { if (n > steps.length + 1) finish(); }, [n]);
  return (
    <div onClick={finish} className="fixed inset-0 z-[500] bg-black flex items-center justify-center font-mono cursor-pointer transition-opacity duration-500" style={{ opacity: out ? 0 : 1, pointerEvents: out ? 'none' : 'auto' }}>
      <div className="w-[min(90vw,520px)] space-y-2 text-xs md:text-sm">
        {steps.slice(0, n).map((s, i) => <div key={i} className="text-zinc-400"><span className="text-emerald-400">[ OK ]</span> {s}</div>)}
        {n > steps.length && <div className="text-blue-400 animate-pulse">&gt; {lang === 'en' ? 'Access granted' : 'Accès autorisé'}</div>}
        <div className="mt-4 h-[2px] bg-white/10 rounded overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" style={{ width: `${clamp(n / (steps.length + 1)) * 100}%` }} /></div>
        <p className="text-[10px] text-zinc-700 pt-2">{lang === 'en' ? 'click to skip' : 'clique pour passer'}</p>
      </div>
    </div>
  );
};

/* Rail de navigation « fibre » : une impulsion lumineuse suit la section en cours */
const RAIL = [['about', ['À propos', 'About']], ['parcours', ['Parcours', 'Journey']], ['projects', ['Labs', 'Labs']], ['skills', ['Compétences', 'Skills']], ['current-job', ['Expériences', 'Experience']], ['topo', ['Infra', 'Infra']], ['terminal', ['Terminal', 'Terminal']], ['monitoring', ['Contact', 'Contact']]];
const Rail = ({ lang }) => {
  const [act, setAct] = useState(0);
  useEffect(() => {
    const f = () => { let a = 0; RAIL.forEach(([id], i) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) a = i; }); setAct(a); };
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f);
  }, []);
  const go = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); };
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-4">
      <div className="absolute right-[5px] top-1 bottom-1 w-px bg-white/10" />
      <div className="absolute right-[5px] top-1 w-px transition-all duration-700" style={{ height: `${(act / (RAIL.length - 1)) * 100}%`, background: 'linear-gradient(#3B82F6, #A855F7)', boxShadow: '0 0 10px #3B82F6' }} />
      {RAIL.map(([id, lb], i) => (
        <button key={id} onClick={() => go(id)} className="group relative flex items-center gap-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${i === act ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-zinc-400'}`}>{lb[lang === 'en' ? 1 : 0]}</span>
          <span className={`relative w-[11px] h-[11px] rounded-full border-2 transition-all duration-500 ${i <= act ? 'bg-blue-500 border-blue-400 scale-110' : 'bg-zinc-900 border-zinc-600'}`} style={i === act ? { boxShadow: '0 0 14px #3B82F6' } : {}} />
        </button>
      ))}
    </div>
  );
};

'''
sub("const App = () => {", COMP + "const App = () => {")

# 4) état de l'intro + rendu
sub("const t = T[lang];", """const t = T[lang];
  const [boot, setBoot] = useState(() => { try { return !sessionStorage.getItem('booted'); } catch (e) { return true; } });
  const endBoot = () => { try { sessionStorage.setItem('booted', '1'); } catch (e) {} setBoot(false); };""")
sub("<ScrollBar />", "{boot && <Boot lang={lang} onDone={endBoot} />}\n      {activeTab === 'portfolio' && <Rail lang={lang} />}\n      <ScrollBar />")
sub('uppercase">{t.h1a}</h1>', 'uppercase"><Decode text={t.h1a} start={!boot} /></h1>')
sub('text-transparent">{t.h1b}</h1>', 'text-transparent"><Decode text={t.h1b} start={!boot} /></h1>')

open(path, "w", encoding="utf-8").write(src)
print("OK — lot 5 appliqué sur", path, "(sauvegarde :", path + ".bak5)")
