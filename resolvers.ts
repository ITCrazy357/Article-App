import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
  Query: {
    getListArticles: async () => {
      const articles = await Article.find({
        deleted: false,
      });
      return articles;
    },
    getListCategories: async () => {
      const categories = await Category.find({
        deleted: false,
      });
      return categories;
    },
    getArticles: async (_: any, { id }: { id: string }) => {
      const article = await Article.findOne({
        _id: id,
        deleted: false,
      });
      return article;
    },
    getCategories: async (_: any, { id }: { id: string }) => {
      const category = await Category.findOne({
        _id: id,
        deleted: false,
      });
      return category;
    },
  },
  Article: {
    category: async (parent: any) => {
      const category = await Category.findOne({
        _id: parent.categoryId,
        deleted: false,
      });
      return category;
    },
  },
  Mutation: {
    createArticle: async (_: any, { input }: { input: any }) => {
      const article = new Article(input);
      await article.save();
      return article;
    },
    updateArticle: async (
      _: any,
      { id, input }: { id: string; input: any },
    ) => {
      await Article.updateOne(
        {
          _id: id,
          deleted: false,
        },
        input,
      );
      return "Cập nhật bài viết thành công";
    },
    deleteArticle: async (_: any, { id }: { id: string }) => {
      await Article.updateOne(
        {
          _id: id,
          deleted: false,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        },
      );
      return "Xóa bài viết thành công";
    },
    createCategory: async (_: any, { input }: { input: any }) => {
      const category = new Category(input);
      await category.save();
      return category;
    },
    updateCategory: async (
      _: any,
      { id, input }: { id: string; input: any },
    ) => {
      await Category.updateOne(
        {
          _id: id,
          deleted: false,
        },
        input,
      );
      return "Cập nhật danh mục thành công";
    },
    deleteCategory: async (_: any, { id }: { id: string }) => {
      await Category.updateOne(
        {
          _id: id,
          deleted: false,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        },
      );
      return "Xóa danh mục thành công";
    },
  },
};
