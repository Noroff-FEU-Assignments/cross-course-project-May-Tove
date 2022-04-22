const baseUrl =
  "https://mayth.one/rainydays/wp-json/wc/store/products?category=25";
const productContainer = document.querySelector(".list-of-products");
const categories = document.querySelectorAll(".category");

export async function getProducts(url) {
  try {
    const response = await fetch(url);
    const products = await response.json();
    productContainer.innerHTML = "";

    products.forEach(function (product) {
      productContainer.innerHTML += `<article class="product">
      <a href="detail.html?id=${product.id}">
      <div class="img-container">
      <img src=${product.images[0].src} alt="${product.images[0].alt}" class="product-img"/>
      <button class="view-btn">View</button>
      </div>
      <h3>${product.name}</h3>
      <h4>kr ${product.prices.price}</h4>
      </a>
      </article>`;
    });
  } catch (error) {
    console.log(error);
    productContainer.innerHTML = "an error occurred";
  }
}

getProducts(baseUrl);

const secondUrl = "https://mayth.one/rainydays/wp-json/wc/store/products";
categories.onchange = function () {
  let newUrl;
  const categoryChosen = categories.value;
  if (categories.value === "true") {
    newUrl = secondUrl + "?featured=true";
  } else if (categories.value === "24") {
    newUrl = baseUrl;
  } else {
    newUrl = secondUrl + `?category=${categoryChosen}`;
  }
  productContainer.innerHTML = "";
  getProducts(newUrl);
};
