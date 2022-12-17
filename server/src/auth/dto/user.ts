import { User } from '@prisma/client';

export class UserDTO {
  id: string;

  constructor(user: User) {
    this.id = user.id;
  }
}
