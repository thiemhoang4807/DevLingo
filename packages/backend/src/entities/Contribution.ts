import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { User } from "./User"; 

@Entity("contributions")
@Index(["userId", "date"], { unique: true })
export class Contribution {
  @PrimaryGeneratedColumn()
  id!: number; // Thêm dấu ! ở đây

  @Column()
  userId!: string; // Thêm dấu ! ở đây

  @Column({ type: "varchar" })
  date!: string; // Thêm dấu ! ở đây

  @Column({ default: 1 })
  count!: number; // Thêm dấu ! ở đây

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user!: User; // Thêm dấu ! ở đây
}