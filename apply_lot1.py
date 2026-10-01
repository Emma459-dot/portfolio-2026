#!/usr/bin/env python3
"""Lot 1 : bandeau de compétences glassmorphism + section Expériences (Axians / Sphere).
Usage :  python apply_lot1.py src/App.jsx      (une sauvegarde App.jsx.bak est créée)
"""
import sys, shutil

path = sys.argv[1] if len(sys.argv) > 1 else "src/App.jsx"
src = open(path, encoding="utf-8").read()
if "TiltCard" in src:
    sys.exit("Lot 1 déjà appliqué (TiltCard trouvé). Rien à faire.")
shutil.copy(path, path + ".bak")


def need(s):
    if s not in src:
        sys.exit("Ancre introuvable : " + s)


# ------------------------------------------------------------------ 1) TiltCard (hors du composant App)
TILT = r'''const TiltCard = ({ children, active, accent, onClick }) => {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.transition = 'transform .12s ease-out, border-color .4s, box-shadow .4s';
    el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 14}deg) translateY(-8px)`;
    el.style.setProperty('--mx', `${x * 100}%`); el.style.setProperty('--my', `${y * 100}%`);
  };
  const leave = () => {
    const el = ref.current; if (!el) return;
    el.style.transition = 'transform .7s cubic-bezier(.2,.8,.2,1), border-color .4s, box-shadow .4s';
    el.style.transform = '';
  };
  return (
    <div ref={ref} role="button" tabIndex={0} aria-expanded={active} onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onClick())}
      onMouseMove={move} onMouseLeave={leave}
      className="group relative w-[270px] h-[410px] rounded-3xl border bg-white/[0.04] backdrop-blur-xl cursor-pointer outline-none overflow-hidden"
      style={{ borderColor: active ? `${accent}99` : 'rgba(255,255,255,0.1)', boxShadow: active ? `0 25px 70px -20px ${accent}80, inset 0 1px 0 rgba(255,255,255,0.08)` : 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.14), transparent 55%)' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, opacity: active ? 1 : 0.35 }} />
      {children}
    </div>
  );
};

'''
need("const App = () => {")
src = src.replace("const App = () => {", TILT + "const App = () => {", 1)

# ------------------------------------------------------------------ 2) état + ouverture/fermeture
STATE = r'''
  const [openExp, setOpenExp] = useState(null);
  const [expView, setExpView] = useState('sphere');
  const panelRef = useRef(null);
  const toggleExp = (id) => {
    if (openExp === id) { setOpenExp(null); return; }
    setExpView(id); setActiveJobTab('missions'); setOpenExp(id);
    setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 350);
  };
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpenExp(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);'''
a = "const [activeJobTab, setActiveJobTab] = useState('missions');"
need(a)
src = src.replace(a, a + STATE, 1)

# ------------------------------------------------------------------ 3) données des expériences (dans App, après currentJob)
DATA = r'''const experiences = [
    { id: 'axians', title: 'Alternant Technicien Réseau & Télécom', company: 'Axians France', logo: '/axians.png', badge: 'Actuellement', accent: '#3B82F6',
      tabs: [{ id: 'missions', label: 'Missions' }],
      missions: [
        { icon: Monitor, color: 'text-blue-400', bg: 'bg-blue-500/10', text: 'Mise en service et maintenance des systèmes de vidéosurveillance, de Smart city (villes connectées), contrôle d’accès et alarmes intrusion' },
        { icon: Server, color: 'text-purple-400', bg: 'bg-purple-500/10', text: 'Paramétrage des switchs, routeurs et serveurs' },
        { icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10', text: 'Reporting interne et clients' },
        { icon: Network, color: 'text-orange-400', bg: 'bg-orange-500/10', text: 'Réalisation d’études et travaux fibre optique' },
        { icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/10', text: 'Assistance aux responsables de chantier sur diverses interventions en travaux télécoms' },
        { icon: CheckCircle2, color: 'text-yellow-400', bg: 'bg-yellow-500/10', text: 'Réalisation des travaux dans le respect des modes opératoires et des exigences clients' },
      ] },
    { id: 'sphere', title: 'Technicien Informatique', company: 'Sphere Telecom', logo: '/sphere.png', badge: 'Stage · Récent', accent: '#F97316',
      tabs: [{ id: 'missions', label: 'Missions' }, { id: 'demo', label: 'Démo IP Phone' }, { id: 'certif', label: 'Certification 3CX' }],
      missions: currentJob.missions },
  ];

  '''
