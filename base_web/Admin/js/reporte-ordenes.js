import {auth,bucarReporteOrdenes} from './app.js';
import {cargarGeneric} from './generic/generics.js';
import {configFireBase} from '../../js/config/config.js';
import {initFirebaseRealtime} from './ordenes-activas/ordenes-activas.js';

auth()
cargarGeneric();

firebase.initializeApp(configFireBase);

const bBuscarReporte = document.querySelector("#bBuscarReporte");

let f = new Date();
let day  = f.getDate();
let mes = f.getMonth() + 1;

if(mes < 10 ){
    mes = `0${mes}`;
}

if(day < 10){
    day = `0${day}`;
}
let fechaIni  = document.querySelector("#FechaInicio").value = `${f.getFullYear()}-${mes}-${day}`; 
let fechaFin = document.querySelector("#FechaFin").value = `${f.getFullYear()}-${mes}-${day}`;


const inicarbuqueda = () =>{
    bucarReporteOrdenes();
     let sOrden =  document.querySelector("#statusOrden").value;
     if(sOrden == 1){
        initFirebaseRealtime();
     }
}

bBuscarReporte.addEventListener('click',(e)=>{
    inicarbuqueda();
})

window.addEventListener('load',()=>{
    inicarbuqueda();
});
