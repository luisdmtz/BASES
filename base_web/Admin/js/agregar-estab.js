import {auth,listarciudades,listarCategorias,listarAdminEstab,listarGaleria,actualicarHorario,cargarHorario,listarSubCategorias,infoCp,actualizarEstablecimiento,agregarEstablecimiento,agregarDireccion,actualizarDireccion,cargarImg,obtenerEstablecimiento,obtenerHorarios,initMap} from './app.js';
import {cargarGeneric} from './generic/generics.js';
import {refUrlPag} from '../../js/config/config.js'

// validar token
auth()
cargarGeneric();
// listas
let sear = new URLSearchParams(location.search);
let idEstab = sear.get('id');

listarciudades();

listarCategorias();

listarAdminEstab(true);
let latMapa = parseFloat(20.174633); 
let longMap = parseFloat(-98.050865);
if (idEstab != null) {
    
    obtenerEstablecimiento(idEstab);
    obtenerHorarios(idEstab);
    document.querySelector("#idEstablecimiento").value = idEstab;
    listarGaleria(idEstab);
}
//eventos de la pagina 
const inputCargarGaleria = document.querySelector("#imagaleria");
const categoria = document.querySelector("#categoria");
const CodPostal = document.querySelector("#CodPostal");
const botonRegistrarEstab = document.querySelector("#botonRegistrarEstab");
const botonGuardarDir = document.querySelector("#botonGuardarDir");
const inputCargarPerfil = document.querySelector("#imaperfil");
const inputCargarPortda = document.querySelector("#imaportada");
const tbHorarios = document.querySelector("#tbHorarios");
const botonAltaHorarios = document.querySelector("#botonAltaHorarios");
const btnAgregarProdducto = document.querySelector("#btnAgregarProdducto");
// 
btnAgregarProdducto.addEventListener("click",()=>{
    self.location = `agregar-producto.html?idEstab=${idEstab}`;
});
// activar descativar inputs horas
tbHorarios.addEventListener("click", (e)=>{
    let check = e.toElement;
    if (check.type == "checkbox") {
        let idElemnto = check.id;
        let split = idElemnto.split("checkboxdia");
        let id = split[1];
        let checked = check.checked;
        // console.log(e);
       if (checked) {
            document.querySelector(`#timeA${id}`).disabled = false;
            document.querySelector(`#timeC${id}`).disabled = false;
       } else {
            document.querySelector(`#timeA${id}`).disabled = true;
            document.querySelector(`#timeC${id}`).disabled = true;
       }
    }
    
})

const unoOcero  = (value) =>{
    if (value) {
        return 1
    }else{
        return 0
    }
}

