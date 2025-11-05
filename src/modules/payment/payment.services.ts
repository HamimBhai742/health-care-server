import Stripe from 'stripe';
import { prisma } from '../../config/prisma.config';
import { PaymentStatus } from '@prisma/client';

const handelPaymentEvent = async (event: Stripe.Event) => {
  console.log(event);
  // Handle event types
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session & {
        [key: string]: any;
      };

      console.log('✅ Payment successful!');
      console.log('Session data:', session);

      // Example: extract appointment info
      const appointmentId = session.metadata?.appointmentId;
      const paymentId = session.metadata?.paymentId;
      const patientEmail = session.customer_email;
      const amountPaid = session.amount_total! / 100;

      await prisma.$transaction(async (tx) => {
        await tx.appointment.update({
          where: {
            id: appointmentId,
          },
          data: {
            paymentStatus:
              session.payment_status === 'paid'
                ? PaymentStatus.PAID
                : PaymentStatus.UNPAID,
          },
        });

        await tx.payment.update({
          where: {
            id: paymentId,
          },
          data: {
            status: session.payment_status === 'paid' ? 'PAID' : 'UNPAID',
            paymentGatewayData: session,
          },
        });
      });
      break;

    case 'payment_intent.succeeded':
      console.log('💰 PaymentIntent was successful.');
      break;

    case 'payment_intent.payment_failed':
      console.log('❌ Payment failed.');
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

export const paymentServices = {
  handelPaymentEvent,
};