b = "const allSkillsFlat"
need(b)
src = src.replace(b, DATA + b, 1)

# ------------------------------------------------------------------ 4) bandeau compétences (glassmorphism)
MARQUEE = r'''{/* Scrolling Skills — tuiles glassmorphism */}
            <style>{`
              @keyframes skillScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
              .skill-track { animation: skillScroll 45s linear infinite; }
              .skill-track:hover { animation-play-state: paused; }
              .skill-fade { -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
            `}</style>
            <div className="relative overflow-hidden py-8 md:py-10 skill-fade">
              <div className="flex w-max skill-track">
                {[...scrollingSkills, ...scrollingSkills].map((skill, i) => (
                  <div key={i} className="group flex-shrink-0 mx-2 md:mx-3 w-[104px] h-[104px] md:w-[140px] md:h-[140px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl flex flex-col items-center justify-center gap-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:bg-white/[0.09] hover:border-white/25 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.5)]">
                    <img src={skill.icon} alt={skill.name} className="w-9 h-9 md:w-14 md:h-14 object-contain transition-transform duration-500 group-hover:scale-110" />
                    <span className="text-[10px] md:text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            '''
s1, e1 = "{/* Scrolling Skills */}", "{/* Qui suis-je */}"
need(s1); need(e1)
i, j = src.index(s1), src.index(e1)
src = src[:i] + MARQUEE + src[j:]

