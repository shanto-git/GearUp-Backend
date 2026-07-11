import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { OrderStatus, PaymentProvider, PaymentStatus } from "../../../generated/prisma/enums";

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: "2026-06-24.dahlia",
});

const createPaymentIntentInDb = async (payload: { rentalOrderId: string }) => {
  const { rentalOrderId } = payload;

  const rentalOrder = await prisma.rentalOrder.findUniqueOrThrow({
    where: { id: rentalOrderId },
  });

  if (rentalOrder.OrderStatus !== OrderStatus.CONFIRMED) {
    throw new Error(
      "You can only pay for orders that have been CONFIRMED by the provider."
    );
  }

  const amountInCents = Math.round(rentalOrder.totalPrice * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    payment_method_types: ["card"],
    metadata: {
      rentalOrderId: rentalOrder.id,
      customerId: rentalOrder.customerId,
    },
  });

  await prisma.payment.upsert({
    where: { rentalOrderId: rentalOrder.id },
    update: {
      transactionId: paymentIntent.id,
      amount: rentalOrder.totalPrice,
    },
    create: {
      rentalOrderId: rentalOrder.id,
      customerId: rentalOrder.customerId,
      transactionId: paymentIntent.id,
      amount: rentalOrder.totalPrice,
      method: "card",
      provider: PaymentProvider.STRIPE,
      status: PaymentStatus.PENDING,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    transactionId: paymentIntent.id,
    amount: rentalOrder.totalPrice,
  };
};

const handleWebhookEvent = async (event: any) => {
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    
    const rentalOrderId = paymentIntent.metadata.rentalOrderId;
    const transactionId = paymentIntent.id;

    const rentalOrder = await prisma.rentalOrder.findUnique({
      where: { id: rentalOrderId },
    });

    if (!rentalOrder) {
      throw new Error(`Rental order not found for ID: ${rentalOrderId}`);
    }

    await prisma.$transaction(async (tx) => {
      
      await tx.payment.update({
        where: { rentalOrderId: rentalOrderId },
        data: {
          status: PaymentStatus.COMPLETED,
          transactionId: transactionId, 
          paidAt: new Date(),       
        },
      });

      await tx.rentalOrder.update({
        where: { id: rentalOrderId },
        data: {
          OrderStatus: OrderStatus.PAID, 
        },
      });
    });
  }
};


const getMyPaymentHistoryFromDb = async (customerId: string) => {
  const result = await prisma.payment.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
    include: {
      rentalOrder: {
        include: { gearItem: true },
      },
    },
  });
  return result;
};

const getPaymentDetailsByIdFromDb = async (paymentId: string, customerId: string) => {
  const result = await prisma.payment.findUniqueOrThrow({
    where: {
      id: paymentId,
      customerId: customerId, 
    },
    include: {
      rentalOrder: {
        include: { gearItem: true },
      },
    },
  });
  return result;
};

export const paymentService = {
  createPaymentIntentInDb,
  handleWebhookEvent,
  getMyPaymentHistoryFromDb,
  getPaymentDetailsByIdFromDb,
};