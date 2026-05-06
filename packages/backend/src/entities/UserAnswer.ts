import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation
} from "typeorm";
import type { User } from "./User";
import type { Question } from "./Question";

@Entity("user_answers")
export class UserAnswer {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("uuid", { nullable: false })
  userId!: string;

  @Column("integer", { nullable: false })
  questionId!: number;

  @Column("integer", { nullable: false })
  selectedOption!: number; // 0=A, 1=B, 2=C, 3=D

  @Column("boolean", { default: false })
  isCorrect!: boolean;

  @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
  answeredAt!: Date;

  // Relations
  @ManyToOne("User")
  @JoinColumn({ name: "userId" })
  user!: Relation<User>;

  @ManyToOne("Question")
  @JoinColumn({ name: "questionId" })
  question!: Relation<Question>;
}
