const productsArea = document.querySelector('.products-container');
const filterComponents = document.querySelector('#componentes');
const filterPeriferics = document.querySelector('#perifericos');
const filterAccessories = document.querySelector('#accesorios'); 
const showAllProducts = document.querySelector('.logo-container');

const productBanner = document.querySelector('#product-banner');
const hero = document.querySelector('.hero');

const numProductsOnCart = document.querySelector('.products-on-cart');
const cartSideBar = document.querySelector('.mi-carrito');
let addToCartBtn;

let products = [];
let displayedProducts = [];

let carrito = 0;

//llamado inicial para obtener y mostrar todos los productos en la pagina
function getProducts() {
  fetch('https://ps-shop-api.herokuapp.com/Productos')
  .then((response) => response.json())
  .then(data => {
    products = [...data];
    insertProducts(data);
    addListenersToProducts(); 
    displayedProducts = products;
  });
}


getProducts();

//Llamar los productos al visor de la pagina
function insertProducts(products) {
  productsArea.innerHTML = products.map((product) => {
    const {clase, nombre, precio, imagen, cantidad} = product
    return `
    <div class="tarjeta">
      <div class="img">
        <img class="product-image" src=${imagen} alt="">
      </div>
      <div class="contenido">
        <h3>${nombre}</h3>
        <p class="precio">$${precio}</p>
        <h4 class="stock">Stock: ${cantidad}</h4>
        <button class="agregar-producto">        <span class="material-symbols-outlined">
        add
        </span></button>
      </div>
    </div>
    `;
  });
}


//filtrar por clasificaciones de productos
filterComponents.addEventListener('click', () =>{
  displayedProducts = products.filter((product) => product.clase === 'componente');
  insertProducts(displayedProducts); 
  addListenersToProducts(); 
  hero.style.backgroundImage = 'url("./media/components.webp")'; 
  productBanner.innerHTML = 'Componentes';
  console.log(displayedProducts); 
});

filterPeriferics.addEventListener('click', () =>{
  displayedProducts = products.filter((product) => product.clase === 'periferico');
  insertProducts(displayedProducts);
  addListenersToProducts(); 
  productBanner.innerHTML = 'Perifericos';
  hero.style.backgroundImage = 'url("./media/periferics.jpg")'; 

});

filterAccessories.addEventListener('click', () =>{
  displayedProducts = products.filter((product) => product.clase === 'accesorio');
  insertProducts(displayedProducts); 
  addListenersToProducts(); 
  productBanner.innerHTML = 'Accesorios';
  hero.style.backgroundImage = 'url("./media/accesories.jpg")'; 
});

showAllProducts.addEventListener('click', () => {
  getProducts();
  addListenersToProducts(); 
  productBanner.innerHTML = 'Todos los productos';
  hero.style.backgroundImage = 'url("./media/all-products.jpg")'; 

})


//Cerrar y abrir el menu del carrito
document.querySelector('.side-panel-toggle').addEventListener('click', () => {
  document.querySelector('.wrapper').classList.toggle("side-panel-open");
});

document.querySelector('.close-side-panel-button').addEventListener('click' , () => {
  document.querySelector('.wrapper').classList.toggle("side-panel-open");
})


//Click para añadir al carrito
const addListenersToProducts = () => {
  addToCartBtn = document.querySelectorAll('.agregar-producto');
  addToCartBtn.forEach((square, index) => { square.addEventListener('click', () =>{
    addToCart(index); 
    });
  });
}

function addToCart(index) {
  //console.log(displayedProducts[index]);
  const stockVisible = document.querySelectorAll('.stock');
  console.log();

  if (displayedProducts[index].cantidad > 0){
    displayedProducts[index].cantidad -= 1;
    stockVisible[index].innerHTML = `Stock: ${displayedProducts[index].cantidad}`;
    carrito += 1;
    numProductsOnCart.innerHTML = carrito;
    cartSideBar.innerHTML = carrito;
  }

}