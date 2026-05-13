
import {cart,addToCart,loadFromStorage} from "../../data/cart.js"

describe("test suite: Add to Cart",() => {
    it('Add an existing product in the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity:1,
                    deliveryId:1
                }
            ]);
        }); 
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);

    });

    it('Add a new product in the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([]);
        }); 
        loadFromStorage();
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        //console.log(localStorage.setItem);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
})