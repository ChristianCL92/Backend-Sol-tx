import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import {NotFoundException} from "@nestjs/common"
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createWalletDto: CreateWalletDto) {
    return await this.walletService.create(createWalletDto);
  }

  @Get(':publicKey')
  async findOne(@Param('publicKey') publicKey: string) {
    const wallet = await this.walletService.findByPublicKey(publicKey);
    
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    
    return wallet;
  }

  @Put(':publicKey/ping')
  @HttpCode(HttpStatus.OK)
  async ping(@Param('publicKey') publicKey: string) {
    return await this.walletService.ping(publicKey);
  }

   @Patch(':publicKey')
  async update(
    @Param('publicKey') publicKey: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return await this.walletService.update(publicKey, updateWalletDto);
  }


  @Get(':publicKey/stats')
  async getStats(@Param('publicKey') publicKey: string) {
    return await this.walletService.getStats(publicKey);
  }

 @Get(':publicKey/history')
  async getHistory(@Param('publicKey') publicKey: string) {
    return await this.walletService.getWalletHistory(publicKey);
  } 


  @Get()
  async findAll() {
    return await this.walletService.findAll();
  }
}