import data from './pages.json';
export interface Answer {
  q: string;
  a: string;
}
export interface Chapter {
  title: string;
  subheads: string[];
  paragraphs: string[];
}
export interface PageData {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: Chapter[];
  faq: Answer[];
}
export interface FAQGroup {
  id: string;
  heading: string;
  items: Answer[];
}
export const pages = data as unknown as PageData[];
export const faqGroups = data.find((p) => p.path === '/faq')!.faq as unknown as FAQGroup[];
export const getPage = (path: string) => pages.find((p) => p.path === path)!;
