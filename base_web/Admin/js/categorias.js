import {auth,listarCategorias,mostrarOcultar,addCategoria,addSubcategoria,cargarImg} from './app.js';
import {cargarGeneric} from './generic/generics.js';

auth();
cargarGeneric();
// listar categorias
listarCategorias(true);

const bAddCategoria = document.querySelector("#bAddCategoria");
const bAddSubcategoria = document.querySelector("#bAddSubcategoria");
const bAgregarCategoria = document.querySelector("#bAgregarCategoria");
const bAgregarSubcategoria = document.querySelector("#bAgregarSubcategoria");
const img = document.querySelector("#img");

bAddCategoria.addEventListener("click", (e)=>{
    mostrarOcultar("fAddCategoria");
    document.querySelector("#idCategoriaParaCategoria").value = 0;
    document.querySelector("#nombreCategoria").value = "";
})

bAddSubcategoria.addEventListener("click",(e)=>{
    mostrarOcultar("fAddSubcategoria");
    document.querySelector("#idSubcategoria").value = 0;
    document.querySelector("#nombreSubcategoria").value = "";
})

bAgregarCategoria.addEventListener("click",(e)=>{
    let idCategoria = document.querySelector("#idCategoriaParaCategoria").value; 
    addCategoria(idCategoria);
})

bAgregarSubcategoria.addEventListener("click",(e)=>{
    let idSubcategoria = document.querySelector("#idSubcategoria").value;
    let idCategoria = document.querySelector("#idCategoriaParaSubcategoria").value;
    if (idCategoria == 0) {
        alert("Seleccione una Categoria")
    }else{
        // console.log(idSubcategoria,idCategoria);
        addSubcategoria(idCategoria,idSubcategoria);
    }
    
})

img.addEventListener("change",(e)=>{
    let formImg = document.querySelector("#cargarImg");
    let tipo = document.querySelector("#tipoimg").value;
    let idElemento = document.querySelector("#idElementoImg").value;
    console.log(formImg,tipo,idElemento);
    cargarImg(formImg,tipo,idElemento);
})