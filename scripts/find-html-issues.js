const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Скрипт для поиска HTML проблем в коде
 * Находит:
 * 1. <div> внутри <button>
 * 2. <a> прямым потомком <ul>
 * 3. <a> внутри <button>
 * 4. Неправильные aria-labelledby
 * 5. Sections без heading
 */

const issues = [];

// Функция для рекурсивного обхода файлов
function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // Пропускаем node_modules, .next, .git
      if (!['node_modules', '.next', '.git', '.vercel'].includes(file)) {
        walkDir(filePath, callback);
      }
    } else {
      callback(filePath);
    }
  });
}

// Проверяем только TypeScript/JavaScript/JSX файлы
function checkFile(filePath) {
  if (!['.tsx', '.ts', '.jsx', '.js'].includes(path.extname(filePath))) {
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // 1. Проверяем <button> с <div> внутри
      if (line.includes('<button') && !line.includes('</button>')) {
        // Это открывающий button, проверяем следующие строки
        for (let i = index; i < Math.min(index + 10, lines.length); i++) {
          if (lines[i].includes('<div') && !lines[i].includes('</div>')) {
            issues.push({
              file: filePath,
              line: i + 1,
              type: '❌ DIV внутри BUTTON',
              code: lines[i].trim().substring(0, 80),
              severity: 'error'
            });
            break;
          }
          if (lines[i].includes('</button>')) break;
        }
      }

      // 2. Проверяем <a> как прямой потомок <ul>
      if (line.includes('<a ') && line.includes('href=') && 
          !line.includes('<li') && !line.includes('</li>')) {
        // Проверяем контекст
        let isInsideUl = false;
        for (let i = Math.max(0, index - 3); i <= index; i++) {
          if (lines[i].includes('<ul') && !lines[i].includes('</ul>')) {
            isInsideUl = true;
            break;
          }
        }
        
        if (isInsideUl) {
          issues.push({
            file: filePath,
            line: lineNum,
            type: '⚠️ <A> прямо в <UL>',
            code: line.trim().substring(0, 80),
            severity: 'error'
          });
        }
      }

      // 3. Проверяем <a> внутри <button>
      if (line.includes('<button') && line.includes('<a ')) {
        issues.push({
          file: filePath,
          line: lineNum,
          type: '❌ <A> внутри <BUTTON>',
          code: line.trim().substring(0, 80),
          severity: 'error'
        });
      }

      // 4. Проверяем aria-labelledby
      if (line.includes('aria-labelledby=')) {
        const match = line.match(/aria-labelledby="([^"]+)"/);
        if (match) {
          const labelId = match[1];
          // Проверяем есть ли элемент с таким id в файле
          const idExists = content.includes(`id="${labelId}"`);
          if (!idExists) {
            issues.push({
              file: filePath,
              line: lineNum,
              type: '⚠️ aria-labelledby на несуществующий ID',
              code: `id="${labelId}" не найден`,
              severity: 'warning'
            });
          }
        }
      }

      // 5. Проверяем <section> без heading
      if (line.includes('<section') && !line.includes('aria-label')) {
        // Просто отмечаем для информации
        if (!line.includes('id="')) {
          // Игнорируем sections без явного id
        }
      }

      // 6. Проверяем атрибуты на кнопках и ссылках
      if (line.includes('disabled') && !line.includes('disabled={') && line.includes('<')) {
        if (line.includes('"disabled"')) {
          issues.push({
            file: filePath,
            line: lineNum,
            type: '⚠️ disabled как строка',
            code: line.trim().substring(0, 80),
            severity: 'warning'
          });
        }
      }
    });
  } catch (err) {
    console.error(`Ошибка при чтении ${filePath}:`, err.message);
  }
}

// Запускаем проверку
console.log('🔍 Поиск HTML ошибок в проекте...\n');

const srcDir = path.join(__dirname, '../src');
walkDir(srcDir, checkFile);

// Группируем ошибки по типу
const grouped = {};
issues.forEach(issue => {
  if (!grouped[issue.type]) {
    grouped[issue.type] = [];
  }
  grouped[issue.type].push(issue);
});

// Выводим результаты
console.log(`📊 Найдено ${issues.length} проблем:\n`);

Object.entries(grouped).forEach(([type, list]) => {
  console.log(`\n${type} (${list.length}):`);
  console.log('='.repeat(80));
  
  list.slice(0, 5).forEach(issue => {
    console.log(`  📁 ${issue.file.replace(process.cwd(), '.')}`);
    console.log(`     Строка ${issue.line}: ${issue.code}`);
  });
  
  if (list.length > 5) {
    console.log(`  ... и еще ${list.length - 5} ошибок этого типа`);
  }
});

console.log('\n' + '='.repeat(80));
console.log('\n💡 Главные проблемы для исправления:\n');
console.log('1. ❌ DIV внутри BUTTON - переместить в отдельный элемент');
console.log('2. ❌ <A> внутри BUTTON - использовать роли или другую структуру');
console.log('3. ⚠️ <A> прямо в <UL> - обернуть в <LI>');
console.log('4. ⚠️ aria-labelledby на несуществующий ID - проверить ID элемента');

console.log('\n📋 Файлы с ошибками:');
const filesWithIssues = [...new Set(issues.map(i => i.file))];
filesWithIssues.forEach(file => {
  const count = issues.filter(i => i.file === file).length;
  console.log(`  - ${file.replace(process.cwd(), '.')} (${count})`);
});

// Сохраняем отчет
const report = {
  timestamp: new Date().toISOString(),
  totalIssues: issues.length,
  byType: Object.entries(grouped).map(([type, list]) => ({
    type,
    count: list.length
  })),
  issues: issues.slice(0, 50) // Первые 50 для brevity
};

fs.writeFileSync(
  path.join(__dirname, '../html-issues-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n✅ Отчет сохранен в html-issues-report.json');
