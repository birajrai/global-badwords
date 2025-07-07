const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dataDir = path.join(__dirname, '..', 'data');
const outputFile = path.join(__dirname, 'badwords.yml');

let badwordsSet = new Set();

fs.readdirSync(dataDir).forEach(file => {
  if (file.endsWith('.txt')) {
    const filePath = path.join(dataDir, file);
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    lines.forEach(line => {
      const word = line.trim().toLowerCase();
      if (word) badwordsSet.add(word);
    });
  }
});

const badwordsArray = Array.from(badwordsSet).sort();

const yamlContent = yaml.dump({ badwords: badwordsArray });

fs.writeFileSync(outputFile, yamlContent, 'utf8');

console.log(`✅ badwords.yml generated with ${badwordsArray.length} entries.`);
