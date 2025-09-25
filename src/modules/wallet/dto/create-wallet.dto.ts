import {IsString, IsOptional, IsObject, Min, Max, IsNumber} from "class-validator"
import {Type} from "class-transformer"

export class CreateWalletDto {
    @IsString()
    publicKey: string

    @IsOptional()
    @IsString()
    network?: string

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    balance: number

    @IsOptional()
    @Min(0)
    @Max(1)
    spamThreshold?: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    preferredTxLimit?: number;


} 