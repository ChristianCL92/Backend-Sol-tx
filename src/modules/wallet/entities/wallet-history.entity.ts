import { Entity,
        PrimaryGeneratedColumn,
        Column,
        CreateDateColumn,
        JoinColumn,
        ManyToOne  
        } from "typeorm"
        import { Wallet } from "./wallet.entity";


@Entity("wallet_history")
export class WalletHistory {
   @PrimaryGeneratedColumn()
   id:number

  @ManyToOne(() => Wallet, (wallet) => wallet.history)
  @JoinColumn({ name: 'walletId' })
  wallet: Wallet;

   @Column()
   walletId: string

   @Column("decimal", {precision: 18, scale: 9})
   balance: number

  @Column('float', { nullable: true })
  spamThreshold: number;

  @Column({nullable: true})
  preferredTxLimit: number

  @Column()
  changeType: string; 

  @CreateDateColumn()
  timestamp: Date;

  
  @Column({ nullable: true })
  notes: string;  

}