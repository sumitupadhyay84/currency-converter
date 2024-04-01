const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msgg = document.querySelector(".msg");


for(let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
    updateFlag(evt.target);
    });
}

const getExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
let amtVal=amount.value;
if(amtVal==="" || amtVal<=0){
    amtVal=1;
    amount.value="1";
}

const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate = data[tocurr.value.toLowerCase()];

let finalamt = amtVal * rate;
msgg.innerText=`${amtVal} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
};

const updateFlag =(element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
    };

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    getExchangeRate();
});

window.addEventListener ("load",() =>{
        getExchangeRate();
});