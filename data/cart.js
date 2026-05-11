export const cart=[];

//Add to Cart 
export function addToCart(productId){
  //checking for item in cart
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem;
    }
  })
  //incrementing the quantity or adding item to cart
  if(matchingItem){
    matchingItem.quantity+=1;
  }
  else{
    cart.push(
      {productId:productId,
      quantity:1}
    );
  }
}