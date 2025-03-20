const base="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const items=document.querySelectorAll(".dropdown select");
const btn=document.querySelector(".bt");
let from_block=document.querySelector(".from select");
let to_block=document.querySelector(".to select");
let msg1=document.querySelector(".msg1");
let msg2=document.querySelector(".msg2");

for(let select of items){
    for (code in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = code;
        newOpt.value = code;
        if (select.name === "from" && code === "USD") {
          newOpt.selected = "selected";
        } 
        else if (select.name === "to" && code === "INR") {
          newOpt.selected = "selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change",(e) =>{
        update(e.target);
        SameOpt();
    });
}

const SameOpt = () => {
  let fromValue = from_block.value;
  let toValue = to_block.value;
  for (let option of from_block.options) {
    option.disabled = false;
  }
  for (let option of to_block.options) {
    option.disabled = false;
  }
  for (let option of from_block.options) {
    if (option.value === toValue) {
      option.disabled = true;
    }
  }
  for (let option of to_block.options) {
    if (option.value === fromValue) {
      option.disabled = true;
    }
  }
};

const update = (item) => {
    let code = item.value;
    let cCode = countryList[code];
    let source = `https://flagsapi.com/${cCode}/flat/64.png`;
    let img = item.parentElement.querySelector("img");
    img.src = source;
};

const exchange = async () =>{
  let amount=document.querySelector(".amount input");
  let val=amount.value;
  if(val==="" || val<1){
    val=1.00;
    amount.value="1.00";
  }
  let frm=from_block.value.toLowerCase();
  let tt=to_block.value.toLowerCase();
  // console.log(frm);
  const url=`${base}/${frm}.json`;
  let response=await fetch(url);
  let data=await response.json();
  let price=data[frm][tt];
  let total=val * price;
  msg1.innerText=`${val} ${from_block.value} = `;
  msg2.innerText=`${total} ${to_block.value}`;
  // console.log(msg);
};

btn.addEventListener("click",async (e) =>{
  e.preventDefault();
  exchange();
});

window.addEventListener("load", () =>{
  exchange();
});
SameOpt();