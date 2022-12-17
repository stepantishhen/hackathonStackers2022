import { IsString, IsUUID } from 'class-validator';

export class UserEventDTO {
  @IsString()
  @IsUUID()
  eventId!: string;
}
