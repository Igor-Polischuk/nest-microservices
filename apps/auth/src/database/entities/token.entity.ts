import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  token: string;

  @Column()
  userId: string;
}
