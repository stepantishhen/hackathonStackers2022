import { IsString, IsUUID } from 'class-validator';

export class ScanDTO {
  @IsString()
  @IsUUID()
  eventId!: string;

  @IsString()
  @IsUUID()
  userId!: string;
}
