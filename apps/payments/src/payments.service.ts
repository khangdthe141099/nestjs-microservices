import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    'sk_test_51KBFaCJdarKw3EgPOCY5Kf2QoIy2qXG8HPZFupmGPoGr5dj8BMlgiZqsh8pIA9fH1LrSxuujWYtjDchCXZwZ6klU00r29w4wPu',
    {
      apiVersion: '2025-02-24.acacia',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ amount, card }: CreateChargeDto) {
    return await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      confirm: true,
    });
  }
}
