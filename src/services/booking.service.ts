import { numberSchema } from '#validations/common.validation';
import db from '#db';
import Razorpay from 'razorpay';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';
import type { Request } from 'express';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const bookingPayment = async (
    req: Request<{}, {}, { blog_id: number }>
) => {
    // blog_id
    const blog_id = numberSchema.parse(req.body.blog_id);

    const blogDetails = await db.travel_blog.findFirst({
        where: {
            blog_id,
        },
    });

    if (blogDetails && blogDetails.cost) {
        //create order

        const options = {
            // Note: razorpay expects amount to be in paisa so if it is ruppes convert it into paisa by multiplying * 100
            amount: blogDetails.cost * 100, // Note:  here you can do additional changes such as GST addition, convenience charge etc
            currency: 'INR',
        };

        //razorpay data;
        const rzpData = await razorpay.orders.create(options); //1 - backend to razorpay
        // payment attempted

        const bookingDetails = await db.booking.create({
            data: {
                blog_id,
                user_id: req.user?.user_id || -1,
                amount: Number(rzpData.amount),
                currency: rzpData.currency,
                order_id: rzpData.id,
                status: rzpData.status,
            },
        });

        return bookingDetails;
    }
    throw new Error('Something went wrong while creating order;');
};

export const verifyPayment = async (req: Request) => {
    // verify payment
    // booking table update & also update the status to be `paid`

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;

    // WAY - 1 of verification
    // const isValidPayment = validatePaymentVerification(
    //     { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
    //     razorpay_signature,
    //     process.env.RAZORPAY_SECRET_KEY
    // );
    if (!process.env.RAZORPAY_SECRET_KEY) {
        throw new Error(
            'RAZORPAY_SECRET_KEY environment variable is not defined'
        );
    }
    // WAY - 2 of verification
    const isValidPayment = validateWebhookSignature(
        `${razorpay_order_id}|${razorpay_payment_id}`,
        razorpay_signature,
        process.env.RAZORPAY_SECRET_KEY
    );
    if (isValidPayment) {
        const bookingDetails = await db.booking.update({
            where: {
                order_id: razorpay_order_id,
            },
            data: {
                razorpay_payment_id,
                razorpay_signature,
                status: 'paid',
            },
        });
        return bookingDetails;
    }
};
