// search form on mobile
const searchForm = document.querySelector(".search-form");

// Login form
const signInForm = document.querySelector(".signin-menu");
const signInBtn = document.querySelector("#signin-btn");
const closeForm = document.querySelector("#close-login-btn");

signInBtn.onclick = () => {
  signInForm.classList.toggle("is-active");
  disableScroll();
};

closeForm.onclick = () => {
  signInForm.classList.remove("is-active");
  enableScroll();
};

// disable scroll function (triggered when user click any modal menu)
function disableScroll() {
  document.body.style.overflow = "hidden";
}

// re-enable scroll function
function enableScroll() {
  document.body.style.overflow = "initial";
}

// search form toggle on mobile
document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("is-active");
};

// navbar 2 active on page scrolling
window.onscroll = () => {
  searchForm.classList.remove("active");

  if (window.scrollY > 80) {
    document.querySelector(".header .header-2").classList.add("active");
  } else {
    document.querySelector(".header .header-2").classList.remove("active");
  }
};

// Product Counter
let initVal = 1;

const inputBox = document.getElementById("input-area");
const counterBtns = document.querySelectorAll(".counter-btn");

counterBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const quantity = e.currentTarget.classList;
    if (quantity.contains("btn-increment")) {
      inputBox.value = initVal += 1;
    } else if (quantity.contains("btn-decrement")) {
      if (inputBox.value <= 1) {
        const decrementBtn = document.getElementById("btn-decrement");
        decrementBtn.disabled = true;
      } else {
        inputBox.value = initVal -= 1;
      }
    }
    inputBox.textContent = initVal;
  });
});

// store product
let product = [
  {
    image: "images/donquixote.jpg",
    name: "Don Quixote",
    tag: "donquixote",
    price: 260,
    inCart: 0,
  },
  {
    image: "images/lesmis.jpg",
    name: "Les Miserables",
    tag: "lesmis",
    price: 286,
    inCart: 0,
  },
  {
    image: "images/frankenstein.jpg",
    name: "Frankenstein",
    tag: "frankenstein",
    price: 290,
    inCart: 0,
  },
  {
    image: "images/threemusket.jpg",
    name: "The Three Musketeers",
    tag: "threemusket",
    price: 275,
    inCart: 0,
  },
  {
    image: "images/theraven.jpg",
    name: "The Raven",
    tag: "theraven",
    price: 205,
    inCart: 0,
  },
  {
    image: "images/brotherkaramazov.jpg",
    name: "The Brother Karamazov",
    tag: "brotherkaramazov",
    price: 245,
    inCart: 0,
  },
  {
    image: "images/crimeandpunishment.jpg",
    name: "Crime and Punishment",
    tag: "crimeandpunishment",
    price: 235,
    inCart: 0,
  },
];

const cartsBtn = document.querySelectorAll(".add-cart");
const alertBox = document.querySelector("#alert-box");

function showAlert() {
  alertBox.style.display = "block";
  setTimeout(function () {
    alertBox.style.display = "none";
  }, 3000);
}

cartsBtn.forEach(function (btn, index) {
  btn.addEventListener("click", function (e) {
    const addTocart = e.currentTarget.classList;
    if (addTocart.contains("add-cart")) {
      setItemAmount(product[index]);
      showAlert();
    }
  });
});

function setItemAmount(product) {
  let productItem = localStorage.getItem("itemNumber");
  productItem = parseInt(productItem);
  if (productItem) {
    localStorage.setItem("itemNumber", productItem + 1);
    document.querySelector(".cart span").textContent = productItem + 1;
  } else {
    localStorage.setItem("itemNumber", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  setItem(product);
}

function setItem(product) {
  let cartItems = localStorage.getItem("itemsInCart");
  cartItems = JSON.parse(cartItems);
  let costInCart = localStorage.getItem("totalCost");
  costInCart = isNaN(parseInt(costInCart)) ? 0 : parseInt(costInCart);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
      costInCart += product.price;
    }
    cartItems[product.tag].inCart += 1;
  } else {
    cartItems = {
      [product.tag]: product,
    };
    costInCart += product.price;
  }

  product.inCart = 1;
  localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
  localStorage.setItem("totalCost", costInCart);
}

function onLoadCartItems() {
  let productItem = localStorage.getItem("itemNumber");
  if (productItem) {
    document.querySelector(".cart span").textContent = productItem;
  }
}

