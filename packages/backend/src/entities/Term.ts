import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn,
  UpdateDateColumn,
  type Relation 
} from "typeorm";
import type { Lesson } from "./Lesson";

@Entity("terms")
export class Term {
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

  @Column("text", { nullable: true })
  slangExplanation?: string | null;

  @Column("text", { nullable: true })
  example?: string | null;

  @Column("integer", { default: 0 })
  viewCount!: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  // Many terms belong to one lesson
  @ManyToOne("Lesson", "terms")
  @JoinColumn({ name: "lessonId" })
  lesson!: Relation<Lesson>;
}