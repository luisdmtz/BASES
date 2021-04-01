import {auth,listarciudades} from './app.js';
import {cargarGeneric} from './generic/generics.js';
import {initMap,initFirebaseRealtime} from './map-repartidor/mapa.js';
import {configFireBase} from '../../js/config/config.js';

auth();
cargarGeneric();
listarciudades();
firebase.initializeApp(configFireBase);

// const ciudad  = document.querySelector("#ciudad");

// ciudad.addEventListener("change",()=>{
//     let selectzona = document.querySelector("#ciudad");
//     let id = selectzona.value;
//     console.log(id)
//     let latitude  =  parseFloat(20.174606);
//     let longitude = parseFloat(-98.051864);
//     initMap(latitude,longitude);
//     initFirebaseRealtime(id);
// });

// let selectzona = document.querySelector("#ciudad");
// selectzona
// let id = selectzona.value;

window.addEventListener("load",()=>{
    let latitude  =  parseFloat(20.174606);
    let longitude = parseFloat(-98.051864);
    initMap(latitude,longitude);
    initFirebaseRealtime(2);
});