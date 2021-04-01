import Api from '../../../js/api/api.js';
import {llenarModalLoguot} from '../app.js'; 

const cargarMenu = () => {
    let api = new Api("generic/menu.html","GET");
    let res = api.callhtml();
    res.then(resultado => {
        let menu = document.querySelector("#accordionSidebar");
        menu.innerHTML = resultado;
        // menuactivo();
    })
}

let  cargarToBar = () => {
    let api = new Api("generic/topbar.html","GET");
    let res = api.callhtml();
    res.then(resultado => {
        let topbar = document.querySelector("#topBar");
        topbar.innerHTML = resultado;
        const botonLogout = document.querySelector("#botonLogout");
        botonLogout.addEventListener("click", (e) => {
            e.preventDefault();
            llenarModalLoguot();
        })
    })
}

const cargarModal = () => {
    let api = new Api("generic/modal.html","GET");
    let res = api.callhtml();
    res.then(resultado => {
        let modal = document.querySelector("#logoutModal");
        modal.innerHTML = resultado;
    })
}

export const cargarGeneric = () =>{
    cargarMenu();
    cargarToBar();
    cargarModal();
}


