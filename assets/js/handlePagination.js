import { drawProduct } from "./drawProduct.js";
import { checkDisablePagination, limitPagination, paginationNext, paginationNumber, paginationPrev, params, total } from "./variable.js";

export const handlePagination = () => {
    // Render paginationNext
    total.update();
    paginationNumber.innerHTML = params.page;
    
    // Pagination
    paginationNext.onclick = function(e) {
        e.preventDefault();
    
        if(params.page < limitPagination) {
        params.page = params.page + 1;
        checkDisablePagination();
        paginationNumber.innerHTML = params.page;
        drawProduct();
        }
    };
    
    paginationPrev.onclick = function(e) {
        e.preventDefault();
    
        if(params.page > 1) {
        params.page = params.page - 1;
        checkDisablePagination(); 
        paginationNumber.innerHTML = params.page;
        drawProduct();
        }
    };
    // End Pagination
}