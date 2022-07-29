let productos/*  = [
  {
    id: "001",
    nombre: "Relieve Grande",
    precio: 1100,
    img: "Img/relievegrande.jpeg",
    desc: "",
  },
  {
    id: "002",
    nombre: "Tachas Chica",
    precio: 670,
    img: "Img/tachaschica.jpeg",
    desc: "",
  },
  {
    id: "003",
    nombre: "Zig Zag Grande",
    precio: 1655,
    img: "Img/zigzaggrande.jpeg",
    desc: "",
  },
  {
    id: "004",
    nombre: "Yoga V1",
    precio: 430,
    img: "Img/yogav1.jpeg",
    desc: "",
  },
  {
    id: "005",
    nombre: "Soporte Celular",
    precio: 525,
    img: "Img/soportecelular.jpeg",
    desc: "",
  },
  {
    id: "006",
    nombre: "Yoda",
    precio: 550,
    img: "Img/yoda.jpeg",
    desc: "",
  },
  {
    id: "007",
    nombre: "Cara Abastracta",
    precio: 495,
    img: "Img/caraabstracta.jpeg",
    desc: "",
  },
  {
    id: "008",
    nombre: "Maceta Frida",
    precio: 680,
    img: "Img/macetafrida.jpeg",
    desc: "",
  },
]; */

let carrito;

if(JSON.parse(localStorage.getItem('carrito'))) {
  carrito = JSON.parse(localStorage.getItem('carrito'))
} else {
  localStorage.setItem('carrito', JSON.stringify([]))
  carrito = JSON.parse(localStorage.getItem('carrito'))
}

function fetchJSON(){
  fetch('productos.json')
  .then(function(res){
      return res.json();
  })
  .then((data) => {
      productos = data;
      let card ='';
      data.forEach(function(producto){
          card += `
          <article class="card">
            <img class="imgProducto" src=${producto.img} alt="${producto.nombre}"/>
            <h4>${producto.nombre}</h4>
            <h6>$${producto.precio.toLocaleString()}</h6>
            <div class="btn-container">
              <button id=${producto.id} class="btn btn-success btnAgregar">Añadir al carrito</button>
            </div>
            </article>
            `;
      });
      const container = document.getElementById('productosindex')
      container.innerHTML = card
  })
  .catch(function(){
      document.write("Error en los servidores")
  })
}
fetchJSON()

/* function desplegarProductos() {
    for (let i = 0; i < productos.length; i++) {
        const element = productos[i];
        const { id, nombre, precio, img } = element;
        const card = `
        <article class="card">
        <img class="imgAuto" src=${img} alt="${nombre}"/>
        <h4>${nombre}</h4>
        <h6>$${precio.toLocaleString()}</h6>
        <div class="btn-container">
                    <button id=${id} class="btn btn-success btnAgregar">Añadir al carrito</button>
                    </div>
            </article>
            `;
            const container = document.getElementById("productosindex");
            container.innerHTML += card;
          }
}
desplegarProductos(); */

const btnAgregar = document.getElementsByClassName("btnAgregar");
console.log(btnAgregar)

for (let i = 0; i < btnAgregar.length; i++) {
    const element = btnAgregar[i];
    element.addEventListener("click", agregarAlCarrito);
  }
  
  function agregarAlCarrito(e) {
    const btn = e.target;
    console.log(btn)
    const botonId = btn.getAttribute("id");
    const productoEncontrado = productos.find(prod => prod.id == botonId);
    const enCarrito = carrito.find(prod => prod.id == productoEncontrado.id);
    if (!enCarrito) {
      carrito.push({...productoEncontrado, cantidad: 1});
    } else {
      let carritoFiltrado = carrito.filter(prod => prod.id != enCarrito.id);
      carrito = [...carritoFiltrado, {...enCarrito, cantidad: enCarrito.cantidad + 1}]
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
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
      onClick: function(){}
    }).showToast();
}

/* function cargarJSON() {
  fetch('../productos.json')
    .then(function(res) {
      console.log(res)
    })
    .then(function(data) {
      console.log(data)
    })

}

cargarJSON() */
