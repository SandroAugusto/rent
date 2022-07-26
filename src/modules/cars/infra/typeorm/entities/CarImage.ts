import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity("cars_image")
class CarImage {
  @PrimaryColumn()
  id?: string;

  @Column()
  image_name: string;

  @Column()
  car_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
      this.created_at = new Date();
    }
  }
}

export { CarImage }