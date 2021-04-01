import {auth,listarProductos,listarTipoProd,agregarProducto,editarProducto,limpiarFormProducto,cargarImg} from './app.js';
import {cargarGeneric} from './generic/generics.js';
import {refUrlPag} from '../../js/config/config.js'

// validar token
auth()
cargarGeneric();

// obtener elemento get
let sear = new URLSearchParams(location.search);
let idEstab = sear.get('idEstab');
// eventos de la pagina
listarProductos(idEstab);
listarTipoProd();
// 
const btnVerAgregarProd = document.querySelector("#btnVerAgregarProd");
const btnAgregarProducto = document.querySelector("#btnAgregarProducto");
const imgProd = document.querySelector("#imgProd");
// 
btnVerAgregarProd.addEventListener("click",()=>{

    let fAddProducto = document.querySelector("#fAddProducto");
    if (fAddProducto.style.display == "block") {
        fAddProducto.style.display = "none";
    }else{
        fAddProducto.style.display = "block";
    };
    limpiarFormProducto();
})

btnAgregarProducto.addEventListener("click",() => {

    let parametros = {
        producto: document.querySelector("#producto").value,
        descripcion: document.querySelector("#descripcion").value,
        precio: document.querySelector("#precio").value,
        idEstablecimiento:idEstab,
        tipoProducto: document.querySelector("#tipoProducto").value
    }
    console.log(parametros);
    let idProducto = document.querySelector("#idProducto").value;

    idProducto != 0 ? editarProducto(idProducto,parametros) : agregarProducto(parametros)

});

imgProd.addEventListener("change",()=>{
    let idProd = document.querySelector("#idProducto").value;
    if (idProd != 0) {
        let form = document.querySelector("#formFotoProducto");
        cargarImg(form,8,document.querySelector("#idProducto").value);
        self.location.reload();
    }else{
        alert("no hay Producto seleccionado")
    }
    
});