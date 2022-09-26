const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const params = {
      submit_type: 'pay',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1LmA0bBsce7H9ZRGe2SIDiF3' },
        { shipping_rate: 'shr_1LmA0HBsce7H9ZRGsqZc0Ch0' }
      ],
      line_items: req.body.map((item) => {
        const img = item.image[0].asset._ref
        const newImage = img
          .replace('image-', 'https://cdn.sanity.io/images/vob1xv7n/production/')
          .replace('-webp', '.webp')

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [newImage]
            },
            unit_amount: item.price * 100
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1
          },
          quantity: item.quantity
        }
      }),
      mode: 'payment',
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`
    }

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params)
      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
