import {login,cerraModal} from './app.js'

const formLogin = document.querySelector("#formLogin");
const cloceModal = document.querySelector("#cloceModal");
const checkBox = document.querySelector("#customCheck");
// 
formLogin.addEventListener('submit', (e) =>  {

    e.preventDefault();
    let usuario = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;
    
    let botonLogin = document.querySelector("#botonLogin");
    let spinnerLogin = document.querySelector("#spinnerLogin");
    spinnerLogin.style.display = "block";
    botonLogin.disabled = true;
    
    login(usuario,password);
})

cloceModal.addEventListener("click", (e)=>{
    e.preventDefault();
    cerraModal();
})

checkBox.addEventListener("click", (e)=>{
    //console.log("on"); 
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    console.log(checkBox);



})


