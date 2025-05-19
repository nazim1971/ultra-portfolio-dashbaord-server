import { TBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: TBlog) => {
  const blog = await Blog.create(payload);
  return blog;
};

const getBlogById = async (id: string) => {
  const blog = await Blog.findById(id);
  return blog;
};

const getAllBlogs = async (filter = {}, options = {}) => {
  const blogs = await Blog.find(filter, null, options);
  return blogs;
};

const updateBlog = async (id: string, payload: Partial<TBlog>) => {
  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return updatedBlog;
};

const deleteBlog = async (id: string) => {
  const deleted = await Blog.findByIdAndDelete(id);
  return deleted;
};

export const BlogService = {
  createBlog,
  getBlogById,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
