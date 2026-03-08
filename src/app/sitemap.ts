import type { MetadataRoute } from 'next';
import { getAllTenants } from '@/lib/tenant';

const BASE_URL = 'https://prosite.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  const tenants = getAllTenants();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Tenant site pages
  const tenantPages: MetadataRoute.Sitemap = tenants.flatMap((tenant) => {
    const tenantUrl = `https://${tenant.slug}.prosite.kr`;

    const pages: MetadataRoute.Sitemap = [
      {
        url: tenantUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];

    // Tenant blog posts
    tenant.blogPosts
      .filter((post) => post.published)
      .forEach((post) => {
        pages.push({
          url: `${tenantUrl}/blog/${post.slug}`,
          lastModified: new Date(post.publishedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });

    return pages;
  });

  return [...staticPages, ...tenantPages];
}
