import React, { useState, useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ======================= CONFIG =======================
const COLORS = {
  background: "transparent",
  card: "transparent",
  sectionTitle: "#b4afe9",
  text: "#e0ddf7",
  highlight: "#c19bff",
  secondaryBox: "#3a3360",
  neutralBox: "#322c4a",
};

const responsiveStyle = {
  container: {
    maxWidth: "960px",
    margin: "5vh auto",
    padding: "0 5%",
    backgroundColor: "#1c1b1d",
    borderRadius: "10px",
    color: COLORS.text,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: "5%",
    marginBottom: "6vh",
    lineHeight: 1.6,
    color: COLORS.text,
  },
  sectionTitle: {
    borderBottom: `2px solid ${COLORS.sectionTitle}`,
    paddingBottom: "0.4em",
    marginBottom: "1em",
    color: COLORS.sectionTitle,
    fontWeight: "800",
    fontSize: "2rem",
  },
  subtitle: {
    color: COLORS.sectionTitle,
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: "1.2em 0 0.5em",
  },
  innerCard: {
    backgroundColor: COLORS.neutralBox,
    padding: "1.2em",
    borderRadius: 6,
    boxShadow: "inset 0 0 6px #3a3570",
  },
};

const translations = {
  en: {
    userResearch: "User Research",
    painPoints: "Pain Points",
    empathyMapping: "Empathy Mapping",
    competitorAnalysis: "Competitor Analysis",
    projectOverview: "Project Overview",
    why: "Why",
    who: "Who",
    problems: "Problems",
    solutions: "Solutions",
    lowFidelity: "Low-Fidelity Prototypes",
    highFidelity: "High-Fidelity Prototypes",

    screenPurposeLabel: "Screen Purpose:",
    problemsAddressedLabel: "Problems Addressed:",
    solutionsDeliveredLabel: "Solutions Delivered:",

    homeScreenTitle: "Home Screen",
    homeScreenAlt: "Home / Dashboard Screen Wireframe",
    homeScreenPurpose: "A smart, welcoming hub that gives an overview of your job hunt and quick access to key features.",
    homeProblemsLabel: "Problems Addressed:",
    homeSolutionsLabel: "Solutions Delivered:",
    homeProblems: [
      "Limited personalization & filtering: job recommendations tailored to the user",
      "Complex & multi-step application process: “1-Click Apply” shortcuts simplify applying",
      "Limited visibility & competition: Spotlight and skill match % highlight best fits",
      "Cluttered UX: Focus mode toggle declutters view, clear quick-access tiles improve navigation"
    ],
    homeSolutions: [
      "Advanced Personalized Recommendations: AI-driven smart job cards with skill match percentages",
      "One-Click Application: Apply directly from dashboard without navigating away",
      "Applicant Spotlight: Highlights best job matches for the user",
      "Minimalist UI with Focus Mode: Toggle simplifies job feed to top verified listings only",
      "Quick Access Tiles: Easy shortcuts to resume, saved jobs, career hub, and messaging"
    ],

    searchScreenTitle: "Job Search & Filter Screen",
    searchScreenAlt: "Job Search & Filter Screen Wireframe",
    searchScreenPurpose: "Powerful search page with smart filters, real-time results, and clean layout.",
    searchProblemsLabel: "Problems Addressed:",
    searchSolutionsLabel: "Solutions Delivered:",
    searchProblems: [
      "Unverified & outdated job listings: jobs show “verified” badge and real-time update status",
      "Insufficient personalization & filtering: advanced filter options (remote, salary, skill match, verified only)",
      "Complex application processes: Apply or save directly from search results",
      "Cluttered UI: Clean layout with filter chips and sort dropdown"
    ],
    searchSolutions: [
      "AI-Powered Job Verification: Jobs tagged as verified to boost trust",
      "Smart Filters & Sorting: Dynamic filters to personalize search results",
      "One-Click Application & Save: Simplifies and accelerates user interaction",
      "Minimalist UI: Focused design with intuitive filter controls and job cards"
    ],

    careerHubScreenTitle: "Career Hub Screen",
    careerHubScreenAlt: "Career Hub / Learning Screen Wireframe",
    careerHubScreenPurpose: "Dedicated upskilling and career growth space with AI-powered advice.",
    careerHubProblemsLabel: "Problems Addressed:",
    careerHubSolutionsLabel: "Solutions Delivered:",
    careerHubProblems: [
      "Lack of integrated skill development tools: micro-courses and learning paths embedded",
      "User frustration with skill gaps: personalized course suggestions",
      "Anxiety about career readiness: resume building, interview prep, career coaching in-app"
    ],
    careerHubSolutions: [
      "Integrated Learning Hub: Courses, progress tracking, and badges within the platform",
      "AI Career Coaching: Personalized guidance through chat bot",
      "Resume and Interview Tools: Supports job readiness all in one place"
    ],

    messagingScreenTitle: "Messaging & Networking",
    messagingScreenAlt: "Messaging & Networking Screen Wireframe",
    messagingScreenPurpose: "Built-in messaging tool for recruiter and professional connections.",
    messagingProblemsLabel: "Problems Addressed:",
    messagingSolutionsLabel: "Solutions Delivered:",
    messagingProblems: [
      "Weak networking & communication tools: in-app messaging with recruiters free of paywalls",
      "Limited connection visibility: smart suggestions based on user activity",
      "Difficulty building rapport with recruiters: message templates and status indicators"
    ],
    messagingSolutions: [
      "In-App Messaging: Seamless communication channel without premium fees",
      "Recruiter & Professional Suggestions: AI-driven connection recommendations",
      "Enhanced Engagement Tools: Status indicators, message templates for easy outreach"
    ]
  },

  es: {
    userResearch: "Investigación de usuarios",
    painPoints: "Puntos críticos",
    empathyMapping: "Mapa de empatía",
    competitorAnalysis: "Análisis de la competencia",
    projectOverview: "Resumen del proyecto",
    why: "Por qué",
    who: "Quién",
    problems: "Problemas",
    solutions: "Soluciones",
    lowFidelity: "Prototipos de baja fidelidad",
    highFidelity: "Prototipos de alta fidelidad",

    screenPurposeLabel: "Propósito de la pantalla:",
    problemsAddressedLabel: "Problemas abordados:",
    solutionsDeliveredLabel: "Soluciones entregadas:",

    homeScreenTitle: "Pantalla de inicio",
    homeScreenAlt: "Wireframe de la pantalla de inicio / panel de control",
    homeScreenPurpose: "Un centro inteligente y acogedor que proporciona una visión general de tu búsqueda de empleo y acceso rápido a funciones clave.",
    homeProblemsLabel: "Problemas abordados:",
    homeSolutionsLabel: "Soluciones entregadas:",
    homeProblems: [
      "Personalización y filtrado limitados: recomendaciones de trabajo adaptadas al usuario",
      "Proceso de aplicación complejo y con muchos pasos: accesos directos de 'Aplicar con 1 clic'",
      "Visibilidad y competencia limitadas: Spotlight y porcentaje de coincidencia de habilidades destacan mejores opciones",
      "UX desordenada: el modo de enfoque reduce el ruido visual, los accesos directos mejoran la navegación"
    ],
    homeSolutions: [
      "Recomendaciones personalizadas avanzadas: tarjetas de empleo inteligentes con porcentaje de coincidencia de habilidades",
      "Aplicación con un solo clic: aplicar directamente desde el panel sin salir",
      "Spotlight para solicitantes: destaca los mejores empleos para el usuario",
      "Interfaz minimalista con modo de enfoque: muestra solo empleos verificados destacados",
      "Accesos rápidos: atajos a CV, empleos guardados, centro de carrera y mensajería"
    ],

    searchScreenTitle: "Pantalla de búsqueda y filtro de empleos",
    searchScreenAlt: "Wireframe de búsqueda y filtro de empleos",
    searchScreenPurpose: "Página de búsqueda potente con filtros inteligentes, resultados en tiempo real y diseño limpio.",
    searchProblemsLabel: "Problemas abordados:",
    searchSolutionsLabel: "Soluciones entregadas:",
    searchProblems: [
      "Anuncios no verificados o desactualizados: se muestran con insignia de verificado y actualizaciones en tiempo real",
      "Personalización y filtrado insuficientes: filtros avanzados por modalidad, salario, habilidades, verificados",
      "Procesos de aplicación complejos: posibilidad de aplicar o guardar directamente desde los resultados",
      "UI desordenada: diseño limpio con chips de filtros y menú de ordenamiento"
    ],
    searchSolutions: [
      "Verificación de empleos con IA: etiquetas de verificado para mayor confianza",
      "Filtros inteligentes y ordenamiento: opciones dinámicas para personalizar resultados",
      "Aplicación y guardado con un clic: interacción más rápida y sencilla",
      "Interfaz minimalista: diseño enfocado con controles de filtro intuitivos y tarjetas limpias"
    ],

    careerHubScreenTitle: "Pantalla del centro de carrera",
    careerHubScreenAlt: "Wireframe del centro de aprendizaje / carrera",
    careerHubScreenPurpose: "Espacio dedicado al crecimiento profesional con asesoría impulsada por IA.",
    careerHubProblemsLabel: "Problemas abordados:",
    careerHubSolutionsLabel: "Soluciones entregadas:",
    careerHubProblems: [
      "Falta de herramientas integradas para desarrollo de habilidades: microcursos y rutas de aprendizaje",
      "Frustración del usuario con brechas de habilidades: sugerencias personalizadas",
      "Ansiedad por preparación profesional: CV, simulacros de entrevistas, coaching dentro de la app"
    ],
    careerHubSolutions: [
      "Centro de aprendizaje integrado: cursos, seguimiento de progreso y medallas en la plataforma",
      "Coaching profesional con IA: guía personalizada a través de chatbot",
      "Herramientas para CV y entrevistas: preparación completa en un solo lugar"
    ],

    messagingScreenTitle: "Mensajería y networking",
    messagingScreenAlt: "Wireframe de mensajería y conexiones profesionales",
    messagingScreenPurpose: "Herramienta integrada para contactar reclutadores y hacer networking profesional.",
    messagingProblemsLabel: "Problemas abordados:",
    messagingSolutionsLabel: "Soluciones entregadas:",
    messagingProblems: [
      "Herramientas de comunicación débiles: mensajería sin muros de pago",
      "Visibilidad limitada de conexiones: sugerencias inteligentes basadas en actividad",
      "Difícil generar conexión con reclutadores: plantillas de mensaje e indicadores de estado"
    ],
    messagingSolutions: [
      "Mensajería integrada: canal directo sin costos premium",
      "Sugerencias de contactos: recomendaciones impulsadas por IA",
      "Herramientas de interacción: plantillas, indicadores de estado para facilitar el contacto"
    ]
  }
};



// =================== CASE STUDY DATA ===================
const caseStudyData = {
  en: {
    id: 1,
    title: "UX Case Study: Jobify",
    description:
      "A modern job hunting app that streamlines your search with verified listings, personalised job matches, and career growth tools to help you find your next opportunity faster and smarter.",
    projectOverview: {
      why:
        "To simplify and humanise the job search process by providing personalised recommendations, easy applications, and career development features.",
      who:
        "Job seekers ranging from recent graduates to experienced professionals seeking meaningful employment opportunities.",
      problems: [
        {
          title: "Unverified & Outdated Job Listings",
          description:
            "Many platforms show job listings that are outdated, unverified, or duplicated, wasting users’ time and lowering trust."
        },
        {
          title: "High Competition & Limited Applicant Visibility",
          description:
            "Due to the huge number of users and jobs, applicants struggle to stand out without paying fees or premium memberships."
        },
        {
          title: "Complex & Multi-step Application Processes",
          description:
            "Users often face repetitive forms and are redirected off-platform, causing frustration and application drop-offs."
        },
        {
          title: "Insufficient Personalization & Filtering",
          description:
            "Limited advanced filters and poor personalised recommendations result in irrelevant job suggestions."
        },
        {
          title: "Lack of Integrated Skill Development & Career Growth Tools",
          description:
            "Few platforms offer embedded learning or career advice, limiting users' ability to improve while searching."
        },
        {
          title: "Weak Networking & Communication Tools",
          description:
            "Networking features are limited or behind paywalls, restricting users from connecting with recruiters and professionals."
        },
        {
          title: "Cluttered & Unpolished User Experience",
          description:
            "Cluttered interfaces and poor navigation make job searching overwhelming and inefficient."
        }
      ],
      solutions: [
        {
          title: "AI-Powered Real-Time Job Verification",
          description:
            "Automatically verify and update job listings to remove outdated or duplicate posts, maintaining platform trust."
        },
        {
          title: "Applicant Spotlight & Skill Matching Algorithm",
          description:
            "Use AI to highlight candidates based on skills and relevance, boosting visibility without premium fees."
        },
        {
          title: "One-Click Universal Application with Reusable Profiles",
          description:
            "Allow users to apply quickly using stored profiles and resumes without leaving the app."
        },
        {
          title: "Advanced personalised Job Recommendations & Smart Filters",
          description:
            "Leverage machine learning to tailor job matches and provide dynamic filters based on user preferences."
        },
        {
          title: "Integrated Learning Hub & Career Coaching",
          description:
            "Offer personalised micro-courses, skill badges, and AI-driven career advice within the app."
        },
        {
          title: "In-App Networking & Messaging with Recruiters",
          description:
            "Enable safe, premium-free messaging and networking features connecting users with recruiters and professionals."
        },
        {
          title: "Clean, Minimalist UI with Focus Mode",
          description:
            "Design a distraction-free interface with a Focus Mode that prioritizes relevant listings and simple navigation."
        }
      ],
    },
    userResearch: [
      {
        type: "Online Survey",
        description: "Survey of 20 job seekers about their challenges with current job hunting apps.",
        question: "What are your biggest frustrations when using job hunting apps?",
        options: [
          "Outdated or irrelevant listings",
          "Time-consuming application process",
          "No personalised job matches",
          "No skill-building or career advice",
        ],
        insights: [
          "75% of respondents reported frustration with irrelevant or outdated listings.",
          "65% found application processes overly complicated and repetitive.",
          "70% desired more personalised job suggestions.",
          "55% wanted integrated skill-building and career support.",
        ],
      },
      {
        summary:
          "The research clearly shows demand for verified listings, simplicity, personalization, and career growth tools in job hunting apps.",
      },
    ],
    painPoints: [
      {
        title: "Information Overload",
        description:
          "Job seekers struggle to navigate vast numbers of listings, many of which are irrelevant or outdated.",
      },
      {
        title: "Inefficient Application Process",
        description:
          "Filling out multiple applications with redundant information leads to frustration and drop-off.",
      },
      {
        title: "Lack of Growth Opportunities",
        description:
          "Few apps offer integrated learning or advice to help users improve their chances or skills.",
      },
      {
        title: "Weak Networking",
        description:
          "Limited ability to connect with recruiters or other professionals hinders building relationships.",
      },
      {
        title: "Unverified Job Listings",
        description:
          "Users waste time applying to jobs that are outdated or unverified, reducing trust in the platform.",
      },
    ],
    empathyMapping: {
      say: [
        "I want to find jobs that really match my skills and preferences.",
        "Applying for jobs takes too long and is frustrating.",
        "It’s hard to know which listings are trustworthy.",
        "I wish I could improve my skills while searching.",
      ],
      think: [
        "Am I missing better jobs on other sites?",
        "How do I stand out from other applicants?",
        "Can I trust the job listings I see?",
        "What skills should I learn to get hired faster?",
      ],
      feel: [
        "Overwhelmed by the number of job postings.",
        "Frustrated when applications get no response.",
        "Hopeful when I find a well-matched job.",
        "Anxious about my career prospects.",
      ],
      do: [
        "Spend hours filtering listings on multiple sites.",
        "Use the same resume for many applications.",
        "Search for online courses related to my field.",
        "Reach out to contacts for job referrals.",
      ],
    },
    competitorAnalysis: {
      appsReviewed: ["LinkedIn", "Indeed", "Glassdoor", "CareerBuilder"],
      prosCons: [
        {
          app: "LinkedIn",
          pros: [
            "Largest professional network where recruiters actively search.",
            "Hiring managers pay for job postings, ensuring legitimacy.",
            "InMail feature allows connecting directly with recruiters and professionals.",
            "Insight into employers through their LinkedIn profiles.",
            "Groups provide networking and job opportunities.",
          ],
          cons: [
            "Some job listings are unverified, outdated, or not real, causing users to waste time applying.",
            "Very high competition with 690+ million professionals.",
            "Premium membership fee required to be a 'featured applicant' and stand out.",
          ],
        },
        {
          app: "Indeed",
          pros: [
            "Largest number of job postings covering many industries and job types.",
            "Aggregates jobs from hundreds of other websites, saving time.",
            "Simple and familiar interface easy for all users.",
          ],
          cons: [
            "Some job listings may be outdated or duplicated, leading to confusion.",
            "Users are often redirected to other sites to complete applications.",
            "User interface and navigation lack polish compared to competitors.",
          ],
        },
        {
          app: "Glassdoor",
          pros: [
            "Company ratings and reviews provide transparency before applying.",
            "Salary insights, interview tips, and career advice available.",
            "Job tags like 'Hot', 'New', and 'Top Company' help identify promising jobs.",
            "Recommended searches guide users to popular jobs and companies.",
          ],
          cons: [
            "Less advanced job search filters compared to others.",
            "Some company reviews may be fake or biased.",
            "Networking tools are limited compared to LinkedIn.",
          ],
        },
        {
          app: "CareerBuilder",
          pros: [
            "Advanced search options to find specific job types and trending roles.",
            "Helpful career advice and learning resources included.",
            "Many jobs support 'Easy Apply' for quick applications.",
          ],
          cons: [
            "Often targets jobs requiring college degrees, limiting options.",
            "Some listings may be outdated or not relevant to all users.",
            "User experience can feel cluttered at times.",
          ],
        },
        
      ]
    },
  },
  es: {
    id: 1,
    title: "Estudio de Caso UX: Jobify",
    description:
      "Una aplicación moderna para buscar empleo que optimiza tu búsqueda con ofertas verificadas, coincidencias personalizadas y herramientas de crecimiento profesional para ayudarte a encontrar tu próxima oportunidad más rápido e inteligentemente.",
    projectOverview: {
      why:
        "Simplificar y humanizar el proceso de búsqueda de empleo ofreciendo recomendaciones personalizadas, solicitudes fáciles y funciones de desarrollo profesional.",
      who:
        "Personas que buscan empleo, desde recién graduados hasta profesionales con experiencia en busca de oportunidades laborales significativas.",
      problems: [
        {
          title: "Ofertas de empleo no verificadas y desactualizadas",
          description:
            "Muchas plataformas muestran ofertas de empleo desactualizadas, no verificadas o duplicadas, lo que hace perder tiempo a los usuarios y reduce la confianza."
        },
        {
          title: "Alta competencia y visibilidad limitada para los postulantes",
          description:
            "Debido al gran número de usuarios y ofertas, los postulantes luchan por destacarse sin pagar tarifas o membresías premium."
        },
        {
          title: "Procesos de solicitud complejos y en varios pasos",
          description:
            "Los usuarios a menudo enfrentan formularios repetitivos y son redirigidos fuera de la plataforma, causando frustración y abandono de solicitudes."
        },
        {
          title: "Personalización y filtrado insuficientes",
          description:
            "Filtros avanzados limitados y malas recomendaciones personalizadas resultan en sugerencias de empleo irrelevantes."
        },
        {
          title: "Falta de herramientas integradas de desarrollo de habilidades y crecimiento profesional",
          description:
            "Pocas plataformas ofrecen aprendizaje integrado o asesoría profesional, limitando la capacidad de los usuarios para mejorar mientras buscan empleo."
        },
        {
          title: "Herramientas débiles de networking y comunicación",
          description:
            "Las funciones de networking son limitadas o están detrás de muros de pago, restringiendo a los usuarios de conectar con reclutadores y profesionales."
        },
        {
          title: "Experiencia de usuario desordenada y poco pulida",
          description:
            "Interfaces desordenadas y mala navegación hacen que la búsqueda de empleo sea abrumadora e ineficiente."
        }
      ],
      solutions: [
        {
          title: "Verificación de empleo en tiempo real impulsada por IA",
          description:
            "Verificar y actualizar automáticamente las ofertas de empleo para eliminar publicaciones desactualizadas o duplicadas, manteniendo la confianza en la plataforma."
        },
        {
          title: "Algoritmo de selección de candidatos y coincidencia de habilidades",
          description:
            "Usar IA para resaltar candidatos basados en habilidades y relevancia, aumentando la visibilidad sin tarifas premium."
        },
        {
          title: "Solicitud universal con un clic y perfiles reutilizables",
          description:
            "Permitir a los usuarios postular rápidamente usando perfiles y currículums guardados sin salir de la app."
        },
        {
          title: "Recomendaciones avanzadas personalizadas y filtros inteligentes",
          description:
            "Aprovechar el aprendizaje automático para adaptar las coincidencias de empleo y proporcionar filtros dinámicos basados en preferencias del usuario."
        },
        {
          title: "Centro de aprendizaje integrado y coaching profesional",
          description:
            "Ofrecer microcursos personalizados, insignias de habilidades y asesoría profesional impulsada por IA dentro de la app."
        },
        {
          title: "Networking y mensajería dentro de la app con reclutadores",
          description:
            "Habilitar mensajería segura y sin costo premium que conecta a los usuarios con reclutadores y profesionales."
        },
        {
          title: "Interfaz limpia y minimalista con modo enfoque",
          description:
            "Diseñar una interfaz libre de distracciones con un modo enfoque que priorice ofertas relevantes y navegación simple."
        }
      ],
    },
    userResearch: [
      {
        type: "Encuesta en línea",
        description: "Encuesta a 20 buscadores de empleo sobre sus desafíos con las apps actuales para buscar trabajo.",
        question: "¿Cuáles son tus mayores frustraciones al usar apps de búsqueda de empleo?",
        options: [
          "Ofertas irrelevantes o desactualizadas",
          "Procesos de solicitud largos y complejos",
          "Pocas recomendaciones personalizadas",
          "Sin desarrollo de habilidades o asesoría",
        ],
        insights: [
          "El 75% de los encuestados reportó frustración con ofertas irrelevantes o desactualizadas.",
          "El 65% encontró los procesos de solicitud demasiado complicados y repetitivos.",
          "El 70% deseaba más sugerencias personalizadas de empleo.",
          "El 55% quería integración de formación y apoyo profesional.",
        ],
      },
      {
        summary:
          "La investigación muestra claramente la demanda de ofertas verificadas, simplicidad, personalización y herramientas de crecimiento profesional en apps de búsqueda de empleo.",
      },
    ],
    painPoints: [
      {
        title: "Sobrecarga de información",
        description:
          "Los buscadores de empleo luchan para navegar en una gran cantidad de ofertas, muchas irrelevantes o desactualizadas.",
      },
      {
        title: "Proceso de solicitud ineficiente",
        description:
          "Completar múltiples solicitudes con información redundante provoca frustración y abandono.",
      },
      {
        title: "Falta de oportunidades de crecimiento",
        description:
          "Pocas apps ofrecen aprendizaje integrado o asesoría para ayudar a mejorar las habilidades o las oportunidades.",
      },
      {
        title: "Networking débil",
        description:
          "La capacidad limitada para conectar con reclutadores o profesionales dificulta construir relaciones.",
      },
      {
        title: "Ofertas de empleo no verificadas",
        description:
          "Los usuarios pierden tiempo aplicando a ofertas desactualizadas o no verificadas, reduciendo la confianza en la plataforma.",
      },
    ],
    empathyMapping: {
      say: [
        "Quiero encontrar empleos que realmente coincidan con mis habilidades y preferencias.",
        "Postularme a empleos toma mucho tiempo y es frustrante.",
        "Es difícil saber cuáles ofertas son confiables.",
        "Desearía poder mejorar mis habilidades mientras busco.",
      ],
      think: [
        "¿Me estaré perdiendo mejores empleos en otros sitios?",
        "¿Cómo puedo destacar entre otros postulantes?",
        "¿Puedo confiar en las ofertas que veo?",
        "¿Qué habilidades debo aprender para ser contratado más rápido?",
      ],
      feel: [
        "Abrumado por la cantidad de ofertas de empleo.",
        "Frustrado cuando no recibo respuesta a mis postulaciones.",
        "Esperanzado cuando encuentro un empleo que me conviene.",
        "Ansioso por mi futuro profesional.",
      ],
      do: [
        "Paso horas filtrando ofertas en varios sitios.",
        "Uso el mismo currículum para muchas postulaciones.",
        "Busco cursos online relacionados con mi campo.",
        "Contactos para referidos laborales.",
      ],
    },
    competitorAnalysis: {
      appsReviewed: ["LinkedIn", "Indeed", "Glassdoor", "CareerBuilder"],
      prosCons: [
        {
          app: "LinkedIn",
          pros: [
            "La red profesional más grande donde los reclutadores buscan activamente.",
            "Los gerentes de contratación pagan por las publicaciones, asegurando legitimidad.",
            "La función InMail permite conectar directamente con reclutadores y profesionales.",
            "Información sobre empleadores a través de sus perfiles en LinkedIn.",
            "Los grupos ofrecen networking y oportunidades laborales.",
          ],
          cons: [
            "Algunas ofertas no están verificadas, están desactualizadas o no son reales, lo que hace perder tiempo a los usuarios.",
            "Competencia muy alta con más de 690 millones de profesionales.",
            "Se requiere membresía premium para ser un 'postulante destacado' y sobresalir.",
          ],
        },
        {
          app: "Indeed",
          pros: [
            "Mayor número de ofertas que cubren muchas industrias y tipos de empleo.",
            "Agrega trabajos de cientos de otros sitios, ahorrando tiempo.",
            "Interfaz simple y familiar para todos los usuarios.",
          ],
          cons: [
            "Algunas ofertas pueden estar desactualizadas o duplicadas, causando confusión.",
            "Los usuarios suelen ser redirigidos a otros sitios para completar solicitudes.",
            "La interfaz y navegación carecen de pulido comparado con competidores.",
          ],
        },
        {
          app: "Glassdoor",
          pros: [
            "Calificaciones y reseñas de empresas para transparencia antes de postular.",
            "Información sobre salarios, consejos para entrevistas y asesoría profesional.",
            "Etiquetas de trabajo como 'Hot', 'New' y 'Top Company' ayudan a identificar ofertas prometedoras.",
            "Búsquedas recomendadas guían a usuarios a empleos y empresas populares.",
          ],
          cons: [
            "Filtros de búsqueda menos avanzados que otros.",
            "Algunas reseñas pueden ser falsas o sesgadas.",
            "Las herramientas de networking son limitadas en comparación con LinkedIn.",
          ],
        },
        {
          app: "CareerBuilder",
          pros: [
            "Opciones avanzadas de búsqueda para encontrar tipos específicos y roles en tendencia.",
            "Consejos profesionales y recursos de aprendizaje útiles.",
            "Muchos empleos soportan 'Easy Apply' para aplicaciones rápidas.",
          ],
          cons: [
            "A menudo se enfoca en empleos que requieren títulos universitarios, limitando opciones.",
            "Algunas ofertas pueden estar desactualizadas o no ser relevantes para todos los usuarios.",
            "La experiencia de usuario puede sentirse desordenada en ocasiones.",
          ],
        },
      ],
    },
  },
};

function UserResearch({ language }) {
  const data = caseStudyData[language];
  const methods = data.userResearch.filter((item) => item.type);
  const summaryObj = data.userResearch.find((item) => item.summary);
  const summary = summaryObj?.summary ?? "";
  if (methods.length === 0) return null;
  const survey = methods[0];

  const extractPercentage = (text) => {
    const match = text.match(/(\d+)%/);
    return match ? Number(match[1]) : 0;
  };

  const labels = survey.options;
  const dataPoints = survey.insights.map(extractPercentage);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Percentage (%)",
        data: dataPoints,
        backgroundColor: COLORS.highlight,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { bottom: 40 } },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: survey.question,
        color: COLORS.sectionTitle,
        font: { size: 18, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return survey.insights[context.dataIndex];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: COLORS.text },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      x: {
        ticks: {
          color: COLORS.text,
          autoSkip: false,
          font: (ctx) => ({
            size: ctx.chart.width < 500 ? 10 : 12,
          }),
          maxRotation: (ctx) => (ctx.chart.width < 600 ? 90 : 0),
          minRotation: (ctx) => (ctx.chart.width < 600 ? 90 : 0),
          callback: function (val) {
            const label = this.getLabelForValue(val);
      
            // If the chart is wide, allow word wrapping (not mid-word)
            if (this.chart.width >= 600) {
              return label.split(' '); // Break into array at spaces (new line per word)
            }
      
            return label;
          },
          padding: 8,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      
    },
  };

  return (
    <section style={responsiveStyle.card}>
      <h2 style={responsiveStyle.sectionTitle}>{translations[language].userResearch}</h2>
      {summary && (
        <p style={{ fontStyle: "italic", color: "#aaa", marginBottom: 20 }}>{summary}</p>
      )}
      <div style={{ height: "60vh", width: "100%" }}>
        <Bar data={chartData} options={options} />
      </div>
      <div style={{ marginTop: 30 }}>
        <h3 style={{ color: COLORS.sectionTitle }}>{survey.type}</h3>
        <p>{survey.description}</p>
      </div>
    </section>
  );
}

