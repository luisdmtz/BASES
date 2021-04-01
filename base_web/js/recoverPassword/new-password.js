import {updatePassword} from './app.js'

const formNewPassword = document.querySelector("#formNewPassword")
const checkBox = document.querySelector("#customCheck");
const new_password = document.querySelector("#new-password");

let tokenValidacion  = sessionStorage.getItem('tokenRecuperarPassword');
let sear = new URLSearchParams(location.search);
let idUser = sear.get('id');

formNewPassword.addEventListener('submit', (e) =>  {
    e.preventDefault();
    let newpassword = document.querySelector("#new-password").value;
    let parametros = {
        "Password":newpassword
    }
    updatePassword(idUser,parametros,tokenValidacion);
})

checkBox.addEventListener("click", (e)=>{
    //console.log("on"); 
        if (new_password.type === "password") {
            new_password.type = "text";
        } else {
            new_password.type = "password";
        }
    console.log(checkBox);



})