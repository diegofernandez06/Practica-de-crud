import {campoRequerido,validarNumeros, validarGeneral,validarURL } from "./validaciones.js"
import {Producto} from "./productoClass.js";

// traigo el elemento que necesito del html (imput)
let campoCodigo = document.querySelector("#codigo");
let campoProducto = document.querySelector("#producto");
let campoDescripcion = document.querySelector("#descripcion");
let campoCantidad = document.querySelector("#cantidad");
let campoURL = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");
//si hay algo en localstorage quiero guardarlo en el arreglo sino quiero que sea un arreglo vacio 
let listaProductos = JSON.parse(localStorage.getItem("arreglosProductosKey")) || [];

// asociar un evento a un elemtento del hyml desde js
// ddEventListener  : manejador de evento 2 parametros (nombre evento mas funcion asociada)
campoCodigo.addEventListener("blur", () => {campoRequerido(campoCodigo);});
campoProducto.addEventListener("blur", () => {campoRequerido(campoProducto);});
campoDescripcion.addEventListener("blur", () => {campoRequerido(campoDescripcion);});
campoCantidad.addEventListener("blur", () => {validarNumeros(campoCantidad);});
campoURL.addEventListener("blur", () => {validarURL(campoURL);});
formularioProducto.addEventListener("submit", guardarProducto );

function guardarProducto(e){
    //verificar que todos los datos sean validados
    e.preventDefault();
    if(validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad, campoURL)){
    // crear producto
    crearProducto();
    }
}

function crearProducto(){
    // crear un objeto producto
    console.log("aqui tengo que crear el producto")
    let productoNuevo = new Producto(campoCodigo.value, campoProducto.value, campoDescripcion.value, campoCantidad.value, campoURL.value);
    // guardar el objeto dentro del arreglo de producto
    console.log(productoNuevo);
    listaProductos.push(productoNuevo);
    console.log(listaProductos);
    //limpiar el formulario
    limpiarFormulario();
    //guardar el arreglo de productos dentro de localstorage
    guardarLocalStorage();
}

function limpiarFormulario(){
    //limpiamos los value de un formulario
    formularioProducto.reset();
    // resetear las clases 
    campoCodigo.className = "form-control";
    campoProducto.className = "form-control";
    campoDescripcion.className = "form-control";
    campoCantidad.className = "form-control";
    campoURL.className = "form-control";

}
function guardarLocalStorage(){
    localStorage.setItem("arreglosProductosKey", JSON.stringify(listaProductos) )

}