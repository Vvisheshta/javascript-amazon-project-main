import { formatCurrency } from "../scripts/utils/money.js";

if(formatCurrency(2095)==='20.95'){
    console.log('p')
}
else{
    console.log(f)
}

if(formatCurrency(0)==='0.00'){
    console.log('p')
}
else{
    console.log('f')
}

if(formatCurrency(2000.5)==='20.00'){
    console.log('p')
}
else{
    console.log('f')
}