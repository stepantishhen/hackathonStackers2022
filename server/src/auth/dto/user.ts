import { Admin, User, Visitor } from '@prisma/client';

export class UserDTO {
  id: string;
  email: string;
  firstName: string;
  surname: string;
  patronymic: string;
  type: 'visitor' | 'admin';

  constructor(
    user: User & {
      visitor: Visitor;
      admin: Admin;
    },
  ) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.surname = user.surname;
    this.patronymic = user.patronymic;
    this.type = !!user.visitor ? 'visitor' : 'admin';
  }
}
