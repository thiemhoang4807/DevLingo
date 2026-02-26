import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn, 
  type Relation 
} from "typeorm";
import type { Lesson } from "./Lesson";
import type { Term } from "./Term";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("integer", { nullable: false })
  lessonId!: number;

  @Column("integer", { nullable: false })
  termId!: number;

  @Column("text", { nullable: false })
  questionText!: string;

  @Column("varchar", { nullable: false })
  optionA!: string;

  @Column("varchar", { nullable: false })
  optionB!: string;

  @Column("varchar", { nullable: false })
  optionC!: string;

  @Column("varchar", { nullable: false })
  optionD!: string;

  @Column("varchar", { length: 1, nullable: false })
  correctOption!: string;

  @Column("integer", { default: 10 })
  xpReward!: number;

  // Foreign keys
  @ManyToOne("Lesson", "questions")
  @JoinColumn({ name: "lessonId" })
  lesson!: Relation<Lesson>;

  @ManyToOne("Term", "questions")
  @JoinColumn({ name: "termId" })
  term!: Relation<Term>;
}