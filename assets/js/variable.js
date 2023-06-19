import { API_PRODUCT } from "./constants.js";
import { fetchApi } from "./fetchApi.js";

export let params = {
  q: "",
  page: 1,
  limit: 10,
  category: "",
  sort: "id",
  order: "desc",
}

export const category = document.querySelector(".category-list");
export const inputSearch = document.querySelector(".header__search-input");
export const buttonSearch = document.querySelector(".header__search-btn");
export const product = document.querySelector(".home-product .row");
export const paginationPrev = document.querySelector(".home-filter__page-btn:has(.fa-chevron-left)");
export const paginationNext = document.querySelector(".home-filter__page-btn:has(.fa-chevron-right)");
export const paginationNumber = document.querySelector(".home-filter__page-current");
export const paginationTotal = document.querySelector(".home-filter__page-total");
export const filterBtn = document.querySelectorAll(".home-filter__btn");
export const selectFilterPrices = document.querySelectorAll(".select-input__link");
// Max number of pages
export let limitPagination = 0;
// Check Prev and Next buttons 
export const checkDisablePagination = () => {
  if(params.page === limitPagination) {
  paginationNext.classList.add("home-filter__page-btn--disabled")
  } else paginationNext.classList.remove("home-filter__page-btn--disabled")

  if(params.page === 1) {
  paginationPrev.classList.add("home-filter__page-btn--disabled")
  } else paginationPrev.classList.remove("home-filter__page-btn--disabled")
}

export const total = {
  value: 0,
  async update() {
    let category = "";
    if (params.category !== "") category = `&category=${params.category}`
    const api = `${API_PRODUCT}?q=${params.q}${category}`;

    await fetchApi(api).then(data => {
      this.value = data.length;
      paginationTotal.innerHTML = limitPagination = Math.ceil(this.value / 10);
    })

    checkDisablePagination();
  }
}



