import * as fs from 'fs';
import * as path from 'path';
import type { BlogFrontmatter, BlogPost } from './types';

export function generateSlug(title: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const sanitized = title
    .toLowerCase()
    .replace(/[가-힣]+/g, (match) => {
      let hash = 0;
      for (let i = 0; i < match.length; i++) {
        hash = (hash << 5) - hash + match.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash).toString(36);
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return `${date}-${sanitized}`.slice(0, 80);
}

export function buildFrontmatter(fm: BlogFrontmatter): string {
  const lines = [
    '---',
    `title: "${fm.title}"`,
    `date: "${fm.date}"`,
    `category: "${fm.category}"`,
    `tags: [${fm.tags.map((t) => `"${t}"`).join(', ')}]`,
    `author: "${fm.author}"`,
    `seoTitle: "${fm.seoTitle}"`,
    `seoDescription: "${fm.seoDescription}"`,
    `status: "${fm.status}"`,
    '---',
  ];
  return lines.join('\n');
}

interface CreateBlogPostOptions {
  tenantSlug: string;
  title: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  category: string;
  author: string;
  contentDir: string;
  status?: 'draft' | 'scheduled' | 'published';
}

export function createBlogPost(options: CreateBlogPostOptions): BlogPost {
  const slug = generateSlug(options.title);
  const date = new Date().toISOString().slice(0, 10);
  const status = options.status ?? 'draft';

  const frontmatter: BlogFrontmatter = {
    title: options.title,
    date,
    category: options.category,
    tags: options.tags,
    author: options.author,
    seoTitle: options.seoTitle,
    seoDescription: options.seoDescription,
    status,
  };

  const mdxContent = `${buildFrontmatter(frontmatter)}\n\n${options.body}\n`;

  const dir = path.join(options.contentDir, options.tenantSlug, 'blog');
  fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `${slug}.mdx`);
  fs.writeFileSync(filePath, mdxContent, 'utf-8');

  return {
    slug,
    filePath,
    frontmatter,
    content: options.body,
    status,
  };
}
