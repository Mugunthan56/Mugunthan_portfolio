import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categories = [
  {
    title: "Generative AI & NLP",
    skills: [
      { name: "Hugging Face", slug: "huggingface", color: "#FFD21E" },
      { name: "OpenAI", slug: "openai", color: "#412991" },
      { name: "LangChain", slug: "langchain", color: "#1C3C3C" },
      { name: "Anthropic", slug: "anthropic", color: "#F4DFD0" },
      { name: "Meta", slug: "meta", color: "#0467DF" },
      { name: "Cohere", slug: "cohere", color: "#39594D" }
    ]
  },
  {
    title: "Machine Learning / Data",
    skills: [
      { name: "Python", slug: "python", color: "#3776AB" },
      { name: "MySQL", slug: "mysql", color: "#4479A1" },
      { name: "Pandas", slug: "pandas", color: "#150458" },
      { name: "Scikit-learn", slug: "scikitlearn", color: "#F7931E" },
      { name: "TensorFlow", slug: "tensorflow", color: "#FF6F00" },
      { name: "PyTorch", slug: "pytorch", color: "#EE4C2C" }
    ]
  },
  {
    title: "Web Dev, Cloud & Tools",
    skills: [
      { name: "React", slug: "react", color: "#61DAFB" },
      { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
      { name: "Node.js", slug: "nodedotjs", color: "#339933" },
      { name: "Express", slug: "express", color: "#ffffff" },
      { name: "MongoDB", slug: "mongodb", color: "#47A248" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "Git", slug: "git", color: "#F05032" },
      { name: "Figma", slug: "figma", color: "#F24E1E" },
      { name: "VS Code", slug: "visualstudiocode", color: "#007ACC" }
    ]
  }
];

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

async function run() {
  let output = `import React from 'react';\n\nexport const skillCategories = [\n`;
  for (const cat of categories) {
    output += `  {\n    title: "${cat.title}",\n    skills: [\n`;
    for (const skill of cat.skills) {
      const svgRaw = await getSvg(skill.slug);
      let innerHTML = '';
      const match = svgRaw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
      if (match) {
        innerHTML = match[1].replace(/<title>.*?<\/title>/g, '').trim();
        innerHTML = innerHTML.replace(/fill-rule/g, 'fillRule').replace(/clip-rule/g, 'clipRule');
      } else {
        console.error("Failed to fetch SVG for " + skill.slug + ", raw response: " + svgRaw);
      }
      
      output += `      { 
        name: "${skill.name}", 
        color: "${skill.color}", 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">${innerHTML}</svg> 
      },\n`;
    }
    output += `    ]\n  },\n`;
  }
  output += `];\n`;
  
  const targetDir = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(path.join(targetDir, 'skillsData.jsx'), output);
  console.log('skillsData.jsx created successfully.');
}

run();
