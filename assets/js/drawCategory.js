import { API_CATEGORY } from "./constants.js";
import { drawProduct } from "./drawProduct.js";
import { fetchApi } from "./fetchApi.js";
import { handlePagination } from "./handlePagination.js";
import { category, params } from "./variable.js";

function activeCategory(activeNode) {
  let PrevActiveNode = document.querySelector(".category-item--active");
  if(PrevActiveNode) {
    PrevActiveNode.classList.remove("category-item--active");
  }

  // activeNode = [...document.querySelectorAll(".category-item__link")].find(item => {
  //   let currentCategory = params.category || 'All' 
  //   return item.innerText == currentCategory;
  // })
  
  activeNode.closest('.category-item').classList.add("category-item--active");
}

export const drawCategory = () => {
  fetchApi(API_CATEGORY)
    .then(data => {
      const arrayHTML = data.map(item => {
        let category = item === 'All' ? '' : item
        return `
        <li class="category-item ${category === params.category && 'category-item--active'}">
            <a href="" class="category-item__link">${item}</a>
        </li>
        `;
      });
      const stringHTML = arrayHTML.join("");
      category.innerHTML = stringHTML;

      const listCategory = document.querySelectorAll(".category-item a");
      listCategory.forEach(item => {
        item.addEventListener("click", function(e) {
          e.preventDefault();
          let category = this.innerText === 'All' ? '' : this.innerText
          params.category = category;
          params.page = 1
          params.q = ''
          activeCategory(this);
          handlePagination();
          drawProduct();
        });
      });
    })
}