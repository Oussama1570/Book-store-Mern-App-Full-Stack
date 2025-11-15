const fs = require('fs');
const path = require('path');

// Function to rename files and folders
const renamePath = (oldPath, newPath) => {
  fs.renameSync(oldPath, newPath);
};

// Function to replace content inside a file
const replaceInFile = (filePath, searchValue, replaceValue) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace code references (e.g., variables, function names)
  content = content.replace(new RegExp(searchValue, 'g'), replaceValue);
  
  fs.writeFileSync(filePath, content, 'utf-8');
};

// Function to recursively replace content and rename files/folders in 'src' directory
const replaceInDirectory = (dirPath, searchValue, replaceValue) => {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const oldPath = path.join(dirPath, file);
    const stat = fs.lstatSync(oldPath);

    // Check if it's a directory
    if (stat.isDirectory()) {
      // Rename the directory (if the name contains 'book', 'books', 'Book', 'Books')
      const newDirName = file.replace(new RegExp(searchValue, 'g'), replaceValue);
      const newDirPath = path.join(dirPath, newDirName);
      if (newDirPath !== oldPath) {
        renamePath(oldPath, newDirPath);  // Rename directory
      }
      // Recursively process the directory
      replaceInDirectory(newDirPath, searchValue, replaceValue);
    } else if (stat.isFile()) {
      // Rename the file (if the name contains 'book', 'books', 'Book', 'Books')
      const newFileName = file.replace(new RegExp(searchValue, 'g'), replaceValue);
      const newFilePath = path.join(dirPath, newFileName);
      if (newFilePath !== oldPath) {
        renamePath(oldPath, newFilePath);  // Rename file
      }
      // Replace content inside the file (code references like variables, functions, etc.)
      replaceInFile(newFilePath, searchValue, replaceValue);
    }
  });
};

// Handle the backend index.js file outside of src
const replaceInBackendIndex = (filePath, searchValue, replaceValue) => {
  if (fs.existsSync(filePath)) {
    replaceInFile(filePath, searchValue, replaceValue);
  }
};

// Main logic
const frontendDir = path.join(__dirname, 'frontend', 'src'); // Replace 'frontend' with actual directory name if needed
const backendDir = path.join(__dirname, 'backend', 'src'); // Replace 'backend' with actual directory name if needed
const backendIndexFile = path.join(__dirname, 'backend', 'index.js'); // Backend index.js file outside src

// Replace "book", "books", "Book", "Books" with "product", "products", "Product", "Products" across the entire 'src' directory for frontend and backend
replaceInDirectory(frontendDir, 'book', 'product');
replaceInDirectory(frontendDir, 'books', 'products');
replaceInDirectory(frontendDir, 'Book', 'Product');
replaceInDirectory(frontendDir, 'Books', 'Products');

replaceInDirectory(backendDir, 'book', 'product');
replaceInDirectory(backendDir, 'books', 'products');
replaceInDirectory(backendDir, 'Book', 'Product');
replaceInDirectory(backendDir, 'Books', 'Products');

// Replace the backend index.js file
replaceInBackendIndex(backendIndexFile, 'book', 'product');
replaceInBackendIndex(backendIndexFile, 'books', 'products');
replaceInBackendIndex(backendIndexFile, 'Book', 'Product');
replaceInBackendIndex(backendIndexFile, 'Books', 'Products');
