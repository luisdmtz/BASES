import {enviaCodigo} from './app.js'

const botonConfirmar = document.querySelector("#botonConfirmar");

const validateEmail = (Email) => {
    return true
}

let sear = new URLSearchParams(location.search);
let TipoUsuario = sear.get('TipoUsuario');

botonConfirmar.addEventListener("click",(e)=>{
    e.preventDefault();
    let Email = document.querySelector("#Email").value
    if (validateEmail(Email)) {
        enviaCodigo(Email,TipoUsuario);
    }
    
})