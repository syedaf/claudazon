#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Claude Access Setup Script
 * Automatically prepares project files for Claude analysis via Vercel
 */

class ClaudeAccessSetup {
  constructor() {
    this.baseDir = process.cwd();
    this.claudeDir = path.join(this.baseDir, 'public', 'claude');
    this.sourceCodeDir = path.join(this.claudeDir, 'source_code', 'app');
    this.miscDir = path.join(this.claudeDir, 'misc');
    this.appDir = path.join(this.baseDir, 'app');
    this.stats = {
      filesProcessed: 0,
      filesRenamed: 0,
      directoriesCreated: 0,
      errors: []
    };
    this.fileMapping = [];
  }

  /**
   * Main setup process
   */
  async setup() {
    console.log('🚀 Setting up Claude access structure...\n');
    
    try {
      // Step 1: Clean and create directories
      this.cleanClaudeDirectory();
      this.createDirectories();
      
      // Step 2: Copy app directory structure
      this.copyAppDirectory();
      
      // Step 3: Copy misc files (outside app)
      this.copyMiscFiles();
      
      // Step 4: Create structure.txt
      this.createStructureFile();
      
      // Step 5: Rename files to .txt extensions
      this.renameFilesToTxt();
      
      // Step 6: Create mapping file
      this.createMappingFile();
      
      // Step 7: Create instructions file
      this.createInstructions();
      
      // Step 8: Display results
      this.displayResults();
      
      return true;
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      return false;
    }
  }

  /**
   * Clean existing claude directory
   */
  cleanClaudeDirectory() {
    if (fs.existsSync(this.claudeDir)) {
      console.log('🧹 Cleaning existing claude directory...');
      fs.rmSync(this.claudeDir, { recursive: true, force: true });
    }
  }

  /**
   * Create directory structure
   */
  createDirectories() {
    console.log('📁 Creating directory structure...');
    
    const dirs = [
      this.claudeDir,
      this.sourceCodeDir,
      this.miscDir
    ];
    
    dirs.forEach(dir => {
      fs.mkdirSync(dir, { recursive: true });
      this.stats.directoriesCreated++;
      console.log(`   Created: ${path.relative(this.baseDir, dir)}`);
    });
  }

  /**
   * Copy entire app directory structure
   */
  copyAppDirectory() {
    console.log('\n📂 Copying app directory...');
    
    if (!fs.existsSync(this.appDir)) {
      throw new Error('App directory not found. Are you in the right project directory?');
    }
    
    this.copyDirectoryRecursive(this.appDir, this.sourceCodeDir);
  }

  /**
   * Copy directory recursively
   */
  copyDirectoryRecursive(source, destination) {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }
    
    const items = fs.readdirSync(source);
    
