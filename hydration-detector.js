#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class HydrationDetector {
  constructor(projectPath = '.') {
    this.projectPath = path.resolve(projectPath);
    this.issues = [];
    this.scannedFiles = 0;
    
    // Common hydration mismatch patterns
    this.patterns = {
      randomValues: {
        regex: /(Math\.random\(\)|Math\.floor\(Math\.random|uuid\(\)|nanoid\(\)|crypto\.randomUUID\(\))/g,
        description: 'Random values that differ between server and client',
        severity: 'HIGH'
      },
      dateTime: {
        regex: /(new Date\(\)|Date\.now\(\)|\.toLocaleString\(\)|\.toLocaleDateString\(\)|\.toLocaleTimeString\(\))/g,
        description: 'Date/time operations that may differ between server and client',
        severity: 'HIGH'
      },
      localStorage: {
        regex: /(localStorage\.|sessionStorage\.|window\.localStorage|window\.sessionStorage)/g,
        description: 'Browser storage APIs not available on server',
        severity: 'HIGH'
      },
      windowDocument: {
        regex: /(window\.|document\.|navigator\.|location\.)/g,
        description: 'Browser-specific APIs not available on server',
        severity: 'MEDIUM'
      },
      conditionalWindow: {
        regex: /(if\s*\(\s*window|if\s*\(\s*document|if\s*\(\s*typeof\s+window|if\s*\(\s*typeof\s+document)/g,
        description: 'Conditional rendering based on browser objects',
        severity: 'LOW'
      },
      innerWidth: {
        regex: /(window\.innerWidth|window\.innerHeight|screen\.width|screen\.height)/g,
        description: 'Screen dimensions that differ between server and client',
        severity: 'HIGH'
      },
      userAgent: {
        regex: /(navigator\.userAgent|navigator\.platform)/g,
        description: 'User agent detection that may cause mismatches',
        severity: 'MEDIUM'
      },
      thirdPartyScripts: {
        regex: /(gtag\(|ga\(|fbq\(|analytics\.|tracking)/g,
        description: 'Third-party analytics/tracking scripts',
        severity: 'MEDIUM'
      }
    };
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };
    console.log(`${colors[type]}${message}${colors.reset}`);
  }

  async scanDirectory(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
    const files = [];
    
    const scanRecursive = (currentDir) => {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Skip node_modules, .next, .git directories
          if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(item)) {
            scanRecursive(fullPath);
          }
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    };
    
    scanRecursive(dir);
    return files;
  }

  analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(this.projectPath, filePath);
      const fileIssues = [];

      // Check for React component
      const isReactComponent = /import\s+.*React|from\s+['"]react['"]|export\s+default\s+function|const\s+\w+\s*=\s*\(/.test(content);
      
      if (!isReactComponent) return [];

      // Analyze each pattern
      Object.entries(this.patterns).forEach(([patternName, pattern]) => {
        let match;
        while ((match = pattern.regex.exec(content)) !== null) {
          const lineNumber = content.substring(0, match.index).split('\n').length;
          const line = content.split('\n')[lineNumber - 1];
          
          fileIssues.push({
            file: relativePath,
            line: lineNumber,
            code: line.trim(),
            pattern: patternName,
            description: pattern.description,
            severity: pattern.severity,
            match: match[0]
          });
        }
        // Reset regex
        pattern.regex.lastIndex = 0;
      });

      return fileIssues;
    } catch (error) {
      this.log(`Error reading file ${filePath}: ${error.message}`, 'error');
      return [];
    }
  }

  async detectHydrationIssues() {
    this.log('🔍 Starting hydration mismatch detection...', 'info');
    
    const files = await this.scanDirectory(this.projectPath);
    this.log(`📁 Found ${files.length} files to analyze`, 'info');

    for (const file of files) {
      const issues = this.analyzeFile(file);
      this.issues.push(...issues);
      this.scannedFiles++;
      
      if (this.scannedFiles % 10 === 0) {
        process.stdout.write(`\r⏳ Scanned ${this.scannedFiles}/${files.length} files...`);
      }
    }
    
    console.log('\n');
    this.log(`✅ Completed scanning ${this.scannedFiles} files`, 'success');
  }

  generateReport() {
    if (this.issues.length === 0) {
      this.log('🎉 No hydration mismatch patterns detected!', 'success');
      return;
    }

    this.log(`\n⚠️  Found ${this.issues.length} potential hydration issues:\n`, 'warning');

    // Group by severity
    const severityGroups = {
      HIGH: this.issues.filter(i => i.severity === 'HIGH'),
      MEDIUM: this.issues.filter(i => i.severity === 'MEDIUM'),
      LOW: this.issues.filter(i => i.severity === 'LOW')
    };

    Object.entries(severityGroups).forEach(([severity, issues]) => {
      if (issues.length === 0) return;
      
      const color = severity === 'HIGH' ? 'error' : severity === 'MEDIUM' ? 'warning' : 'info';
      this.log(`\n${severity} PRIORITY (${issues.length} issues):`, color);
      this.log('='.repeat(40), color);
      
      issues.forEach((issue, index) => {
        console.log(`\n${index + 1}. ${issue.description}`);
        console.log(`   📄 File: ${issue.file}:${issue.line}`);
        console.log(`   🔍 Pattern: ${issue.pattern}`);
        console.log(`   📝 Code: ${issue.code}`);
        console.log(`   🎯 Match: ${issue.match}`);
      });
    });

    this.generateSolutions();
  }

  generateSolutions() {
    this.log('\n🔧 SOLUTIONS & FIXES:\n', 'success');
    
    const solutions = {
      randomValues: `
// ❌ Problematic:
const id = Math.random();

// ✅ Fix:
import { useId } from 'react';
const id = useId();`,
      
      dateTime: `
// ❌ Problematic:
const time = new Date().toLocaleString();

// ✅ Fix:
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
const time = mounted ? new Date().toLocaleString() : '';`,
      
      localStorage: `
// ❌ Problematic:
const value = localStorage.getItem('key');

// ✅ Fix:
const [value, setValue] = useState('');
useEffect(() => {
  setValue(localStorage.getItem('key') || '');
}, []);`,
      
      windowDocument: `
// ❌ Problematic:
if (window.innerWidth > 768) { ... }

// ✅ Fix:
const [isMounted, setIsMounted] = useState(false);
useEffect(() => setIsMounted(true), []);
if (isMounted && window.innerWidth > 768) { ... }`
    };

    const foundPatterns = [...new Set(this.issues.map(i => i.pattern))];
    
    foundPatterns.forEach(pattern => {
      if (solutions[pattern]) {
        this.log(`${pattern.toUpperCase()}:`, 'info');
        console.log(solutions[pattern]);
        console.log('\n' + '-'.repeat(50) + '\n');
      }
    });
  }

  async run() {
    try {
      await this.detectHydrationIssues();
      this.generateReport();
      
      // Save detailed report to file
      const reportPath = path.join(this.projectPath, 'hydration-report.json');
      fs.writeFileSync(reportPath, JSON.stringify({
        timestamp: new Date().toISOString(),
        scannedFiles: this.scannedFiles,
        totalIssues: this.issues.length,
        issues: this.issues
      }, null, 2));
      
      this.log(`\n📊 Detailed report saved to: ${reportPath}`, 'success');
      
    } catch (error) {
      this.log(`Error during analysis: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// CLI usage
if (require.main === module) {
  const projectPath = process.argv[2] || '.';
  const detector = new HydrationDetector(projectPath);
  detector.run();
}

module.exports = HydrationDetector;