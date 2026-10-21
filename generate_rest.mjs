import fs from 'fs';
import https from 'https';

const getSvg = (slug) => {
  return new Promise((resolve) => {
    https.get(`https://cdn.simpleicons.org/${slug}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (e) => {
      console.error(e);
      resolve('');
    });
  });
};

const conceptualIcons = {
  "REST APIs": {
    path: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>',
    color: '#0096D6'
  },
  "CI/CD": {
    path: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    color: '#38BDF8'
  },
  "Antigravity": {
    path: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
    color: '#A855F7'
  }
};

const categories = [
  {
    title: "Web Development",
    skills: [
      { name: "React.js", slug: "react", color: "#61DAFB" },
      { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
      { name: "Node.js", slug: "nodedotjs", color: "#339933" },
      { name: "Express.js", slug: "express", color: "#ffffff" },
      { name: "MongoDB", slug: "mongodb", color: "#47A248" },
      { name: "REST APIs", slug: null, color: "#0096D6" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
      { name: "HTML 5", slug: "html5", color: "#E34F26" },
      { name: "JavaScript", slug: "javascript", color: "#F7DF1E" }
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", slug: "amazonaws", color: "#232F3E" },
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "GitHub Actions", slug: "githubactions", color: "#2088FF" },
      { name: "Linux", slug: "linux", color: "#FCC624" },
      { name: "CI/CD", slug: null, color: "#38BDF8" }
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", slug: "git", color: "#F05032" },
      { name: "GitHub", slug: "github", color: "#ffffff" },
      { name: "Figma", slug: "figma", color: "#F24E1E" },
      { name: "Postman", slug: "postman", color: "#FF6C37" },
      { name: "Antigravity", slug: null, color: "#A855F7" },
      { name: "VS Code", slug: "visualstudiocode", color: "#007ACC" }
    ]
  }
];

async function run() {
  let output = ``;
  for (const cat of categories) {
    output += `  {\n    title: "${cat.title}",\n    skills: [\n`;
    for (const skill of cat.skills) {
      let innerHTML = '';
      if (skill.slug) {
        let svgRaw = await getSvg(skill.slug);
        
        if (!svgRaw || svgRaw.includes('Failed') || svgRaw.length < 50) {
           if (skill.slug === 'visualstudiocode') {
              svgRaw = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>`;
           }
        }
        
        const match = svgRaw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
        if (match) {
          let inner = match[1].replace(/<title>.*?<\/title>/g, '').trim();
          inner = inner.replace(/fill-rule/g, 'fillRule').replace(/clip-rule/g, 'clipRule');
          innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
        }
      } else {
        innerHTML = conceptualIcons[skill.name].path;
      }
      
      output += `      { 
        name: "${skill.name}", 
        color: "${skill.color}", 
        icon: ${innerHTML} 
      },\n`;
    }
    output += `    ]\n  },\n`;
  }
  
  fs.writeFileSync('newCategories.jsx', output);
  console.log('done');
}

run();
