import { renderOrderSummary } from "../scripts/checkout/ordersummary.js";
import {renderPaymentSummary} from "./checkout/paymentsummary.js"
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js'

loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
