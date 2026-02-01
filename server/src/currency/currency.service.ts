import { Injectable, HttpException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyService {
  private readonly baseUrl = 'https://api.freecurrencyapi.com/v1';
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('CURRENCY_API_KEY') || '';
  }

  async getLatestRates(baseCurrency: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/latest`, {
        params: {
          apikey: this.apiKey,
          base_currency: baseCurrency,
        },
      });
      return response.data as Record<string, unknown>;
    } catch (error) {
      const err = error as AxiosError;
      const errMsg = (err.response?.data as string | object) || 'API Error';
      const status = err.response?.status || 500;

      throw new HttpException(errMsg, status);
    }
  }

  async getHistoricalRates(date: string, baseCurrency: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/historical`, {
        params: {
          apikey: this.apiKey,
          date: date,
          base_currency: baseCurrency,
        },
      });
      return response.data as Record<string, unknown>;
    } catch (error) {
      const err = error as AxiosError;
      const errMsg = (err.response?.data as string | object) || 'API Error';
      const status = err.response?.status || 500;

      throw new HttpException(errMsg, status);
    }
  }
}
