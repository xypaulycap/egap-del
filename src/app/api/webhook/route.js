import { Order } from '@/models/Orders';

const stripe = require('stripe')(process.env.STRIPE_SK);


export async function POST(req){
    const sig = await req.headers.get('stripe-signature');
    let event;

    try{
        const reqBuffer = await req.text()
        const signSecret = process.env.STRIPE_SIGNING_SECRET
        event = stripe.webhooks.constructEvent(reqBuffer,sig, signSecret );
    } catch (e) {
        console.error('stripe error')
        console.log(e);
        
        return Response.json(e, {status: 400});
    }
    
    if(event.type === 'payment_intent.succeeded') {
        console.log(event);
        const orderId = event?.data?.object?.metadata?.orderId;
        if(orderId){
           await Order.updateOne({_id:orderId}, {paid: true});
        }
          
    }
    
    return Response.json('ok', {status: 200});
}