// horarios alta
botonAltaHorarios.addEventListener("click",(e)=>{
    e.preventDefault();
    let idEstablecimiento = document.querySelector("#idEstablecimiento").value
    let parametros = [
        {
            "idEstablecimiento":idEstablecimiento,
            "iddias":1,
            "horaApertura":document.querySelector("#timeA1").value,
            "horaCierre":document.querySelector("#timeC1").value,
            "status":unoOcero(document.querySelector("#checkboxdia1").checked)
        },
        {
            "idEstablecimiento":idEstablecimiento,
            "iddias":2,
            "horaApertura":document.querySelector("#timeA2").value,
            "horaCierre":document.querySelector("#timeC2").value,
            "status":unoOcero(document.querySelector("#checkboxdia2").checked)
        },
        {
            "idEstablecimiento":idEstablecimiento,
            "iddias":3,
            "horaApertura":document.querySelector("#timeA3").value,
            "horaCierre":document.querySelector("#timeC3").value,
            "status":unoOcero(document.querySelector("#checkboxdia3").checked)
        },
        {
            "idEstablecimiento":idEstablecimiento,
            "iddias":4,
            "horaApertura":document.querySelector("#timeA4").value,
            "horaCierre":document.querySelector("#timeC4").value,
            "status":unoOcero(document.querySelector("#checkboxdia4").checked)
        },
        {
            "idEstablecimiento":idEstablecimiento,
            "iddias":5,
            "horaApertura":document.querySelector("#timeA5").value,
            "horaCierre":document.querySelector("#timeC5").value,
            "status":unoOcero(document.querySelector("#checkboxdia5").checked)
        },
        {
            "idEstablecimiento":idEstablecimiento,
            "iddias":6,
            "horaApertura":document.querySelector("#timeA6").value,
            "horaCierre":document.querySelector("#timeC6").value,
            "status":unoOcero(document.querySelector("#checkboxdia6").checked)
        },
        {
            "idEstablecimiento":idEstablecimiento,
            "iddias":7,
            "horaApertura":document.querySelector("#timeA7").value,
            "horaCierre":document.querySelector("#timeC7").value,
            "status":unoOcero(document.querySelector("#checkboxdia7").checked)
        }
    ];
    if (document.querySelector("#existeHorario").value == 1) {
        actualicarHorario(parametros,idEstablecimiento);
    }else{
        cargarHorario(parametros);
    }
    
});
// 
categoria.addEventListener('change',()=>listarSubCategorias(categoria.value))
CodPostal.addEventListener('change',()=>infoCp(CodPostal.value))
// boton resgistro de Establecimiento
botonRegistrarEstab.addEventListener('click',(e)=>{
    e.preventDefault();
    // mapeo de multiselect
    const selected = document.querySelectorAll('#subCategoria option:checked');
    const values = Array.from(selected).map(el => el.value);
    let subcategorias = ``;
    let i = 0;
    // formar cadena de subcategorias
    values.forEach(element => {
        if (i != 0) {
            subcategorias+=`-${element}`;
        }else{
            subcategorias+=`${element}`
        }
        i++
    });
    
    let parametros = {
        "nombre":document.querySelector("#nombre").value,
        "email":document.querySelector("#email").value,
        "telefono":document.querySelector("#telefono").value,
        "idTipoEstablecimiento":document.querySelector("#categoria").value,
        "subcategorias":subcategorias,
        "informacion":document.querySelector("#informacion").value,
        "etiquetas":document.querySelector("#etiquetas").value,
        "idAdministrador": document.querySelector("#administrador").value,
        "idCiudad":document.querySelector("#ciudad").value
    }
    if (idEstab != null) {
        actualizarEstablecimiento(parametros,idEstab)
    }else{
        agregarEstablecimiento(parametros)
    }
});
//mapa para escojer lon lat


window.addEventListener("load",()=>{
    initMap(latMapa, longMap);
})
// registro de direccion
botonGuardarDir.addEventListener('click', (e) => {
    e.preventDefault();
    let parametros = {
        "Calle":document.querySelector("#Calle").value,
        "numeroExterior":document.querySelector("#numeroExterior").value,
        "numeroInterior":document.querySelector("#numeroInterior").value,
        "Colonia":document.querySelector("#Colonia").value,
        "Municipio":document.querySelector("#Municipio").value,
        "Ciudad":document.querySelector("#Ciudad").value,
        "Latitud":document.querySelector("#Latitud").value,
        "Longitud":document.querySelector("#Longitud").value,
        "Estado":document.querySelector("#Estado").value,
        "CodPostal":document.querySelector("#CodPostal").value,
        "Guardado":"1",
        "idUsuario":null,
        "idEstablecimiento":document.querySelector("#idEstablecimiento").value,
        "Descripcion": ""
    };
    let idDireccion = document.querySelector("#idDireccion").value;
    if (idDireccion == "0" || idDireccion == "") {
        agregarDireccion(parametros);
    }else{
        actualizarDireccion(parametros,idDireccion);
    }
});

inputCargarGaleria.addEventListener('change',()=>{
    let form = document.querySelector("#formGaleriaEstab");
    cargarImg(form,"galeria",document.querySelector("#idEstablecimiento").value);    
});

inputCargarPerfil.addEventListener('change',()=>{
    let form = document.querySelector("#formFotoPerfilEstab");
    cargarImg(form,2,document.querySelector("#idEstablecimiento").value);    
});

inputCargarPortda.addEventListener('change',()=>{
    let form = document.querySelector("#formFotoPortadaEstab");
    console.log(form);
    cargarImg(form,3,document.querySelector("#idEstablecimiento").value);
})