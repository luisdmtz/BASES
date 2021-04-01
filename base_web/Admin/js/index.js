// validar token
import {auth,bucarReporteDashboard,bucarReporteDashboardUser} from './app.js';
import {cargarGeneric} from './generic/generics.js';
auth();
cargarGeneric();
const bBuscarReporteDash = document.querySelector("#bBuscarReporteDash");
let f = new Date();
    let fechaIni  = document.querySelector("#FechaIn").value = `${f.getFullYear()}-${f.getMonth()+1}-${f.getDate()}`; 
    let fechaFin = document.querySelector("#FechaFi").value = `${f.getFullYear()}-${f.getMonth()+1}-${f.getDate()}`;
console.log(`${f.getFullYear()}-${f.getMonth()}-${f.getDate()}`);
bBuscarReporteDash.addEventListener('click',(e)=>{
    bucarReporteDashboard(); +
    bucarReporteDashboardUser();    
})