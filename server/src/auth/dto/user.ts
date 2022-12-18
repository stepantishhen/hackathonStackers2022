import { User } from '@prisma/client';

export class UserDTO {
  id: string;
  email: string;
  firstName: string;
  surname: string;
  patronymic: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.surname = user.surname;
    this.patronymic = user.patronymic;
  }
}
