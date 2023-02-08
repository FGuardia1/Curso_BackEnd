let seccionMuestrarioProd = document.getElementById("products-container");
let btnCerrarSesion = document.getElementById("btn_cerrar_sesion");
let carritoTabla = document.getElementById("tablaCarrito");
let botonPedido = document.getElementById("botonPedido");
let botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
seccionMuestrarioProd.addEventListener("click", agregarProducto);
botonVaciarCarrito.addEventListener("click", vaciarCarrito);
botonPedido.addEventListener("click", crearPedido);

function crearPedido() {
  fetch("/api/pedido/new", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

function cerrarSesion() {
  fetch("/login/logout", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
}

async function vaciarCarrito() {
  let idCart = await fetch("/api/carrito/", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  idCart = await idCart.json();

  let response = await fetch("/api/carrito/" + idCart + "/productos", {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });
  //response = await response.json();

  console.log(response.status);
  carritoTabla.innerHTML = "";
}

async function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains("articulo__boton-compra")) {
    ///obtengo el producto que se muestra en la pagina
    const productoSeleccionado = e.target.parentElement;
    //obtengo el id del producto, es el numero del id
    let idProd = productoSeleccionado.getAttribute("id");
    ///selecciona el producto por el codigo

    let idCart = await fetch("/api/carrito/", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });

    idCart = await idCart.json();

    let cartUpdated = await fetch("/api/carrito/" + idCart + "/productos", {
      body: JSON.stringify({ idProd: idProd }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    cartUpdated = await cartUpdated.json();

    actualicarCarrito(cartUpdated);
  }
}

function actualicarCarrito(carrito) {
  carritoTabla.innerHTML = "";

  carrito.forEach((element) => {
    const row = document.createElement("tr");
    row.innerHTML = obtenerHtmlfilaTabla(element);
    carritoTabla.appendChild(row);
  });
}

function obtenerHtmlfilaTabla({ foto, nombre, precio }) {
  return `      
  <td><img
  class="card-img-top img-fluid"
  src=${foto}
  alt="Card image cap"
  style="width: 70px;"
/></td>
  <td>${nombre}</td>
  <td>$${precio}</td>
  
`;
}
