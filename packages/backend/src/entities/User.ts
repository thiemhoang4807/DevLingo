import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  Index,
  OneToMany // Thêm cái này
} from "typeorm";
import { UserBadge } from "./UserBadge"; // Import thêm
import { UserProgress } from "./UserProgress"; // Import thêm

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

  @Column("varchar", { nullable: true })
  avatar?: string | null;

  @Index()
  @Column("integer", { default: 0 })
  xp!: number;

  @Column("integer", { default: 1 })
  level!: number;

  @Column("integer", { default: 0 })
  peakXp!: number;

  @Column("integer", { default: 1 })
  peakLevel!: number;

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;

  // ✅ BỔ SUNG: Để có thể truy xuất huy hiệu từ User
  @OneToMany(() => UserBadge, (ub) => ub.user)
  userBadges!: UserBadge[];

  // ✅ BỔ SUNG: Để có thể truy xuất tiến độ từ User
  @OneToMany(() => UserProgress, (up) => up.user)
  progressRecords!: UserProgress[];
}