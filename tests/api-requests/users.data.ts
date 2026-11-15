import { faker } from "@faker-js/faker";

export function generateUser() {
  const unique = `${Date.now()}${faker.string.alphanumeric(5)}`.toLowerCase();
  return {
    user: {
      email: `qa_${unique}@test.com`,
      password: "Test123!@#",
      username: `qa_${unique}`,
    },
  };
}

