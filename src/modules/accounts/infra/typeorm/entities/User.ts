import { Expose, Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export default class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  avatar?: string;

  @Column({ default: false })
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string {
    switch (process.env.disk) {
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      case 'local':
        return `${process.env.APP_URL}:${process.env.PORT}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
