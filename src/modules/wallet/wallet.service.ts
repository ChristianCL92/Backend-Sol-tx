import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from "typeorm"
import { Wallet } from './entities/wallet.entity';
import { WalletHistory } from './entities/wallet-history.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';


@Injectable()
export class WalletService {
   constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    @InjectRepository(WalletHistory) private walletHistoryRepository: Repository<WalletHistory> 
){}

async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const existingWallet = await this.walletRepository.findOne({
      where: { publicKey: createWalletDto.publicKey }
    });

    if (existingWallet) {
      throw new ConflictException("Wallet instance already present");
    }

    // Create wallet
    const wallet = this.walletRepository.create({
      ...createWalletDto,
      createdAt: new Date()
    });
    const savedWallet = await this.walletRepository.save(wallet);

    // Create initial history record
    await this.createHistoryRecord(savedWallet, 'initial_connect');

    return savedWallet;
  }

  async findByPublicKey(publicKey: string): Promise<Wallet | null> {
    return await this.walletRepository.findOne({ where: { publicKey } });
  }

  async ping(publicKey: string): Promise<Wallet> {
    const wallet = await this.findByPublicKey(publicKey);
    if (!wallet) {
      throw new NotFoundException("wallet not found");
    }

    // Create history record for activity tracking
    await this.createHistoryRecord(wallet, 'activity_ping');

    wallet.lastActiveAt = new Date();
    return await this.walletRepository.save(wallet);
  }

  async update(publicKey: string, updatawalletDto: UpdateWalletDto): Promise<Wallet> {
    const wallet = await this.findByPublicKey(publicKey);

    if (!wallet) {
      throw new NotFoundException("Wallet not found");
    }

    // Create history record BEFORE updating (saves current state)
    
    // Your existing update logic
    Object.assign(wallet, updatawalletDto);
    await this.createHistoryRecord(wallet, this.determineChangeType(updatawalletDto));
    return await this.walletRepository.save(wallet);
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async getStats(publicKey: string): Promise<any> {
    const wallet = await this.findByPublicKey(publicKey);
    if (!wallet) {
      throw new NotFoundException("no wallet found");
    }

    // Get history count for additional stats
    const historyCount = await this.walletHistoryRepository.count({
      where: { walletId: wallet.id }
    });

    return {
      publicKey: wallet.publicKey,
      network: wallet.network,
      walletTrackedSince: wallet.createdAt,
      lastActive: wallet.lastActiveAt,
      currentBalance: wallet.lastKnownBalance,
      settings: {
        spamThreshold: wallet.spamThreshold,
        preferredTxLimit: wallet.preferredTxLimit
      },
      totalChanges: historyCount
    };
  }

  // NEW: Get wallet history
  async getWalletHistory(publicKey: string): Promise<WalletHistory[]> {
    const wallet = await this.findByPublicKey(publicKey);
    if (!wallet) {
      throw new NotFoundException("Wallet not found");
    }

    return await this.walletHistoryRepository.find({
      where: { walletId: wallet.id },
      order: { timestamp: 'DESC' }
    });
  }

  // NEW: Helper method to create history records
  private async createHistoryRecord(wallet: Wallet, changeType: string): Promise<void> {
    const historyRecord = this.walletHistoryRepository.create({
      walletId: wallet.id,
      balance: wallet.lastKnownBalance,
      spamThreshold: wallet.spamThreshold,
      preferredTxLimit: wallet.preferredTxLimit,
      changeType,
      timestamp: new Date()
    });

    await this.walletHistoryRepository.save(historyRecord);
  }

  // NEW: Helper to determine what changed
  private determineChangeType(updateDto: UpdateWalletDto): string {
    if (updateDto.lastKnownBalance !== undefined) return 'balance_update';
    if (updateDto.spamThreshold !== undefined) return 'threshold_change';
    if (updateDto.preferredTxLimit !== undefined) return 'txlimit_change';
    return 'general_update';
  }


}