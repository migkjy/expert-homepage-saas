export type Profession = 'lawyer' | 'tax_accountant' | 'patent_attorney';

export type ContentTone = 'professional' | 'friendly' | 'educational';

export interface ContentRequest {
  profession: Profession;
  specialty: string;
  region: string;
  topic: string;
  tone: ContentTone;
  tenantSlug: string;
}

export interface GeneratedContent {
  title: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  category: string;
}

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  autoFixed: string;
}

export interface BlogPost {
  slug: string;
  filePath: string;
  frontmatter: BlogFrontmatter;
  content: string;
  status: 'draft' | 'scheduled' | 'published';
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  seoTitle: string;
  seoDescription: string;
  status: 'draft' | 'scheduled' | 'published';
}

export interface KeywordResult {
  keyword: string;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  profession: Profession;
}

export const PROFESSION_LABELS: Record<Profession, string> = {
  lawyer: '변호사',
  tax_accountant: '세무사',
  patent_attorney: '변리사',
};

export const PROHIBITED_EXPRESSIONS: Record<Profession, RegExp[]> = {
  lawyer: [
    /승소율\s*\d+%/g,
    /최고의?\s*(변호사|로펌|법률)/g,
    /1등\s*(변호사|로펌)/g,
    /무조건\s*(승소|이김)/g,
    /100%\s*(승소|성공|해결)/g,
    /업계\s*최초/g,
    /대한민국\s*(최고|1위|넘버원)/g,
  ],
  tax_accountant: [
    /탈세\s*(방법|노하우|팁)/g,
    /세금\s*(안\s*내는|회피)\s*(방법|노하우)/g,
    /무조건\s*(환급|절세)/g,
    /100%\s*(환급|절세|성공)/g,
  ],
  patent_attorney: [
    /100%\s*(등록|승인|성공)/g,
    /무조건\s*(등록|특허)/g,
    /최고의?\s*(변리사|특허)/g,
    /허위\s*(성공|등록)\s*사례/g,
  ],
};
