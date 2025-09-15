export interface Blog {
  id: number;
  title: string;
  author: string;
  publishDate: string | Date;
  excerpt: string;
  content: string;
  tags?: string[]; // Optional property
  date: string; // ISO string format
}
