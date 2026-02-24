import { bookingPayment, verifyPayment } from '#services/booking.service';

export const bookingPaymentHandler = async (req, res) => {
    const booking = await bookingPayment(req);
    res.status(200).json({
        orderDetails: booking,
        success: true,
        msg: 'Success',
    });
};
export const verifyPaymentHandler = async (req, res) => {
    const bookingDetails = await verifyPayment(req);
    res.status(200).json({
        orderDetails: bookingDetails,
        success: true,
        msg: 'Success',
    });
};