    items.forEach(item => {
      const sourcePath = path.join(source, item);
      const destPath = path.join(destination, item);
      const stat = fs.statSync(sourcePath);
      
      if (stat.isDirectory()) {
        this.copyDirectoryRecursive(sourcePath, destPath);
      } else {
        fs.copyFileSync(sourcePath, destPath);
        this.stats.filesProcessed++;
        console.log(`   Copied: ${path.relative(this.appDir, sourcePath)}`);
      }
    });
  }

  /**
   * Copy miscellaneous files (outside app directory)
   */
  copyMiscFiles() {
    console.log('\n📄 Copying miscellaneous files...');
    
    const miscFiles = [
      'package.json',
      'package-lock.json',
      'next.config.js',
      'next.config.mjs',
      'next.config.ts',
      'tailwind.config.js',
      'tailwind.config.ts',
      'tailwind.config.mjs',
      'tsconfig.json',
      'README.md',
      '.env.example',
      'postcss.config.js',
      'postcss.config.mjs'
    ];
    
    miscFiles.forEach(fileName => {
      const sourcePath = path.join(this.baseDir, fileName);
      if (fs.existsSync(sourcePath)) {
        const destPath = path.join(this.miscDir, fileName);
        fs.copyFileSync(sourcePath, destPath);
        this.stats.filesProcessed++;
        console.log(`   Copied: ${fileName}`);
      }
    });
  }

  /**
   * Create structure.txt file
   */
  createStructureFile() {
    console.log('\n📋 Creating structure.txt...');
    
    const structureContent = this.generateDirectoryTree(this.appDir, 'app');
    const structurePath = path.join(this.miscDir, 'structure.txt');
    
    fs.writeFileSync(structurePath, structureContent);
    console.log(`   Created: structure.txt`);
  }

  /**
   * Generate directory tree structure
   */
  generateDirectoryTree(dirPath, rootName = '', prefix = '') {
    let result = '';
    
    if (prefix === '') {
      result += `${rootName}/\n`;
    }
    
    if (!fs.existsSync(dirPath)) {
      return result + 'Directory not found\n';
    }
    
    const items = fs.readdirSync(dirPath);
    items.sort((a, b) => {
      const aIsDir = fs.statSync(path.join(dirPath, a)).isDirectory();
      const bIsDir = fs.statSync(path.join(dirPath, b)).isDirectory();
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });
    
    items.forEach((item, index) => {
      const itemPath = path.join(dirPath, item);
      const isLast = index === items.length - 1;
      const currentPrefix = prefix + (isLast ? '└── ' : '├── ');
      const nextPrefix = prefix + (isLast ? '    ' : '│   ');
      
      if (fs.statSync(itemPath).isDirectory()) {
        result += currentPrefix + item + '/\n';
        result += this.generateDirectoryTree(itemPath, '', nextPrefix);
      } else {
        result += currentPrefix + item + '\n';
      }
    });
    
    return result;
  }

  /**
   * Rename all files to .txt extension
   */
  renameFilesToTxt() {
    console.log('\n🔄 Renaming files to .txt extension...');
    this.renameFilesInDirectory(this.sourceCodeDir);
  }

  /**
   * Rename files in directory recursively
   */
  renameFilesInDirectory(directory) {
    const items = fs.readdirSync(directory);
    
    items.forEach(item => {
      const itemPath = path.join(directory, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        this.renameFilesInDirectory(itemPath);
      } else {
        const ext = path.extname(item);
        const baseName = path.basename(item, ext);
        
        // Only rename if it's not already .txt
        if (ext !== '.txt') {
          const newName = baseName + '.txt';
          const newPath = path.join(directory, newName);
          
          // Record the mapping
          const relativePath = path.relative(this.sourceCodeDir, itemPath);
          this.fileMapping.push({
            original: item,
            renamed: newName,
            originalExtension: ext,
            path: relativePath.replace(item, ''),
            fullOriginalPath: relativePath,
            fullRenamedPath: relativePath.replace(item, newName)
          });
          
          fs.renameSync(itemPath, newPath);
          this.stats.filesRenamed++;
          console.log(`   ${item} → ${newName}`);
        }
      }
    });
  }

  /**
   * Create file mapping reference
   */
  createMappingFile() {
    console.log('\n🗺️  Creating file mapping...');
    
    let mappingContent = 'FILE MAPPING REFERENCE\n';
    mappingContent += '======================\n\n';
    mappingContent += 'This file shows the mapping between original files and their .txt versions\n';
    mappingContent += 'for Claude analysis via Vercel.\n\n';
    
    if (this.fileMapping.length === 0) {
      mappingContent += 'No files were renamed (all were already .txt or no files found).\n';
    } else {
      mappingContent += 'RENAMED FILES:\n';
      mappingContent += '--------------\n';
      this.fileMapping.forEach(mapping => {
        mappingContent += `${mapping.fullOriginalPath} → ${mapping.fullRenamedPath}\n`;
      });
      
      mappingContent += '\n\nBY EXTENSION:\n';
      mappingContent += '-------------\n';
      const byExtension = {};
      this.fileMapping.forEach(mapping => {
        const ext = mapping.originalExtension || '(no extension)';
        if (!byExtension[ext]) byExtension[ext] = [];
        byExtension[ext].push(mapping);
      });
      
      Object.keys(byExtension).sort().forEach(ext => {
        mappingContent += `\n${ext} files:\n`;
        byExtension[ext].forEach(mapping => {
          mappingContent += `  ${mapping.original} → ${mapping.renamed}\n`;
        });
      });
    }
    
    const mappingPath = path.join(this.miscDir, 'file_mapping.txt');
    fs.writeFileSync(mappingPath, mappingContent);
    console.log(`   Created: file_mapping.txt`);
  }

  /**
   * Create instructions file
   */
  createInstructions() {
    console.log('\n📋 Creating instructions.txt...');
    
    const instructions = `CLAUDE ACCESS INSTRUCTIONS
==========================

Generated: ${new Date().toISOString()}
Project: ${path.basename(this.baseDir)}

DIRECTORY STRUCTURE:
-------------------
public/claude/
├── source_code/app/     # All app directory files (renamed to .txt)
├── misc/                # Project configuration files
│   ├── structure.txt    # Original app directory structure
│   ├── file_mapping.txt # Mapping of renamed files
│   └── instructions.txt # This file

ACCESS INFORMATION:
------------------
1. The code from the app folder is available in the folder public/claude/source_code/app
2. The code from everything outside the app folder is available in public/claude/misc  
3. The directory structure for 'app' is available in public/claude/misc/structure.txt

FILE EXTENSIONS:
---------------
All source files have been renamed to .txt extension for reliable web access.
Use file_mapping.txt to understand the original file types and extensions.

USAGE:
------
1. Deploy this to Vercel
2. Provide Claude with URLs like:
   - https://your-site.vercel.app/claude/misc/structure.txt
   - https://your-site.vercel.app/claude/misc/file_mapping.txt
   - https://your-site.vercel.app/claude/source_code/app/layout.txt
   - https://your-site.vercel.app/claude/source_code/app/page.txt

STATISTICS:
----------
Files processed: ${this.stats.filesProcessed}
Files renamed: ${this.stats.filesRenamed}
Directories created: ${this.stats.directoriesCreated}

Generated by Claude Access Setup Script
`;
    
    const instructionsPath = path.join(this.miscDir, 'instructions.txt');
    fs.writeFileSync(instructionsPath, instructions);
    console.log(`   Created: instructions.txt`);
  }

  /**
   * Display final results
   */
  displayResults() {
    console.log('\n' + '='.repeat(60));
    console.log('🎉 CLAUDE ACCESS SETUP COMPLETE');
    console.log('='.repeat(60));
    console.log(`✅ Directories created: ${this.stats.directoriesCreated}`);
    console.log(`✅ Files processed: ${this.stats.filesProcessed}`);
    console.log(`✅ Files renamed to .txt: ${this.stats.filesRenamed}`);
    
    if (this.stats.errors.length > 0) {
      console.log(`❌ Errors: ${this.stats.errors.length}`);
      this.stats.errors.forEach(error => console.log(`   ${error}`));
    }
    
    console.log('\n📂 Created structure:');
    console.log(`   ${path.relative(this.baseDir, this.claudeDir)}/`);
    console.log(`   ├── source_code/app/    # Your app files (as .txt)`);
    console.log(`   └── misc/               # Config files + references`);
    
    console.log('\n🚀 Next steps:');
    console.log('1. Commit and push to your repository');
    console.log('2. Deploy to Vercel (automatic if connected to GitHub)');
    console.log('3. Provide Claude with these URLs:');
    console.log('   - https://your-site.vercel.app/claude/misc/instructions.txt');
    console.log('   - https://your-site.vercel.app/claude/misc/structure.txt');
    console.log('   - https://your-site.vercel.app/claude/misc/file_mapping.txt');
    
    console.log('\n✨ Claude will now have complete access to your project structure and source code!');
  }
}

// CLI Usage
if (require.main === module) {
  console.log('🤖 Claude Access Setup Script');
  console.log('==============================\n');
  
  const setup = new ClaudeAccessSetup();
  
  setup.setup().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('💥 Script failed:', error.message);
    process.exit(1);
  });
}

module.exports = ClaudeAccessSetup;