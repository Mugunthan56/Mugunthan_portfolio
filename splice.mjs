import fs from 'fs';

// 1. Read the newly generated categories
let newCatContent = fs.readFileSync('newCategories.jsx', 'utf8');

// 2. Fix the AWS icon that was missing (line with "name: \"AWS\"", then "icon: " empty)
const awsSvg = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.07 15.666c-1.57.85-3.35 1.258-5.076 1.258a9.42 9.42 0 0 1-5.184-1.46c-.537-.365-1.127-.852-1.127-.852l.983-1.611s.527.423.953.64c1.921 1.05 4.3 1.257 6.42 0 2.227-1.32.748-3.033-2.122-4.004-3.155-1.077-5.18-2.614-5.18-5.32 0-3.328 2.766-5.182 6.002-5.182 1.637 0 3.321.468 4.793 1.246.402.214.922.569.922.569L14.47 2.4s-.442-.367-.843-.541a9.01 9.01 0 0 0-4.32-.904c-1.847 0-3.486.375-4.814 1.264-1.226.837-1.859 2.112-1.859 3.498 0 2.76 2.213 3.968 5.618 5.155 1.545.545 4.148 1.48 4.148 4.254 0 1.29-.537 2.457-1.503 3.29a4.836 4.836 0 0 1-3.23.94l6.404-3.49zm2.464-9.878h-2.583v10.126h3L17.766 6.88l1.458 6.42.06-.06.777-3.4s.22-.98.397-2.1c.21 1.257.65 3.376.65 3.376l1.328 4.794 3.016-10.122h-2.812l-1.491 6.848-.052.05-.883-4.04c-.31-1.378-.588-2.858-.588-2.858h-2.18s-.246 1.46-.576 2.87c-.31 1.348-1.5 6.702-1.5 6.702l-1.366-6.692zM12.923 20.31s7.493 2.92 11.077 1.597c0 0-.256 1.458-4.228 1.944-5.32.663-10.87-1.554-10.87-1.554l4.02-1.987z"/></svg>`;
newCatContent = newCatContent.replace(/name: "AWS",\s*color: "#232F3E",\s*icon:\s*/g, 'name: "AWS",\n        color: "#232F3E",\n        icon: ' + awsSvg + '\n');

// Remove trailing comma from last item of newCatContent to avoid syntax issues if it matters
newCatContent = newCatContent.trim();
if (newCatContent.endsWith(',')) {
    newCatContent = newCatContent.slice(0, -1);
}

// 3. Read the original skillsData.jsx
let origFile = fs.readFileSync('src/data/skillsData.jsx', 'utf8');

// 4. Find the cut point: we replace the whole "Web Dev, Cloud & Tools" category 
// which is the last category before the closing array bracket "];"
const startMarker = '  {\n    title: "Web Dev, Cloud & Tools",';
const endMarker = '];';

const startIndex = origFile.indexOf(startMarker);
const endIndex = origFile.lastIndexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const beginning = origFile.substring(0, startIndex);
    const ending = origFile.substring(endIndex);
    
    // Splice! Combine the parts
    const finalContent = beginning + newCatContent + '\n' + ending;
    fs.writeFileSync('src/data/skillsData.jsx', finalContent);
    console.log("Successfully replaced and spliced!");
} else {
    console.log("Could not find the markers");
}
