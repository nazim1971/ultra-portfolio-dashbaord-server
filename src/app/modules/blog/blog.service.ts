import QueryBuilder from '../../builder/queryBuilder';
import { ensureExists } from '../../utils/isExist';
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

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogsQuery = Blog.find(); // Start with a blank query

  const queryBuilder = new QueryBuilder<TBlog>(blogsQuery, query)
    .search(['title', 'description', 'content', 'tags']) // searchable fields
    .filter()
    .sort()
    .paginate()
    .fields();

  const blogs = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    meta,
    data: blogs,
  };
};


const updateBlog = async (id: string, payload: Partial<TBlog>) => {
  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return updatedBlog;
};

const deleteBlog = async (id: string) => {
  const deleted = await Blog.findByIdAndDelete(id);
  ensureExists(deleted, "Blog not found!");
  return deleted;
};

export const BlogService = {
  createBlog,
  getBlogById,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
