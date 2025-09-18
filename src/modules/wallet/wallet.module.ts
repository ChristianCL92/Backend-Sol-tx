import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Wallet } from './entities/wallet.entity';
import { TypeOrmModule } from "@nestjs/typeorm"
import { WalletHistory } from './entities/wallet-history.entity';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet,  WalletHistory ])
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService]
})
export class WalletModule {}