function updateCart() {
  let cartItems = localStorage.getItem("itemsInCart");
  cartItems = JSON.parse(cartItems);
  let cartContainer = document.querySelector(".cart-container");
  let costInCart = localStorage.getItem("totalCost");

  if (cartItems && cartContainer) {
    if (Object.keys(cartItems).length === 0) {
      cartContainer.innerHTML = "<h1>Your cart is empty</h1>";
    } else {
      cartContainer.innerHTML = "";
      Object.values(cartItems).map((item) => {
        cartContainer.innerHTML += `
      <section class="cart-items" data-tag="${item.tag}">
      <div class="cart-content">
        <div class="product-cart-img">
          <img src="${item.image}" alt="item images">
        </div>
        <div class="product-cart-title">
          <p class="product-name">${item.name}</p>
          <p class="product-isbn">9781647224608</p>
          <p class="product-price" id="product-price-${item.tag}">Rp ${item.price}.000</p>
          <div class="quantity cart-qty">
            <button
              name="min"
              id="decrement-${item.tag}"
              class="counter-btn btn-decrement"
              type="button"
            >
              <i class="fa fa-minus"></i>
            </button>
            <input type="text" id="input-area-${item.tag}" class="input-area" name="input-area" value="${item.inCart}" />
            <button
              name="plus"
              id="increment-${item.tag}"
              class="counter-btn btn-increment"
              type="button"
            >
              <i class="fa fa-plus"></i>
            </button>
          </div>
          <div class="cart-button">
            <button class="btn remove-btn" type="button")>Remove</button>
          </div>
        </div>
      </div>
    </section>
      `;
      });
    }
    if (Object.keys(cartItems).length > 0) {
      cartContainer.innerHTML += `
      <section class="cart-subtotal">
        <div class="total">
          <ul>
            <li>
              Sub Total
                <span id="sub-total">Rp.${costInCart},000</span>
            </li>
            <li class="last">
              Total
                <span id="curr-total">Rp.${costInCart},000</span>
            </li>
            </ul>
            <div class="btn checkout-btn">
              <a href="#">Checkout</a>
            </div>
        </div>
      </section>
      `;
    }
  }
}

let container = document.querySelector("#cart-container");
if (container) {
  container.addEventListener("click", deleteProduct);
  container.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-increment")) {
      // increment the quantity in the cart
      let quantity = event.target.previousElementSibling;
      quantity.value = parseInt(quantity.value) + 1;

      // get the tag of the product from the data-tag attribute
      let productTag = event.target.closest(".cart-items").dataset.tag;
      // get the product from the product array
      let selectedProduct = product.find((p) => p.tag === productTag);
      // get the original price of the product
      let productPrice = selectedProduct.price;

      // update the total cost
      let costInCart = localStorage.getItem("totalCost");
      costInCart = isNaN(parseInt(costInCart)) ? 0 : parseInt(costInCart);
      localStorage.setItem("totalCost", costInCart + productPrice);

      // update the text content of the total element
      let subTotalElem = document.querySelector("#sub-total");
      let currTotal = document.querySelector("#curr-total");
      if (subTotalElem && currTotal) {
        let newCost = costInCart + productPrice;
        let costString = newCost.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 3,
        });
        subTotalElem.textContent = costString;
        currTotal.textContent = costString;
      }
    } else if (event.target.classList.contains("btn-decrement")) {
      // decrement the quantity in the cart
      let quantity = event.target.nextElementSibling;
      if (quantity.value > 1) {
        quantity.value = parseInt(quantity.value) - 1;

        // get the tag of the product from the data-tag attribute
        let productTag = event.target.closest(".cart-items").dataset.tag;
        // get the product from the product array
        let selectedProduct = product.find((p) => p.tag === productTag);
        // get the original price of the product
        let productPrice = selectedProduct.price;

        // update the total cost
        let costInCart = localStorage.getItem("totalCost");
        costInCart = isNaN(parseInt(costInCart)) ? 0 : parseInt(costInCart);
        localStorage.setItem("totalCost", costInCart - productPrice);

        // update the text content of the total element
        let subTotalElem = document.querySelector("#sub-total");
        let currTotal = document.querySelector("#curr-total");
        if (subTotalElem && currTotal) {
          let newCost = costInCart - productPrice;
          let costString = newCost.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 3,
          });
          subTotalElem.textContent = costString;
          currTotal.textContent = costString;
        }
      }
    }
  });
}

function deleteProduct(e) {
  if (e.target.classList.contains("remove-btn")) {
    let productTag = e.target.closest(".cart-items").getAttribute("data-tag");
    let cartItems = JSON.parse(localStorage.getItem("itemsInCart"));
    let costInCart = parseInt(localStorage.getItem("totalCost"));
    let productItems = parseInt(localStorage.getItem("itemNumber"));

    // Subtract the product's price from the total cost
    costInCart -= cartItems[productTag].price;
    productItems -= cartItems[productTag].inCart;
    localStorage.setItem("totalCost", costInCart);
    localStorage.setItem("itemNumber", productItems);

    // delete the product from the cartItems object
    delete cartItems[productTag];
    localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
    updateCart();
    document.querySelector(".cart span").textContent = productItems;
  }
}
updateCart();
onLoadCartItems();

// Carousel
var swiper = new Swiper(".product-slider", {
  SpaceBetween: 10,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".more-details", {
  SpaceBetween: 10,
  loop: true,
  centeredSlides: false,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});
