import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { GetRateDto } from './dto/get-rate.dto';

@Controller('api/currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('latest')
  @UsePipes(new ValidationPipe({ transform: true }))
  getLatest(@Query() query: GetRateDto) {
    return this.currencyService.getLatestRates(query.base || 'USD');
  }

  @Get('historical')
  @UsePipes(new ValidationPipe({ transform: true }))
  getHistorical(@Query() query: GetRateDto) {
    if (!query.date) {
      throw new BadRequestException('Date is required for historical rates');
    }
    return this.currencyService.getHistoricalRates(
      query.date,
      query.base || 'USD',
    );
  }
}
