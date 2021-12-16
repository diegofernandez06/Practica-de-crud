import {
  campoRequerido,
  validarNumeros,
  validarGeneral,
  validarURL,
} from "./validaciones.js";
import { Producto } from "./productoClass.js";

// traigo el elemento que necesito del html (imput)
let campoCodigo = document.querySelector("#codigo");
let campoProducto = document.querySelector("#producto");
let campoDescripcion = document.querySelector("#descripcion");
let campoCantidad = document.querySelector("#cantidad");
let campoURL = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");
//si hay algo en localstorage quiero guardarlo en el arreglo sino quiero que sea un arreglo vacio
let listaProductos =
  JSON.parse(localStorage.getItem("arreglosProductosKey")) || [];
let productoExistente = false; // si productoExistente es = false se quiere crear producto, si es true entonces quiero modificar un producto existe

// asociar un evento a un elemtento del hyml desde js
// ddEventListener  : manejador de evento 2 parametros (nombre evento mas funcion asociada)
campoCodigo.addEventListener("blur", () => {
  campoRequerido(campoCodigo);
});
campoProducto.addEventListener("blur", () => {
  campoRequerido(campoProducto);
});
campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});
campoCantidad.addEventListener("blur", () => {
  validarNumeros(campoCantidad);
});
campoURL.addEventListener("blur", () => {
  validarURL(campoURL);
});
formularioProducto.addEventListener("submit", guardarProducto);

//llamo a carga inicial
cargaInicial();

function guardarProducto(e) {
  //verificar que todos los datos sean validados
  e.preventDefault();
  if (
    validarGeneral(
      campoCodigo,
      campoProducto,
      campoDescripcion,
      campoCantidad,
      campoURL
    )
  ) {
    if (productoExistente == false) {
      // crear producto
      crearProducto();
    } else {
      //modifica un producto
      modificarProducto();
    }
  }
}

function crearProducto() {
  // crear un objeto producto
  console.log("aqui tengo que crear el producto");
  let productoNuevo = new Producto(
    campoCodigo.value,
    campoProducto.value,
    campoDescripcion.value,
    campoCantidad.value,
    campoURL.value
  );
  // guardar el objeto dentro del arreglo de producto
  console.log(productoNuevo);
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  //limpiar el formulario
  limpiarFormulario();
  //guardar el arreglo de productos dentro de localstorage
  guardarLocalStorage();
  // mostrar un cartel al usuario
  Swal.fire(
    "Producto creado",
    "Su producto fue correctamente cargado",
    "success"
  );
  //cargar producto en la tabla
  crearFila(productoNuevo);
}

function limpiarFormulario() {
  //limpiamos los value de un formulario
  formularioProducto.reset();
  // resetear las clases
  campoCodigo.className = "form-control";
  campoProducto.className = "form-control";
  campoDescripcion.className = "form-control";
  campoCantidad.className = "form-control";
  campoURL.className = "form-control";
}
function guardarLocalStorage() {
  localStorage.setItem("arreglosProductosKey", JSON.stringify(listaProductos));
}

function crearFila(producto) {
  let tablaProductos = document.getElementById("tablaProductos");
  tablaProductos.innerHTML += `<tr>
    <th>${producto.codigo}</th>
    <td>${producto.producto}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.url}</td>
    <td class="text-center">
    <button class="btn btn-warning" onclick="prepararEdicionProducto('${producto.codigo}')">Editar</button>
      <button class="btn btn-danger">Borrar</button></td>
  </tr>`;
}

function cargaInicial(){
  if (listaProductos.length > 0) {
    // crear las final
    listaProductos.forEach((itemProducto) => {
      crearFila(itemProducto);
    });
  }
}
window.prepararEdicionProducto = function (codigo) {
  console.log("desde editar");
  console.log(codigo);
  //  buscar el producto en el arreg lo
  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo == codigo;
  });
  console.log(productoBuscado);
  //mostrar el producto en el fomulario
  campoCodigo.value = productoBuscado.codigo;
  campoProducto.value = productoBuscado.producto;
  campoDescripcion.value = productoBuscado.descripcion;
  campoCantidad.value = productoBuscado.cantidad;
  campoURL.value = productoBuscado.url;
  //cambio mi variable productoExistente
  productoExistente = true;
};

function modificarProducto() {
  console.log("desde modificar producto");
  //encontrar la posicion del elemento que quiero modificar dentro del arreglo del productos
  let posicionObjetoBuscado = listaProductos.findIndex((itemProducto) => {
    return itemProducto.codigo == campoCodigo.value});
    console.log(posicionObjetoBuscado);
  //modificar los valores dentro del arreglo
  listaProductos[posicionObjetoBuscado].producto =campoCodigo.value;
  listaProductos[posicionObjetoBuscado].producto = campoProducto.value;
  listaProductos[posicionObjetoBuscado].descripcion = campoDescripcion.value;
  listaProductos[posicionObjetoBuscado].cantidad = campoCantidad.value;
  listaProductos[posicionObjetoBuscado].url = campoURL.value;

  //actualizar el local storage
  guardarLocalStorage();
  //atualizar la tabla tambien
  borrarTabla();
  cargaInicial();
}

function borrarTabla(){
  let tbodyProductos = document.querySelector("#tablaProductos");
  tbodyProductos.innerHTML="";
}
