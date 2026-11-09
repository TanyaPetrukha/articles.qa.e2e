import { faker } from "@faker-js/faker";

const { EMAIL, USER_NAME, PASSWORD } = process.env;

export const userRegisterData = {
  user: {
    email: faker.internet.email(),
    password: "Test123!@#",
    username: faker.person.firstName(),
  },
};

export const userUpdateData = {
  user: {
    bio: faker.person.bio(),
    image: faker.image.avatar(),
  },
};

export const userLoginData = {
  email: EMAIL,
  password: PASSWORD,
};
