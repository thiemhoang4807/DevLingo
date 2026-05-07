import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn, 
  Index,
  type Relation 
} from "typeorm";
import type { User } from "./User";
import type { Lesson } from "./Lesson";

// Ensure a user can only have one progress record per lesson
@Entity("user_progress")
@Index(["userId", "lessonId"], { unique: true })
export class UserProgress {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("uuid", { nullable: false })
  userId!: string;

  @Column("integer", { nullable: false })
  lessonId!: number;

  @Column("integer", { default: 0 })
  highestScore!: number;

  @Column("varchar", { default: "learning" })
  status!: string;

  @Column("timestamp", { nullable: true })
  completedAt?: Date | null;

  // Foreign keys
  @ManyToOne("User", "progressRecords")
  @JoinColumn({ name: "userId" })
  user!: Relation<User>;

  @ManyToOne("Lesson", "progressRecords")
  @JoinColumn({ name: "lessonId" })
  lesson!: Relation<Lesson>;
}