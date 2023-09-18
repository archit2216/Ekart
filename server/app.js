const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const express=require('express');
const app=express()
const cors=require('cors');

const stripe=require("stripe")(process.env.STRIPE_KEY)

app.use(express.json());

app.use(cors());

app.post("/api/create-checkout-session",async(req,res)=>{
    const {products}=req.body;
    console.log(products);
    const line_Items=products.map((prod)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:prod.name
            },
            unit_amount:prod.price*100,
        },
        quantity:prod.amount
    }));
    line_Items.push({price_data:{currency:"inr",product_data:{name:'Shipping Fees'},unit_amount:5000},quantity:1});
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:line_Items,
        mode: 'payment',
        success_url: 'https://main--extraordinary-torrone-93f172.netlify.app/success',
        cancel_url: 'https://main--extraordinary-torrone-93f172.netlify.app/cancel',
      });

      res.json({id:session.id})
})

const PORT=process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})