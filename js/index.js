let productos;
let carrito;

if (JSON.parse(localStorage.getItem("carrito"))) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  localStorage.setItem("carrito", JSON.stringify([]));
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

function fetchJSON() {
  fetch("productos.json")
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      productos = data;
      console.log(productos);
      let card = "";
      data.forEach(function (producto) {
        card += `
          <article class="card">
            <img class="imgProducto" src=${producto.img} alt="${
          producto.nombre
        }"/>
            <h4>${producto.nombre}</h4>
            <h6>$${producto.precio.toLocaleString()}</h6>
            <div class="btn-container">
              <button id=${
                producto.id
              } class="btn btn-success btnAgregar">Añadir al carrito</button>
            </div>
            </article>
            `;
      });
      const container = document.getElementById("productosindex");
      container.innerHTML = card;
    })
    .catch(function () {
      document.write("Error en los servidores");
    });
}
fetchJSON();


document.addEventListener("click", (e)=>{
  if(e.target && e.target.matches("button.btn")){
    agregarAlCarrito(e.target.id);
  }
})

function agregarAlCarrito(e) {
  const productoEncontrado = productos.find((prod) => prod.id == e);
  const enCarrito = carrito.find((prod) => prod.id == productoEncontrado.id);
  if (!enCarrito) {
    carrito.push({ ...productoEncontrado, cantidad: 1 });
  } else {
    let carritoFiltrado = carrito.filter((prod) => prod.id != enCarrito.id);
    carrito = [
      ...carritoFiltrado,
      { ...enCarrito, cantidad: enCarrito.cantidad + 1 },
    ];
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  Toastify({
    text: "El producto se agrego al carrito",
    duration: 3000,
    destination: "pages/carrito.html",
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #57d66e, #a3e0ae)",
    },
    onClick: function () {},
  }).showToast();
}
