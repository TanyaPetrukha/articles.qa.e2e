import { faker } from "@faker-js/faker";

export function generateArticleForm() {
  const unique = `${Date.now()}${faker.string.alphanumeric(5)}`;
  return {
    title: `Form title ${unique}`,
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
  };
}

export function generateRouteTitle() {
  return `Route title ${Date.now()}${faker.string.alphanumeric(5)}`;
}

export const mockedArticle = {
  slug: "mocked-article-from-route",
  title: "Mocked article from page.route",
  description: "This article exists only in route.fulfill",
  body: "Mocked body",
  tagList: ["mock"],
  category: "general",
  visibility: "public",
  allowComments: true,
  cover: "",
  createdAt: "2026-11-15T10:00:00.000Z",
  updatedAt: "2026-11-15T10:00:00.000Z",
  favorited: false,
  favoritesCount: 0,
  author: {
    username: "mock_author",
    bio: "",
    image: "/avatar-placeholder.svg",
    following: false,
  },
};
