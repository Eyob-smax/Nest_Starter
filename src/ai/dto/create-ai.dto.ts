import { IsString } from 'class-validator';

export class CreateAiDto {
  @IsString()
  query: string;
}