function PainPoints({ language }) {
  const data = caseStudyData[language];

  return (
    <section style={responsiveStyle.card}>
      <h2 style={responsiveStyle.sectionTitle}>{translations[language].painPoints}</h2>
      {data.painPoints.map((point, i) => (
        <div key={i} style={{ marginBottom: "1.5em" }}>
          <h3 style={{ color: COLORS.sectionTitle }}>
            {`${(i + 1).toString().padStart(2, "0")}. ${point.title}`}
          </h3>
          <p>{point.description}</p>
        </div>
      ))}
    </section>
  );
}


function EmpathyMapping({ language }) {
  const data = caseStudyData[language];
  const empathy = data.empathyMapping;

  return (
    <section style={responsiveStyle.card}>
      <h2 style={responsiveStyle.sectionTitle}>{translations[language].empathyMapping}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5em",
        }}
      >
        {Object.entries(empathy).map(([key, arr]) => (
          <div key={key} style={responsiveStyle.innerCard}>
            <h3
              style={{
                textTransform: "capitalize",
                color: COLORS.sectionTitle,
                marginBottom: "0.6em",
              }}
            >
              {key}
            </h3>
            <ul style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
              {arr.map((item, i) => (
                <li key={i} style={{ marginBottom: "0.5em" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}


function CompetitorAnalysis({ language }) {
  const data = caseStudyData[language];
  const analysis = data.competitorAnalysis;

  return (
    <section style={responsiveStyle.card}>
      <h2 style={responsiveStyle.sectionTitle}>{translations[language].competitorAnalysis}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5em",
        }}
      >
        {analysis.prosCons.map((app, i) => (
          <div key={i} style={responsiveStyle.innerCard}>
            <h3 style={{ color: COLORS.sectionTitle, marginBottom: 10 }}>{app.app}</h3>

            <div style={{ marginBottom: "1em" }}>
              <strong style={{ color: COLORS.highlight, fontSize: "1.1rem" }}>Pros:</strong>
              <ul style={{ paddingLeft: 0, listStyle: "none", marginTop: 6 }}>
                {app.pros.map((pro, idx) => (
                  <li
                    key={idx}
                    style={{
                      marginBottom: "0.4em",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5em",
                      fontWeight: "500",
                    }}
                  >
                    <span
                      style={{
                        color: COLORS.highlight,
                        fontWeight: "bold",
                        minWidth: 20,
                        lineHeight: 1,
                      }}
                    >
                      •
                    </span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <strong style={{ color: COLORS.highlight, fontSize: "1.1rem" }}>Cons:</strong>
              <ul style={{ paddingLeft: 0, listStyle: "none", marginTop: 6 }}>
                {app.cons.map((con, idx) => (
                  <li
                    key={idx}
                    style={{
                      marginBottom: "0.4em",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5em",
                      fontWeight: "500",
                    }}
                  >
                    <span
                      style={{
                        color: COLORS.highlight,
                        fontWeight: "bold",
                        minWidth: 20,
                        lineHeight: 1,
                      }}
                    >
                      •
                    </span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LowFidelityPrototypes({ language }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const imageStyleBase = {
    width: "200px",
    height: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    opacity: 0,
    transform: "translateY(20px)",
    transitionProperty: "opacity, transform",
    transitionDuration: "1.2s", // slower animation duration
    transitionTimingFunction: "ease-out",
  };

  const getImageStyle = (delay) =>
    visible
      ? {
          ...imageStyleBase,
          opacity: 1,
          transform: "translateY(0)",
          transitionDelay: `${delay}s`,
        }
      : imageStyleBase;

  return (
    <section ref={sectionRef} style={responsiveStyle.card}>
      <h2 style={responsiveStyle.sectionTitle}>
        {translations[language].lowFidelity}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5em",
          marginTop: "1.5em",
        }}
      >
        {/* Top Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5em",
            flexWrap: "wrap",
          }}
        >
          <img
            src="../screen/home-lofi.png"
            alt="Home Screen"
            style={getImageStyle(0)}
          />
          <img
            src="../screen/search-lofi.png"
            alt="Search Screen"
            style={getImageStyle(0.6)} // longer delay between images
          />
        </div>

        {/* Bottom Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5em",
            flexWrap: "wrap",
          }}
        >
          <img
            src="../screen/careerhub-lofi.png"
            alt="Career Hub Screen"
            style={getImageStyle(1.2)}
          />
          <img
            src="../screen/chat-lofi.png"
            alt="Chat Screen"
            style={getImageStyle(1.8)}
          />
        </div>
      </div>
    </section>
  );
}
function HighFidelityPrototypes({ language }) {
  const baseImageStyle = {
    width: "250px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  };

  const sectionStyle = {
    display: "flex",
    gap: "2em",
    marginBottom: "3em",
    flexWrap: "wrap",
    alignItems: "flex-start",
  };

  const textStyle = {
    flex: "1",
    maxWidth: "500px",
    lineHeight: "1.6",
  };

  const paragraphStyle = {
    margin: "1.5em 0",
  };

  return (
    <section style={{ padding: "2em" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1em" }}>
        {translations[language].highFidelity}
      </h2>

      {/* Home Screen */}
      <div style={sectionStyle}>
        <img
          src="/home.png"
          alt={translations[language].homeScreenAlt}
          style={baseImageStyle}
        />
        <div style={textStyle}>
          <h3>{translations[language].homeScreenTitle}</h3>
          <p style={paragraphStyle}>
            <strong>{translations[language].screenPurposeLabel}</strong><br />
            {translations[language].homeScreenPurpose}
          </p>
          <p style={paragraphStyle}>
            <strong>{translations[language].problemsAddressedLabel}</strong>
          </p>
          <ul>
            {translations[language].homeProblems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p style={paragraphStyle}>
            <strong>{translations[language].solutionsDeliveredLabel}</strong>
          </p>
          <ul>
            {translations[language].homeSolutions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Search Screen */}
      <div style={sectionStyle}>
        <img
          src="/search.png"
          alt={translations[language].searchScreenAlt}
          style={baseImageStyle}
        />
        <div style={textStyle}>
          <h3>{translations[language].searchScreenTitle}</h3>
          <p style={paragraphStyle}>
            <strong>{translations[language].screenPurposeLabel}</strong><br />
            {translations[language].searchScreenPurpose}
          </p>
          <p style={paragraphStyle}>
            <strong>{translations[language].problemsAddressedLabel}</strong>
          </p>
          <ul>
            {translations[language].searchProblems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p style={paragraphStyle}>
            <strong>{translations[language].solutionsDeliveredLabel}</strong>
          </p>
          <ul>
            {translations[language].searchSolutions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Career Hub */}
      <div style={sectionStyle}>
        <img
          src="/careerhub.png"
          alt={translations[language].careerHubScreenAlt}
          style={baseImageStyle}
        />
        <div style={textStyle}>
          <h3>{translations[language].careerHubScreenTitle}</h3>
          <p style={paragraphStyle}>
            <strong>{translations[language].screenPurposeLabel}</strong><br />
            {translations[language].careerHubScreenPurpose}
          </p>
          <p style={paragraphStyle}>
            <strong>{translations[language].problemsAddressedLabel}</strong>
          </p>
          <ul>
            {translations[language].careerHubProblems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p style={paragraphStyle}>
            <strong>{translations[language].solutionsDeliveredLabel}</strong>
          </p>
          <ul>
            {translations[language].careerHubSolutions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Messaging Screen */}
      <div style={sectionStyle}>
        <img
          src="/chat.png"
          alt={translations[language].messagingScreenAlt}
          style={baseImageStyle}
        />
        <div style={textStyle}>
          <h3>{translations[language].messagingScreenTitle}</h3>
          <p style={paragraphStyle}>
            <strong>{translations[language].screenPurposeLabel}</strong><br />
            {translations[language].messagingScreenPurpose}
          </p>
          <p style={paragraphStyle}>
            <strong>{translations[language].problemsAddressedLabel}</strong>
          </p>
          <ul>
            {translations[language].messagingProblems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p style={paragraphStyle}>
            <strong>{translations[language].solutionsDeliveredLabel}</strong>
          </p>
          <ul>
            {translations[language].messagingSolutions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}



// ===================== MAIN APP ========================


export default function App() {
  const [language, setLanguage] = useState("en");
  const [fade, setFade] = useState(true);

  const toggleLanguage = () => {
    setFade(false); // Start fade-out
    setTimeout(() => {
      setLanguage((prev) => (prev === "en" ? "es" : "en"));
      setFade(true); // Start fade-in
    }, 300); // Duration must match the transition in styles
  };

  const data = caseStudyData[language];

  return (
    <div
      style={{
        ...responsiveStyle.container,
        opacity: fade ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <header style={{ marginBottom: "2.5em", marginTop: "5em" }}>
      <button
  onClick={toggleLanguage}
  style={{
    marginBottom: "2em",
    padding: "0.5em 1em",
    backgroundColor: "#b4afe9",
    color: "white",
    border: "4px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "0.5em"
  }}
  aria-label="Toggle Language"
>
  <span style={{ fontSize: "1.2em" }}>
    {language === "en" ? "🇪🇸" : "🇬🇧"}
  </span>
  {language === "en" ? "Cambiar a Español" : "Change to English"}
</button>


        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "900",
            color: COLORS.sectionTitle,
            marginBottom: "0.5em",
          }}
        >
          {data.title}
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "white",
            maxWidth: "700px",
            lineHeight: 1.8,
            letterSpacing: "0.03em",
          }}
        >
          {data.description}
        </p>
      </header>

      <section style={responsiveStyle.card}>
        <h2 style={responsiveStyle.sectionTitle}>
          {translations[language].projectOverview}
        </h2>

        <p>
          <h3 style={{ color: COLORS.sectionTitle }}>
            {translations[language].why}:
          </h3>{" "}
          {data.projectOverview.why}
        </p>

        <p>
          <h3 style={{ color: COLORS.sectionTitle }}>
            {translations[language].who}:
          </h3>{" "}
          {data.projectOverview.who}
        </p>

        <h3
          style={{
            color: COLORS.sectionTitle,
            marginTop: 20,
            fontSize: "1.5em",
          }}
        >
          {translations[language].problems}
        </h3>
        <div style={{ marginTop: "1em" }}>
          {data.projectOverview.problems.map((p, i) => (
            <div key={i} style={{ marginBottom: "1.5em" }}>
              <h3 style={{ color: COLORS.sectionTitle }}>
                {`${(i + 1).toString().padStart(2, "0")}. ${p.title}`}
              </h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>

        <h3
          style={{
            color: COLORS.sectionTitle,
            marginTop: 20,
            fontSize: "1.5em",
          }}
        >
          {translations[language].solutions}
        </h3>
        <div style={{ marginTop: "1em" }}>
          {data.projectOverview.solutions.map((s, i) => (
            <div key={i} style={{ marginBottom: "1.5em" }}>
              <h3 style={{ color: COLORS.sectionTitle }}>
                {`${(i + 1).toString().padStart(2, "0")}. ${s.title}`}
              </h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <UserResearch language={language} />
      <PainPoints language={language} />
      <EmpathyMapping language={language} />
      <CompetitorAnalysis language={language} />
      <LowFidelityPrototypes language={language} />
      <HighFidelityPrototypes language={language} />
    </div>
  );
}
