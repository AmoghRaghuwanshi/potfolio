// All personal copy is kept here so the portfolio is easy to maintain.
export const profile = {
  firstName: 'Amogh',
  name: 'Amogh Raghuwanshi',
  role: 'CSE student · Software developer · Bhopal, India',
  intro: 'I build things that go beyond the screen.',
  about: 'I’m a Computer Science student at Bansal College of Engineering, exploring software development, AI, and the ideas in between. From building AgriConnect with a five-person team to competing in hackathons, I learn best by making things, testing them, and making them better.',
  email: 'amoghraghuwanshi@gmail.com',
  github: 'https://github.com/AmoghRaghuwanshi',
  linkedin: 'https://www.linkedin.com/in/amogh-raghuwanshi/',
  resume: `${import.meta.env.BASE_URL}Amogh_Raghuwanshi_Resume.pdf`,
  portrait: `${import.meta.env.BASE_URL}portraits/amogh-studio.png`,
  skills: ['C++', 'React', 'Next.js', 'TypeScript', 'AI integration', 'Git & GitHub'],
  achievements: [
    ['Top 6 / 90+ teams', 'National Level Ideathon 2K26'],
    ['Runner-up', 'HackFusion college hackathon'],
    ['1st place', 'College Paper Presentation'],
  ],
  projects: [
    {title:'AgriConnect',type:'Agriculture × AI · 2026',description:'Connecting farmers and consumers through an AI-enabled agriculture marketplace.',detail:'Built as a developer in a five-member team. I designed responsive farmer and consumer workflows and developed major portions of the application with Next.js, React, TypeScript, and Zustand. My work included GIS maps with React-Leaflet, weather information, and helping integrate AI chatbot and voice interactions using Google Gemini, Groq, Twilio, and PostgreSQL (Neon). The team advanced to Day 2 of BGI Hackathon 2026.',tags:['Next.js','TypeScript','AI integration'],url:'https://agriconnectproo.netlify.app/'},
    {title:'A different perspective',type:'Personal portfolio · 2026',description:'The site you’re exploring. Editorial typography meets real-time 3D and scroll-driven motion.',detail:'A personal portfolio built with Three.js and JavaScript. A professional portrait created from my photo references sits within a procedurally modeled workspace. A scroll-driven camera approaches the laptop, while the notebook, project folder, and trophy connect to my résumé, work, and achievements. Native scrolling drives reversible animations, with reduced-motion support and a portrait fallback when WebGL is unavailable.',tags:['Three.js','JavaScript','Interaction design'],url:''},
  ],
};
