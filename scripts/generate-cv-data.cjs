const fs = require('fs')
const path = require('path')

const cvPath = path.join(__dirname, '..', 'server', 'assets', 'cv-akmal.docx')
const outputPath = path.join(__dirname, '..', 'server', 'utils', 'cv-data.ts')

// Ensure utils directory exists
const utilsDir = path.dirname(outputPath)
if (!fs.existsSync(utilsDir)) {
  fs.mkdirSync(utilsDir, { recursive: true })
}

// Read and convert to base64
const fileBuffer = fs.readFileSync(cvPath)
const base64 = fileBuffer.toString('base64')

// Write TypeScript file
const content = `// Auto-generated - do not edit manually
// Run: node scripts/generate-cv-data.js to regenerate
export const cvBase64 = '${base64}';
`

fs.writeFileSync(outputPath, content)
console.log('Generated server/utils/cv-data.ts')
