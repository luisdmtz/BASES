import {auth,listarciudades,obtenerRepartidor,agregarRepartidor,actualizarRepartidor,cargarImg} from './app.js';
import {cargarGeneric} from './generic/generics.js';

auth();
cargarGeneric();
// listar ciudades
listarciudades();
//saber si es un update
// valores de la url
let sear = new URLSearchParams(location.search);
let idRepartidor = sear.get('id');

if (idRepartidor != null) {
    obtenerRepartidor(idRepartidor);
    document.querySelector("#idRepartidor").value = idRepartidor;
}

const checkBox = document.querySelector("#customCheck");
const formRegistrarAE = document.querySelector("#formRegistrarRepartidor");
const inputCargarPerfil = document.querySelector("#imaperfil");

checkBox.addEventListener("click", (e)=>{
    //console.log("on"); 
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    console.log(checkBox);



})

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
        idTipoUsuario:2,
        tycos:1,
        idCiudad:document.querySelector("#ciudad").value
    }
    if (idRepartidor != null) {
        actualizarRepartidor(parametros,idRepartidor);
    }else{
        agregarRepartidor(parametros);
    }
});

inputCargarPerfil.addEventListener('change',(e)=>{
    e.preventDefault();
    let form = document.querySelector("#formFotoPerfilRepartidor");
    cargarImg(form,1,document.querySelector("#idRepartidor").value);    
});