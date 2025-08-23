import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-07-30.basil", // Use the latest API version
})

export default stripe

//Server actions are not complete;y safe, need to use a helper function from next.js to prevent server variables from being exposed.