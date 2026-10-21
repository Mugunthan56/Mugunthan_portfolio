import fs from 'fs';

const iconsToFetch = [
  "huggingface", "openai", "langchain", "anthropic", "meta", "cohere",
  "python", "mysql", "postgresql", "pandas", "scikitlearn", "tensorflow", "pytorch",
  "react", "nextdotjs", "nodedotjs", "express", "mongodb", "tailwindcss",
  "docker", "git", "figma", "visualstudiocode"
];

async function main() {
  try {
    console.log("Fetching simple-icons.json...");
    // Fetch JSON once
    const jsonRes = await fetch("https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json");
    const jsonParsed = await jsonRes.json();
    
    // Create a map for fast lookup
    const iconsData = {};
    for (const item of jsonParsed.icons) {
      if (iconsToFetch.includes(item.slug)) {
        iconsData[item.slug] = {
           hex: "#" + item.hex
        };
      }
    }
    
    console.log("Fetching SVG paths concurrently...");
    const results = {};
    
    // Fetch SVGs concurrently
    await Promise.all(iconsToFetch.map(async (slug) => {
      try {
        const res = await fetch(`https://unpkg.com/simple-icons@v11.1.0/icons/${slug}.svg`);
        if (!res.ok) {
           console.error(`Failed to fetch ${slug}. Status: ${res.status}`);
           return;
        }
        const svgData = await res.text();
        const match = svgData.match(/<path\s+d="([^"]+)"/i);
        const pathData = match ? match[1] : null;
        
        results[slug] = {
          slug,
          hex: iconsData[slug]?.hex || "#FFFFFF",
          path: pathData
        };
        console.log(`Successfully fetched ${slug}`);
      } catch (err) {
        console.error(`Failed to fetch ${slug}:`, err);
      }
    }));
    
    fs.writeFileSync('icons_data.json', JSON.stringify(results, null, 2));
    console.log("Done. Saved to icons_data.json");
  } catch (err) {
    console.error("Error in main:", err);
  }
}

main();
