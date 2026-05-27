export type Lang = 'en' | 'fr';

export const content = {
  en: {
    profile: {
      name: 'Dara DULON',
      title: 'Software Engineer',
      subtitle: 'Web · Cloud · Open Source',
      bio: "I operate on a simple rule: if I have to do it more than twice, I script it. I'd rather spend a week automating a process than spend an hour doing it manually. I focus on infrastructure and pipelines because writing application code makes my head hurt.",
      location: 'Paris, France',
    },
    experience: [
      {
        company: 'CREDIT AGRICOLE ASSURANCES (CAAS)',
        role: 'RESPONSABLE PILOTAGE FONCTIONNEMENT',
        period: '2025 – Present',
        description: 'Technical coordination and incident management (Savings, Retirement, and Insurance). Technical feasibility analysis for application updates. Liaison between business requirements and IT development teams.',
      },
      {
        company: 'HN Services',
        role: "INGENIEUR D'ÉTUDES (PROJET DE RECHERCHE IA)",
        period: '2025 – 2025',
        description: "Development of an attack detection solution using deep learning models. Implementation of computer vision algorithms (Python, TensorFlow).",
      },
      {
        company: 'SNCF Réseau',
        role: 'Apprenticeship',
        period: '2021 – 2023',
        description: "Development of internal applications and process automation. Facilitation of Agile Scrum ceremonies (Daily Stand-ups, Retrospectives).",
      },
    ],
    skills: [
      { category: 'Languages', items: ['Python', 'TypeScript', 'SQL', 'Bash'] },
      { category: 'AI & ML', items: ['TensorFlow', 'Deep Learning', 'Computer Vision', 'NumPy'] },
      { category: 'Web & APIs', items: ['FastAPI', 'React', 'Node.js', 'REST'] },
      { category: 'DevOps & Tools', items: ['Docker', 'Git', 'CI/CD', 'Linux'] },
    ],
    projects: [
      {
        name: 'Unmonitarr',
        tech: 'Python · Webhooks · REST',
        description: "Syncs Jellyfin watched/unwatched status with Sonarr and Radarr via webhooks — stops them from re-monitoring content you've already seen.",
        url: 'github.com/baretsky/Unmonitarr',
      },
      {
        name: 'image_adversarials_saliency (HN Services research project)',
        tech: 'Python · TensorFlow · Jupyter',
        description: 'Research: detecting adversarial attacks on deep learning image classifiers using saliency maps to expose and visualize model vulnerabilities.',
        url: '',
      },
      {
        name: 'ci-cd_project',
        tech: 'Python · Docker · Jenkins · K8s',
        description: 'End-to-end pipeline: Flask app containerized with Docker, built and tested by Jenkins, deployed to a Kubernetes cluster via minikube.',
        url: '',
      },
      {
        name: 'Automated Tweaked IPA Factory',
        tech: 'Python · GitHub Actions · Telegram API',
        description: 'Pipeline that monitors App Store and GitHub for updates, auto-decrypts IPAs via Telegram bot, injects tweaks with GitHub Actions, and publishes to AltStore/ESign-compatible repos.',
        url: '',
      },
      {
        name: 'DevOps-Pipeline',
        tech: 'Java · Spring Boot · Jenkins',
        description: 'Calculator app with a Spring Boot REST API and HTML/JS frontend, wired into a full Jenkins CI/CD pipeline from commit to deploy.',
        url: 'github.com/baretsky/DevOps-Pipeline',
      },
      {
        name: 'vortex_auto_download',
        tech: 'Python · Automation · Selenium',
        description: 'Script that automates mod downloads and installs via Vortex Mod Manager, bypassing the Nexus Mods premium paywall.',
        url: 'github.com/baretsky/vortex_auto_download',
      },
    ],
    contact: {
      email: 'dulon.dara24@gmail.com',
      github: 'github.com/baretsky',
      linkedin: 'linkedin.com/in/dara-dulon',
      website: 'portfolio.baretsky.net',
    },
    contactNote: "Feel free to reach out — I'm always open to\ninteresting conversations and opportunities.",
    nav: {
      tabs: ['Home', 'Experience', 'Skills', 'Projects', 'Contact'] as const,
      hint: '← → nav  t lang  q quit',
      quickNavLabel: 'Quick nav',
      quickNavHint: 'Press → or l to explore Experience, Skills, Projects, Contact',
    },
  },

  fr: {
    profile: {
      name: 'Dara DULON',
      title: 'Ingénieur Informatique',
      subtitle: 'Web · Cloud · Open Source',
      bio: "J'applique une règle simple : si je dois faire quelque chose plus de deux fois, je l'automatise. Je préfère passer une semaine à automatiser un processus plutôt qu'une heure à le faire manuellement. Je me concentre sur l'infrastructure et les pipelines car écrire du code applicatif me donne mal à la tête.",
      location: 'Paris, France',
    },
    experience: [
      {
        company: 'CREDIT AGRICOLE ASSURANCES (CAAS)',
        role: 'RESPONSABLE PILOTAGE FONCTIONNEMENT',
        period: '2025 – Present',
        description: 'Coordination technique et pilotage des incidents (Épargne-Retraite-Prévoyance). Analyse de faisabilité technique pour les évolutions applicatives. Interface entre les besoins métiers et les équipes de réalisation IT.',
      },
      {
        company: 'HN Services',
        role: "INGENIEUR D'ÉTUDES (PROJET DE RECHERCHE IA)",
        period: '2025 – 2025',
        description: "Développement d'une solution de détection d'attaques sur modèles de Deep Learning. Implémentation d'algorithmes de Computer Vision (Python, TensorFlow).",
      },
      {
        company: 'SNCF Réseau',
        role: 'Apprenticeship',
        period: '2021 – 2023',
        description: "Développement d'applications internes et automatisation de processus. Animation de cérémonies Agile Scrum (Daily, Retrospectives).",
      },
    ],
    skills: [
      { category: 'Langages', items: ['Python', 'TypeScript', 'SQL', 'Bash'] },
      { category: 'IA & ML', items: ['TensorFlow', 'Deep Learning', 'Computer Vision', 'NumPy'] },
      { category: 'Web & APIs', items: ['FastAPI', 'React', 'Node.js', 'REST'] },
      { category: 'DevOps & Outils', items: ['Docker', 'Git', 'CI/CD', 'Linux'] },
    ],
    projects: [
      {
        name: 'Unmonitarr',
        tech: 'Python · Webhooks · REST',
        description: "Synchronise le statut vu/non-vu de Jellyfin avec Sonarr et Radarr via webhooks — évite de re-surveiller les contenus déjà regardés.",
        url: 'github.com/baretsky/Unmonitarr',
      },
      {
        name: 'image_adversarials_saliency (projet de recherche HN Services)',
        tech: 'Python · TensorFlow · Jupyter',
        description: "Recherche : détection d'attaques adversariales sur des classificateurs en deep learning via des cartes de saillance pour visualiser les vulnérabilités.",
        url: '',
      },
      {
        name: 'ci-cd_project',
        tech: 'Python · Docker · Jenkins · K8s',
        description: "Pipeline complet : application Flask conteneurisée avec Docker, buildée par Jenkins, déployée sur un cluster Kubernetes via minikube.",
        url: '',
      },
      {
        name: 'Automated Tweaked IPA Factory',
        tech: 'Python · GitHub Actions · Telegram API',
        description: "Pipeline qui surveille l'App Store et GitHub, déchiffre automatiquement les IPAs via bot Telegram, injecte des tweaks avec GitHub Actions et publie vers des repos AltStore/ESign.",
        url: '',
      },
      {
        name: 'DevOps-Pipeline',
        tech: 'Java · Spring Boot · Jenkins',
        description: "Calculatrice avec une API REST Spring Boot et un frontend HTML/JS, intégrée dans un pipeline CI/CD Jenkins complet du commit au déploiement.",
        url: 'github.com/baretsky/DevOps-Pipeline',
      },
      {
        name: 'vortex_auto_download',
        tech: 'Python · Automation · Selenium',
        description: "Script qui automatise le téléchargement et l'installation de mods via Vortex Mod Manager, sans abonnement premium Nexus Mods.",
        url: 'github.com/baretsky/vortex_auto_download',
      },
    ],
    contact: {
      email: 'dulon.dara24@gmail.com',
      github: 'github.com/baretsky',
      linkedin: 'linkedin.com/in/dara-dulon',
      website: 'portfolio.baretsky.net',
    },
    contactNote: "N'hésitez pas à me contacter — je suis toujours\nouvert aux discussions et opportunités intéressantes.",
    nav: {
      tabs: ['Accueil', 'Expérience', 'Compétences', 'Projets', 'Contact'] as const,
      hint: '← → nav  t langue  q quitter',
      quickNavLabel: 'Navigation',
      quickNavHint: 'Appuyez sur → ou l pour explorer Expérience, Compétences, Projets, Contact',
    },
  },
} as const;
