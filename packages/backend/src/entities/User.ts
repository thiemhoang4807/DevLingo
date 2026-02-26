import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn 
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { unique: true, nullable: false })
  username!: string;

  @Column("varchar", { nullable: false })
  passwordHash!: string;

  @Column("varchar", { nullable: true })
  fullName?: string | null;

  @Column("varchar", { default: "student" })
  role!: string;

  @Column("integer", { default: 0 })
  xp!: number;

  @Column("integer", { default: 1 })
  level!: number;

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;
}