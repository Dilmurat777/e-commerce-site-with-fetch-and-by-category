const rowCards = document.querySelector('.row');
const menu = document.querySelector('.menu');

let statusCate = 'All';

const getAllProducts = () => {
  rowCards.innerHTML = '';
  fetch(`https://fakestoreapi.com/products${statusCate !== 'All' ? `/category/${statusCate}` : ''}`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((item) => {
        rowCards.innerHTML += `
          <div class='card'>
            <h3 class='card__title'>${item.title}</h3>
            <img src="${item.image}" alt="">
            <span>${item.price}</span>
          </div>
        `;
      });
    });
};

getAllProducts();

const getAllCategories = () => {
  fetch(`https://fakestoreapi.com/products/categories`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((item) => {
        menu.innerHTML += `
          <li data-id='${item}' class='menu__item'>${item}</li>
        `;
      });
      const menuItems = document.querySelectorAll('.menu__item');
      Array.from(menuItems).forEach((item) => {
        item.addEventListener('click', function() {
          statusCate = item.textContent;
          getAllProducts();
          Array.from(menuItems).forEach((el) => {
            el.style.color = el.textContent === statusCate ? 'red' : 'black';
          });
        });
      });
    });
};

getAllCategories();
