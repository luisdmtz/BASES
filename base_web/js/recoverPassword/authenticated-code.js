import {validarCodeRecoverPassword} from './app.js'

let sear = new URLSearchParams(location.search);
let idUser = sear.get('id');

const formValidarCode = document.querySelector("#formValidarCode");

formValidarCode.addEventListener("submit",(e)=>{
    e.preventDefault();
    let codigo = document.querySelector("#Codigo").value;
    validarCodeRecoverPassword(codigo,idUser);    
})