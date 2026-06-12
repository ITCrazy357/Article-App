import Category from "./../models/category.model";

export const resolversCategory = {
  Query: {
    getListCategories: async () => {
      const categories = await Category.find({
        deleted: false,
      });
      return categories;
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
    // Resolver để lấy thông tin danh mục của bài viết
    category: async (parent: any) => {
      const category = await Category.findOne({
        _id: parent.categoryId,
        deleted: false,
      });
      return category;
    },
  },

  Mutation: {
    // Tạo mới danh mục
    createCategory: async (_: any, { input }: { input: any }) => {
      const category = new Category(input);
      await category.save();
      return category;
    },

    // Cập nhật danh mục
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

    // Xóa mềm danh mục
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
