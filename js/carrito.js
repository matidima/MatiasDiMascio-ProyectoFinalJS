let carrito;

if(JSON.parse(localStorage.getItem('carrito'))) {
  carrito = JSON.parse(localStorage.getItem('carrito'))
} else {
  localStorage.setItem('carrito', JSON.stringify([]))
  carrito = JSON.parse(localStorage.getItem('carrito'))
}

const totalCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
}

console.log(carrito)
const body = document.getElementById("carrito");
if (carrito.length == 0) {
    const texto = `
        <article class="h2">
            <h2>Mi Carrito</h2><hr>
        </article>
        <article>
            <h4>Su carrito esta vacío</h4>
            <h4>¿Desea volver al <a href="../index.html">Inicio</a>?</h4>
        </article>
        `;        
    body.innerHTML += texto;    
} 
else {
    const titulo = `
    <div class"carritoContainer">
        <h1 class="carritoH1">Carrito</h1>
    </div>`;
    body.innerHTML += titulo;
    const table = `    
    <div class="tableContainer">
    <table>
        <thead>
            <tr>
                <th></th>
                <th class="txtTabla">Producto</th>
                <th class="txtTabla">Nombre</th>
                <th class="txtTabla">Cantidad</th>
                <th class="txtTabla">Precio</th>
            </tr>
        </thead>
        <Tbody id="tbody">
        </Tbody>
        <tfoot>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th class="txtTotal">Total:</th>
                <th id="total">$${totalCarrito().toLocaleString()}</th>
            </tr>
        </tfoot>
    </table>
    </div>
    <div class="d-grid gap-2 btns-container">
        <button id="btnVaciar" class="btn btn-danger" type="button">Vaciar Carrito</button>
        <button id="btnTerminar" class="btn btn-success" type="button">Terminar compra</button>
    </div>
    `;
    body.innerHTML += table
    const tbody = document.getElementById('tbody')
    for (let i = 0; i < carrito.length; i++) {
        const element = carrito[i];
        const { id, nombre, precio, img, cantidad } = element;
        const cart = `
        <tr id=${id}>
            <th><i id="${id}" class="fa-solid fa-trash btnEliminar"></i></th>
            <th class="detallesTabla"><img class="imgProductoCarrito" src="../${img}" alt="${nombre}"></th>
            <th><span class="nombreProducto">${nombre}</span></th>
            <th>${cantidad}</th>
            <th>$${(cantidad * precio).toLocaleString()}</th>
        </tr>
        `;
        tbody.innerHTML += cart;
    }
}

const btnEliminar = document.getElementsByClassName("btnEliminar");

for (let i = 0; i < btnEliminar.length; i++) {
    const element = btnEliminar[i];
    element.addEventListener("click", eliminarProducto);
}

function eliminarProducto(e) {
    const btn = e.target;
    const botonId = btn.getAttribute("id");
    const productoEnCarrito = carrito.find(prod => prod.id == botonId);
    const indice = carrito.indexOf(productoEnCarrito);
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    location.reload();
};


const btnVaciar = document.getElementById("btnVaciar")
btnVaciar.addEventListener('click', preguntaVaciarCarrito);
function preguntaVaciarCarrito(){
    Swal.fire({
        title:'¿Desea vaciar su carrito?',
        icon:'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                vaciarCarrito()
            }
        })
}
function vaciarCarrito () {
    localStorage.clear('carrito')
    location.reload();
}

const btnTerminar = document.getElementById("btnTerminar");
btnTerminar.addEventListener('click', terminarCompra);
function terminarCompra () {
    Swal.fire({
        title:'¿Desea confirmar la compra?',
        icon:'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tu compra se realizo correctamente',
                    showConfirmButton: true,
                    timer: 2000
                })
                setTimeout(function(){
                    vaciarCarrito()
                }, 2500);
            }
        })
    }