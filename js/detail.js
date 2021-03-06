const detailContainer = document.querySelector(".detail-result");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://mayth.one/rainydays/wp-json/wc/store/products/" + id;

const pageTitle = document.querySelector(".page-title");
const activePageNav = document.querySelector("#active-detail");

async function fetchProduct() {
  try {
    const response = await fetch(url);
    const details = await response.json();
    detailContainer.innerHTML = "";
    console.log(details);
    displayDetails(details);
  } catch (error) {
    console.log(error);
    detailContainer.innerHTML = displayError("An error occurred");
  }
}

fetchProduct();

function displayDetails(details) {
  pageTitle.innerHTML = `Rainydays | ${details.name}`;
  activePageNav.innerHTML = `${details.name}`;
  detailContainer.innerHTML = `<div class="img-container">
                              <img src=${details.images[0].src} alt="${details.images[0].alt}" class="product-img"/>
                              </div>
                              <div class="product-details">
                                <h1>${details.name}</h1>
                                <h2>kr ${details.prices.price}</h2>
                                <P>Color: ${details.attributes[1].terms[0].name}</p>
                                <select name="size" id="size-select">
                                <option value="">Select size</option>
                                <option value="xs">${details.attributes[0].terms[0].name}</option>
                                <option value="small">${details.attributes[0].terms[1].name}</option>
                                <option value="medium">${details.attributes[0].terms[2].name}</option>
                                <option value="large">${details.attributes[0].terms[3].name}</option>
                                <option value="xl">${details.attributes[0].terms[4].name}</option>
                                </select>
                                <button class="cta add-to-cart" data-product="${details.id}">Add to cart</button>
                                <p>${details.description}</p>
                                <p class="category-description">Categories: ${details.categories[1].name}, ${details.categories[2].name}</p>
                                </div>`;

  const addToCartButton = document.querySelector(".add-to-cart");
  const cart = document.querySelector(".cart");
  const cartList = document.querySelector(".cart-list");
  const cartOverlay = document.querySelector(".cart-overlay");
  const totalContainer = document.querySelector(".total-container");
  let cartArray = [];

  addToCartButton.onclick = function (event) {
    // displaying the cart itself
    cart.classList.add("showCart");
    cartOverlay.classList.add("transparentBackground");

    //adding product to cart
    const itemToAdd = details.find(
      (item) => item.id === event.target.dataset.product
    );
    cartArray.push(itemToAdd);
    console.log(itemToAdd);
    localStorage.setItem("cartList", JSON.stringify(cartArray));
  };

  // displaying cart with item inside
  function showCart() {
    cartList.innerHTML = "";
    let total = 0;

    total = details.prices.price;

    cartList.innerHTML = `<div class="cart-element">
        <div style="background-image: url(${details.images[0].src})" class="product-img"></div>
          <div>
          <a href="detail.html?id=${details.id}"><h3>${details.name}</h3></a>
          <p>kr ${details.prices.price}</p>
          </div>
          <img src="../images/Icon feather-trash-2.svg" alt="trashcan icon">
          </div>`;
    totalContainer.innerHTML = `<h4>Total: kr ${total}</h4>`;
  }
  showCart(cartArray);
}
