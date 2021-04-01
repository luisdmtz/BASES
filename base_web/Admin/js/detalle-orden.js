import { auth, obtenerOrden } from "./app.js";
import {cargarGeneric} from './generic/generics.js';
auth();
cargarGeneric();

let bCopyOr = document.querySelector('#bCopyOr');
let bCopyDes = document.querySelector('#bCopyDes');

let sear = new URLSearchParams(location.search);
let idOrden = sear.get('idOrden');


window.addEventListener("load",()=>{
    obtenerOrden(idOrden);
});

const copy = (element) =>{
    // console.log(`copiando ${element}`);
    let elemento = document.querySelector(`#url${element}`);
    console.log(elemento)
    let range = document.createRange();
    range.selectNode(elemento);
    window.getSelection().addRange(range);

    try {
        // intentar copiar el contenido seleccionado
        var resultado = document.execCommand('copy');
        console.log(resultado ? 'texto copiado' : 'No se pudo copiar el texto');
        document.querySelector(`#success${element}`).innerHTML = "Copiado"
    } catch(err) {
        console.log('ERROR al intentar copiar el texto');
    }
    window.getSelection().removeAllRanges();
}

bCopyOr.addEventListener('click',()=>copy('Origen'));
bCopyDes.addEventListener('click',()=>copy('Destino'));