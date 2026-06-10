export type Lang = 'en' | 'fr';

export const content = {
  en: {
    profile: {
      name: 'Dara DULON',
      title: 'Full-Stack Developer',
      subtitle: 'Web · Cloud · Open Source',
      bio: "I operate on a simple rule: if I have to do it more than twice, I script it. I'd rather spend a week automating a process than spend an hour doing it manually. I focus on infrastructure and pipelines because writing application code makes my head hurt.",
      location: 'Paris, France',
    },
    experience: [
      {
        company: 'Elvym',
        role: 'Freelance Developer',
        period: '2025 – Present',
        description: 'Private-club recruitment platform for luxury hospitality (exclusive job listings, application tracking, editorial section). E-learning platform for front-end/back-end fundamentals with in-browser coding. SaaS invoicing & quoting platform for SMBs with CI/CD pipelines and automated testing. Booking system for hair salons with multi-tenant config, Terraform/AWS deployment, and no-show management.',
      },
      {
        company: 'Crédit Agricole Assurances',
        role: 'IT Operations Manager',
        period: '2025 – Present',
        description: 'Operational management and incident coordination (ITIL methodology) on Savings, Retirement & Insurance applications (Mainframe/Open). Manages maintenance tickets, unit-linked fund lifecycle, and daily/monthly batch processing. Leads operational committees and anti-recurrence action plans.',
      },
      {
        company: 'HN Services',
        role: 'Research Engineer (AI)',
        period: '2025',
        description: 'Detection of adversarial attacks on AI vision models. Custom AlexNet model trained on MNIST in Python; saliency maps used to identify critical zones and validate robustness against adversarial perturbations.',
      },
    ],
    skills: [
      { category: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
      { category: 'Frameworks', items: ['React', 'SpringBoot', 'Tailwind', 'Node.js'] },
      { category: 'DevOps', items: ['Docker', 'Git', 'Jenkins', 'Terraform'] },
      { category: 'Automation', items: ['REST API', 'WebHooks', 'Selenium', 'CI/CD'] },
      { category: 'Certifications', items: ['TOEIC 975/990', 'Voltaire 596', 'ITIL® 4 Foundation'] },
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
      title: 'Développeur Full-Stack',
      subtitle: 'Web · Cloud · Open Source',
      bio: "J'applique une règle simple : si je dois faire quelque chose plus de deux fois, je l'automatise. Je préfère passer une semaine à automatiser un processus plutôt qu'une heure à le faire manuellement. Je me concentre sur l'infrastructure et les pipelines car écrire du code applicatif me donne mal à la tête.",
      location: 'Paris, France',
    },
    experience: [
      {
        company: 'Elvym',
        role: 'Développeur Freelance',
        period: '2025 – Présent',
        description: "Plateforme de recrutement « club privé » pour l'hôtellerie de luxe (offres exclusives, suivi des candidatures, section éditoriale). Plateforme e-learning front/back-end avec codage en ligne. SaaS de facturation pour PME avec CI/CD et tests automatisés. Système de réservation multi-tenant pour salons de coiffure avec déploiement Terraform/AWS et gestion des no-shows.",
      },
      {
        company: 'Crédit Agricole Assurances',
        role: 'Responsable Pilotage Fonctionnement',
        period: '2025 – Présent',
        description: "Pilotage opérationnel et gestion des incidents (ITIL) sur le périmètre Épargne-Retraite-Prévoyance (Mainframe/Open). Coordination des tickets de maintenance, cycle de vie des unités de compte et sécurisation des batchs quotidiens/mensuels. Animation des comités opérationnels et plans d'actions anti-récurrence.",
      },
      {
        company: 'HN Services',
        role: "Ingénieur d'Études (Recherche IA)",
        period: '2025',
        description: "Détection d'attaques adversariales sur des modèles de vision IA. Modèle AlexNet entraîné sur MNIST en Python ; cartes de saillance pour identifier les zones critiques et valider la robustesse face aux perturbations adversariales.",
      },
    ],
    skills: [
      { category: 'Langages', items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
      { category: 'Frameworks', items: ['React', 'SpringBoot', 'Tailwind', 'Node.js'] },
      { category: 'DevOps', items: ['Docker', 'Git', 'Jenkins', 'Terraform'] },
      { category: 'Automatisation', items: ['REST API', 'WebHooks', 'Selenium', 'CI/CD'] },
      { category: 'Certifications', items: ['TOEIC 975/990', 'Voltaire 596', 'ITIL® 4 Foundation'] },
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
