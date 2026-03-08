import * as fs from 'fs';
import * as path from 'path';

function mdxToNaverHtml(mdxContent: string): string {
  const bodyMatch = mdxContent.match(/^---[\s\S]*?---\n\n([\s\S]*)$/);
  const body = bodyMatch?.[1] ?? mdxContent;

  let html = body
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.+?)\*/g, '<i>$1</i>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');

  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
  html = html.replace(/<\/ul><br\/><ul>/g, '');

  return `<p>${html}</p>`;
}

function extractFrontmatter(mdx: string): Record<string, string> {
  const match = mdx.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const fm: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*"?(.+?)"?$/);
    if (kv) fm[kv[1]] = kv[2];
  }
  return fm;
}

function extractTags(mdx: string): string[] {
  const match = mdx.match(/tags:\s*\[(.+?)\]/);
  if (!match) return [];
  return match[1].split(',').map((t) => t.trim().replace(/"/g, ''));
}

async function run() {
  const args = process.argv.slice(2);
  const filePath = args[0];

  if (!filePath) {
    console.log('Usage: npx tsx scripts/naver-blog-sync.ts <path-to-mdx>');
    console.log('  Options: --output=<file>  Save to file instead of stdout');
    process.exit(1);
  }

  const outputArg = args
    .find((a) => a.startsWith('--output='))
    ?.split('=')[1];
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  const mdxContent = fs.readFileSync(absolutePath, 'utf-8');
  const frontmatter = extractFrontmatter(mdxContent);
  const tags = extractTags(mdxContent);
  const html = mdxToNaverHtml(mdxContent);

  const output = `
=== 네이버 블로그 포맷 ===

[제목]
${frontmatter.title ?? '(제목 없음)'}

[태그]
${tags.join(', ')}

[HTML 본문]
${html}

=== 끝 ===
`.trim();

  if (outputArg) {
    fs.writeFileSync(outputArg, output, 'utf-8');
    console.log(`Saved to: ${outputArg}`);
  } else {
    console.log(output);
  }
}

run().catch(console.error);
