import { readFileSync, writeFileSync } from 'fs';

let src = readFileSync('src/components/Hero.jsx', 'utf8');

const OLD = `                     <motion.div
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ duration: 0.6, delay: 1 + (index * 0.15) }}
                       whileHover={{ 
                          scale: 1.08, 
                          zIndex: 50, 
                          transition: { type: "spring", stiffness: 400, damping: 25 } 
                       }}
                     >`;

const NEW = `                     {/* pointer-events-auto re-enables hover scale on individual cards */}
                     <motion.div
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ duration: 0.6, delay: 1 + (index * 0.15) }}
                       className="pointer-events-auto cursor-crosshair"
                       whileHover={{
                          scale: 1.08,
                          zIndex: 50,
                          transition: { type: "spring", stiffness: 400, damping: 25 }
                       }}
                     >`;

if (!src.includes(OLD)) {
  console.error('❌ Target string NOT found in file. No changes made.');
  process.exit(1);
}

src = src.replace(OLD, NEW);
writeFileSync('src/components/Hero.jsx', src);
console.log('✅ Patch applied. Total lines:', src.split('\n').length);
