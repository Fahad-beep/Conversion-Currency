import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [ConfigModule], // <--- Add this line!
  providers: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
