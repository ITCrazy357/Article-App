import Article from "./models/article.model";

export const resolvers = {
  Query: {
    hello: () => "Hello World!",
    getListArticles: async () => {
      const articles = await Article.find({
        deleted: false,
      });
      return articles;
    },
    getArticles: async (_: any, { id }: { id: string }) => {
      const article = await Article.findOne({
        _id: id,
        deleted: false,
      });
      return article;
    },
  },
  Mutation: {
    createArticle: async (_: any, { input }: { input: any }) => {
      const article = new Article(input);
      await article.save();
      return article;
    },
  },
};
