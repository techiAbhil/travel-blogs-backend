# 1. installation

```bash
npm i razorpay
```

# 2. create 2 env variables

RAZORPAY_KEY_ID='rzp_test_key'
RAZORPAY_SECRET_KEY='something super secret'

# 2. Update database to store payment related details

- once the update's are done run `npm run db:sync`

# 3. create following files

- booking.validation.js
- booking.service.js
- booking.controller.js
- booking.route.js

& register in app.js

Note: razorpay_order_id === order_id from create order

# Test credit cards

https://razorpay.com/docs/payments/payments/test-card-details/

upi => success@razorpay or failure@razorpay


  order_id                  String         
  amount                    Float
  currency                  String        
  receipt                   String        
  status                    'created'| 'attempted' | 'paid'
  razorpay_payment_id       String         
  razorpay_signature        String