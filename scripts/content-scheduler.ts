import * as path from 'path';
import * as fs from 'fs';
import { generateContent } from '../src/lib/content/ai-generator';
import { validateContent } from '../src/lib/content/content-validator';
import { createBlogPost } from '../src/lib/content/blog-publisher';
import { getKeywords } from '../src/lib/content/keyword-research';
import type { ContentRequest, Profession } from '../src/lib/content/types';

interface TenantConfig {
  slug: string;
  profession: Profession;
  specialty: string;
  region: string;
  author: string;
  tone: 'professional' | 'friendly' | 'educational';
}

const SAMPLE_TENANTS: TenantConfig[] = [
  {
    slug: 'kim-lawyer',
    profession: 'lawyer',
    specialty: '이혼/가사',
    region: '서울 강남',
    author: '김변호사',
    tone: 'professional',
  },
  {
    slug: 'park-tax',
    profession: 'tax_accountant',
    specialty: '종합소득세',
    region: '서울 서초',
    author: '박세무사',
    tone: 'friendly',
  },
  {
    slug: 'lee-patent',
    profession: 'patent_attorney',
    specialty: '특허/상표',
    region: '서울 역삼',
    author: '이변리사',
    tone: 'educational',
  },
];

async function run() {
  const args = process.argv.slice(2);
  const tenantArg = args
    .find((a) => a.startsWith('--tenant='))
    ?.split('=')[1];
  const countArg = parseInt(
    args.find((a) => a.startsWith('--count='))?.split('=')[1] ?? '1',
    10,
  );

  const tenants = tenantArg
    ? SAMPLE_TENANTS.filter((t) => t.slug === tenantArg)
    : SAMPLE_TENANTS;

  if (tenants.length === 0) {
    console.error(`Tenant "${tenantArg}" not found.`);
    process.exit(1);
  }

  const projectRoot = path.resolve(__dirname, '..');
  const contentDir = path.join(projectRoot, 'content');
  const logDir = path.join(projectRoot, 'data', 'content-logs');
  fs.mkdirSync(logDir, { recursive: true });

  const logs: string[] = [];

  for (const tenant of tenants) {
    console.log(`\n=== ${tenant.author} (${tenant.slug}) ===`);

    const keywords = await getKeywords(tenant.profession);
    const topKeywords = keywords.slice(0, countArg);

    for (const kw of topKeywords) {
      console.log(`  Generating: "${kw.keyword}"`);

      const request: ContentRequest = {
        profession: tenant.profession,
        specialty: tenant.specialty,
        region: tenant.region,
        topic: kw.keyword,
        tone: tenant.tone,
        tenantSlug: tenant.slug,
      };

      const generated = await generateContent(request);

      const validation = validateContent(tenant.profession, generated.body);
      if (!validation.isValid) {
        console.log(`    Warnings: ${validation.warnings.join(', ')}`);
        console.log('    Auto-fixing...');
      }

      const post = createBlogPost({
        tenantSlug: tenant.slug,
        title: generated.title,
        body: validation.autoFixed,
        seoTitle: generated.seoTitle,
        seoDescription: generated.seoDescription,
        tags: generated.tags,
        category: generated.category,
        author: tenant.author,
        contentDir,
      });

      console.log(`    Created: ${post.filePath}`);
      logs.push(
        `[${new Date().toISOString()}] ${tenant.slug} — "${generated.title}" → ${post.filePath}`,
      );
    }
  }

  const logFile = path.join(
    logDir,
    `${new Date().toISOString().slice(0, 10)}.log`,
  );
  fs.appendFileSync(logFile, logs.join('\n') + '\n', 'utf-8');
  console.log(`\nLog saved: ${logFile}`);
}

run().catch(console.error);
