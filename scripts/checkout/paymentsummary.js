import { cart } from "../../data/cart.js"
import { getProduct } from "../../data/products.js"
import { deliveryOptions, getDeliveryOption } from "../deliveryOption.js";
import { formatCurrency } from "../utils/money.js";
import {addOrder} from "../../data/order.js";

export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        productPriceCents += (product.priceCents*cartItem.quantity);
        
        const deliveryOption = getDeliveryOption(cartItem.deliveryId)
        shippingPriceCents += deliveryOption.priceCents

    });
    const totalBeforeTaxCents = productPriceCents+shippingPriceCents;
    const taxCents =totalBeforeTaxCents*0.1;
    const totalCents = totalBeforeTaxCents+taxCents;
    // console.log(totalBeforeTaxCents);
    // console.log(taxCents);
    // console.log(totalCents);

    const paymentsummaryHTML =
        `
            
        <div class="payment-summary">
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items :${cart.length}</div>
                <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
            </div>

            <button class="place-order-button button-primary js-place-order">
                Place your order
            </button>
            </div>
        `;
    document.querySelector('.js-payment-summary').innerHTML=
        paymentsummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click',async ()=>{
        try{
            const response = await fetch('https://supersimplebackend.dev/orders',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    cart:cart
                })
            })

            const order = await response.json();
            //console.log(order)
            addOrder(order);  
        }catch(error){
            console.log('errorr');
        } 
        window.location.href='orders.html'    
    });

}    
