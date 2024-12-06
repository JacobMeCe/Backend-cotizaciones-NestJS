import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum Status_Customer {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column({ type: "text", unique: true })
  address: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text", unique: true })
  phone_number: string;

  @Column({
    type: "enum",
    enum: Status_Customer,
    default: Status_Customer.ACTIVE,
  })
  status: Status_Customer;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
  })
  created_in: Date;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_in: Date;
}
