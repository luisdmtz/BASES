import {auth,listarTipoPromoAnuncio,listarPromoAnuncioEstab,listarPromoAnuncios,ObtenerPromoAnuncio,agregarPromoAnuncios,cargarImg,actualizarPromoAnuncios} from './app.js';
import {cargarGeneric} from './generic/generics.js';

// validar token
auth()
cargarGeneric();
// listas
let sear = new URLSearchParams(location.search);
let idPromociones_Anuncios = sear.get('id');

listarTipoPromoAnuncio();
listarPromoAnuncioEstab();
// listarPromoAnuncios(true);

if (idPromociones_Anuncios != null) {
    document.querySelector("#idPromocion").value = idPromociones_Anuncios;
    document.querySelector("#divImagenes").style.display = "block";
    ObtenerPromoAnuncio(idPromociones_Anuncios);
}
//eventos de la pagina 
// const establecimiento = document.querySelector("#establecimiento");
//const promoAnuncio = document.querySelector("#promoAnuncio");
const formRegistrarPromoAnuncio = document.querySelector("#formRegistrarPromoAnuncio");
const imgPromocion = document.querySelector("#imgPromocion");

// boton resgistro de Promociones y Anuncios
 formRegistrarPromoAnuncio.addEventListener('submit', (e) => {
    e.preventDefault();
    let idEstablecimiento;
    if(document.querySelector("#establecimiento").value == ''){
        idEstablecimiento  = null;
    }
    let parametros =  {
        idEstablecimiento:idEstablecimiento,
        descripcion:document.querySelector("#detalle").value,
        idTipoPromociones_Anuncios:document.querySelector("#promoAnuncio").value,
        montoDescuento:document.querySelector("#montoDescuento").value,
        codigoDescuento:document.querySelector("#codigoDescuento").value,
        fechaExpiracion:document.querySelector("#fechaExpiracion").value,
        titulo:document.querySelector("#titulo").value,
        nota:document.querySelector("#nota").value
    }
    if (idPromociones_Anuncios != null) {
        actualizarPromoAnuncios(parametros,idPromociones_Anuncios)
    }else{
        agregarPromoAnuncios(parametros);
    }
});


imgPromocion.addEventListener('change',()=>{
    let form = document.querySelector("#formImagenPromocion");
    cargarImg(form,7,document.querySelector("#idPromocion").value);    
});
/*
inputCargarPortda.addEventListener('change',()=>{
    let form = document.querySelector("#formFotoPortadaEstab");
    console.log(form);
    cargarImg(form,3,document.querySelector("#idEstablecimiento").value);
})
*/