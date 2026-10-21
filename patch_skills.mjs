import fs from 'fs';

let content = fs.readFileSync('src/data/skillsData.jsx', 'utf8');

// 1. Add Java after JavaScript
const javaBlock = `      { 
        name: "JavaScript", 
        color: "#F7DF1E", 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg> 
      },
      {
        name: "Java",
        color: "#ED8B00",
        icon: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.615 0c-.43 0-.85.06-1.58.17l-1.04.16c-1.39.23-2.61.47-3.7.8-2.69.8-3.41 1.76-3.83 2.65-.13.25-.19.51-.19.78 0 .42.17.82.49 1.15.2.22.46.42.75.59.88.52 2.37.89 4.31 1.05.51.04 1.04.07 1.58.07 4.29 0 7.82-1.35 7.82-3 0-1.12-1.63-2.18-4.13-2.73-1.03-.23-2.22-.38-3.48-.38zm-.3 10.74c-4.14 0-7.3 1.34-7.3 2.82s3.16 2.81 7.3 2.81c4.13 0 7.3-1.33 7.3-2.81s-3.17-2.82-7.3-2.82zM12 21.05c-3.1 0-5.83.6-7.35 1.5l14.7-.01c-1.52-.91-4.25-1.5-7.35-1.5z"/></svg>
      },`;
const jsReg = /\{\s*name:\s*"JavaScript"[\s\S]*?\},/;
if (content.match(jsReg)) {
    content = content.replace(jsReg, javaBlock);
} else {
    console.log("Could not find JS block to append Java");
}

// 2. AWS Official Logo Match
const awsReg = /\{\s*name:\s*"AWS"[\s\S]*?\},/;
const awsBlock = `      { 
        name: "AWS", 
        color: "#FF9900", 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.07 15.666c-1.57.85-3.35 1.258-5.076 1.258a9.42 9.42 0 0 1-5.184-1.46c-.537-.365-1.127-.852-1.127-.852l.983-1.611s.527.423.953.64c1.921 1.05 4.3 1.257 6.42 0 2.227-1.32.748-3.033-2.122-4.004-3.155-1.077-5.18-2.614-5.18-5.32 0-3.328 2.766-5.182 6.002-5.182 1.637 0 3.321.468 4.793 1.246.402.214.922.569.922.569L14.47 2.4s-.442-.367-.843-.541a9.01 9.01 0 0 0-4.32-.904c-1.847 0-3.486.375-4.814 1.264-1.226.837-1.859 2.112-1.859 3.498 0 2.76 2.213 3.968 5.618 5.155 1.545.545 4.148 1.48 4.148 4.254 0 1.29-.537 2.457-1.503 3.29a4.836 4.836 0 0 1-3.23.94l6.404-3.49zm2.464-9.878h-2.583v10.126h3L17.766 6.88l1.458 6.42.06-.06.777-3.4s.22-.98.397-2.1c.21 1.257.65 3.376.65 3.376l1.328 4.794 3.016-10.122h-2.812l-1.491 6.848-.052.05-.883-4.04c-.31-1.378-.588-2.858-.588-2.858h-2.18s-.246 1.46-.576 2.87c-.31 1.348-1.5 6.702-1.5 6.702l-1.366-6.692zM12.923 20.31s7.493 2.92 11.077 1.597c0 0-.256 1.458-4.228 1.944-5.32.663-10.87-1.554-10.87-1.554l4.02-1.987z"/></svg> 
      },`;
if (content.match(awsReg)) {
    content = content.replace(awsReg, awsBlock);
} else {
    console.log("Could not find AWS block to update");
}

// 3. Antigravity Custom Match
const antiReg = /\{\s*name:\s*"Antigravity"[\s\S]*?\},/;
const antiBlock = `      { 
        name: "Antigravity", 
        color: "#D946EF", 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M 2 16 C 6 4, 11 4, 14 12 C 16.5 18, 19 18, 22 14" /></svg> 
      },`;
if (content.match(antiReg)) {
    content = content.replace(antiReg, antiBlock);
} else {
    console.log("Could not find Antigravity block to update");
}

fs.writeFileSync('src/data/skillsData.jsx', content);
console.log("Successfully patched Javascript, AWS, and Antigravity!");
