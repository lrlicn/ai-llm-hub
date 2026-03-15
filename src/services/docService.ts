import MarkdownIt from 'markdown-it';
import type { DocMeta } from '@/types/doc';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface DocDetail extends DocMeta {
  content: string;
  toc: TocItem[];
  readingTime: number;
}

interface Frontmatter {
  title?: string;
  summary?: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

const docFiles = import.meta.glob('../data/docs/*.md', { query: '?raw', eager: true }) as Record<string, { default: string }>;

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = raw.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: raw };
  }
  
  const frontmatterStr = match[1];
  const content = raw.slice(match[0].length);
  const result: Frontmatter = {};
  
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
      result.tags = value.split(',').map(s => s.trim().replace(/['"]/g, ''));
    } else if (key === 'title') {
      result.title = value.startsWith('"') || value.startsWith("'") ? value.slice(1, -1) : value;
    } else if (key === 'summary') {
      result.summary = value.startsWith('"') || value.startsWith("'") ? value.slice(1, -1) : value;
    } else if (key === 'category') {
      result.category = value.startsWith('"') || value.startsWith("'") ? value.slice(1, -1) : value;
    } else if (key === 'createdAt') {
      result.createdAt = value.startsWith('"') || value.startsWith("'") ? value.slice(1, -1) : value;
    } else if (key === 'updatedAt') {
      result.updatedAt = value.startsWith('"') || value.startsWith("'") ? value.slice(1, -1) : value;
    }
  });
  
  return { frontmatter: result, content };
}

function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '');
    toc.push({ id, text, level });
  }
  
  return toc;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 300;
  const chineseCharsPerMinute = 400;
  
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;
  
  const readingTime = Math.ceil((chineseChars / chineseCharsPerMinute) + (englishWords / wordsPerMinute));
  return Math.max(1, readingTime);
}

function addHeadingIds(html: string, toc: TocItem[]): string {
  let result = html;
  toc.forEach(item => {
    const headingRegex = new RegExp(`^(<h${item.level}>)`, 'm');
    result = result.replace(headingRegex, `<h${item.level} id="${item.id}">`);
  });
  return result;
}

export function getAllDocsMeta(): DocMeta[] {
  return Object.keys(docFiles).map((path) => {
    const slug = path.split('/').pop()!.replace('.md', '');
    const raw = docFiles[path].default;
    const { frontmatter } = parseFrontmatter(raw);
    
    return {
      slug,
      title: frontmatter.title || slug,
      summary: frontmatter.summary,
      category: frontmatter.category || '默认分类',
      tags: frontmatter.tags || [],
      createdAt: frontmatter.createdAt,
      updatedAt: frontmatter.updatedAt
    } as DocMeta;
  });
}

export function getDocDetail(slug: string): DocDetail | null {
  const key = Object.keys(docFiles).find((p) => p.endsWith(`${slug}.md`));
  if (!key) return null;
  
  const raw = docFiles[key].default;
  const { frontmatter, content } = parseFrontmatter(raw);
  const toc = extractToc(content);
  const readingTime = calculateReadingTime(content);
  
  let html = md.render(content);
  html = addHeadingIds(html, toc);
  
  return {
    slug,
    title: frontmatter.title || slug,
    summary: frontmatter.summary,
    category: frontmatter.category || '默认分类',
    tags: frontmatter.tags || [],
    createdAt: frontmatter.createdAt,
    updatedAt: frontmatter.updatedAt,
    content: html,
    toc,
    readingTime
  };
}

export function getDocCategories(): string[] {
  const docs = getAllDocsMeta();
  const categories = new Set(docs.map(d => d.category).filter(Boolean));
  return ['全部', ...Array.from(categories)] as string[];
}
