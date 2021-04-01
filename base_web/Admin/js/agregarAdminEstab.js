import {auth,listarciudades,obtenerAdminEstab,actualizarAdminEstab,agregarAdminEstab} from './app.js';
import {cargarGeneric} from './generic/generics.js';

// validar token
auth()
cargarGeneric();
// listar ciudades
listarciudades();
//saber si es un update
// valores de la url
let sear = new URLSearchParams(location.search);
let idAdminEstab = sear.get('id');

if (idAdminEstab != null) {
    obtenerAdminEstab(idAdminEstab);
}
// 
const formRegistrarAE = document.querySelector("#formRegistrarAE");

formRegistrarAE.addEventListener('submit', (e) => {
    e.preventDefault();
    let password = document.querySelector("#password").value;
    if (password == '') {
        password = null
    }
    let parametros =  {
        nombre:document.querySelector("#nombre").value,
        apellidos:document.querySelector("#apellidos").value,
        email:document.querySelector("#email").value,
        password:password,
        sexo:document.querySelector("#sexo").value,
        codigoPais:"52",
        telefono:document.querySelector("#telefono").value,
        idTipoUsuario:3,
        tycos:1,
        idCiudad:document.querySelector("#ciudad").value
    }
    if (idAdminEstab != null) {
        actualizarAdminEstab(parametros,idAdminEstab);
    }else{
        agregarAdminEstab(parametros);
    }
    
});