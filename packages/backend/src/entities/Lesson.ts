import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany 
} from "typeorm";
import type { Term } from "./Term";

@Entity("lessons")
export class Lesson {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", { nullable: false })
  title!: string;

  @Column("text", { nullable: true })
  description?: string | null;

  // MỚI: Thêm cột để lưu đường dẫn ảnh Thumbnail
  // Chúng ta để nullable: true để các bài học cũ không bị lỗi khi chưa có ảnh
  @Column("varchar", { nullable: true })
  thumbnailUrl?: string | null;

  @Column("integer", { nullable: true })
  orderIndex?: number | null;

  @Column("boolean", { default: false })
  isPublished!: boolean;

  // One lesson has many terms
  @OneToMany("Term", "lesson")
  terms!: Term[];
}