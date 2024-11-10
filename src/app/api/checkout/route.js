import { metadata } from "@/app/layout";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Orders";
import { Item } from "@/models/Items";


const stripe = require('stripe')(process.env.STRIPE_SK)

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL);

    const {cartProducts, address} = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

   const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false
    });

    const stripeLineItems =  []
    for(const cartProduct of cartProducts){
        
        const productInfo = await Item.findById(cartProduct._id)

        let productPrice = productInfo.basePrice;
        if(cartProduct.size){
            const size = productInfo.sizes.find(
                size => size._id.toString() === cartProduct.size._id.toString());
                productPrice += size.price
        }
        if(cartProduct.extras?.length > 0) {
            for (const cartProductExtra of cartProduct.extras) {
                const productExtras = productInfo.extraPrices;
                const extraInfo = productExtras
                .find(extra => extra._id.toString() === cartProductExtra._id.toString());
                productPrice += extraInfo.price;
            }
        }

        const productName = cartProduct.name;


        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: productName,
                },
            unit_amount: productPrice * 100
            }
        })
    }

    console.log("Success URL:", `${process.env.NEXTAUTH_URL}orders/${orderDoc._id.toString()}?clear-cart=1`)
    

    const stripeSession = await stripe.checkout.sessions.create({
        line_items:stripeLineItems,
        mode: 'payment',
        customer_email:userEmail,
        success_url:`${process.env.NEXTAUTH_URL}/orders/${orderDoc._id.toString()}?clear-cart=1`,
        cancel_url:process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: {orderId: orderDoc._id.toString()},
        payment_intent_data: {
            metadata: {orderId: orderDoc._id.toString()},
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount:{amount: 500, currency: 'USD'}
                }
            }
        ],
    });
    

    return Response.json(stripeSession.url)

}