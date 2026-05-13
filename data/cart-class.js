class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey=localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage(){
        this.cartItem= JSON.parse(localStorage.getItem(this.localStorageKey));
        //localStorage can only save string, so to convert that to array we use JSON.parse()

        if(!this.cartItems){
            this.cartItems=[
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity:2,
                    deliveryId:1
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity:1,
                    deliveryId:2
                }
            ];
        }
    }

    saveToStorage(){
            //saving the cart in localstorage to be unaffected by refresh
            localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
        }

    addToCart(productId){
            //Add to Cart 
            //checking for item in cart
            let matchingItem;
            this.cartItems.forEach((cartItem)=>{
                if(productId===cartItem.productId){
                matchingItem=cartItem;
                }
            })
            //incrementing the quantity or adding item to cart
            if(matchingItem){
                matchingItem.quantity+=1;
            }
            else{
                this.cartItems.push(
                {productId:productId,
                quantity:1,
                deliveryId:1}
                );
            }
            this.saveToStorage();
        }
    
         removeFromCart(productId){
            //delete from cart
            const newCart=[];

            this.cartItems.forEach((cartItem)=>{
                if(cartItem.productId!==productId){
                    newCart.push(cartItem);
                }
                
            });
            this.cartItems=newCart;
            this.saveToStorage();
        }
    updateDeliveryOptions(productId,deliveryOptionId){
            //Updating Cart details
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if(productId===cartItem.productId){
                    matchingItem=cartItem;
                }
            });
            matchingItem.deliveryId=Number(deliveryOptionId);
            this.saveToStorage();
        }


}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);