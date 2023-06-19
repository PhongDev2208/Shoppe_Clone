import { API_PRODUCT } from "./constants.js";
import { fetchApi } from "./fetchApi.js";
import { params, product } from "./variable.js";

export const drawProduct = () => {
    let category = "";
    if (params.category !== "") category = `&category=${params.category}`

  const api = `${API_PRODUCT}?q=${params.q}&_page=${params.page}&_limit=${params.limit}${category}&_sort=${params.sort}&_order=${params.order}`;

  fetchApi(api).then((data) => {
    const arrayHTML = data.map((item) => {
      return `
        <div class="col l-2-4 m-4 c-6">
            <a class="home-product-item" href="#">
                <div class="home-product-item__img">
                    <img src="${item.thumbnail}" alt="${item.title}">
                </div>
                <h4 class="home-product-item__name">${item.title}</h4>
                <div class="home-product-item__price">
                    <span class="home-product-item__price-old">${Math.round(item.price*(100-item.discountPercentage)/100)}$</span>
                    <span class="home-product-item__price-current">${item.price}$</span>
                </div>
                <div class="home-product-item__action">
                    <span class="home-product-item__like home-product-item__like--liked">
                        <i class="home-product-item__like-icon-empty fa-regular fa-heart "></i>
                        <i class="home-product-item__like-icon-fill fa-solid fa-heart"></i>
                    </span>
                    <span class="home-product-item__rating">
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </span>
                    <span class="home-product-item__sold">${item.stock} đã bán</span>
                </div>
                <div class="home-product-item__origin">
                    <span class="home-product-item__brand">${item.brand}</span>
                    <span class="home-product-item__origin-name">Hà Nội</span>
                </div>
                <div class="home-product-item__favourite">
                    <i class="fa-solid fa-check"></i>
                    <span>Yêu thích</span> 
                </div>
                <div class="home-product-item__sale-off">
                    <span class="home-product-item__sale-off-percent">${item.discountPercentage}%</span>
                    <span class="home-product-item__sale-off-label">GIẢM</span>
                </div>
            </a>
        </div>
        `;
    });
    const stringHTML = arrayHTML.join("");
    product.innerHTML = stringHTML;
  });
};
