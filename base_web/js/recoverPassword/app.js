// imports
import Api from '../api/api.js';
import {url} from '../config/config.js';
// funciones

 const enviaCodigo = (Email,TipoUsuario) => {
    let labelSucces = document.querySelector("#laberSucces");
    let labelError = document.querySelector("#laberError");
        labelError.innerHTML = ``;
        labelSucces.innerHTML = ``;
    console.log(Email,TipoUsuario)
    let servicio =`${url}auth/sendCodeToEmail`;
    let parametros ={
        "Email":Email,
        "TipoUsuario":TipoUsuario
    };
    let api = new Api(servicio,"POST",parametros);
    let res = api.call();
    res.then(resultado =>{
        if(resultado.response){
            labelSucces.innerHTML = `${resultado.message}`
        }else{
            labelError.innerHTML = `${resultado.errors}`;
        }
    })
    
}

const validarCodeRecoverPassword = (codigo,iduser) =>{
    let labelError = document.querySelector("#laberError");
        labelError.innerHTML = ``;
    let servicio =`${url}auth/validateCodeEmail/${iduser}`;
    console.log (iduser)
    let parametros ={
        "Codigo": codigo
    };
    let api = new Api(servicio,"POST",parametros);
    let res = api.call();
    res.then(resultado =>{
        if(resultado.response){
            sessionStorage.setItem('tokenRecuperarPassword',resultado.result);
            self.location = `new-password.html?id=${iduser}`;
        }else{
            labelError.innerHTML = `${resultado.errors}`;
        }
    })
}

const updatePassword = (idUser,parametros,token) =>{
    let labelError = document.querySelector("#laberError");
        labelError.innerHTML = ``;
    let servicio = `${url}user/updatePassword/${idUser}`
    let api = new Api(servicio,"PUT",parametros,token);
    let res = api.call();
    res.then(resultado =>{
        if(resultado.response){
            self.location = `succes.html`;
        }else{
            labelError.innerHTML = `${resultado.errors}`;
        }
    })
}

// exports
export {
    enviaCodigo,
    validarCodeRecoverPassword,
    updatePassword
};