# ------------------------------------------------------------------ 5) section Expériences
EXP = r'''{/* ===================== EXPERIENCES — cartes 3D + volet détail ===================== */}
            <div className="pt-8 md:pt-12" id="current-job">
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&display=swap');
                .serif-title { font-family: 'Fraunces', Georgia, serif; font-weight: 800; letter-spacing: -0.02em; }
              `}</style>
              <h2 className="serif-title text-4xl md:text-6xl text-center mb-10 md:mb-14">Expériences professionnelles</h2>

              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {experiences.map((exp) => (
                  <TiltCard key={exp.id} active={openExp === exp.id} accent={exp.accent} onClick={() => toggleExp(exp.id)}>
                    <div className="relative z-10 flex flex-col items-center text-center h-full px-6 pt-8 pb-6">
                      <h3 className="font-black uppercase text-[17px] leading-tight tracking-tight">{exp.title}</h3>
                      <p className="mt-2 text-xs font-medium text-zinc-400">{exp.company}</p>
                      <div className="mt-5 w-36 h-36 rounded-2xl bg-white/95 p-4 flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-105">
                        <img src={exp.logo} alt={exp.company} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="mt-auto pt-4 flex flex-col items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold border" style={{ color: exp.accent, borderColor: `${exp.accent}55`, background: `${exp.accent}18` }}>{exp.badge}</span>
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                          {openExp === exp.id ? 'Réduire' : 'Voir le détail'}
                          <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${openExp === exp.id ? 'rotate-180' : ''}`} />
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>

              {/* Volet de détail (s'ouvre / se referme en douceur) */}
              <div ref={panelRef} style={{ display: 'grid', gridTemplateRows: openExp ? '1fr' : '0fr', transition: 'grid-template-rows .6s cubic-bezier(.2,.8,.2,1)' }}>
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  {(() => {
                    const ex = experiences.find((x) => x.id === expView);
                    if (!ex) return null;
                    return (
                      <div className="mt-8 md:mt-10 rounded-2xl md:rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-10 space-y-6 transition-opacity duration-500" style={{ opacity: openExp ? 1 : 0, boxShadow: `0 30px 80px -40px ${ex.accent}66` }}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <img src={ex.logo} alt={ex.company} className="w-14 h-14 md:w-16 md:h-16 object-contain bg-white/95 rounded-2xl p-2.5" />
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ex.accent }}>{ex.badge}</p>
                              <h3 className="text-xl md:text-3xl font-black tracking-tight">{ex.title}</h3>
                              <p className="text-sm text-zinc-500">{ex.company}</p>
                            </div>
                          </div>
                          <button onClick={() => setOpenExp(null)} className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-zinc-300 transition-all group/x">
                            <span className="hidden sm:inline">Fermer</span><X className="w-4 h-4 group-hover/x:rotate-90 transition-transform" />
                          </button>
                        </div>

                        {ex.tabs.length > 1 && (
                          <div className="flex gap-2 border-b border-white/10">
                            {ex.tabs.map((t) => (
                              <button key={t.id} onClick={() => setActiveJobTab(t.id)} className={`relative px-4 md:px-6 py-3 text-xs md:text-sm font-bold transition-colors ${activeJobTab === t.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                                {t.label}{t.id === 'missions' ? ` · ${ex.missions.length}` : ''}
                                {activeJobTab === t.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ background: ex.accent }} />}
                              </button>
                            ))}
                          </div>
                        )}

                        {activeJobTab === 'missions' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fadeIn">
                            {ex.missions.map((m, i) => {
                              const Icon = m.icon;
                              return (
                                <div key={i} className="flex items-start space-x-3 p-4 bg-white/[0.04] rounded-xl border border-white/5 hover:border-white/20 hover:-translate-y-0.5 transition-all group/m">
                                  <div className={`p-2 ${m.bg} rounded-lg flex-shrink-0`}><Icon className={`w-4 h-4 ${m.color}`} /></div>
                                  <p className="text-xs md:text-sm text-zinc-400 group-hover/m:text-zinc-200 transition-colors leading-relaxed">{m.text}</p>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {ex.id === 'sphere' && activeJobTab === 'demo' && (
                          <div className="animate-fadeIn space-y-3">
                            <p className="text-sm font-bold text-zinc-300">Configuration d’un téléphone IP sans fil <span className="text-zinc-500 font-normal text-xs">(DECT Gigaset)</span></p>
                            <div className="relative rounded-2xl overflow-hidden border border-white/10">
                              <button onClick={() => setVideo1Expanded(true)} className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-2 bg-black/70 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs font-bold hover:bg-blue-600/80 transition-all"><Maximize2 className="w-4 h-4" /><span>Agrandir</span></button>
                              <video autoPlay loop muted playsInline className="w-full object-cover" style={{ maxHeight: '420px', aspectRatio: '16/9' }}><source src="/video1.mp4" type="video/mp4" /></video>
                            </div>
                          </div>
                        )}

                        {ex.id === 'sphere' && activeJobTab === 'certif' && (
                          <div className="animate-fadeIn flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                            <div className="w-full lg:w-[55%] h-[260px] md:h-[340px] rounded-3xl overflow-hidden border border-orange-500/30 shadow-2xl"><img src="/3cx.png" alt="3CX" className="w-full h-full object-cover" /></div>
                            <div className="flex-1 space-y-4 text-center lg:text-left">
                              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-full text-xs font-black text-orange-400 uppercase tracking-widest"><Award className="w-4 h-4" />Certifié</span>
                              <h4 className="text-3xl md:text-4xl font-black">3CX Basic</h4>
                              <p className="text-zinc-400 text-sm leading-relaxed">Certification obtenue lors du stage chez <span className="text-white font-bold">Sphere Telecom</span>, opérateur téléphonique partenaire <span className="text-orange-400 font-bold">3CX Platinium</span>.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {video1Expanded && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={() => setVideo1Expanded(false)}>
                <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setVideo1Expanded(false)} className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 group z-10"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button>
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <video autoPlay loop muted playsInline className="w-full aspect-video object-cover"><source src="/video1.mp4" type="video/mp4" /></video>
                  </div>
                </div>
              </div>
            )}

            '''
s2, e2 = "{/* ===================== POSTE ACTUEL", "{/* Passion Sport */}"
need(s2); need(e2)
i, j = src.index(s2), src.index(e2)
src = src[:i] + EXP + src[j:]

open(path, "w", encoding="utf-8").write(src)
print("OK — lot 1 appliqué sur", path, "(sauvegarde :", path + ".bak)")
