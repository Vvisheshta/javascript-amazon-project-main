
import {cart,removeFromCart, updateDeliveryOptions} from "../../data/cart.js"
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';
import { deliveryOptions,getDeliveryOption } from '../deliveryOption.js';
import { renderPaymentSummary } from "./paymentsummary.js";


export function renderOrderSummary(){
    let cartSummaryHTML='';
    cart.forEach((cartItem) => {

        const productId=cartItem.productId;
        let matchingProduct= getProduct(productId);
        //console.log(matchingProduct);

        //getting delivery id from the deliveryOptions throught cart del id
        const deliveryId=cartItem.deliveryId;
        const deliveryOption= getDeliveryOption(deliveryId);

        //Calculating date for Delivery Date label
        const today=dayjs();
        if (!deliveryOption) {
        console.log('Invalid delivery option', cartItem);
        return;
        }
        const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
        const dateString=deliveryDate.format('dddd, MMMM D');
        console.log(matchingProduct);
        cartSummaryHTML= cartSummaryHTML+ `
        
            <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    ${matchingProduct.getPriceCents()}
                    </div>
                    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link 
                        js-delete-link-${matchingProduct.id}"
                        data-product-id=${matchingProduct.id}>
                        Delete
                    </span>
                    </div>
                </div>
                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-options">
                    ${deliveryOptionsHTML(matchingProduct,cartItem)} 
                </div>

                </div>
            </div>
            </div>  
            `;
    });
    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

    //Adding Delete button functinality through eventListeners
    document.querySelectorAll('.js-delete-link').
        forEach((link) => {
            link.addEventListener(('click'),() => {
                const productId=link.dataset.productId;
                removeFromCart(productId);
                renderPaymentSummary();
                const container=document.querySelector(`.js-cart-item-container-${productId}`);
                //console.log(container);
                container.remove();
            });
        });

    //Generating delivery options section with date calculation
    function deliveryOptionsHTML(matchingProduct,cartItem){
        let html='';
        deliveryOptions.forEach((deliveryOption) => {
            
            //Calculating date
            const today=dayjs();
            const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
            const dateString=deliveryDate.format('dddd, MMMM D');

        //Generating Price for delivery section
        const priceString=deliveryOption.priceCents===0
            ?'FREE'
            :`$${formatCurrency(deliveryOption.priceCents)} - `;

            //Verifying the selected radio button
            const isChecked= (cartItem.deliveryId===deliveryOption.deliveryId);
        
            html+=
            `
            <div class="delivery-option js-delivery-option" 
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.deliveryId}">
                <input type="radio" 
                    ${isChecked ?'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                >
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div> 
            </div> 
            `      
        });
        return html;
    }
    //regenerating the whole html on clicking
    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click',()=>{
                //console.log(element.dataset);
                const {productId,deliveryOptionId} =element.dataset;
                updateDeliveryOptions(productId,deliveryOptionId);
                renderOrderSummary()
            });
        });
}
    

