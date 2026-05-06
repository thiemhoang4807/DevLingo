const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const jwt = require('jsonwebtoken');

const MOCK_DATA_DIR = path.join(__dirname, 'TermsData');
const API_URL = process.env.API_URL || 'http://127.0.0.1:5000/api/terms';
const JWT_SECRET = process.env.JWT_SECRET || 'DEVLINGO_SUPER_SECRET_KEY_CHANGE_ME';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || `Bearer ${jwt.sign(
  {
    id: process.env.ADMIN_USER_ID || 'seed-admin',
    role: 'admin'
  },
  JWT_SECRET,
  { expiresIn: '1h' }
)}`;

const categoryToLessonId = {
  'Internet Terms': 1,
  'Hardware Terms': 2,
  'Software Terms': 3,
  'Technical Terms': 4
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function termKey(termName, lessonId) {
  return `${lessonId}:${String(termName || '').trim().toLowerCase()}`;
}

async function fetchWithRetry(url, options = {}, retries = 20, intervalMs = 1000) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (response.ok || attempt === retries) {
        return response;
      }

      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await delay(intervalMs);
  }

  throw lastError;
}

async function loadExistingTerms() {
  const response = await fetchWithRetry(API_URL);

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(responseText || `HTTP ${response.status}`);
  }

  const payload = await response.json();
  const terms = Array.isArray(payload.data) ? payload.data : [];

  return new Set(terms.map((term) => termKey(term.termName, term.lessonId)));
}

async function seedData() {
  console.log('Bat dau quet file .md...');
  console.log(`API_URL: ${API_URL}`);

  if (!fs.existsSync(MOCK_DATA_DIR)) {
    throw new Error(`Khong tim thay thu muc du lieu: ${MOCK_DATA_DIR}`);
  }

  const existingTerms = await loadExistingTerms();
  const categories = fs.readdirSync(MOCK_DATA_DIR);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const category of categories) {
    const categoryPath = path.join(MOCK_DATA_DIR, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const filePath = path.join(categoryPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = matter(fileContent);
      const data = parsed.data;
      const content = parsed.content;
      const mappedLessonId = categoryToLessonId[data.category] || 1;
      const key = termKey(data.title, mappedLessonId);

      if (existingTerms.has(key)) {
        skipped += 1;
        console.log(`Bo qua da ton tai: ${data.title}`);
        continue;
      }

      try {
        const response = await fetchWithRetry(API_URL, {
          method: 'POST',
          headers: {
            Authorization: ADMIN_TOKEN,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            termName: data.title,
            definition: content.trim(),
            lessonId: mappedLessonId,
            imageUrl: data.imageUrl || null
          })
        }, 3, 1000);

        if (!response.ok) {
          const responseText = await response.text();
          throw new Error(responseText || `HTTP ${response.status}`);
        }

        existingTerms.add(key);
        created += 1;
        console.log(`Da nap thanh cong: ${data.title}`);
        await delay(200);
      } catch (error) {
        failed += 1;
        console.error(`Loi khi nap [${data.title}]:`, error.message);
      }
    }
  }

  console.log(`Hoan tat seed. Tao moi: ${created}, bo qua: ${skipped}, loi: ${failed}`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

seedData().catch((error) => {
  console.error('Seeder failed:', error.message);
  process.exit(1);
});
