import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number
})

const ItemSchema = new Schema({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    category: {type: mongoose.Types.ObjectId},
    basePrice: {type: Number},
    sizes: {type: [ExtraPriceSchema]},
    quantity:{type: Number},
    extraPrices: {type: [ExtraPriceSchema]}
}, {timestamps:true})

export const Item = models?. Item || model('Item', ItemSchema);