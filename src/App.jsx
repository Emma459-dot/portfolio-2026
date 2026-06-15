import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Server, Network, ShieldCheck, Monitor, ExternalLink, ChevronRight, Dumbbell,
  MapPin, Download, Activity, LifeBuoy, X, CheckCircle2, ArrowUpRight, Sparkles,
  Award, Copy, Check, Target, Flame, Heart, Zap, Plus, Play, Briefcase, Phone,
  Headphones, Clock, AlertTriangle, Settings, HardDrive, Users, Maximize2,
  GraduationCap, ChevronDown, ArrowRight
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const App = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [videoInView, setVideoInView] = useState(false);
  const [activeSoftSkill, setActiveSoftSkill] = useState(null);
  const [glpiExpanded, setGlpiExpanded] = useState(false);
  const [video1Expanded, setVideo1Expanded] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeJobTab, setActiveJobTab] = useState('missions');
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  const [uptime] = useState("99.98%");
  const [cpuLoad, setCpuLoad] = useState(12);
  const [ramUsage, setRamUsage] = useState(45);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [logs, setLogs] = useState([
    "Initialisation du système de supervision...",
    "Connecté au serveur Zabbix v7.0",
    "Agent EL-PORTFOLIO: OK",
    "Scan des vulnérabilités: 0 menaces",
    "Optimisation des flux réseaux effectuée"
  ]);

  useEffect(() => {
    const dashInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCpuLoad(Math.floor(Math.random() * (25 - 5) + 5));
      setRamUsage(Math.floor(Math.random() * (60 - 40) + 40));
      const newLogs = ["Ping gateway: 1ms","Trafic HTTP entrant: Stable","Backup cloud terminé","Synchronisation AD effectuée","Check intégrité base de données: OK","Requête SNMP vers Core-Switch: Réponse 2ms"];
      setLogs(prev => [newLogs[Math.floor(Math.random() * newLogs.length)], ...prev.slice(0, 4)]);
    }, 3000);
    return () => clearInterval(dashInterval);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVideoInView(true);
          videoRef.current?.play().catch(() => {});
        }
      });
    }, { threshold: 0.3 });
    if (videoSectionRef.current) videoObserver.observe(videoSectionRef.current);
    return () => { window.removeEventListener('mousemove', handleMouseMove); videoObserver.disconnect(); };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') { setGlpiExpanded(false); setVideo1Expanded(false); } };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const copyEmail = () => { navigator.clipboard.writeText(user.email); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownloadCV = () => { const link = document.createElement('a'); link.href = '/cv_Emmanuel_Lokadi.pdf'; link.download = 'cv_Emmanuel_Lokadi.pdf'; document.body.appendChild(link); link.click(); document.body.removeChild(link); };
  const scrollToSection = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  const user = {
    name: "Emmanuel LOKADI",
    title: "Technicien Systemes et Reseaux",
    location: "Toulouse, France",
    email: "emmalokadi19@gmail.com",
    linkedin: "https://www.linkedin.com/in/lokadi/",
    github: "https://github.com/Emma459-dot",
    school: "Keyce Informatique Toulouse",
    description: "Technicien reseaux et systemes passionne par l'administration d'infrastructures IT. Actuellement en formation a Keyce Informatique Toulouse, je maitrise la mise en place et la gestion de serveurs, la configuration reseau, et la supervision d'environnements virtualises. Anciennement assistant informatique, j'ai developpe une rigueur et une capacite d'adaptation que j'applique au quotidien dans mes projets.",
    credlyUrl: "https://www.credly.com/users/emma-lokadi/edit#credly"
  };

  const scrollingSkills = [
    { name: "Proxmox", icon: "/proxmox.png" }, { name: "VMware", icon: "/vmware.png" },
    { name: "Linux", icon: "/linux.png" }, { name: "Windows Server", icon: "/server.png" },
    { name: "Zabbix", icon: "/zabbix.png" }, { name: "Stork", icon: "/stork.png" },
    { name: "Docker", icon: "/docker.png" }, { name: "VPN", icon: "/vpn.png" },
    { name: "GLPI", icon: "/glpi.png" }, { name: "Proxmox", icon: "/proxmox.png" },
    { name: "VMware", icon: "/vmware.png" }, { name: "Linux", icon: "/linux.png" },
    { name: "Windows Server", icon: "/server.png" }, { name: "Zabbix", icon: "/zabbix.png" },
    { name: "Stork", icon: "/stork.png" }, { name: "Docker", icon: "/docker.png" },
  ];

  const softSkills = [
    { id: "equipe", name: "Esprit d'equipe", image: "/equipe.png" },
    { id: "autonomie", name: "Autonomie", image: "/autonomie.png" },
    { id: "proposition", name: "Force de proposition", image: "/force.png" },
    { id: "adaptation", name: "Capacite d'adaptation", image: "/adaptation.png" }
  ];

  const skillCategories = {
    virtualisation: { name: "Virtualisation", skills: [
      { name: "Proxmox", icon: "/proxmox.png", color: "#E07010", desc: "Hyperviseur open-source, gestion de VMs et conteneurs LXC" },
      { name: "VMware", icon: "/vmware.png", color: "#607078", desc: "VMware Workstation, ESXi, infrastructure virtualisée" },
    ]},
    os: { name: "Systemes d'exploitation", skills: [
      { name: "Linux (Ubuntu/Debian)", icon: "/linux.png", color: "#E95420", desc: "Administration serveurs, scripting Bash, gestion paquets" },
      { name: "Windows Server (AD/GPO)", icon: "/server.png", color: "#0078D4", desc: "Active Directory, GPO, RODC, DNS/DHCP intégrés" },
    ]},
    supervision: { name: "Supervision", skills: [
      { name: "Zabbix", icon: "/zabbix.png", color: "#DC143C", desc: "Monitoring d'infrastructure, dashboards, alerting" },
      { name: "Stork", icon: "/stork.png", color: "#1A73E8", desc: "Supervision DHCP Kea et DNS Bind9 en temps réel" },
    ]},
    reseau: { name: "Reseau & Services", skills: [
      { name: "VPN Site-to-Site", icon: "/vpn.png", color: "#7C3AED", desc: "Tunnels IPsec IKEv2, politiques de sécurité, routage" },
      { name: "GLPI & Ticketing", icon: "/glpi.png", color: "#F97316", desc: "ITSM, gestion de parc, workflows de tickets" },
      { name: "Docker", icon: "/docker.png", color: "#2496ED", desc: "Conteneurisation, Docker Compose, déploiement services" },
    ]}
  };

  const certifications = [
    { id: "fortinet", name: "Fortinet NSE 3", company: "Fortinet", logo: "/fortinet.png", certificate: "/cert1.png", content: [
      { title: "Cybersecurite moderne", desc: "Panorama des menaces, malwares, ransomware, phishing" },
      { title: "Security Fabric", desc: "Integration des outils de securite" },
      { title: "Produits Fortinet", desc: "FortiGate, FortiAnalyzer, FortiManager" },
      { title: "Securite Cloud", desc: "Protection AWS, Azure, SaaS" },
    ]},
    { id: "google", name: "Technical Support Fundamentals", company: "Google", logo: "/google.png", certificate: "/cert2.png", content: [
      { title: "Introduction IT", desc: "Role du support informatique" },
      { title: "Hardware", desc: "Composants d'un ordinateur" },
      { title: "Reseaux", desc: "IP, DNS, TCP/IP" },
      { title: "Troubleshooting", desc: "Methodologie de depannage" },
    ]}
  ];

  const projects = [
    { id: "stork", title: "Lab Supervision DHCP/DNS", shortDesc: "Kea/Bind9 + Stork sur Ubuntu 24.04.", fullDesc: "Implementation d'une infrastructure reseau moderne. Configuration d'un serveur DHCP Kea (JSON) et DNS Bind9, supervises par Stork pour un monitoring en temps reel.", infra: ["VMware Workstation", "Ubuntu 24.04", "PostgreSQL"], steps: ["Setup Kea & Bind9", "Config Sockets de controle", "Deploiement Stork Server & Agent", "Validation DNS via nslookup"], icon: <Monitor className="text-blue-500" />, color: "bg-blue-500", tags: ["DHCP Kea", "BIND9", "Stork"], screenshots: ["/dns.png", "/dns1.png"] },
    { id: "zabbix", title: "Monitoring Windows Server", shortDesc: "Supervision AD DS (Primaire & RODC) via Zabbix.", fullDesc: "Deploiement d'un environnement redondant avec controleur primaire et RODC. Supervision complete des services et performances via Zabbix.", infra: ["Windows Server 2022", "Zabbix Server", "VMware"], steps: ["Promotion AD DS & GPO", "Configuration RODC", "Installation Agents Zabbix", "Creation de dashboards"], icon: <Activity className="text-orange-500" />, color: "bg-orange-500", tags: ["Zabbix", "Active Directory", "RODC"], screenshots: ["/win.png", "/win1.png"] },
    { id: "vpn", title: "VPN Site-to-Site IPsec", shortDesc: "Tunnel securise inter-sites geographiques.", fullDesc: "Configuration d'un tunnel VPN IPsec haute securite pour lier deux infrastructures distantes.", infra: ["Pfsense", "FortiGate", "IPsec"], steps: ["Phases IKEv1/v2", "Politiques de securite", "Routage inter-sites", "Tests de flux chiffres"], icon: <ShieldCheck className="text-emerald-500" />, color: "bg-emerald-500", tags: ["Securite", "IPsec", "Firewall"], screenshots: ["/ipsec.png", "/ipsec1.png"] },
    { id: "glpi", title: "Serveur GLPI & Ticketing", shortDesc: "Gestion de parc et support IT sous Linux.", fullDesc: "Installation d'un serveur GLPI sur Debian pour la gestion centralisee des actifs.", infra: ["Debian", "LAMP Stack", "GLPI"], steps: ["Setup MySQL", "Configuration entites", "Inventaire via agents", "Gestion cycle de vie tickets"], icon: <LifeBuoy className="text-purple-500" />, color: "bg-purple-500", tags: ["GLPI", "ITSM", "Ticketing"], screenshots: ["/tick.png", "/tick1.png"] }
  ];

  const currentJob = {
    title: "Technicien Assistance Reseau",
    company: "Sphere Telecom",
    location: "Lille, Hauts-de-France",
    logo: "/sphere.png",
    type: "Stage",
    missions: [
      { icon: Phone, color: "text-blue-400", bg: "bg-blue-500/10", text: "Prise d'appels et resolution de problemes courants en lien avec la telephonie 3CX ou les liens fibres (FTTH, FTTO...)" },
      { icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10", text: "Gestion des tickets d'incidents (creation, suivi, resolution, escalade)" },
      { icon: Network, color: "text-purple-400", bg: "bg-purple-500/10", text: "Supervision liens fibres (FTTH, FTTO, 4G...) : detection de problemes, analyse des logs, alertes, signalisation" },
      { icon: Headphones, color: "text-orange-400", bg: "bg-orange-500/10", text: "Configuration des telephones IP avec fil (Yealink) et sans fil (DECTs Gigaset)" },
      { icon: Settings, color: "text-pink-400", bg: "bg-pink-500/10", text: "Gestion des serveurs 3CX et des utilisateurs : support, resolution d'incidents, management des processus d'appels" },
      { icon: HardDrive, color: "text-yellow-400", bg: "bg-yellow-500/10", text: "Initiation au support de niveau 2 : FortiGates, serveurs Proxmox en production, routeurs 4G (Mikrotik)" },
    ]
  };

  const qualities = ["Rigoureux", "Methodique", "Curieux", "Autonome", "Collaboratif"];

  const parcours = [
    { period: "2023 — 2024", title: "Baccalaureat Scientifique Serie C", school: "Complexe Le Prestige", location: "Yaounde, Cameroun", logo: "/prestige.png", color: "from-amber-500/20 to-yellow-600/5", borderColor: "border-amber-500/30", accent: "#F59E0B", hoverGlow: "rgba(245,158,11,0.15)", badge: "BAC S" },
    { period: "2023 — 2025", title: "Deux Annees de Bachelor Tronc Commun Informatique", school: "Keyce Informatique", location: "Yaounde, Cameroun", logo: "/keyce.png", color: "from-blue-500/20 to-indigo-600/5", borderColor: "border-blue-500/30", accent: "#3B82F6", hoverGlow: "rgba(59,130,246,0.15)", badge: "1re & 2e Annee" },
    { period: "2025 — 2026", title: "Bachelor Administration Systemes & Reseaux", school: "Keyce Informatique", location: "Toulouse, France", logo: "/keyce.png", color: "from-emerald-500/20 to-teal-600/5", borderColor: "border-emerald-500/30", accent: "#10B981", hoverGlow: "rgba(16,185,129,0.15)", badge: "2e Annee FR" },
    { period: "2026 — 2027", title: "Bachelor Administration Systemes & Reseaux", school: "En recherche d'alternance", location: "France", logo: null, color: "from-purple-500/20 to-pink-600/5", borderColor: "border-purple-500/30", accent: "#A855F7", hoverGlow: "rgba(168,85,247,0.15)", badge: "3e Annee", future: true }
  ];

  const allSkillsFlat = Object.values(skillCategories).flatMap(cat => cat.skills);

  return (
    <div className="min-h-screen w-full bg-[#030303] text-zinc-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 transition-all duration-1000 ease-out" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)', left: mousePosition.x - 250, top: mousePosition.y - 250 }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/40 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600 blur-xl opacity-50 group-hover:opacity-80 transition-opacity rounded-xl" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-black text-white text-sm md:text-lg shadow-2xl">EL</div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold tracking-tight text-base md:text-lg">Emmanuel Lokadi</span>
              <p className="text-[8px] md:text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Technicien Systemes & Reseaux</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2 bg-white/5 p-1 md:p-1.5 rounded-xl md:rounded-2xl border border-white/10">
            <button onClick={() => setActiveTab('portfolio')} className={`px-3 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${activeTab === 'portfolio' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>Portfolio</button>
            <button onClick={() => setActiveTab('cv')} className={`px-3 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${activeTab === 'cv' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>Mon CV</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full min-h-screen">
        {activeTab === 'portfolio' ? (
          <div className={`max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-20 space-y-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
              <div className="lg:col-span-8 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[150px] -mr-48 -mt-48 group-hover:bg-blue-500/20 transition-all duration-700" />
                <div className="relative z-10 space-y-6 md:space-y-8">
                  <div className="inline-flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-400 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-emerald-500/30 backdrop-blur-sm animate-pulse">
                    <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-emerald-500"></span></span>
                    <span>Recherche Alternance 12 mois - Sept. 2026</span>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase">Technicien</h1>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Systemes & Reseaux</h1>
                  </div>
                  <p className="text-zinc-400 text-base md:text-xl max-w-2xl leading-relaxed">Je suis <span className="text-white font-semibold">Emmanuel LOKADI</span>. Je concois des infrastructures virtualisees robustes et supervisees.</p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4">
                    <a href={`mailto:${user.email}`} className="group/btn relative overflow-hidden bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                      <span className="relative z-10 flex items-center space-x-2"><span>ME CONTACTER</span><ArrowUpRight className="w-4 h-4" /></span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/btn:opacity-100 transition-opacity font-bold"><span className="flex items-center space-x-2"><span>ME CONTACTER</span><ArrowUpRight className="w-4 h-4" /></span></span>
                    </a>
                    <div className="flex space-x-2 md:space-x-3">
                      <a href={user.linkedin} target="_blank" rel="noreferrer" className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-105"><FaLinkedinIn className="w-5 h-5 md:w-6 md:h-6" /></a>
                      <a href={user.github} target="_blank" rel="noreferrer" className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:scale-105"><FaGithub className="w-5 h-5 md:w-6 md:h-6" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 rounded-2xl md:rounded-[2rem] overflow-hidden relative group border border-white/10 hover:border-blue-500/30 transition-all duration-500 min-h-[300px] md:min-h-[400px] lg:min-h-0">
                <img src="/photo2.png" alt="Emmanuel LOKADI" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8">
                  <div className="flex items-center space-x-2 mb-2 md:mb-3"><Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-400" /><p className="text-[8px] md:text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Ecole Actuelle</p></div>
                  <p className="font-bold text-lg md:text-2xl leading-tight">{user.school}</p>
                </div>
                <div className="absolute top-4 md:top-6 right-4 md:right-6 px-2 md:px-3 py-1 md:py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10"><span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-300">2eme annee</span></div>
              </div>
            </div>

            {/* Scrolling Skills */}
            <div className="relative overflow-hidden py-4 md:py-6 bg-gradient-to-r from-zinc-900/50 via-zinc-900/80 to-zinc-900/50 rounded-xl md:rounded-2xl border border-white/5">
              <div className="flex animate-scroll">
                {[...scrollingSkills, ...scrollingSkills].map((skill, i) => (
                  <div key={i} className="flex items-center space-x-2 md:space-x-3 px-4 md:px-6 py-2 mx-2 bg-white/5 rounded-full border border-white/10 whitespace-nowrap flex-shrink-0">
                    <img src={skill.icon} alt={skill.name} className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                    <span className="text-xs md:text-sm font-medium text-zinc-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Qui suis-je */}
            <div id="about" data-animate className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden group min-h-[400px] md:min-h-[500px] border border-white/10 hover:border-blue-500/30 transition-all duration-500">
                <img src="/moi1.jpeg" alt="Emmanuel LOKADI" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 md:top-6 left-4 md:left-6">
                  <div className="px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-500/90 to-blue-500/90 rounded-full text-white text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center space-x-2 backdrop-blur-sm shadow-lg shadow-emerald-500/20" style={{ animation: 'bounce 2s infinite' }}>
                    <Target className="w-3 h-3 md:w-4 md:h-4" /><span>Recherche Alternance 12 mois</span>
                  </div>
                </div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 p-3 md:p-4 bg-black/60 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10">
                  <p className="text-xs md:text-sm text-zinc-300 italic">"La rigueur technique alliee a la perseverance"</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl md:rounded-[2rem] p-6 md:p-10 flex flex-col justify-center relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 blur-[100px]" />
                <div className="relative z-10 space-y-4 md:space-y-6">
                  <div className="flex items-center space-x-3"><span className="text-2xl md:text-3xl">*</span><p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">A Propos</p></div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight">Qui suis-je ?</h2>
                  <p className="text-zinc-400 text-sm md:text-lg leading-relaxed">{user.description}</p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4">
                    <div className="flex items-center space-x-2 md:space-x-3 text-emerald-400">
                      <img src="/gmail.png" alt="Gmail" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                      <a href={`mailto:${user.email}`} className="font-bold hover:underline text-sm md:text-base">{user.email}</a>
                    </div>
                    <button onClick={copyEmail} className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                      {copied ? <Check className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" /> : <Copy className="w-3 h-3 md:w-4 md:h-4" />}
                      <span>{copied ? 'Copie!' : 'Copier'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================== PARCOURS — TIMELINE FLECHE ===================== */}
            <div className="pt-8 md:pt-12 space-y-8 md:space-y-12" id="parcours">
              <div className="flex items-center space-x-4 md:space-x-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight"><span className="text-zinc-600">Mon</span> Parcours</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              {/* Flèche progression + points */}
              <div className="relative">
                {/* LIGNE + FLECHE */}
                <div className="hidden lg:block absolute top-[88px] left-0 right-0 z-0 px-8">
                  <div className="relative h-[3px] w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-blue-500 via-emerald-500 to-purple-500 rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-blue-500 via-emerald-500 to-purple-500 rounded-full blur-sm opacity-60" />
                    {/* Pointe de flèche */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2">
                      <div className="w-0 h-0" style={{ borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid #A855F7' }} />
                    </div>
                  </div>
                </div>

                {/* Points sur la ligne */}
                <div className="hidden lg:flex absolute top-[80px] left-0 right-0 z-10 justify-around px-8">
                  {parcours.map((s, i) => (
                    <div key={i} className="flex flex-col items-center" style={{ width: '25%' }}>
                      <div className="w-6 h-6 rounded-full border-2 shadow-lg" style={{ background: s.accent, borderColor: s.accent, boxShadow: `0 0 12px ${s.accent}80` }} />
                    </div>
                  ))}
                </div>

                {/* Cartes */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 relative z-20 mt-0 lg:mt-20">
                  {parcours.map((step, i) => (
                    <div key={i} className={`group relative bg-gradient-to-br ${step.color} border ${step.borderColor} rounded-2xl overflow-hidden cursor-default hover:-translate-y-3 transition-all duration-500 ${step.future ? 'opacity-80 hover:opacity-100' : ''}`}
                      style={{ '--glow': step.hoverGlow }}
                    >
                      {/* Glow au survol */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `radial-gradient(ellipse at 50% 0%, ${step.hoverGlow}, transparent 70%)` }} />
                      
                      {/* Barre colorée en haut */}
                      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)` }} />

                      <div className="p-5 md:p-6 space-y-4">
                        {/* Numéro + Badge */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-zinc-600 font-mono">0{i + 1}</span>
                          <div className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest" style={{ background: `${step.accent}25`, color: step.accent, border: `1px solid ${step.accent}40` }}>
                            {step.future && '✦ '}{step.badge}
                          </div>
                        </div>

                        {/* Logo agrandi */}
                        <div className="flex justify-center">
                          {step.logo ? (
                            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-white/10 border-2 border-white/10 group-hover:border-white/25 group-hover:scale-110 transition-all duration-500 flex items-center justify-center p-3 shadow-lg"
                              style={{ boxShadow: `0 8px 32px ${step.accent}30` }}>
                              <img src={step.logo} alt={step.school} className="w-full h-full object-contain" />
                            </div>
                          ) : (
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-dashed flex items-center justify-center group-hover:scale-110 transition-all duration-500" style={{ background: `${step.accent}10`, borderColor: `${step.accent}50` }}>
                              <GraduationCap className="w-10 h-10" style={{ color: step.accent }} />
                            </div>
                          )}
                        </div>

                        {/* Infos */}
                        <div className="space-y-2 text-center">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">{step.period}</p>
                          <h3 className="font-black text-sm md:text-[15px] leading-tight group-hover:text-white transition-colors">{step.title}</h3>
                          <p className="text-xs font-bold transition-colors" style={{ color: step.accent }}>{step.school}</p>
                          <div className="flex items-center justify-center space-x-1 text-zinc-500">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <p className="text-[10px]">{step.location}</p>
                          </div>
                        </div>

                        {/* Hover bottom reveal */}
                        <div className="overflow-hidden max-h-0 group-hover:max-h-16 transition-all duration-500">
                          <div className="pt-3 border-t border-white/10 flex items-center justify-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: step.accent }} />
                            <span className="text-[10px] font-bold text-zinc-400">{step.future ? 'En recherche active' : 'Diplôme obtenu / en cours'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Labs */}
            <div className="pt-8 md:pt-12 space-y-6 md:space-y-10" id="projects">
              <div className="flex items-center space-x-4 md:space-x-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight"><span className="text-zinc-600">Mes</span> Labs</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {projects.map((p, i) => (
                  <div key={i} onClick={() => setSelectedProject(p)} className="group relative cursor-pointer">
                    <div className="absolute inset-0 bg-blue-600/20 rounded-2xl md:rounded-[2rem] translate-x-2 translate-y-2 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl md:rounded-[2rem] p-6 md:p-8 space-y-4 md:space-y-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-blue-500/30 overflow-hidden h-full">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4 md:mb-6">
                          <div className={`w-12 h-12 md:w-14 md:h-14 ${p.color}/10 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl border border-white/5`}>{p.icon}</div>
                          <div className="flex items-center space-x-2 text-zinc-500 group-hover:text-blue-400 transition-colors">
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Explorer</span>
                            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                        <h4 className="text-lg md:text-2xl font-black mb-2 md:mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h4>
                        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{p.shortDesc}</p>
                        <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
                          {p.tags.map((tag, j) => (
                            <span key={j} className="px-2 md:px-3 py-1 bg-white/5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-zinc-400 border border-white/5">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div onClick={() => setShowContactModal(true)} className="group relative cursor-pointer">
                  <div className="absolute inset-0 bg-pink-600/20 rounded-2xl md:rounded-[2rem] translate-x-2 translate-y-2 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative bg-gradient-to-br from-pink-950/30 to-zinc-950/80 border-2 border-dashed border-pink-500/30 rounded-2xl md:rounded-[2rem] p-6 md:p-8 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-pink-500/60 overflow-hidden h-full flex flex-col items-center justify-center text-center min-h-[280px]">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-500">
                      <Plus className="w-8 h-8 md:w-10 md:h-10 text-pink-400 group-hover:rotate-90 transition-transform duration-500" />
                    </div>
                    <div className="mt-4"><h4 className="text-xl md:text-2xl font-black mb-2 text-pink-300">Votre projet ?</h4><p className="text-zinc-500 text-xs md:text-sm">Construisons quelque chose ensemble</p></div>
                    <button className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-xl font-bold text-sm hover:bg-pink-400 transition-colors">Me contacter</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vidéo GLPI */}
            <div ref={videoSectionRef} id="video-section" className={`pt-8 md:pt-12 transition-all duration-1000 ${videoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10 pointer-events-none" />
                <button onClick={() => setGlpiExpanded(true)} className="absolute bottom-4 right-4 z-30 flex items-center space-x-2 px-3 py-2 bg-black/70 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs font-bold hover:bg-blue-600/80 hover:border-blue-500 transition-all duration-300">
                  <Maximize2 className="w-4 h-4" /><span className="hidden sm:inline">Agrandir</span>
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex items-center space-x-3 mb-2"><Monitor className="w-5 h-5 text-blue-400" /><p className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">Demo en direct</p></div>
                  <h3 className="text-xl md:text-3xl font-black">Simulation Gestion de Tickets GLPI</h3>
                  <p className="text-zinc-400 text-sm mt-2">Environnement virtualise - Workflow complet</p>
                </div>
                <video ref={videoRef} autoPlay loop muted playsInline className="w-full aspect-video object-cover"><source src="/video.mp4" type="video/mp4" /></video>
              </div>
            </div>

            {glpiExpanded && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={() => setGlpiExpanded(false)}>
                <div className="relative w-full max-w-6xl" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setGlpiExpanded(false)} className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20 group z-10"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button>
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <div className="bg-black/60 backdrop-blur-md px-4 py-3 flex items-center space-x-3 border-b border-white/10"><Monitor className="w-4 h-4 text-blue-400" /><span className="text-sm font-bold">Simulation Gestion de Tickets GLPI</span></div>
                    <video autoPlay loop muted playsInline className="w-full aspect-video object-cover"><source src="/video.mp4" type="video/mp4" /></video>
                  </div>
                </div>
              </div>
            )}

            {/* Certifications */}
            <div className="pt-8 md:pt-12 space-y-6 md:space-y-10" id="certifications">
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight"><span className="text-zinc-600">Mes</span> Certifications</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                <a href={user.credlyUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 text-xs md:text-sm font-bold hover:bg-blue-500/20 transition-all group">
                  <Award className="w-4 h-4" /><span>Voir toutes mes certifications</span><ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {certifications.map((cert, i) => (
                  <div key={i} className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl md:rounded-[2rem] p-6 md:p-8 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] group-hover:bg-blue-500/10 transition-all" />
                    <div className="relative z-10 space-y-4 md:space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <img src={cert.logo} alt={cert.company} className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-contain bg-white/10 p-2 group-hover:scale-110 transition-transform" />
                          <div><h3 className="text-lg md:text-xl font-black group-hover:text-blue-400 transition-colors">{cert.name}</h3><p className="text-[8px] md:text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Delivre par {cert.company}</p></div>
                        </div>
                        <Award className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 group-hover:rotate-12 transition-transform" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        {cert.content.slice(0, 4).map((item, j) => (
                          <div key={j} className="p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors group/item">
                            <p className="text-[10px] md:text-xs font-bold text-white mb-1 group-hover/item:text-blue-400 transition-colors">{item.title}</p>
                            <p className="text-[8px] md:text-[10px] text-zinc-500 leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 group/cert hover:border-blue-500/30 transition-all cursor-pointer" onClick={() => window.open(cert.certificate, '_blank')}>
                        <p className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 md:mb-3">Certificat</p>
                        <img src={cert.certificate} alt={`Certificat ${cert.name}`} className="w-full h-32 md:h-40 object-cover rounded-lg opacity-80 group-hover/cert:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="pt-8 md:pt-12 space-y-6 md:space-y-10" id="soft-skills">
              <div className="flex items-center space-x-4 md:space-x-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight"><span className="text-zinc-600">Mes</span> Soft Skills</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {softSkills.map((skill, i) => (
                  <div key={skill.id} className={`relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 group cursor-pointer transition-all duration-500 ${activeSoftSkill === skill.id ? 'ring-2 ring-blue-500 scale-[1.02]' : 'hover:border-blue-500/30 hover:-translate-y-1'}`}
                    onMouseEnter={() => setActiveSoftSkill(skill.id)} onMouseLeave={() => setActiveSoftSkill(null)}>
                    <div className="aspect-[4/3] md:aspect-[16/10] relative">
                      <img src={skill.image} alt={skill.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <div className={`inline-flex items-center space-x-2 px-3 md:px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeSoftSkill === skill.id ? 'scale-110' : ''}`}>
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" /><span>{skill.name}</span>
                        </div>
                      </div>
                      <div className={`absolute inset-0 bg-blue-600/20 transition-opacity duration-300 ${activeSoftSkill === skill.id ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===================== COMPETENCES — style vidéo sans pourcentages ===================== */}
            <div className="pt-8 md:pt-12 space-y-6 md:space-y-10" id="skills">
              <div className="flex items-center space-x-4 md:space-x-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight"><span className="text-zinc-600">Mes</span> Competences</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <button onClick={() => setActiveSkillCategory('all')} className={`px-3 md:px-4 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all ${activeSkillCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}>Tout</button>
                {Object.entries(skillCategories).map(([key, cat]) => (
                  <button key={key} onClick={() => setActiveSkillCategory(key)} className={`px-3 md:px-4 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all ${activeSkillCategory === key ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}>{cat.name}</button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {(activeSkillCategory === 'all' ? Object.values(skillCategories).flatMap(c => c.skills) : skillCategories[activeSkillCategory]?.skills || []).map((skill, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/5 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    style={{ minHeight: '140px' }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Image de fond floutée */}
                    <div className="absolute inset-0 transition-all duration-700 opacity-0 group-hover:opacity-100" style={{ backgroundImage: `url(${skill.icon})`, backgroundSize: '100px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', filter: 'blur(35px)', transform: 'scale(2.5)' }} />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-zinc-900/80 to-zinc-950/90 group-hover:from-zinc-900/75 group-hover:via-zinc-900/55 group-hover:to-zinc-950/80 transition-all duration-500" />
                    {/* Ligne colorée bas */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(90deg, transparent, ${skill.color || '#3B82F6'}, transparent)` }} />
                    {/* Bordure colorée au survol */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ border: `1px solid ${skill.color || '#3B82F6'}40` }} />

                    <div className="relative z-10 p-5 md:p-6 flex items-start space-x-4 h-full">
                      {/* Logo */}
                      <div className="flex-shrink-0 w-14 h-14 bg-white/8 rounded-xl flex items-center justify-center p-2.5 group-hover:bg-white/15 group-hover:scale-110 transition-all duration-400 border border-white/5 group-hover:shadow-lg" style={{ '--shadow': `${skill.color}40` }}>
                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                      </div>

                      <div className="flex-1 min-w-0 pt-1">
                        <h4 className="font-black text-sm md:text-[15px] mb-1 group-hover:text-white transition-colors truncate">{skill.name}</h4>
                        {/* Catégorie */}
                        <p className="text-[9px] font-bold uppercase tracking-widest mb-2 transition-colors" style={{ color: `${skill.color}99` }}>
                          {Object.values(skillCategories).find(c => c.skills.some(s => s.name === skill.name))?.name || ''}
                        </p>
                        {/* Description — slide in au hover */}
                        <p className="text-zinc-500 text-[11px] leading-relaxed max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 group-hover:text-zinc-300">
                          {skill.desc}
                        </p>
                        {/* Barre animée */}
                        <div className="mt-3 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent transition-all duration-700 rounded-full" style={{ background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})` }} />
                      </div>

                      {/* Flèche hover */}
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pt-1">
                        <ArrowRight className="w-4 h-4" style={{ color: skill.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===================== POSTE ACTUEL — disposition repensée ===================== */}
            <div className="pt-8 md:pt-12" id="current-job">
              <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-950/30 via-zinc-900/80 to-zinc-950">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/6 blur-[200px] pointer-events-none" />
                
                <div className="relative z-10 p-6 md:p-10 space-y-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 flex-wrap gap-2">
                        <Briefcase className="w-5 h-5 text-blue-400" />
                        <p className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">Poste Actuel</p>
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase">{currentJob.type}</span>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-black tracking-tight">{currentJob.title}</h2>
                      <div className="flex flex-wrap items-center gap-3 text-zinc-400">
                        <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-blue-400" /><span className="text-sm font-medium">{currentJob.company}</span></div>
                        <span className="text-zinc-600">·</span>
                        <span className="text-sm text-zinc-500">{currentJob.location}</span>
                      </div>
                    </div>
                    <img src={currentJob.logo} alt={currentJob.company} className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white/10 rounded-2xl p-3 border border-white/10" />
                  </div>

                  {/* Onglets */}
                  <div className="flex gap-2 border-b border-white/10 pb-0">
                    {[
                      { id: 'missions', label: 'Missions' },
                      { id: 'demo', label: 'Démo IP Phone' },
                      { id: 'certif', label: 'Certification 3CX' },
                    ].map(tab => (
                      <button key={tab.id} onClick={() => setActiveJobTab(tab.id)}
                        className={`px-4 md:px-6 py-3 text-xs md:text-sm font-bold rounded-t-xl transition-all duration-300 relative ${activeJobTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                        {tab.label}
                        {activeJobTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />}
                      </button>
                    ))}
                  </div>

                  {/* Contenu onglet */}
                  <div className="min-h-[520px] md:min-h-[560px]">

                    {/* MISSIONS */}
                    {activeJobTab === 'missions' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fadeIn">
                        {currentJob.missions.map((m, i) => {
                          const Icon = m.icon;
                          return (
                            <div key={i} className="flex items-start space-x-3 p-4 bg-white/4 rounded-xl border border-white/5 hover:border-blue-500/25 hover:bg-white/6 transition-all group/m hover:-translate-y-0.5">
                              <div className={`p-2 ${m.bg} rounded-lg flex-shrink-0 mt-0.5`}><Icon className={`w-4 h-4 ${m.color}`} /></div>
                              <p className="text-xs md:text-sm text-zinc-400 group-hover/m:text-zinc-200 transition-colors leading-relaxed">{m.text}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* DEMO VIDEO IP PHONE */}
                    {activeJobTab === 'demo' && (
                      <div className="animate-fadeIn space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <Phone className="w-5 h-5 text-blue-400" />
                          <p className="text-sm font-bold text-zinc-300">Configuration de telephone IP sans fil <span className="text-zinc-500 font-normal text-xs">(DECTs Gigaset)</span></p>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 group/v hover:border-blue-500/30 transition-all duration-300">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-10 pointer-events-none" />
                          <button onClick={() => setVideo1Expanded(true)} className="absolute bottom-4 right-4 z-20 flex items-center space-x-2 px-3 py-2 bg-black/70 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs font-bold hover:bg-blue-600/80 hover:border-blue-500 transition-all duration-300">
                            <Maximize2 className="w-4 h-4" /><span>Agrandir</span>
                          </button>
                          <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/60 to-transparent">
                            <div className="flex items-center space-x-2"><Phone className="w-3.5 h-3.5 text-blue-400" /><p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Configuration telephone IP sans fil</p></div>
                          </div>
                          <video autoPlay loop muted playsInline className="w-full object-cover" style={{ maxHeight: '380px', aspectRatio: '16/9' }}>
                            <source src="/video1.mp4" type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    )}

                    {/* CERTIFICATION 3CX */}
                    {activeJobTab === 'certif' && (
                      <div className="animate-fadeIn flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-4">
                        {/* Image 3CX grande */}
<div className="group/img relative flex-shrink-0 w-full lg:w-auto">

  <div
    className="absolute inset-0 blur-3xl rounded-3xl opacity-40 group-hover/img:opacity-70 transition-opacity duration-500"
    style={{
      background: 'radial-gradient(circle, rgba(255,100,0,0.35), transparent)'
    }}
  />

  <div
    className="
      relative
      w-full
      max-w-[700px]
      h-[280px]
      md:h-[350px]
      lg:w-[700px]
      lg:h-[420px]
      rounded-3xl
      overflow-hidden
      bg-white/5
      border border-orange-500/30
      shadow-2xl
      transition-all
      duration-500
      group-hover/img:scale-[1.02]
    "
  >
    <img
      src="/3cx.png"
      alt="3CX"
      className="w-full h-full object-cover"
    />
  </div>

</div>

                        {/* Infos */}
                        <div className="flex-1 space-y-6 text-center lg:text-left">
                          <div>
                            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4">
                              <Award className="w-4 h-4 text-orange-400" />
                              <span className="text-xs font-black text-orange-400 uppercase tracking-widest">Certifie</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">3CX Basic</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">Certification obtenue lors du stage chez <span className="text-white font-bold">Sphere Telecom</span>, operateur telephonique partenaire <span className="text-orange-400 font-bold">3CX Platinium</span>.</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto lg:mx-0">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all text-center">
                              <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Niveau</p>
                              <p className="text-sm font-black text-white">Basic Certified</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all text-center">
                              <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Partenaire</p>
                              <p className="text-sm font-black text-orange-400">Platinium</p>
                            </div>
                          </div>
                          <p className="text-[10px] text-zinc-600 italic">Sphere Telecom · Opérateur Téléphonique</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {video1Expanded && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={() => setVideo1Expanded(false)}>
                <div className="relative w-full max-w-5xl" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setVideo1Expanded(false)} className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20 group z-10"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button>
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <div className="bg-black/60 backdrop-blur-md px-4 py-3 flex items-center space-x-3 border-b border-white/10"><Phone className="w-4 h-4 text-blue-400" /><span className="text-sm font-bold">Configuration de telephone IP sans fil</span><span className="ml-auto text-[10px] text-zinc-500 uppercase tracking-widest">Sphere Telecom</span></div>
                    <video autoPlay loop muted playsInline className="w-full aspect-video object-cover"><source src="/video1.mp4" type="video/mp4" /></video>
                  </div>
                </div>
              </div>
            )}

            {/* Passion Sport */}
            <div className="pt-8 md:pt-12" id="passion">
              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl md:rounded-[2rem] overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-red-600/5 to-transparent" />
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative min-h-[300px] md:min-h-[500px]">
                    <img src="/moi3.jpeg" alt="Emmanuel Sport" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:hidden" />
                    <div className="absolute top-4 md:top-6 left-4 md:left-6 space-y-2 md:space-y-3">
                      <div className="px-3 md:px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg md:rounded-xl border border-orange-500/30 flex items-center space-x-2 hover:scale-105 transition-transform"><Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500" /><span className="text-xs md:text-sm font-bold">Discipline</span></div>
                      <div className="px-3 md:px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg md:rounded-xl border border-red-500/30 flex items-center space-x-2 hover:scale-105 transition-transform"><Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" /><span className="text-xs md:text-sm font-bold">Passion</span></div>
                      <div className="px-3 md:px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg md:rounded-xl border border-yellow-500/30 flex items-center space-x-2 hover:scale-105 transition-transform"><Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" /><span className="text-xs md:text-sm font-bold">Energie</span></div>
                    </div>
                  </div>
                  <div className="p-6 md:p-12 flex flex-col justify-center relative z-10">
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex items-center space-x-3"><Dumbbell className="w-6 h-6 md:w-8 md:h-8 text-orange-500" /><p className="text-[10px] md:text-xs font-bold text-orange-400 uppercase tracking-[0.2em]">Au-dela du Reseau</p></div>
                      <h2 className="text-2xl md:text-5xl font-black tracking-tight">La Discipline Forge le <span className="text-orange-500">Succes</span></h2>
                      <p className="text-zinc-400 text-sm md:text-lg leading-relaxed">Ma passion pour la musculation va au-dela du simple entrainement. Elle m'enseigne la <span className="text-white font-semibold">perseverance</span>, la <span className="text-white font-semibold">rigueur</span> et l'importance de la <span className="text-white font-semibold">progression constante</span>.</p>
                      <div className="pt-4 md:pt-6 grid grid-cols-3 gap-3 md:gap-4">
                        {[['100%','Engagement'],['0','Abandon'],['∞','Motivation']].map(([val, label], i) => (
                          <div key={i} className="text-center p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors group/stat">
                            <p className="text-xl md:text-2xl font-black text-orange-500 group-hover/stat:scale-110 transition-transform">{val}</p>
                            <p className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-1">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard */}
            <div id="monitoring" className="pt-12 space-y-10">
              <div className="flex items-center space-x-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight"><span className="text-zinc-600">EL-NOC</span> Dashboard</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                <div className="flex items-center space-x-3 text-zinc-500 bg-white/5 px-4 py-2 rounded-xl border border-white/5"><Clock className="w-4 h-4 text-blue-400" /><span className="text-xs font-mono font-bold">{currentTime}</span></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-zinc-900/80 border border-white/5 rounded-3xl p-6"><p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Status global</p><h3 className="text-3xl font-black text-emerald-500 flex items-center gap-2">OPÉRATIONNEL<span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span></h3><p className="text-zinc-400 text-xs mt-4">Performances optimales détectées.</p></div>
                  <div className="bg-zinc-900/80 border border-white/5 rounded-3xl p-6 space-y-4">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ressources Live</p>
                    <div className="space-y-4">
                      <div><div className="flex justify-between text-[10px] font-bold uppercase mb-2"><span className="text-zinc-400">Motivation CPU</span><span className="text-blue-400">{cpuLoad}%</span></div><div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${cpuLoad}%` }}></div></div></div>
                      <div><div className="flex justify-between text-[10px] font-bold uppercase mb-2"><span className="text-zinc-400">Apprentissage RAM</span><span className="text-purple-400">{ramUsage}%</span></div><div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${ramUsage}%` }}></div></div></div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-900/80 border border-white/5 rounded-3xl p-6 flex flex-col">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Activité Réseau (Labs)</p>
                    <div className="flex-grow flex items-end gap-1.5 h-32">{[40,60,45,80,55,90,70,85,40,60,50,75,95,60].map((h,i) => (<div key={i} className="flex-grow bg-blue-500/20 rounded-t-md" style={{height:`${h}%`}}></div>))}</div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between"><div className="flex flex-col"><span className="text-[10px] text-zinc-500 uppercase">Uptime</span><span className="font-black">{uptime}</span></div><div className="flex flex-col items-end"><span className="text-[10px] text-zinc-500 uppercase">Alertes</span><span className="font-black text-emerald-500">0</span></div></div>
                  </div>
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 font-mono overflow-hidden relative">
                    <div className="text-[10px] text-zinc-600 mb-4 border-b border-white/5 pb-2 uppercase tracking-widest font-bold">System Log</div>
                    <div className="space-y-2">{logs.map((log,i) => (<div key={i} className="text-[10px] flex gap-2"><span className="text-zinc-700">[{currentTime}]</span><span className={i===0?"text-blue-400":"text-zinc-500"}># {log}</span></div>))}</div>
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
                  </div>
                </div>
                <div className="lg:col-span-12">
                  <div className="bg-gradient-to-br from-blue-600/20 via-zinc-900/50 to-transparent border border-blue-500/30 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="space-y-4 max-w-xl text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest"><AlertTriangle className="w-3 h-3" /> Statut : Prêt pour l'alternance</div>
                      <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-none">Besoin d'un <span className="text-blue-500">Administrateur</span> ?</h2>
                      <p className="text-zinc-400 text-sm md:text-base italic">Mon monitoring indique que ce profil correspond à vos besoins. Transformons ces métriques en collaboration !</p>
                    </div>
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                      <button onClick={() => setShowContactModal(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/30">Me Recruter</button>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[9px] font-bold uppercase text-zinc-500">Disponible</span></div>
                        <div className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-center gap-2"><HardDrive className="w-3 h-3 text-zinc-600" /><span className="text-[9px] font-bold uppercase text-zinc-500">Toulouse</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* CV */
          <div className={`max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-20 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 rounded-2xl md:rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 p-6 md:p-14 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                  <div className="text-center md:text-left space-y-2 md:space-y-3">
                    <h1 className="text-2xl md:text-6xl font-black tracking-tight uppercase leading-none">{user.name}</h1>
                    <p className="text-blue-100 font-bold tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-xs uppercase opacity-80">{user.title}</p>
                  </div>
                  <button onClick={handleDownloadCV} className="flex items-center space-x-2 md:space-x-3 bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-xl"><Download className="w-4 h-4 md:w-5 md:h-5" /><span>TELECHARGER PDF</span></button>
                </div>
              </div>
              <div className="p-4 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
                <div className="space-y-8 md:space-y-12">
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-4 md:mb-6 flex items-center"><div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Contact</h5>
                    <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
                      <li className="flex items-center space-x-3 md:space-x-4 text-zinc-400 hover:text-white transition-colors"><MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" /><span>{user.location}</span></li>
                      <li className="flex items-center space-x-3 md:space-x-4 text-zinc-400 hover:text-white transition-colors"><Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" /><span className="truncate">{user.email}</span></li>
                      <li className="flex items-center space-x-3 md:space-x-4"><FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" /><a href={user.linkedin} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">LinkedIn</a></li>
                      <li className="flex items-center space-x-3 md:space-x-4"><FaGithub className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" /><a href={user.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">GitHub</a></li>
                    </ul>
                  </section>
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-4 md:mb-6 flex items-center"><div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Certifications</h5>
                    <div className="space-y-3 md:space-y-4">
                      {certifications.map((cert, i) => (
                        <div key={i} className="p-3 md:p-5 bg-white/5 rounded-lg md:rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors flex items-center space-x-2 md:space-x-3">
                          <img src={cert.logo} alt={cert.company} className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                          <div><p className="font-bold text-xs md:text-sm">{cert.name}</p><p className="text-[8px] md:text-[10px] text-emerald-400 uppercase font-bold tracking-widest mt-0.5 md:mt-1">{cert.company}</p></div>
                        </div>
                      ))}
                      <div className="p-3 md:p-5 bg-white/5 rounded-lg md:rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors flex items-center space-x-2 md:space-x-3">
                        <img src="/3cx.png" alt="3CX" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                        <div><p className="font-bold text-xs md:text-sm">3CX Basic</p><p className="text-[8px] md:text-[10px] text-orange-400 uppercase font-bold tracking-widest mt-0.5 md:mt-1">3CX</p></div>
                      </div>
                    </div>
                  </section>
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-4 md:mb-6 flex items-center"><div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Competences</h5>
                    <div className="space-y-3 md:space-y-4">
                      {Object.entries(skillCategories).map(([key, cat]) => (
                        <div key={key}><p className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">{cat.name}</p>
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {cat.skills.map((skill, i) => (<span key={i} className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-1.5 bg-blue-500/10 text-blue-400 rounded-md md:rounded-lg text-[8px] md:text-[10px] font-bold uppercase tracking-wide border border-blue-500/20"><img src={skill.icon} alt={skill.name} className="w-2 h-2 md:w-3 md:h-3 object-contain" /><span>{skill.name}</span></span>))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-4 md:mb-6 flex items-center"><div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Qualites</h5>
                    <div className="flex flex-wrap gap-2">{qualities.map((q, i) => (<span key={i} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-bold uppercase tracking-wide border border-emerald-500/20">{q}</span>))}</div>
                  </section>
                </div>
                <div className="md:col-span-2 space-y-10 md:space-y-14">
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-6 md:mb-8 flex items-center"><div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Formation</h5>
                    <div className="space-y-6 md:space-y-8">
                      {[
                        { title: "Bachelor Administrateur Systemes & Reseaux", sub: "Ecole de destination (Sept. 2026)", color: "border-blue-600", dot: "bg-blue-600", textColor: "text-blue-400" },
                        { title: "Administration des Reseaux — 2e annee FR", sub: "Keyce Informatique Toulouse · 2025-2026", color: "border-zinc-800", dot: "bg-emerald-600", textColor: "text-emerald-400" },
                        { title: "Bachelor Tronc Commun Informatique (2 ans)", sub: "Keyce Informatique Yaounde · 2023-2025", color: "border-zinc-800", dot: "bg-zinc-700", textColor: "text-zinc-500" },
                        { title: "Baccalaureat Scientifique Serie C", sub: "Complexe Le Prestige, Yaounde · 2023-2024", color: "border-zinc-800", dot: "bg-zinc-700", textColor: "text-zinc-500" },
                      ].map((item, i) => (
                        <div key={i} className={`relative pl-6 md:pl-8 border-l-2 ${item.color}`}>
                          <div className={`absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full ${item.dot} shadow-lg`} />
                          <h4 className="font-bold text-lg md:text-xl">{item.title}</h4>
                          <p className={`${item.textColor} font-bold uppercase text-[8px] md:text-[10px] tracking-widest mt-1 md:mt-2`}>{item.sub}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-6 md:mb-8 flex items-center"><div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Experience</h5>
                    <div className="space-y-6">
                      <div className="relative pl-6 md:pl-8 border-l-2 border-emerald-600">
                        <div className="absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-600" />
                        <h4 className="font-bold text-lg md:text-xl">{currentJob.title}</h4>
                        <p className="text-emerald-400 font-bold uppercase text-[8px] md:text-[10px] tracking-widest mt-1 md:mt-2">{currentJob.company} (2026 - Actuel)</p>
                        <ul className="text-zinc-400 mt-3 md:mt-4 text-xs md:text-sm space-y-2">
                          {currentJob.missions.map((m, i) => (<li key={i} className="flex items-start space-x-2 md:space-x-3"><CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 mt-0.5 flex-shrink-0" /><span>{m.text}</span></li>))}
                        </ul>
                      </div>
                      <div className="relative pl-6 md:pl-8 border-l-2 border-blue-600">
                        <div className="absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-600" />
                        <h4 className="font-bold text-lg md:text-xl">Assistant Informatique</h4>
                        <p className="text-blue-400 font-bold uppercase text-[8px] md:text-[10px] tracking-widest mt-1 md:mt-2">GYARA NI FAST FOOD (2025)</p>
                        <ul className="text-zinc-400 mt-3 md:mt-4 text-xs md:text-sm space-y-2">
                          {["Mise en place d'un LAN pour 5 postes","Maintenance materielle et logicielle","Deploiement PWA React"].map((t,i)=>(<li key={i} className="flex items-start space-x-2 md:space-x-3"><CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 mt-0.5 flex-shrink-0" /><span>{t}</span></li>))}
                        </ul>
                      </div>
                    </div>
                  </section>
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-6 md:mb-8 flex items-center"><div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Projets Techniques</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {projects.map((p, i) => (<div key={i} className="p-3 md:p-5 bg-white/5 rounded-lg md:rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group"><div className="flex items-start space-x-2 md:space-x-3"><div className="p-1.5 md:p-2 bg-blue-500/10 rounded-md md:rounded-lg">{p.icon}</div><div><h6 className="font-bold text-xs md:text-sm group-hover:text-blue-400 transition-colors">{p.title}</h6><p className="text-zinc-500 text-[10px] md:text-xs mt-0.5 md:mt-1">{p.shortDesc}</p></div></div></div>))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setShowContactModal(false)} />
          <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 w-full max-w-2xl border border-white/10 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowContactModal(false)} className="absolute top-4 md:top-6 right-4 md:right-6 p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all group"><X className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform" /></button>
            <div className="space-y-6 md:space-y-8">
              <div>
                <p className="text-[10px] md:text-xs font-bold text-pink-400 uppercase tracking-widest mb-2">Me contacter</p>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">On discute ?<span className="flex space-x-1"><span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-pink-500 animate-bounce" style={{animationDelay:'0ms'}}></span><span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-pink-400 animate-bounce" style={{animationDelay:'150ms'}}></span><span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-pink-300 animate-bounce" style={{animationDelay:'300ms'}}></span></span></h2>
              </div>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">Je suis ouvert a une opportunite de contrat d'apprentissage pour <span className="text-blue-400 font-bold">douze mois</span> a partir de <span className="text-blue-400 font-bold">septembre 2026</span>.</p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2 text-emerald-400"><img src="/gmail.png" alt="Gmail" className="w-4 h-4 md:w-5 md:h-5 object-contain" /><a href={`mailto:${user.email}`} className="font-bold hover:underline text-sm md:text-base">{user.email}</a></div>
                <button onClick={copyEmail} className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all">{copied ? <Check className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" /> : <Copy className="w-3 h-3 md:w-4 md:h-4" />}<span>{copied ? 'Copie!' : 'Copier'}</span></button>
              </div>
              <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                <div className="space-y-3 mb-6">{[['Localisation','Toulouse, France'],['Je recherche','Alternance'],['Langues','Francais, Anglais']].map(([k,v],i)=>(<div key={i} className="flex justify-between items-center text-xs md:text-sm"><span className="text-zinc-500">{k}</span><span className={`font-bold ${k==='Je recherche'?'text-blue-400':''}`}>{v}</span></div>))}</div>
                <div className="flex gap-3">
                  <a href={user.linkedin} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs md:text-sm hover:bg-blue-600 hover:border-blue-600 transition-all"><FaLinkedinIn className="w-4 h-4" /><span>LinkedIn</span></a>
                  <a href={user.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs md:text-sm hover:bg-zinc-700 hover:border-zinc-600 transition-all"><FaGithub className="w-4 h-4" /><span>GitHub</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedProject(null)} />
          <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/10 rounded-2xl md:rounded-[2.5rem] p-6 md:p-12 animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 md:top-6 right-4 md:right-6 p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all group"><X className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform" /></button>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center space-x-4 md:space-x-5">
                <div className={`w-12 h-12 md:w-16 md:h-16 ${selectedProject.color}/10 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl border border-white/5`}>{selectedProject.icon}</div>
                <div><p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-1">Lab IT</p><h2 className="text-xl md:text-3xl font-black tracking-tight">{selectedProject.title}</h2></div>
              </div>
              <div className="space-y-3 md:space-y-4"><h4 className="font-bold uppercase text-[10px] md:text-xs text-zinc-500 tracking-widest flex items-center"><div className="w-6 md:w-8 h-px bg-zinc-700 mr-2 md:mr-3" /> Description</h4><p className="text-zinc-300 text-sm md:text-base leading-relaxed border-l-2 border-blue-500 pl-4 md:pl-5">{selectedProject.fullDesc}</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3 md:space-y-4"><h4 className="font-bold uppercase text-[10px] md:text-xs text-zinc-500 tracking-widest">Infrastructure</h4><ul className="space-y-2 md:space-y-3">{selectedProject.infra.map((item,i)=>(<li key={i} className="flex items-center space-x-2 md:space-x-3 text-xs md:text-sm text-zinc-400"><CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" /><span>{item}</span></li>))}</ul></div>
                <div className="space-y-3 md:space-y-4"><h4 className="font-bold uppercase text-[10px] md:text-xs text-zinc-500 tracking-widest">Processus</h4><ul className="space-y-2 md:space-y-3">{selectedProject.steps.map((item,i)=>(<li key={i} className="flex items-start space-x-2 md:space-x-3 text-xs md:text-sm text-zinc-400"><span className="w-5 h-5 md:w-6 md:h-6 rounded-md md:rounded-lg bg-blue-500/20 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-blue-400 flex-shrink-0">{i+1}</span><span>{item}</span></li>))}</ul></div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 md:pt-4">{selectedProject.tags.map((tag,i)=>(<span key={i} className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-500/10 text-blue-400 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border border-blue-500/20">{tag}</span>))}</div>
              {selectedProject.screenshots && (<div className="space-y-3 md:space-y-4 pt-2 md:pt-4"><h4 className="font-bold uppercase text-[10px] md:text-xs text-zinc-500 tracking-widest flex items-center"><div className="w-6 md:w-8 h-px bg-zinc-700 mr-2 md:mr-3" /> Captures</h4><div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">{selectedProject.screenshots.map((s,i)=>(<div key={i} className="rounded-lg md:rounded-xl overflow-hidden border border-white/10 group cursor-pointer" onClick={()=>window.open(s,'_blank')}><img src={s} alt={`Capture ${i+1}`} className="w-full h-36 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300" /></div>))}</div></div>)}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 md:py-12 px-4 md:px-6 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-black text-white text-sm">EL</div><span className="font-bold">Emmanuel Lokadi</span></div>
              <p className="text-zinc-500 text-xs md:text-sm">Technicien Systemes & Reseaux passionne par les infrastructures IT.</p>
            </div>
            <div><h5 className="font-bold text-xs md:text-sm uppercase tracking-widest text-zinc-400 mb-3 md:mb-4">Sections</h5><ul className="space-y-2">{[['about','A propos'],['parcours','Parcours'],['projects','Projets'],['certifications','Certifications'],['skills','Competences']].map(([id,label])=>(<li key={id}><button onClick={()=>scrollToSection(id)} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">{label}</button></li>))}</ul></div>
            <div><h5 className="font-bold text-xs md:text-sm uppercase tracking-widest text-zinc-400 mb-3 md:mb-4">Pages</h5><ul className="space-y-2"><li><button onClick={()=>setActiveTab('portfolio')} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">Portfolio</button></li><li><button onClick={()=>setActiveTab('cv')} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">CV</button></li><li><button onClick={()=>scrollToSection('current-job')} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">Poste actuel</button></li></ul></div>
            <div><h5 className="font-bold text-xs md:text-sm uppercase tracking-widest text-zinc-400 mb-3 md:mb-4">Contact</h5><ul className="space-y-2"><li><a href={user.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 text-xs md:text-sm transition-colors">LinkedIn</a></li><li><a href={user.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">GitHub</a></li><li><a href={`mailto:${user.email}`} className="text-zinc-500 hover:text-emerald-400 text-xs md:text-sm transition-colors">Email</a></li></ul></div>
          </div>
          <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-widest">2026 Emmanuel Lokadi - Tous droits reserves</p>
            <div className="flex items-center space-x-4 md:space-x-6">
              <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors"><FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5" /></a>
              <a href={user.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><FaGithub className="w-4 h-4 md:w-5 md:h-5" /></a>
              <a href={`mailto:${user.email}`} className="text-zinc-500 hover:text-emerald-400 transition-colors"><Mail className="w-4 h-4 md:w-5 md:h-5" /></a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 30s linear infinite; }
        .animate-scroll:hover { animation-play-state: paused; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;