const rowCards = document.querySelector('.row');
const menu = document.querySelector('.menu');

let statusCate = 'All'


const getAllProducts = () => {
	rowCards.innerHTML = '';
  fetch(`https://fakestoreapi.com/products${statusCate !== 'All' ? `/category/${statusCate}` : ''}`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((item) => {
        rowCards.innerHTML += `
				<div class='card'>
				<img src="${item.image}" alt="">
				<h3 class='card__title'>${item.title}</h3>
					<div class='card__info'>
					<span>$ ${item.price}</span>
					<span>${item.rating.count} pieces</span>
					<span>${item.rating.rate} rate</span>
					</div>
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
			`
		})
		const menuItems = document.querySelectorAll('.menu__item');
		Array.from(menuItems).forEach((item) => {
			item.addEventListener('click', function() {
				statusCate = item.textContent
				getAllProducts();
				Array.from(menuItems).forEach((el) => {
					if(el.textContent == statusCate) {
						el.style.color = 'red'
					} else {
						el.style.color = 'black'
					}
				})
			})
		})
	})


};

getAllCategories()


