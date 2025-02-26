import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_SECRET_KEY') ||
      'sk_test_51KBFaCJdarKw3EgPOCY5Kf2QoIy2qXG8HPZFupmGPoGr5dj8BMlgiZqsh8pIA9fH1LrSxuujWYtjDchCXZwZ6klU00r29w4wPu',
    {
      apiVersion: '2025-02-24.acacia',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge() {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2024,
        cvc: '123',
      },
    });
  }
}
