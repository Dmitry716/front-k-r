/**
 * Скрипт для валидации всех страниц сайта через W3C HTML Validator
 * Использование: node scripts/validate-all-pages.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Базовый URL сайта
const BASE_URL = 'https://k-r.by';

// Список страниц для проверки
const PAGES_TO_CHECK = [
  // Главная и статические страницы
  '/',
  '/contacts',
  '/cookies',
  '/policy',
  '/payment',
  '/granite',
  '/discount',
  
  // Информационные страницы
  '/why/contract',
  '/why/experience',
  '/why/granite',
  '/why/payment',
  '/why/quality',
  
  // Услуги
  '/services',
  '/services/3d',
  '/services/fence-installation',
  '/services/monument-dismantle',
  '/services/monument-installation',
  '/services/monument-production',
  
  // Дизайн
  '/design',
  '/design/epitaphs',
  '/design/medallions',
  '/design/portrait',
  '/design/text-engraving',
  
  // Каталоги
  '/monuments',
  '/monuments/cheap',
  '/monuments/single',
  '/monuments/double',
  '/monuments/exclusive',
  '/monuments/complex',
  
  '/fences',
  '/fences/metal',
  '/fences/concrete',
  
  '/accessories',
  '/accessories/vases',
  '/accessories/lamps',
  
  '/landscape',
  '/landscape/foundation',
  '/landscape/graves',
  
  // Блог и акции
  '/blog',
  '/sales',
  
  // Портфолио
  '/works',
  
  // Избранное
  '/favorites',
];

// Функция для валидации URL через W3C API
function validateURL(url) {
  return new Promise((resolve) => {
    const encodedURL = encodeURIComponent(url);
    const validatorURL = `https://validator.w3.org/nu/?doc=${encodedURL}&out=json`;
    
    https.get(validatorURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HTMLValidator/1.0)'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          const errors = result.messages.filter(m => m.type === 'error');
          const warnings = result.messages.filter(m => m.type === 'info' && m.subType === 'warning');
          
          resolve({
            url,
            success: true,
            errors: errors.length,
            warnings: warnings.length,
            messages: result.messages
          });
        } catch (error) {
          resolve({
            url,
            success: false,
            error: error.message
          });
        }
      });
    }).on('error', (error) => {
      resolve({
        url,
        success: false,
        error: error.message
      });
    });
  });
}

// Функция для задержки между запросами
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Главная функция
async function main() {
  console.log(`🔍 Начинаем проверку ${PAGES_TO_CHECK.length} страниц...\n`);
  
  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  
  for (let i = 0; i < PAGES_TO_CHECK.length; i++) {
    const page = PAGES_TO_CHECK[i];
    const fullURL = BASE_URL + page;
    
    process.stdout.write(`[${i + 1}/${PAGES_TO_CHECK.length}] Проверяем ${page}...`);
    
    const result = await validateURL(fullURL);
    results.push(result);
    
    if (result.success) {
      totalErrors += result.errors;
      totalWarnings += result.warnings;
      
      if (result.errors > 0) {
        console.log(` ❌ ${result.errors} ошибок`);
      } else if (result.warnings > 0) {
        console.log(` ⚠️  ${result.warnings} предупреждений`);
      } else {
        console.log(` ✅ OK`);
      }
    } else {
      console.log(` 💥 Ошибка валидации: ${result.error}`);
    }
    
    // Задержка между запросами (чтобы не перегружать W3C API)
    if (i < PAGES_TO_CHECK.length - 1) {
      await delay(2000); // 2 секунды между запросами
    }
  }
  
  // Сохраняем результаты
  const reportPath = path.join(__dirname, '..', 'validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 ИТОГИ ВАЛИДАЦИИ');
  console.log('='.repeat(60));
  console.log(`✅ Проверено страниц: ${PAGES_TO_CHECK.length}`);
  console.log(`❌ Всего ошибок: ${totalErrors}`);
  console.log(`⚠️  Всего предупреждений: ${totalWarnings}`);
  
  // Список страниц с ошибками
  const pagesWithErrors = results.filter(r => r.success && r.errors > 0);
  if (pagesWithErrors.length > 0) {
    console.log('\n📋 Страницы с ошибками:');
    pagesWithErrors.forEach(page => {
      console.log(`  ${page.url} - ${page.errors} ошибок`);
      
      // Показываем топ-3 ошибки
      const errorMessages = page.messages
        .filter(m => m.type === 'error')
        .slice(0, 3);
      
      errorMessages.forEach(msg => {
        console.log(`    - ${msg.message}`);
      });
    });
  }
  
  console.log(`\n📄 Полный отчёт сохранён в: ${reportPath}`);
  
  // Выход с кодом 0 если нет критичных ошибок
  process.exit(totalErrors > 0 ? 1 : 0);
}

main().catch(error => {
  console.error('💥 Критическая ошибка:', error);
  process.exit(1);
});
