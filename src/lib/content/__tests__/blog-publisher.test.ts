import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  createBlogPost,
  generateSlug,
  buildFrontmatter,
} from '../blog-publisher';
import * as fs from 'fs';
import * as path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../../../..');
const TEST_CONTENT_DIR = path.join(PROJECT_ROOT, 'content');
const TEST_TENANT = '__test-tenant__';

describe('generateSlug', () => {
  it('converts Korean title to date-based slug', () => {
    const slug = generateSlug('이혼 소송 절차 완전 가이드');
    expect(slug).toMatch(/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/);
    expect(slug.length).toBeGreaterThan(0);
  });
});

describe('buildFrontmatter', () => {
  it('creates valid frontmatter string', () => {
    const fm = buildFrontmatter({
      title: '테스트 제목',
      date: '2026-03-08',
      category: '가족법',
      tags: ['이혼', '소송'],
      author: '김변호사',
      seoTitle: 'SEO 제목',
      seoDescription: 'SEO 설명',
      status: 'draft',
    });
    expect(fm).toContain('title: "테스트 제목"');
    expect(fm).toContain('category: "가족법"');
    expect(fm).toContain('status: "draft"');
  });
});

describe('createBlogPost', () => {
  beforeEach(() => {
    fs.mkdirSync(path.join(TEST_CONTENT_DIR, TEST_TENANT, 'blog'), {
      recursive: true,
    });
  });

  afterEach(() => {
    fs.rmSync(path.join(TEST_CONTENT_DIR, TEST_TENANT), {
      recursive: true,
      force: true,
    });
  });

  it('creates MDX file with frontmatter and content', () => {
    const post = createBlogPost({
      tenantSlug: TEST_TENANT,
      title: '테스트 포스트',
      body: '본문 내용입니다.',
      seoTitle: 'SEO 테스트',
      seoDescription: 'SEO 설명',
      tags: ['테스트'],
      category: '테스트',
      author: '테스트 작성자',
      contentDir: TEST_CONTENT_DIR,
    });

    expect(post.status).toBe('draft');
    expect(fs.existsSync(post.filePath)).toBe(true);

    const content = fs.readFileSync(post.filePath, 'utf-8');
    expect(content).toContain('title: "테스트 포스트"');
    expect(content).toContain('본문 내용입니다.');
  });
});
