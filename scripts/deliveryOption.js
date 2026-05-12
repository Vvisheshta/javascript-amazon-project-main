export const deliveryOptions=[
    {
        deliveryId:1,
        deliveryDays:7,
        priceCents:0
    },
    {
        deliveryId:2,
        deliveryDays:3,
        priceCents:499
    },
    {
        deliveryId:3,
        deliveryDays:1,
        priceCents:999
    }
] 

export function getDeliveryOption(deliveryId){
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if(option.deliveryId===deliveryId){
            deliveryOption=option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}