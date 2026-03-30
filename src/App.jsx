import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Server, 
  Network, 
  ShieldCheck, 
  Monitor, 
  ExternalLink, 
  ChevronRight, 
  Dumbbell, 
  Terminal,
  MapPin, 
  Calendar, 
  Download, 
  Activity, 
  Database, 
  Cpu, 
  Lock, 
  Globe, 
  LifeBuoy, 
  X, 
  CheckCircle2, 
  LayoutGrid,
  ArrowUpRight,
  Sparkles,
  Code2,
  MousePointer2,
  Award,
  Copy,
  Check,
  Target,
  Flame,
  Heart,
  Zap,
  Plus,
  Play,
  Briefcase,
  Phone,
  Headphones,
  Clock,
  AlertTriangle,
  Settings,
  HardDrive,
  HeartPulse,
  Users
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const App = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
  const [visibleSections, setVisibleSections] = useState({});
  const [showContactModal, setShowContactModal] = useState(false);
  const [videoInView, setVideoInView] = useState(false);
  const [activeSoftSkill, setActiveSoftSkill] = useState(null);
  const aboutRef = useRef(null);
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  // Dashboard State (Supervision)
  const [uptime, setUptime] = useState("99.98%");
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

  // Ajoute ceci dans ton useEffect existant pour faire vivre le dashboard
  useEffect(() => {
    const dashInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCpuLoad(Math.floor(Math.random() * (25 - 5) + 5));
      setRamUsage(Math.floor(Math.random() * (60 - 40) + 40));
      
      const newLogs = [
        "Ping gateway: 1ms",
        "Trafic HTTP entrant: Stable",
        "Backup cloud terminé",
        "Synchronisation AD effectuée",
        "Check intégrité base de données: OK",
        "Requête SNMP vers Core-Switch: Réponse 2ms"
      ];
      
      const newLog = newLogs[Math.floor(Math.random() * newLogs.length)];
      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(dashInterval);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    // Video observer
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVideoInView(true);
            videoRef.current?.play().catch(err => console.log("Lecture bloquée :", err));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (videoSectionRef.current) {
      videoObserver.observe(videoSectionRef.current);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      videoObserver.disconnect();
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(user.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv_Emmanuel_Lokadi.pdf';
    link.download = 'cv_Emmanuel_Lokadi.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const user = {
    name: "Emmanuel LOKADI",
    title: "Technicien Systemes et Reseaux",
    status: "Recherche Alternance - Septembre 2026 (12 mois)",
    location: "Toulouse, France",
    email: "emmalokadi19@gmail.com",
    linkedin: "https://www.linkedin.com/in/lokadi/",
    github: "https://github.com/Emma459-dot",
    school: "Keyce Informatique Toulouse",
    description: "Technicien reseaux et systemes passionne par l'administration d'infrastructures IT. Actuellement en formation a Keyce Informatique Toulouse, je maitrise la mise en place et la gestion de serveurs, la configuration reseau, et la supervision d'environnements virtualises. Anciennement assistant informatique, j'ai developpe une rigueur et une capacite d'adaptation que j'applique au quotidien dans mes projets.",
    cvUrl: "/cv_Emmanuel_Lokadi.pdf",
    credlyUrl: "https://www.credly.com/users/emma-lokadi/edit#credly"
  };

  const scrollingSkills = [
    { name: "Proxmox", icon: "/proxmox.png" },
    { name: "VMware", icon: "/vmware.png" },
    { name: "Linux", icon: "/linux.png" },
    { name: "Windows Server", icon: "/server.png" },
    { name: "Zabbix", icon: "/zabbix.png" },
    { name: "Stork", icon: "/stork.png" },
    { name: "Docker", icon: "/docker.png" },
    { name: "VPN", icon: "/vpn.png" },
    { name: "GLPI", icon: "/glpi.png" },
    { name: "Proxmox", icon: "/proxmox.png" },
    { name: "VMware", icon: "/vmware.png" },
    { name: "Linux", icon: "/linux.png" },
    { name: "Windows Server", icon: "/server.png" },
    { name: "Zabbix", icon: "/zabbix.png" },
    { name: "Stork", icon: "/stork.png" },
    { name: "Docker", icon: "/docker.png" },
  ];

  const softSkills = [
    { id: "equipe", name: "Esprit d'equipe", image: "/equipe.png" },
    { id: "autonomie", name: "Autonomie", image: "/autonomie.png" },
    { id: "proposition", name: "Force de proposition", image: "/force.png" },
    { id: "adaptation", name: "Capacite d'adaptation", image: "/adaptation.png" }
  ];

  const skillCategories = {
    virtualisation: {
      name: "Virtualisation",
      skills: [
        { name: "Proxmox", icon: "/proxmox.png" },
        { name: "VMware", icon: "/vmware.png" },
      ]
    },
    os: {
      name: "Systemes d'exploitation",
      skills: [
        { name: "Linux (Ubuntu/Debian)", icon: "/linux.png" },
        { name: "Windows Server (AD/GPO)", icon: "/server.png" },
      ]
    },
    supervision: {
      name: "Supervision",
      skills: [
        { name: "Zabbix", icon: "/zabbix.png" },
        { name: "Stork", icon: "/stork.png" },
      ]
    },
    reseau: {
      name: "Reseau & Services",
      skills: [
        { name: "VPN Site-to-Site", icon: "/vpn.png" },
        { name: "GLPI & Ticketing", icon: "/glpi.png" },
        { name: "Docker", icon: "/docker.png" },
      ]
    }
  };

  const certifications = [
    {
      id: "fortinet",
      name: "Fortinet NSE 3",
      company: "Fortinet",
      logo: "/fortinet.png",
      certificate: "/cert1.png",
      content: [
        { title: "Cybersecurite moderne", desc: "Panorama des menaces, malwares, ransomware, phishing" },
        { title: "Security Fabric", desc: "Integration des outils de securite, visibilite et controle centralises" },
        { title: "Produits Fortinet", desc: "FortiGate, FortiAnalyzer, FortiManager, FortiClient" },
        { title: "Securite Cloud", desc: "Protection AWS, Azure, applications SaaS" },
        { title: "Endpoints & EDR", desc: "Protection des postes, detection et reponse aux menaces" },
        { title: "Automatisation", desc: "Orchestration de la securite, reponses automatiques" }
      ]
    },
    {
      id: "google",
      name: "Technical Support Fundamentals",
      company: "Google",
      logo: "/google.png",
      certificate: "/cert2.png",
      content: [
        { title: "Introduction IT", desc: "Role du support informatique, types de metiers IT" },
        { title: "Hardware", desc: "Composants d'un ordinateur, montage d'un PC" },
        { title: "Systemes d'exploitation", desc: "Windows, Linux, macOS, gestion des processus" },
        { title: "Reseaux", desc: "IP, DNS, TCP/IP, communication entre machines" },
        { title: "Logiciels", desc: "Installation, bases du developpement logiciel" },
        { title: "Troubleshooting", desc: "Methodologie de depannage, support utilisateur" }
      ]
    }
  ];

  const projects = [
    {
      id: "stork",
      title: "Lab Supervision DHCP/DNS",
      shortDesc: "Kea/Bind9 + Stork sur Ubuntu 24.04.",
      fullDesc: "Implementation d'une infrastructure reseau moderne. Configuration d'un serveur DHCP Kea (JSON) et DNS Bind9, supervises par Stork pour un monitoring en temps reel.",
      infra: ["VMware Workstation", "Ubuntu 24.04", "PostgreSQL"],
      steps: ["Setup Kea & Bind9", "Config Sockets de controle", "Deploiement Stork Server & Agent", "Validation DNS via nslookup"],
      icon: <Monitor className="text-blue-500" />,
      color: "bg-blue-500",
      tags: ["DHCP Kea", "BIND9", "Stork"],
      screenshots: ["/dns.png", "/dns1.png"]
    },
    {
      id: "zabbix",
      title: "Monitoring Windows Server",
      shortDesc: "Supervision AD DS (Primaire & RODC) via Zabbix.",
      fullDesc: "Deploiement d'un environnement redondant avec controleur primaire et RODC. Supervision complete des services et performances via Zabbix.",
      infra: ["Windows Server 2022", "Zabbix Server", "VMware"],
      steps: ["Promotion AD DS & GPO", "Configuration RODC", "Installation Agents Zabbix", "Creation de dashboards"],
      icon: <Activity className="text-orange-500" />,
      color: "bg-orange-500",
      tags: ["Zabbix", "Active Directory", "RODC"],
      screenshots: ["/win.png", "/win1.png"]
    },
    {
      id: "vpn",
      title: "VPN Site-to-Site IPsec",
      shortDesc: "Tunnel securise inter-sites geographiques.",
      fullDesc: "Configuration d'un tunnel VPN IPsec haute securite pour lier deux infrastructures distantes. Gestion fine des regles firewall et du routage statique.",
      infra: ["Pfsense", "FortiGate", "IPsec"],
      steps: ["Phases IKEv1/v2", "Politiques de securite", "Routage inter-sites", "Tests de flux chiffres"],
      icon: <ShieldCheck className="text-emerald-500" />,
      color: "bg-emerald-500",
      tags: ["Securite", "IPsec", "Firewall"],
      screenshots: ["/ipsec.png", "/ipsec1.png"]
    },
    {
      id: "glpi",
      title: "Serveur GLPI & Ticketing",
      shortDesc: "Gestion de parc et support IT sous Linux.",
      fullDesc: "Installation d'un serveur GLPI sur Debian pour la gestion centralisee des actifs. Workflow de ticketing et attribution automatique aux techniciens.",
      infra: ["Debian", "LAMP Stack", "GLPI"],
      steps: ["Setup MySQL", "Configuration entites", "Inventaire via agents", "Gestion cycle de vie tickets"],
      icon: <LifeBuoy className="text-purple-500" />,
      color: "bg-purple-500",
      tags: ["GLPI", "ITSM", "Ticketing"],
      screenshots: ["/tick.png", "/tick1.png"]
    }
  ];

  const currentJob = {
    title: "Technicien Support Reseau",
    company: "Sphere Telecom",
    location: "Lille, Hauts-de-France",
    logo: "/sphere.png",
    type: "Stage",
    missions: [
      "Support de niveau 1 sur les solutions 3CX et les liens Internet",
      "Assistance exploitation reseau et voix d'operateur",
      "Support utilisateur, qualification d'incidents et controles techniques"
    ]
  };

  const qualities = [
    "Rigoureux",
    "Methodique", 
    "Curieux",
    "Autonome",
    "Collaboratif"
  ];

  return (
    <div className="min-h-screen w-full bg-[#030303] text-zinc-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
            left: mousePosition.x - 250,
            top: mousePosition.y - 250,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/40 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600 blur-xl opacity-50 group-hover:opacity-80 transition-opacity rounded-xl" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-black text-white text-sm md:text-lg shadow-2xl">
                EL
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold tracking-tight text-base md:text-lg">Emmanuel Lokadi</span>
              <p className="text-[8px] md:text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Technicien Systemes & Reseaux</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2 bg-white/5 p-1 md:p-1.5 rounded-xl md:rounded-2xl border border-white/10">
            <button 
              onClick={() => setActiveTab('portfolio')} 
              className={`px-3 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${activeTab === 'portfolio' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => setActiveTab('cv')} 
              className={`px-3 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${activeTab === 'cv' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              Mon CV
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full min-h-screen">
        {activeTab === 'portfolio' ? (
          <div className={`max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-20 space-y-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Hero Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
              
              {/* Main Hero Card */}
              <div className="lg:col-span-8 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[150px] -mr-48 -mt-48 group-hover:bg-blue-500/20 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 blur-[100px] -ml-32 -mb-32" />
                
                <div className="relative z-10 space-y-6 md:space-y-8">
                  {/* Status Badge - Alternance */}
                  <div className="inline-flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-400 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-emerald-500/30 backdrop-blur-sm animate-pulse">
                    <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-emerald-500"></span>
                    </span>
                    <span>Recherche Alternance 12 mois - Sept. 2026</span>
                  </div>
                  
                  {/* Title */}
                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                      Technicien
                    </h1>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                      Systemes & Reseaux
                    </h1>
                  </div>
                  
                  {/* Description */}
                  <p className="text-zinc-400 text-base md:text-xl max-w-2xl leading-relaxed">
                    Je suis <span className="text-white font-semibold">Emmanuel LOKADI</span>. Je concois des infrastructures virtualisees robustes et supervisees.
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4">
                    <a 
                      href={`mailto:${user.email}`} 
                      className="group/btn relative overflow-hidden bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>ME CONTACTER</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/btn:opacity-100 transition-opacity font-bold">
                        <span className="flex items-center space-x-2">
                          <span>ME CONTACTER</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </span>
                    </a>
                    
                    <div className="flex space-x-2 md:space-x-3">
                      <a 
                        href={user.linkedin} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/20"
                      >
                        <FaLinkedinIn className="w-5 h-5 md:w-6 md:h-6" />
                      </a>
                      <a 
                        href={user.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:scale-105"
                      >
                        <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Card */}
              <div className="lg:col-span-4 rounded-2xl md:rounded-[2rem] overflow-hidden relative group border border-white/10 hover:border-blue-500/30 transition-all duration-500 min-h-[300px] md:min-h-[400px] lg:min-h-0">
                <img 
                  src="/photo2.png" 
                  alt="Emmanuel LOKADI" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* School Info */}
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8">
                  <div className="flex items-center space-x-2 mb-2 md:mb-3">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    <p className="text-[8px] md:text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Ecole Actuelle</p>
                  </div>
                  <p className="font-bold text-lg md:text-2xl leading-tight">{user.school}</p>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 md:top-6 right-4 md:right-6 px-2 md:px-3 py-1 md:py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-300">2eme annee</span>
                </div>
              </div>
            </div>

            {/* Scrolling Skills Bar */}
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

            {/* Qui suis-je Section */}
            <div id="about" data-animate className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6" ref={aboutRef}>
              {/* Photo */}
              <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden group min-h-[400px] md:min-h-[500px] border border-white/10 hover:border-blue-500/30 transition-all duration-500">
                <img 
                  src="/moi1.jpeg" 
                  alt="Emmanuel LOKADI" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Floating elements */}
                <div className="absolute top-4 md:top-6 left-4 md:left-6">
                  <div className="px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-500/90 to-blue-500/90 rounded-full text-white text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center space-x-2 backdrop-blur-sm shadow-lg shadow-emerald-500/20" style={{ animation: 'bounce 2s infinite' }}>
                    <Target className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Recherche Alternance 12 mois</span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 p-3 md:p-4 bg-black/60 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10">
                  <p className="text-xs md:text-sm text-zinc-300 italic">"La rigueur technique alliee a la perseverance"</p>
                </div>
              </div>
              
              {/* Description */}
              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl md:rounded-[2rem] p-6 md:p-10 flex flex-col justify-center relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 blur-[100px]" />
                
                <div className="relative z-10 space-y-4 md:space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl md:text-3xl">*</span>
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">A Propos</p>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight">Qui suis-je ?</h2>
                  
                  <p className="text-zinc-400 text-sm md:text-lg leading-relaxed">
                    {user.description}
                  </p>
                  
                  {/* Email with copy */}
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4">
                    <div className="flex items-center space-x-2 md:space-x-3 text-emerald-400">
                      <img src="/gmail.png" alt="Gmail" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                      <a href={`mailto:${user.email}`} className="font-bold hover:underline text-sm md:text-base">{user.email}</a>
                    </div>
                    <button 
                      onClick={copyEmail} 
                      className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      {copied ? <Check className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" /> : <Copy className="w-3 h-3 md:w-4 md:h-4" />}
                      <span>{copied ? 'Copie!' : 'Copier'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Labs Section */}
            <div className="pt-8 md:pt-12 space-y-6 md:space-y-10" id="projects">
              <div className="flex items-center space-x-4 md:space-x-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                  <span className="text-zinc-600">Mes</span> Labs
                </h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {projects.map((p, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedProject(p)} 
                    className="group relative cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-blue-600/20 rounded-2xl md:rounded-[2rem] translate-x-2 translate-y-2 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl md:rounded-[2rem] p-6 md:p-8 space-y-4 md:space-y-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-blue-500/30 overflow-hidden h-full">
                      
                      {/* Hover Glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4 md:mb-6">
                          <div className={`w-12 h-12 md:w-14 md:h-14 ${p.color}/10 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl border border-white/5`}>
                            {p.icon}
                          </div>
                          <div className="flex items-center space-x-2 text-zinc-500 group-hover:text-blue-400 transition-colors">
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Explorer</span>
                            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                        
                        <h4 className="text-lg md:text-2xl font-black mb-2 md:mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h4>
                        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{p.shortDesc}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
                          {p.tags.map((tag, j) => (
                            <span key={j} className="px-2 md:px-3 py-1 bg-white/5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-zinc-400 border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Construisons ensemble Card */}
                <div 
                  onClick={() => setShowContactModal(true)} 
                  className="group relative cursor-pointer"
                >
                  <div className="absolute inset-0 bg-pink-600/20 rounded-2xl md:rounded-[2rem] translate-x-2 translate-y-2 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative bg-gradient-to-br from-pink-950/30 to-zinc-950/80 border-2 border-dashed border-pink-500/30 rounded-2xl md:rounded-[2rem] p-6 md:p-8 space-y-4 md:space-y-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-pink-500/60 overflow-hidden h-full flex flex-col items-center justify-center text-center min-h-[280px]">
                    
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-500">
                      <Plus className="w-8 h-8 md:w-10 md:h-10 text-pink-400 group-hover:rotate-90 transition-transform duration-500" />
                    </div>
                    
                    <div>
                      <h4 className="text-xl md:text-2xl font-black mb-2 text-pink-300">Votre projet ?</h4>
                      <p className="text-zinc-500 text-xs md:text-sm">Construisons quelque chose ensemble</p>
                    </div>
                    
                    <button className="px-6 py-3 bg-pink-500 text-white rounded-xl font-bold text-sm hover:bg-pink-400 transition-colors">
                      Me contacter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Section with Transition */}
            <div 
              ref={videoSectionRef}
              id="video-section" 
              className={`pt-8 md:pt-12 transition-all duration-1000 ${videoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            >
              <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 group">
                {/* Video Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10 pointer-events-none" />
                
                {/* Play Button Overlay (optional decorative) */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex items-center space-x-3 mb-2">
                    <Monitor className="w-5 h-5 text-blue-400" />
                    <p className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">Demo en direct</p>
                  </div>
                  <h3 className="text-xl md:text-3xl font-black">Simulation Gestion de Tickets GLPI</h3>
                  <p className="text-zinc-400 text-sm mt-2">Environnement virtualise - Workflow complet</p>
                </div>
                
                <video 
                  ref={videoRef}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full aspect-video object-cover"
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Certifications Section */}
            <div className="pt-8 md:pt-12 space-y-6 md:space-y-10" id="certifications" data-animate>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                  <span className="text-zinc-600">Mes</span> Certifications
                </h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                <a 
                  href={user.credlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 text-xs md:text-sm font-bold hover:bg-blue-500/20 transition-all group"
                >
                  <Award className="w-4 h-4" />
                  <span>Voir toutes mes certifications</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {certifications.map((cert, i) => (
                  <div 
                    key={i} 
                    className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl md:rounded-[2rem] p-6 md:p-8 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] group-hover:bg-blue-500/10 transition-all" />
                    
                    <div className="relative z-10 space-y-4 md:space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <img src={cert.logo} alt={cert.company} className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-contain bg-white/10 p-2 group-hover:scale-110 transition-transform" />
                          <div>
                            <h3 className="text-lg md:text-xl font-black group-hover:text-blue-400 transition-colors">{cert.name}</h3>
                            <p className="text-[8px] md:text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Delivre par {cert.company}</p>
                          </div>
                        </div>
                        <Award className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 group-hover:rotate-12 transition-transform" />
                      </div>
                      
                      {/* Content */}
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        {cert.content.slice(0, 4).map((item, j) => (
                          <div key={j} className="p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors group/item">
                            <p className="text-[10px] md:text-xs font-bold text-white mb-1 group-hover/item:text-blue-400 transition-colors">{item.title}</p>
                            <p className="text-[8px] md:text-[10px] text-zinc-500 leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Certificate Preview */}
                      <div className="mt-4 p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 group/cert hover:border-blue-500/30 transition-all cursor-pointer" onClick={() => window.open(cert.certificate, '_blank')}>
                        <p className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 md:mb-3">Certificat</p>
                        <img 
                          src={cert.certificate} 
                          alt={`Certificat ${cert.name}`} 
                          className="w-full h-32 md:h-40 object-cover rounded-lg opacity-80 group-hover/cert:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills Section */}
            <div className="pt-8 md:pt-12 space-y-6 md:space-y-10" id="soft-skills" data-animate>
              <div className="flex items-center space-x-4 md:space-x-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                  <span className="text-zinc-600">Mes</span> Soft Skills
                </h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {softSkills.map((skill, i) => (
                  <div 
                    key={skill.id}
                    className={`relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 group cursor-pointer transition-all duration-500 ${activeSoftSkill === skill.id ? 'ring-2 ring-blue-500 scale-[1.02]' : 'hover:border-blue-500/30 hover:-translate-y-1'}`}
                    onMouseEnter={() => setActiveSoftSkill(skill.id)}
                    onMouseLeave={() => setActiveSoftSkill(null)}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="aspect-[4/3] md:aspect-[16/10] relative">
                      <img 
                        src={skill.image} 
                        alt={skill.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      
                      {/* Skill Name */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <div className={`inline-flex items-center space-x-2 px-3 md:px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeSoftSkill === skill.id ? 'scale-110' : ''}`}>
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{skill.name}</span>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-blue-600/20 transition-opacity duration-300 ${activeSoftSkill === skill.id ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="pt-8 md:pt-12 space-y-6 md:space-y-10" id="skills" data-animate>
              <div className="flex items-center space-x-4 md:space-x-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                  <span className="text-zinc-600">Mes</span> Competences
                </h2>
                <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                <button
                  onClick={() => setActiveSkillCategory('all')}
                  className={`px-3 md:px-4 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all ${activeSkillCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}
                >
                  Tout
                </button>
                {Object.entries(skillCategories).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSkillCategory(key)}
                    className={`px-3 md:px-4 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all ${activeSkillCategory === key ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
                {(activeSkillCategory === 'all' 
                  ? Object.values(skillCategories).flatMap(cat => cat.skills)
                  : skillCategories[activeSkillCategory]?.skills || []
                ).map((skill, i) => (
                  <div 
                    key={i}
                    className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center space-y-3 md:space-y-4 group hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-lg md:rounded-xl flex items-center justify-center p-2 md:p-3 group-hover:bg-white/20 group-hover:scale-110 transition-all">
                      <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                    </div>
                    <p className="text-[8px] md:text-[10px] font-bold text-center uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Position Section */}
            <div className="pt-8 md:pt-12" id="current-job" data-animate>
              <div className="bg-gradient-to-br from-blue-950/50 to-zinc-950/80 border border-blue-500/20 rounded-2xl md:rounded-[2rem] p-6 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[150px]" />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                        <p className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">Poste Actuel</p>
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase">{currentJob.type}</span>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-black tracking-tight">{currentJob.title}</h2>
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{currentJob.company} - {currentJob.location}</span>
                      </div>
                    </div>
                    
                    <img src={currentJob.logo} alt={currentJob.company} className="w-20 h-20 md:w-24 md:h-24 object-contain bg-white/10 rounded-2xl p-3" />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest">Missions principales</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                      {currentJob.missions.map((mission, i) => (
                        <div key={i} className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors group/mission">
                          <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
                            {i === 0 ? <Phone className="w-4 h-4 text-blue-400" /> :
                             i === 1 ? <Network className="w-4 h-4 text-blue-400" /> :
                             <Headphones className="w-4 h-4 text-blue-400" />}
                          </div>
                          <p className="text-xs md:text-sm text-zinc-400 group-hover/mission:text-white transition-colors">{mission}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passion Sport Section */}
            <div className="pt-8 md:pt-12" id="passion" data-animate>
              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 rounded-2xl md:rounded-[2rem] overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-red-600/5 to-transparent" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image Side */}
                  <div className="relative min-h-[300px] md:min-h-[500px]">
                    <img 
                      src="/moi3.jpeg" 
                      alt="Emmanuel Sport" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:hidden" />
                    
                    {/* Floating Stats */}
                    <div className="absolute top-4 md:top-6 left-4 md:left-6 space-y-2 md:space-y-3">
                      <div className="px-3 md:px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg md:rounded-xl border border-orange-500/30 flex items-center space-x-2 hover:scale-105 transition-transform">
                        <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                        <span className="text-xs md:text-sm font-bold">Discipline</span>
                      </div>
                      <div className="px-3 md:px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg md:rounded-xl border border-red-500/30 flex items-center space-x-2 hover:scale-105 transition-transform">
                        <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                        <span className="text-xs md:text-sm font-bold">Passion</span>
                      </div>
                      <div className="px-3 md:px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg md:rounded-xl border border-yellow-500/30 flex items-center space-x-2 hover:scale-105 transition-transform">
                        <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        <span className="text-xs md:text-sm font-bold">Energie</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="p-6 md:p-12 flex flex-col justify-center relative z-10">
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex items-center space-x-3">
                        <Dumbbell className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
                        <p className="text-[10px] md:text-xs font-bold text-orange-400 uppercase tracking-[0.2em]">Au-dela du Reseau</p>
                      </div>
                      
                      <h2 className="text-2xl md:text-5xl font-black tracking-tight">
                        La Discipline Forge le <span className="text-orange-500">Succes</span>
                      </h2>
                      
                      <p className="text-zinc-400 text-sm md:text-lg leading-relaxed">
                        Ma passion pour la musculation va au-dela du simple entrainement. Elle m'enseigne la <span className="text-white font-semibold">perseverance</span>, la <span className="text-white font-semibold">rigueur</span> et l'importance de la <span className="text-white font-semibold">progression constante</span>.
                      </p>
                      
                      <p className="text-zinc-500 text-sm leading-relaxed">
                        Ces valeurs se retrouvent directement dans mon approche des infrastructures IT : chaque configuration est un exercice de precision, chaque probleme resolu une victoire qui renforce mes competences.
                      </p>
                      
                      <div className="pt-4 md:pt-6 grid grid-cols-3 gap-3 md:gap-4">
                        <div className="text-center p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors group/stat">
                          <p className="text-xl md:text-2xl font-black text-orange-500 group-hover/stat:scale-110 transition-transform">100%</p>
                          <p className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Engagement</p>
                        </div>
                        <div className="text-center p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors group/stat">
                          <p className="text-xl md:text-2xl font-black text-orange-500 group-hover/stat:scale-110 transition-transform">0</p>
                          <p className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Abandon</p>
                        </div>
                        <div className="text-center p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors group/stat">
                          <p className="text-xl md:text-2xl font-black text-orange-500 group-hover/stat:scale-110 transition-transform">*</p>
                          <p className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-1">Motivation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* SECTION MONITORING & CALL TO ACTION */}
<div id="monitoring" className="pt-12 space-y-10">
  <div className="flex items-center space-x-6">
    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
      <span className="text-zinc-600">EL-NOC</span> Dashboard
    </h2>
    <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
    <div className="flex items-center space-x-3 text-zinc-500 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
      <Clock className="w-4 h-4 text-blue-400" />
      <span className="text-xs font-mono font-bold">{currentTime}</span>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* Panel Status & Gauges */}
    <div className="lg:col-span-4 space-y-4">
      <div className="bg-zinc-900/80 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
         <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Status global</p>
         <h3 className="text-3xl font-black text-emerald-500 flex items-center gap-2">
            OPÉRATIONNEL
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
         </h3>
         <p className="text-zinc-400 text-xs mt-4">Performances optimales détectées.</p>
      </div>
      
      <div className="bg-zinc-900/80 border border-white/5 rounded-3xl p-6 space-y-4">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ressources Live</p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
              <span className="text-zinc-400">Motivation CPU</span>
              <span className="text-blue-400">{cpuLoad}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${cpuLoad}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
              <span className="text-zinc-400">Apprentissage RAM</span>
              <span className="text-purple-400">{ramUsage}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${ramUsage}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Panel Graph & Logs */}
    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="bg-zinc-900/80 border border-white/5 rounded-3xl p-6 flex flex-col">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Activité Réseau (Labs)</p>
          <div className="flex-grow flex items-end gap-1.5 h-32">
            {[40, 60, 45, 80, 55, 90, 70, 85, 40, 60, 50, 75, 95, 60].map((h, i) => (
              <div key={i} className="flex-grow bg-blue-500/20 rounded-t-md" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
             <div className="flex flex-col"><span className="text-[10px] text-zinc-500 uppercase">Uptime</span><span className="font-black">{uptime}</span></div>
             <div className="flex flex-col items-end"><span className="text-[10px] text-zinc-500 uppercase">Alertes</span><span className="font-black text-emerald-500">0</span></div>
          </div>
       </div>

       <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 font-mono overflow-hidden relative">
          <div className="text-[10px] text-zinc-600 mb-4 border-b border-white/5 pb-2 uppercase tracking-widest font-bold">System Log</div>
          <div className="space-y-2">
            {logs.map((log, i) => (
              <div key={i} className="text-[10px] flex gap-2">
                 <span className="text-zinc-700">[{currentTime}]</span>
                 <span className={i === 0 ? "text-blue-400" : "text-zinc-500"}># {log}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
       </div>
    </div>

    {/* CALL TO ACTION : ME RECRUTER */}
    <div className="lg:col-span-12">
       <div className="bg-gradient-to-br from-blue-600/20 via-zinc-900/50 to-transparent border border-blue-500/30 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 group">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              <AlertTriangle className="w-3 h-3" /> Statut : Prêt pour l'alternance
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-none">
              Besoin d'un <span className="text-blue-500">Administrateur</span> ?
            </h2>
            <p className="text-zinc-400 text-sm md:text-base italic">
              Mon monitoring indique que ce profil correspond à vos besoins. Transformons ces métriques en collaboration !
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <button 
              onClick={() => setShowContactModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/30"
            >
              Me Recruter
            </button>
            <div className="flex gap-2">
               <div className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[9px] font-bold uppercase text-zinc-500">Disponible</span>
               </div>
               <div className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-center gap-2">
                 <HardDrive className="w-3 h-3 text-zinc-600" />
                 <span className="text-[9px] font-bold uppercase text-zinc-500">Toulouse</span>
               </div>
            </div>
          </div>
       </div>
    </div>
  </div>
</div>
          </div>
        ) : (
          /* CV Section */
          <div className={`max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-20 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 rounded-2xl md:rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl" id="cv-content">
              
              {/* CV Header */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 p-6 md:p-14 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                  <div className="text-center md:text-left space-y-2 md:space-y-3">
                    <h1 className="text-2xl md:text-6xl font-black tracking-tight uppercase leading-none">{user.name}</h1>
                    <p className="text-blue-100 font-bold tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-xs uppercase opacity-80">{user.title}</p>
                  </div>
                  <button 
                    onClick={handleDownloadCV}
                    className="flex items-center space-x-2 md:space-x-3 bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                    <span>TELECHARGER PDF</span>
                  </button>
                </div>
              </div>
              
              {/* CV Content */}
              <div className="p-4 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
                
                {/* Left Column */}
                <div className="space-y-8 md:space-y-12">
                  
                  {/* Contact */}
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-4 md:mb-6 flex items-center">
                      <div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Contact
                    </h5>
                    <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
                      <li className="flex items-center space-x-3 md:space-x-4 text-zinc-400 hover:text-white transition-colors">
                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" /> 
                        <span>{user.location}</span>
                      </li>
                      <li className="flex items-center space-x-3 md:space-x-4 text-zinc-400 hover:text-white transition-colors">
                        <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" /> 
                        <span className="truncate">{user.email}</span>
                      </li>
                      <li className="flex items-center space-x-3 md:space-x-4">
                        <FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" /> 
                        <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">LinkedIn</a>
                      </li>
                      <li className="flex items-center space-x-3 md:space-x-4">
                        <FaGithub className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" /> 
                        <a href={user.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">GitHub</a>
                      </li>
                    </ul>
                  </section>
                  
                  {/* Certifications */}
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-4 md:mb-6 flex items-center">
                      <div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Certifications
                    </h5>
                    <div className="space-y-3 md:space-y-4">
                      {certifications.map((cert, i) => (
                        <div key={i} className="p-3 md:p-5 bg-white/5 rounded-lg md:rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors flex items-center space-x-2 md:space-x-3">
                          <img src={cert.logo} alt={cert.company} className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                          <div>
                            <p className="font-bold text-xs md:text-sm">{cert.name}</p>
                            <p className="text-[8px] md:text-[10px] text-emerald-400 uppercase font-bold tracking-widest mt-0.5 md:mt-1">{cert.company}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  {/* Skills */}
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-4 md:mb-6 flex items-center">
                      <div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Competences
                    </h5>
                    <div className="space-y-3 md:space-y-4">
                      {Object.entries(skillCategories).map(([key, cat]) => (
                        <div key={key}>
                          <p className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">{cat.name}</p>
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {cat.skills.map((skill, i) => (
                              <span key={i} className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-1.5 bg-blue-500/10 text-blue-400 rounded-md md:rounded-lg text-[8px] md:text-[10px] font-bold uppercase tracking-wide border border-blue-500/20">
                                <img src={skill.icon} alt={skill.name} className="w-2 h-2 md:w-3 md:h-3 object-contain" />
                                <span>{skill.name}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Qualities */}
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-4 md:mb-6 flex items-center">
                      <div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Qualites
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {qualities.map((quality, i) => (
                        <span key={i} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-bold uppercase tracking-wide border border-emerald-500/20">
                          {quality}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="md:col-span-2 space-y-10 md:space-y-14">
                  
                  {/* Formation */}
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-6 md:mb-8 flex items-center">
                      <div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Formation
                    </h5>
                    <div className="space-y-6 md:space-y-8">
                      <div className="relative pl-6 md:pl-8 border-l-2 border-blue-600">
                        <div className="absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-600 shadow-lg shadow-blue-600/50" />
                        <h4 className="font-bold text-lg md:text-xl">Bachelor Administrateur Systemes & Reseaux</h4>
                        <p className="text-blue-400 font-bold uppercase text-[8px] md:text-[10px] tracking-widest mt-1 md:mt-2">Ecole de destination (Sept. 2026)</p>
                      </div>
                      <div className="relative pl-6 md:pl-8 border-l-2 border-zinc-800">
                        <div className="absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-zinc-700" />
                        <h4 className="font-bold text-lg md:text-xl text-zinc-300">Administration des Reseaux</h4>
                        <p className="text-zinc-500 font-bold uppercase text-[8px] md:text-[10px] tracking-widest mt-1 md:mt-2">Keyce Informatique Toulouse</p>
                        <p className="text-zinc-600 mt-1 md:mt-2 text-[10px] md:text-xs font-bold">En cours | 2eme annee</p>
                      </div>
                    </div>
                  </section>

                  {/* Experience */}
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-6 md:mb-8 flex items-center">
                      <div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Experience
                    </h5>
                    <div className="space-y-6">
                      <div className="relative pl-6 md:pl-8 border-l-2 border-emerald-600">
                        <div className="absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-600" />
                        <h4 className="font-bold text-lg md:text-xl">{currentJob.title}</h4>
                        <p className="text-emerald-400 font-bold uppercase text-[8px] md:text-[10px] tracking-widest mt-1 md:mt-2">{currentJob.company} (2026 - Actuel)</p>
                        <ul className="text-zinc-400 mt-3 md:mt-4 text-xs md:text-sm space-y-2">
                          {currentJob.missions.map((mission, i) => (
                            <li key={i} className="flex items-start space-x-2 md:space-x-3">
                              <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span>{mission}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative pl-6 md:pl-8 border-l-2 border-blue-600">
                        <div className="absolute -left-[7px] md:-left-[9px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-600" />
                        <h4 className="font-bold text-lg md:text-xl">Assistant Informatique</h4>
                        <p className="text-blue-400 font-bold uppercase text-[8px] md:text-[10px] tracking-widest mt-1 md:mt-2">GYARA NI FAST FOOD (2025)</p>
                        <ul className="text-zinc-400 mt-3 md:mt-4 text-xs md:text-sm space-y-2">
                          <li className="flex items-start space-x-2 md:space-x-3">
                            <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>Mise en place d'un LAN pour 5 postes</span>
                          </li>
                          <li className="flex items-start space-x-2 md:space-x-3">
                            <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>Maintenance materielle et logicielle</span>
                          </li>
                          <li className="flex items-start space-x-2 md:space-x-3">
                            <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>Deploiement PWA React</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Labs Preview */}
                  <section>
                    <h5 className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.15em] mb-6 md:mb-8 flex items-center">
                      <div className="w-6 md:w-8 h-px bg-blue-500 mr-2 md:mr-3" /> Projets Techniques
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {projects.slice(0, 4).map((p, i) => (
                        <div key={i} className="p-3 md:p-5 bg-white/5 rounded-lg md:rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group">
                          <div className="flex items-start space-x-2 md:space-x-3">
                            <div className="p-1.5 md:p-2 bg-blue-500/10 rounded-md md:rounded-lg">{p.icon}</div>
                            <div>
                              <h6 className="font-bold text-xs md:text-sm group-hover:text-blue-400 transition-colors">{p.title}</h6>
                              <p className="text-zinc-500 text-[10px] md:text-xs mt-0.5 md:mt-1">{p.shortDesc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
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
            <button 
              onClick={() => setShowContactModal(false)} 
              className="absolute top-4 md:top-6 right-4 md:right-6 p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all group"
            >
              <X className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform" />
            </button>
            
            <div className="space-y-6 md:space-y-8">
              <div>
                <p className="text-[10px] md:text-xs font-bold text-pink-400 uppercase tracking-widest mb-2">Me contacter</p>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
                  On discute ?
                  <span className="flex space-x-1">
                    <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-pink-300 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                </h2>
              </div>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Je suis ouvert a une opportunite de contrat d'apprentissage pour <span className="text-blue-400 font-bold">douze mois</span> a partir de <span className="text-blue-400 font-bold">septembre 2026</span>. Si vous recherchez un technicien support reseau eveille, motive et qui aime ce qu'il fait, alors je suis l'alternant qu'il vous faut.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <img src="/gmail.png" alt="Gmail" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                  <a href={`mailto:${user.email}`} className="font-bold hover:underline text-sm md:text-base">{user.email}</a>
                </div>
                <button 
                  onClick={copyEmail} 
                  className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {copied ? <Check className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" /> : <Copy className="w-3 h-3 md:w-4 md:h-4" />}
                  <span>{copied ? 'Copie!' : 'Copier'}</span>
                </button>
              </div>

              <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                <h4 className="font-bold text-sm md:text-base mb-4">En bref</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-zinc-500">Localisation</span>
                    <span className="font-bold">Toulouse, France</span>
                  </div>
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-zinc-500">Je recherche</span>
                    <span className="font-bold text-blue-400">Alternance</span>
                  </div>
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-zinc-500">Langues</span>
                    <span className="font-bold">Francais, Anglais</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <a 
                    href={user.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs md:text-sm hover:bg-blue-600 hover:border-blue-600 transition-all"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href={user.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs md:text-sm hover:bg-zinc-700 hover:border-zinc-600 transition-all"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
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
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 md:top-6 right-4 md:right-6 p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all group"
            >
              <X className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform" />
            </button>
            
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center space-x-4 md:space-x-5">
                <div className={`w-12 h-12 md:w-16 md:h-16 ${selectedProject.color}/10 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl border border-white/5`}>
                  {selectedProject.icon}
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-1">Lab IT</p>
                  <h2 className="text-xl md:text-3xl font-black tracking-tight">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <h4 className="font-bold uppercase text-[10px] md:text-xs text-zinc-500 tracking-widest flex items-center">
                  <div className="w-6 md:w-8 h-px bg-zinc-700 mr-2 md:mr-3" /> Description
                </h4>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed border-l-2 border-blue-500 pl-4 md:pl-5">
                  {selectedProject.fullDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3 md:space-y-4">
                  <h4 className="font-bold uppercase text-[10px] md:text-xs text-zinc-500 tracking-widest">Infrastructure</h4>
                  <ul className="space-y-2 md:space-y-3">
                    {selectedProject.infra.map((item, i) => (
                      <li key={i} className="flex items-center space-x-2 md:space-x-3 text-xs md:text-sm text-zinc-400">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <h4 className="font-bold uppercase text-[10px] md:text-xs text-zinc-500 tracking-widest">Processus</h4>
                  <ul className="space-y-2 md:space-y-3">
                    {selectedProject.steps.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2 md:space-x-3 text-xs md:text-sm text-zinc-400">
                        <span className="w-5 h-5 md:w-6 md:h-6 rounded-md md:rounded-lg bg-blue-500/20 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-blue-400 flex-shrink-0">
                          {i + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2 md:pt-4">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-500/10 text-blue-400 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Screenshots */}
              {selectedProject.screenshots && (
                <div className="space-y-3 md:space-y-4 pt-2 md:pt-4">
                  <h4 className="font-bold uppercase text-[10px] md:text-xs text-zinc-500 tracking-widest flex items-center">
                    <div className="w-6 md:w-8 h-px bg-zinc-700 mr-2 md:mr-3" /> Captures
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {selectedProject.screenshots.map((screenshot, i) => (
                      <div key={i} className="rounded-lg md:rounded-xl overflow-hidden border border-white/10 group cursor-pointer" onClick={() => window.open(screenshot, '_blank')}>
                        <img 
                          src={screenshot} 
                          alt={`Capture ${i + 1}`} 
                          className="w-full h-36 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 md:py-12 px-4 md:px-6 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-black text-white text-sm">
                  EL
                </div>
                <span className="font-bold">Emmanuel Lokadi</span>
              </div>
              <p className="text-zinc-500 text-xs md:text-sm">
                Technicien Systemes & Reseaux passionne par les infrastructures IT.
              </p>
            </div>

            {/* Sections */}
            <div>
              <h5 className="font-bold text-xs md:text-sm uppercase tracking-widest text-zinc-400 mb-3 md:mb-4">Sections</h5>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('about')} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">A propos</button></li>
                <li><button onClick={() => scrollToSection('projects')} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">Projets</button></li>
                <li><button onClick={() => scrollToSection('certifications')} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">Certifications</button></li>
                <li><button onClick={() => scrollToSection('skills')} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">Competences</button></li>
              </ul>
            </div>

            {/* Pages */}
            <div>
              <h5 className="font-bold text-xs md:text-sm uppercase tracking-widest text-zinc-400 mb-3 md:mb-4">Pages</h5>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('portfolio')} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">Portfolio</button></li>
                <li><button onClick={() => setActiveTab('cv')} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">CV</button></li>
                <li><button onClick={() => scrollToSection('current-job')} className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">Poste actuel</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-bold text-xs md:text-sm uppercase tracking-widest text-zinc-400 mb-3 md:mb-4">Contact</h5>
              <ul className="space-y-2">
                <li><a href={user.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 text-xs md:text-sm transition-colors">LinkedIn</a></li>
                <li><a href={user.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white text-xs md:text-sm transition-colors">GitHub</a></li>
                <li><a href={`mailto:${user.email}`} className="text-zinc-500 hover:text-emerald-400 text-xs md:text-sm transition-colors">Email</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              2026 Emmanuel Lokadi - Tous droits reserves
            </p>
            <div className="flex items-center space-x-4 md:space-x-6">
              <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
                <FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href={user.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href={`mailto:${user.email}`} className="text-zinc-500 hover:text-emerald-400 transition-colors">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default App;
