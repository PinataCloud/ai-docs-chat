const fs = require("fs");
const path = require("path");

// Input directory (update with your source directory)
const sourceDir = "";

// Output directory
const outputDir = path.join(__dirname, "upload");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Helper function to recursively get all `.md` files in a directory
const getMarkdownFiles = (dir) => {
  let results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(fullPath));
    } else if (path.extname(fullPath) === ".md" || path.extname(fullPath) === ".mdx") {
      results.push(fullPath);
    }
  }
  return results;
};

// Main function to combine files
const combineMarkdownFiles = (files, outputDir, batchSize = 1) => {
  let batchContent = "";
  let batchCount = 0;

  for (let i = 0; i < files.length; i++) {
    const content = fs.readFileSync(files[i], "utf8");
    batchContent += content + "\n\n"; // Add some spacing between files

    // Save the batch after every `batchSize` files
    if ((i + 1) % batchSize === 0 || i === files.length - 1) {
      const outputFilePath = path.join(outputDir, `batch_${batchCount + 1}.md`);
      fs.writeFileSync(outputFilePath, batchContent, "utf8");
      console.log(`Created: ${outputFilePath}`);
      batchContent = "";
      batchCount++;
    }
  }
};

// Execute the script
const markdownFiles = getMarkdownFiles(sourceDir);

if (markdownFiles.length === 0) {
  console.log("No markdown files found.");
} else {
  console.log(`Found ${markdownFiles.length} markdown files.`);
  combineMarkdownFiles(markdownFiles, outputDir);
  console.log("Combining complete!");
}
