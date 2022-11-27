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
    name: "Don Quixote",
    tag: "donquixote",
    price: 265.0,
    inCart: 0,
  },
  {
    name: "Les Miserables",
    tag: "lesmis",
    price: 265.0,
    inCart: 0,
  },
  {
    name: "Frankenstein",
    tag: "frankenstein",
    price: 265.0,
    inCart: 0,
  },
  {
    name: "The Three Musketeers",
    tag: "threemusketeers",
    price: 265.0,
    inCart: 0,
  },
  {
    name: "The Raven",
    tag: "theraven",
    price: 265.0,
    inCart: 0,
  },
  {
    name: "The Brother Karamazov",
    tag: "brotherkaramazov",
    price: 265.0,
    inCart: 0,
  },
  {
    name: "Crime and Punishment",
    tag: "crimeandpunishment",
    price: 265.0,
    inCart: 0,
  },
];

const cartsBtn = document.querySelectorAll(".add-cart");

cartsBtn.forEach(function (btn, index) {
  btn.addEventListener("click", function (e) {
    const addTocart = e.currentTarget.classList;
    if (addTocart.contains("add-cart")) {
      setItemAmount(product[index]);
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
  let cartItems = localStorage.getItem('itemsInCart');
  cartItems = JSON.parse(cartItems);
  
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart +=1;
  } else {
    cartItems = {
      [product.tag]: product,
    };
  };

  product.inCart = 1;
  localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
}

// show the amount of items beside shopping cart
// even after refresh.
function onLoadCartItems() {
  let productItem = localStorage.getItem("itemNumber");

  if (productItem) {
    document.querySelector(".cart span").textContent = productItem;
  }
}
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
