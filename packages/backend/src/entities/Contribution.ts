import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  type Relation,
} from "typeorm";
import { Lesson } from "./Lesson";
import { User } from "./User";

@Entity("contributions")
export class Contribution {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("integer", { nullable: false })
  lessonId!: number;

  @Column("varchar", { nullable: false })
  termName!: string;

  @Column("text", { nullable: false })
  definition!: string;

  @Column("text", { nullable: true })
  imageUrl?: string | null;

  @Column("varchar", { default: "pending" })
  status!: "pending" | "approved" | "rejected";

  @Column("text", { nullable: true })
  reviewNote?: string | null;

  @Column("varchar", { nullable: false })
  contributorId!: string;

  @Column("varchar", { nullable: true })
  reviewedBy?: string | null;

  @Column("datetime", { nullable: true })
  reviewedAt?: Date | null;

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt!: Date;

  @ManyToOne(() => Lesson, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "lessonId" })
  lesson!: Relation<Lesson>;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "contributorId" })
  contributor!: Relation<User>;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "reviewedBy" })
  reviewer?: Relation<User> | null;
}