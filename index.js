import {menuArray} from './data.js'
//Global variables
const orderArray = []; //will hold all items added to the cart
const cartTitle = document.getElementById("cart-title")
const total = document.querySelector("total")

//render menu onto page: 
function renderMenu(menuArray){ 
 let menuHtml = ''
  
     menuArray.forEach(function(element){
        
      menuHtml +=`
       <div class="menu">
              <span class="emoji">${element.emoji}</span>
            <div class="items">
              <h2 class="food-name">${element.name}</h2>
              <p class="ingredients">${element.ingredients.join(', ')}</p>
              <h2 class="price">$${element.price}</h2>
            </div>
            <div >
              <button class="add-btn" data-id="${element.id}">+</button>
            </div>
      </div>`     
})  
  document.getElementById("menu-section").innerHTML = menuHtml; //prints menu to page
}
renderMenu(menuArray);

//make button work: when button is clicked, gets Id, adds that item to cart, calls render cart: 

document.addEventListener('click', function(e){ //adds single click event listener
  if(e.target.classList.contains("add-btn")){ //targets anything w/"add-btn" class
    const itemId = e.target.dataset.id; //grabs the id from clicked button
    const itemSelected = menuArray.find(function(currentItem){ //loops over each id and
    return currentItem.id == itemId // Compares each menu item's ID with the clicked ID
  })
  
  if(itemSelected){
    orderArray.push(itemSelected) //adds to orderArray
    
    if(orderArray.length === 1){ //if first item print-Your Order:
    cartTitle.style.display = "flex"
    } 
    
       renderOrder();   // renders your cart items
       renderTotal();   // <--- this runs AFTER add-btn is clicked      
  }
    }    
       
    
     //handles remove button clicks
  if (e.target.classList.contains("remove-btn")) {   //targets anything w/"remove-btn" class
    const itemId = e.target.dataset.id; //grabs the id from clicked button
    const index = orderArray.findIndex(function(item) { //loops over each index and returns the first item that matches your condition.
    return item.id == itemId; // Compares each menu item's ID with the clicked ID
    });
    
    if (index !== -1) { //looks to see if item is in cart
    orderArray.splice(index, 1); // Removes the item
    renderOrder(); // Re-render cart
    renderTotal();   // recalculate and update total price
  }
}

  //handles complete order button clicks
 if (e.target.classList.contains("complete-order-btn")){
 const formModal = document.getElementById("form-modal")
 formModal.style.display = "flex";
 }
 
 //handles close modal button
 if(e.target.classList.contains("modal-close-btn")){
  const formModal = document.getElementById("form-modal")
   formModal.style.display = "none";
   
     //Clears the forms fields
  document.getElementById("payment-form").reset();
 }
 
  // handles close button for thank-you message
  if (e.target.classList.contains("thnks-close-btn")) {
    document.getElementById("thank-you-msg").style.display = "none";
   
   //Clears the forms fields after thank you msg is closed 
  document.getElementById("payment-form").reset();
  }
 
});
    
    
function renderOrder(){
    let  ordersHtml = ''  
    
    orderArray.forEach(function(item){
         ordersHtml +=`
      <div class="selections">
          <div class="selection-name">
            <h2>${item.name}</h2>
            <button class="remove-btn" data-id="${item.id}">remove</button>
          </div>
            <h2 class="selection-price">$${item.price}</h2>
      </div>`
   }) 
     
     document.getElementById("cart-items").innerHTML = ordersHtml  
}

 renderTotal()  // call this AFTER you've added the cart items
 
 
   
  
  function renderTotal(){
    let totalPrice = 0 //set total to 0
     for(let item of orderArray){ //for of loop loops thru array
      totalPrice += item.price //adds current price to 0 and keeps a running tab
   }
   
     const totalDiv = document.getElementById("total-price");

  //Only show total if there's something to show!
  if (orderArray.length > 0) {
    totalDiv.style.display = "flex"; 
    totalDiv.innerHTML = `
    <div class="total">
        <div class="total-line">
          <h2 class="label">Total Price:</h2>
          <h2 class="amount">$${totalPrice}</h2>
        </div>
            <button class="complete-order-btn" id="complete-order-btn">Complete Order</button>
     </div>
  `;
    
  } else {
    totalDiv.style.display = "none"; //hide if cart is empty
    totalDiv.innerHTML = "";         // clean it out
  }
}

function completeOrder(){
   
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("payment-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const thankYouMessage = document.getElementById("thank-you-msg");

    thankYouMessage.innerHTML = `Thank you, ${name} for your payment!
      <div class="thnks-close-btn-container">
        <button class="thnks-close-btn" id="thnks-close-btn">X</button>
      </div>`;
    document.getElementById("form-modal").style.display = "none";
    thankYouMessage.style.display = "block";
  });
});

 
