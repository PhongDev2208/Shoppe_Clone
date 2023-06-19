import { drawCategory } from "./drawCategory.js";
import { drawProduct } from "./drawProduct.js";
import { handlePagination } from "./handlePagination.js";
import { buttonSearch, filterBtn, inputSearch, params, selectFilterPrices} from "./variable.js";

// Draw Category
drawCategory();
// Draw Product
drawProduct();

handlePagination();
// Search
const search = () => {
  params.q = inputSearch.value;
  drawProduct();
  handlePagination()
  params.page = 1
  params.category = ''
  activeCategory(document.querySelector('.category-item:first-child'))
}

buttonSearch.addEventListener("click", function() {
  search();
});

inputSearch.addEventListener("keyup", function(e) {
  if(e.key == "Enter") {
    search();
  }
});

inputSearch.addEventListener("blur", function(e) {
  this.value = "";
});
// End Search

// Sort
filterBtn.forEach(btnSort => {
  btnSort.addEventListener("click", function() {
    switch (this.innerText.toLowerCase()) {
      case 'bán chạy':
        params.sort = 'stock'
        params.order = 'desc'
        break;

      case 'mới nhất':
        params.sort = 'id'
        params.order = 'desc'
        break;
    
      default:
        break;
    }

    // Active Btn
    let PrevActiveNode = document.querySelector(".home-filter__btn.btn--primary");
    if(PrevActiveNode) {
      PrevActiveNode.classList.remove("btn--primary");
    }

    this.classList.add("btn--primary");
    // End Active Btn
    // Remove active btn sort price
    let sortPriceActiveBtn = document.querySelector(".select-input__sort-price.text--primary");
    if(sortPriceActiveBtn) {
      sortPriceActiveBtn.classList.remove("text--primary");
    }
    
    drawProduct();
  })
})

selectFilterPrices.forEach(sortPriceBtn => {
  sortPriceBtn.addEventListener("click", function(e) {
    e.preventDefault();
    params.sort = 'price';
    switch (this.innerText.toLowerCase()) {
      case 'giá: thấp đến cao':
        params.order = 'asc'
        break;

      case 'giá: cao đến thấp':
        params.order = 'desc'
        break;
    
      default:
        break;
    }

    // Active Btn
    let PrevActiveNode = document.querySelector(".select-input__sort-price.text--primary");
    if(PrevActiveNode) {
      PrevActiveNode.classList.remove("text--primary");
    }

    this.classList.add("text--primary");
    // End Active Btn
    drawProduct();
  })
})
// End Sort
