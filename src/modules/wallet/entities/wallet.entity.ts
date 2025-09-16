import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity("wallets")
export class Wallet {
 @PrimaryGeneratedColumn("uuid")
 id: string;

 @Column({ unique: true, length: 44 })
  publicKey: string;

  @Column({ default: 'mainnet' })
  network: string;

  @Column('decimal', { precision: 18, scale: 9, default: 0 })
  lastKnownBalance: number;

  @Column('decimal', { precision: 4, scale: 4, default: 0.001 })
  spamThreshold: number;

  @Column({ default: 10 })
  preferredTxLimit: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastActiveAt: Date;

}