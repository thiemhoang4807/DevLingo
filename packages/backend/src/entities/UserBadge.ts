import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn,
  Index,
  type Relation 
} from "typeorm";
import type { User } from "./User";
import type { Badge } from "./Badge";

// Ensure a user cannot unlock the same badge twice
@Entity("user_badges")
@Index(["userId", "badgeId"], { unique: true })
export class UserBadge {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("uuid", { nullable: false })
  userId!: string;

  @Column("integer", { nullable: false })
  badgeId!: number;

  @CreateDateColumn({ type: "datetime" })
  unlockedAt!: Date;

  // Foreign keys
  @ManyToOne("User", "userBadges")
  @JoinColumn({ name: "userId" })
  user!: Relation<User>;

  @ManyToOne("Badge", "userBadges")
  @JoinColumn({ name: "badgeId" })
  badge!: Relation<Badge>;
}