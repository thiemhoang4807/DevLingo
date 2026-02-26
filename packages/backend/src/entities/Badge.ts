import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany 
} from "typeorm";
import type { UserBadge } from "./UserBadge";

@Entity("badges")
export class Badge {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", { nullable: false })
  name!: string;

  @Column("text", { nullable: true })
  description?: string | null;

  @Column("varchar", { nullable: true })
  iconUrl?: string | null;

  @Column("varchar", { nullable: true })
  conditionType?: string | null;

  @Column("integer", { nullable: true })
  conditionValue?: number | null;

  // One badge can be earned by many users
  @OneToMany("UserBadge", "badge")
  userBadges!: UserBadge[];
}