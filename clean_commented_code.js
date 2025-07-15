const fs = require('fs');
const path = require('path');

const CODE_LIKE_REGEX = /^[ \t]*\/\/.*[=();{}\[\]]/;
const COMMENT_OK_REGEX = /^[ \t]*\/\/[ \t]*(TODO|FIXME|NOTE|[A-Za-z]+[\s\w\.,:'"!?-]*)$/;

// File types to check
const EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx'];

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const cleanedLines = lines.filter(line => {
    if (!line.trim().startsWith('//')) return true;
    if (COMMENT_OK_REGEX.test(line)) return true;
    return !CODE_LIKE_REGEX.test(line);
  });

  fs.writeFileSync(filePath, cleanedLines.join('\n'), 'utf-8');
  console.log(`Cleaned ${filePath}`);
}

function walkDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (EXTENSIONS.includes(path.extname(file))) {
      processFile(fullPath);
    }
  }
}

// Run it
const targetDir = process.argv[2] || '.';
walkDir(targetDir);
console.log('Done.');
