import { faker } from "@faker-js/faker";
import { IComment } from "@types";

export const CommentForm: IComment = {
  comment: faker.lorem.text(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
};
