export type TBlog = {
  title: string;
  description: string;
  content: string;
  tags: String[];
  readingTime: string;
  slug: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
