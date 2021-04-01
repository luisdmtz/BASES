import Api from '../../js/api/api.js'
import {url,refUrlPag} from '../../js/config/config.js';

export const login = (usuario,password) =>{
    
    let servicio = `${url}auth/loginAdministrador`;
    let parametros = {
        "user": usuario,
        "password": password,
        "plataforma": "web"
    };
    let api = new Api(servicio,"POST",parametros);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            sessionStorage.setItem('tokenAdmin',resultado.result.token);
            self.location = "index.html"
        }else{
           let modal = document.querySelector("#logoutModal");
           modal.style.display = "block";
           modal.classList.add('show');
        //    cuerpo = document.querySelector("#page-top");
        //    cuerpo.classList.add("modal-open");
           document.querySelector("#backgrondModal").style.display = "block";
        }
    })

    botonLogin.disabled = false;
    spinnerLogin.style.display = "none";
}
export const quitarLoader = () =>{
    // setTimeout(()=>document.getElementById('loaderPage').style.display = 'none', 1000);
    document.getElementById('loaderPage').style.display = 'none';
}
export const auth = () => {
    let token = sessionStorage.getItem('tokenAdmin');
    let servicio = `${url}auth/getData/${token}`
    let api = new Api(servicio,"GET");
    let res = api.call();
    res.then(resultado => {
        if (resultado.response === false) {
            self.location = "login.html"
        }else{
            quitarLoader();
            let nombreAdmin = `${resultado.result.nombre} ${resultado.result.apellidos}`;
            document.querySelector(`#nombreAdmin`).innerHTML = nombreAdmin;
        }
    });
} 

export const logout = () => {
    sessionStorage.removeItem("tokenAdmin");
    self.location = "login.html"

}
export const llenarModalLoguot = () => {
    document.querySelector("#modalLabelTitle").innerHTML = "Cerrar sesion";
    document.querySelector("#modalLabelBody").innerHTML = "Esta seguro de cerrar su sesion?";
    document.querySelector("#modalActionButton").innerHTML = "Aceptar";
    document.querySelector("#modalActionButton").addEventListener("click", (e)=>{
        logout();
    })  
}
export const cerraModal = () => {
    let modal = document.querySelector("#logoutModal");
    modal.style.display = "none";
    modal.classList.remove('show');
    cuerpo = document.querySelector("#page-top");
    cuerpo.classList.remove("modal-open");
    document.querySelector("#backgrondModal").style.display = "none";
        
}

// crud admin establecimiento
export const listarAdminEstab = (forselect = false) => {
    let servicio = `${url}user/toList/3`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            let data = resultado.result.Data;
            if (!forselect) {
                let cuerpo = document.querySelector("#listaAdminEstab");
                window.llenarModalEliminarAdmiEstab = llenarModalEliminarAdmiEstab;
                data.forEach(element => {
                    let fila = document.createElement(`div`)
                    fila.innerHTML = `
                    <div class="col-xl-12 col-md-12 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Tel: ${element.telefono} - Email: ${element.email}</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">${element.nombre} ${element.apellidos}</div>
                            Establecimiento: ${element.nombreEstablecimiento}
                        </div>
                        <div class="col-auto">
                            <a href="agregar-admin.html?id=${element.idUsuario}" class="btn btn-info btn-circle">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href="#" onclick="llenarModalEliminarAdmiEstab(${element.idUsuario})" class="btn btn-danger btn-circle" data-toggle="modal" data-target="#logoutModal">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>`;
                    cuerpo.appendChild(fila);
                    document.querySelector(`#eliminar${element.idUsuario}`);

                });
            }else{
                let lista = document.querySelector("#administrador");
                    lista.innerHTML += `<option value = "0"> Sin seleccion </option>`;
                data.forEach(element => {
                        lista.innerHTML += `
                        <option value="${element.idUsuario}">${element.nombre} ${element.apellidos} - ${element.telefono} </option>
                    `;
                    
                });
            }
            
            
        }else{

        }
        
    });
}

export const agregarAdminEstab = (parametros) => {
    let servicio = `${url}user/registerUser`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"POST",parametros,token);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            self.location = "listar-admin.html";
        }
    });
}

export const obtenerAdminEstab = (id) => {
    let servicio = `${url}user/informationUser/${id}`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            document.querySelector("#nombre").value = resultado.result.nombre;
            document.querySelector("#apellidos").value = resultado.result.apellidos;
            document.querySelector("#email").value = resultado.result.email;
            // document.querySelector("#password").value = resultado.result. ;
            document.querySelector("#sexo").value = resultado.result.sexo;
            document.querySelector("#telefono").value = resultado.result.telefono;
            document.querySelector("#ciudad").value = resultado.result.idCiudad;   
        }
    });
}

export const actualizarAdminEstab = (parametros,idAdminEstab) => {
    console.log(parametros);
    let servicio = `${url}user/updateInformationUser/${idAdminEstab}`;
    let api = new Api(servicio,"PUT",parametros,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            self.location = "listar-admin.html";
        }
    });
}

export const eliminarAdminEstab = (idAdminEstab) => {
    let servicio = `${url}user/deleteUser/${idAdminEstab}`;
    console.log(servicio)
    let api = new Api(servicio,"DELETE",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            self.location.reload();
        }
    })
}

export const llenarModalEliminarAdmiEstab = (id) => {
    document.querySelector("#modalLabelTitle").innerHTML = "Eliminar Administrador de Establecimiento";
    document.querySelector("#modalLabelBody").innerHTML = "Esta seguro de Eliminar el Administrador de Establecimiento?";
    document.querySelector("#modalActionButton").innerHTML = "Aceptar";
    document.querySelector("#modalActionButton").addEventListener("click", (e)=>{
        eliminarAdminEstab(id);
    }) 
}

// end crud admin establecimiento

export const initMap = (latitude,longitude) => {
    let map = null;
    // The location
    let centroMap = {lat: latitude, lng: longitude};
    // The map, centered at zone
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15, 
            center: centroMap,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    );
    
    const icon = {
        url: `${refUrlPag}img/pin-completo.png`, // url
        scaledSize: new google.maps.Size(60,60), // size
    };

    let marcador = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        icon: icon,
        draggable: true
    });

    google.maps.event.addListener(marcador, 'dragend',  (e) => {
        document.querySelector("#Latitud").value = e.latLng.lat().toFixed(6);
        document.querySelector("#Longitud").value = e.latLng.lng().toFixed(6);
        map.panTo(e.latLng);
    });

    marcador.setMap(map);
}

// listar ciudades

export const listarciudades = () =>{
    let servicio = `${url}city/toList`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    res.then(resultado => {
         console.log(resultado);
        if (resultado.response) {
            let data = resultado.result;
            let selectCiudad = document.querySelector("#ciudad")
            let inner = `<option disabled selected>Selecciona una opción</option>`;
            data.forEach(element => {
                inner += `<option value ="${element.idCiudad}">${element.Ciudad}</option>`;
            });
            selectCiudad.innerHTML = inner;
        }
    });
}
// mostrar form
export const mostrarOcultar = (nomelement) => {
    let visible = document.querySelector(`#${nomelement}`).style.display;
    switch (visible) {
        case "none":
            document.querySelector(`#${nomelement}`).style.display = "block";
            break;
        case "block":
            document.querySelector(`#${nomelement}`).style.display = "none";
            break;
    } 
}
// funciones de categorias y subcategorias
export const addCategoria = (id = 0) => {
   let parametros = {
       Descripcion:document.querySelector("#nombreCategoria").value
   }
   if (id == 0) {
       //    agregar
       let servicio = `${url}establishment/addCategoria`;
       let token = sessionStorage.getItem('tokenAdmin');
       let api = new Api(servicio,"POST",parametros,token);
       let res = api.call();
       res.then(resultado => {
           if (resultado.response) {
                listarCategorias(true);
                mostrarOcultar("fAddCategoria");
                document.querySelector("#nombreCategoria").value = "";
           }
       })  
   }else{
        //    actualizar
        let servicio = `${url}establishment/updateCategoria/${id}`;
        let token = sessionStorage.getItem('tokenAdmin');
        let api = new Api(servicio,"PUT",parametros,token);
        let res = api.call();
        res.then(resultado => {
            if (resultado.response) {
                listarCategorias(true);
                mostrarOcultar("fAddCategoria");
                document.querySelector("#nombreCategoria").value = "";
                document.querySelector("#idCategoriaParaCategoria").value = 0;
            }
        })
   }
}

export const addSubcategoria = (idCategoria,idSubcategoria = 0) => {
    // let idCategoria  =document.querySelector("#idCategoriaParaSubcategoria").value;
    let parametros = {
        descripcion:document.querySelector("#nombreSubcategoria").value,
        idTipoEstablecimiento: idCategoria
    }
    if (idSubcategoria == 0) {
        //    agregar
        let servicio = `${url}establishment/addSubcategoria`;
        let token = sessionStorage.getItem('tokenAdmin');
        let api = new Api(servicio,"POST",parametros,token);
        let res = api.call();
        res.then(resultado => {
            if (resultado.response) {
                listarSubCategorias(idCategoria,null,true);
                mostrarOcultar("fAddSubcategoria");
                document.querySelector("#nombreSubcategoria").value = "";
            }else{
                alert("Hay un error en los parametros, talves no selecciono una categoria")
            }
        })  
    }else{
         //    actualizar
         let servicio = `${url}establishment/updateSubcategoria/${idSubcategoria}`;
         let token = sessionStorage.getItem('tokenAdmin');
         let api = new Api(servicio,"PUT",parametros,token);
         let res = api.call();
         res.then(resultado => {
             if (resultado.response) {
                listarSubCategorias(idCategoria,null,true);
                mostrarOcultar("fAddSubcategoria");
                document.querySelector("#nombreSubcategoria").value = "";
             }else{
                alert("Hay un error en los parametros, talves no selecciono una categoria")
             }
         })
    }
}

export const mostraFormUpdateCategoria = (idCategoria,descripcion) => {
    let showForm = document.querySelector("#fAddCategoria").style.display;
    if (showForm == "none") {
        mostrarOcultar("fAddCategoria");
    }
    document.querySelector("#nombreCategoria").value = descripcion;
    document.querySelector("#idCategoriaParaCategoria").value = idCategoria;
}

export const mostraFormUpdateSubcategoria = (idSubcategoria,descripcion) => {
    let showForm = document.querySelector("#fAddSubcategoria").style.display;
    if (showForm == "none") {
        mostrarOcultar("fAddSubcategoria");
    }
    document.querySelector("#nombreSubcategoria").value = descripcion
    document.querySelector("#idSubcategoria").value = idSubcategoria;
}

export const deleteCategoria = (id) => {
    if (confirm("Esta seguro de elimianr esta Categoria")) {
         let servicio = `${url}establishment/deleteCategoria/${id}`;
         let token = sessionStorage.getItem('tokenAdmin');
         let api = new Api(servicio,"DELETE",null,token);
         let res = api.call();
         res.then(resultado => {
             if (resultado.response) {
                document.querySelector("#categoria").innerHTML = "";
                listarCategorias(true);
             }
         })
    }
}

export const deleteSubcategoria = (id) => {
    if (confirm("Esta seguro de elimianr esta Subcategoria")) {
         let idCategoria  =document.querySelector("#idCategoriaParaSubcategoria").value;
         let servicio = `${url}establishment/deleteSubcategoria/${id}`;
         let token = sessionStorage.getItem('tokenAdmin');
         let api = new Api(servicio,"DELETE",null,token);
         let res = api.call();
         res.then(resultado => {
             if (resultado.response) {
                 document.querySelector("#subCategoria").innerHTML = "";
                listarSubCategorias(idCategoria,null,true)
             }
         })
    }
}
// 
export const mostrarFormImgCaySubCat = (id,tipo) => {
    document.querySelector("#tipoimg").value = tipo;
    document.querySelector("#idElementoImg").value = id;
    document.querySelector("#img").click();
}
// listar categorias
export const listarCategorias = (listaAdmin = false) => {
    let servicio = `${url}establishment/listCategories`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    let categorias = document.querySelector("#categoria");
    res.then(resultado => {
        let data = resultado.result;
        if (listaAdmin) {
            window.listarSubCategorias = listarSubCategorias;
            window.mostraFormUpdateCategoria = mostraFormUpdateCategoria;
            window.mostrarFormImgCaySubCat = mostrarFormImgCaySubCat;
            window.deleteCategoria = deleteCategoria;
            categorias.innerHTML = ``
            data.forEach(element => {
                categorias.innerHTML += `<li class="list-group-item d-flex justify-content-between "><div  align="left"><img src="${element.urlImagen}" width="30" height="30"><a href="#" onclick = "listarSubCategorias(${element.idTipoEstablecimiento},null,true)" >
                ${element.descripcion}</a>
                </div>
                <div  align="rigth">
                <button type="button" onclick="mostrarFormImgCaySubCat(${element.idTipoEstablecimiento},4)" class="btn btn-outline-warning"> <i class="fas fa-image"></i></button>
                <button type="button" onclick="mostraFormUpdateCategoria(${element.idTipoEstablecimiento},'${element.descripcion}')" class="btn btn-outline-info"> <i class="fas fa-edit"></i></button>
                <button type="button" onclick="deleteCategoria(${element.idTipoEstablecimiento})" class="btn btn-outline-danger"> <i class="fas fa-trash"></i></button></div>
              </li>`;
            })            
        } else {
            categorias.innerHTML += `<option disabled selected>Selecciona una opción</option>`;
            data.forEach(element => {
            categorias.innerHTML += `<option value="${element.idTipoEstablecimiento}" > ${element.descripcion} </option>`;
        });        
        }
    });
}
// listar subcategorias
export const listarSubCategorias = (idCategoria,arraySelect = null,listaAdmin = false) => {
    let servicio = `${url}establishment/listSubcategories/${idCategoria}`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        let data = resultado.result;
        let subcategorias = document.querySelector("#subCategoria");
            subcategorias.disabled = false;
        if (listaAdmin) {
            subcategorias.innerHTML = ``;
            if(data.length > 0){
                window.mostraFormUpdateSubcategoria = mostraFormUpdateSubcategoria;
                window.deleteSubcategoria = deleteSubcategoria;
                data.forEach(element => {
                    subcategorias.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center"><div  align="left"><img src="${element.urlImagen}" width="30" height="30">
                    ${element.descripcion}
                    </div>
                    <div  align="rigth">
                    <button onclick='mostrarFormImgCaySubCat(${element.idSubCategorias},5)' type="button" class="btn btn-outline-warning"> <i class="fas fa-image"></i></button>
                    <button onclick="mostraFormUpdateSubcategoria(${element.idSubCategorias},'${element.descripcion}')" type="button" class="btn btn-outline-info"> <i class="fas fa-edit"></i></button>
                    <button onclick="deleteSubcategoria(${element.idSubCategorias})" type="button" class="btn btn-outline-danger"> <i class="fas fa-trash"></i></button></div>
                </li>`;
                })
                
            }else{
                subcategorias.innerHTML += `No hay elementos`;  
            }
            document.querySelector("#idCategoriaParaSubcategoria").value = idCategoria;
            document.querySelector("#idSubcategoria").value = 0;
            document.querySelector("#nombreSubcategoria").value = ""
        }else{
            if (arraySelect == null) {
                data.forEach(element => {
                    subcategorias.innerHTML += `<option value="${element.idSubCategorias}" > ${element.descripcion} </option>`;
                });
            } else {
                let sel = ``;
                data.forEach(element => {
                    arraySelect.forEach(selected => {
                        if (selected.idSubCategorias == element.idSubCategorias) {
                            sel = `selected`;
                        }
                    });
                    subcategorias.innerHTML += `<option value="${element.idSubCategorias}" ${sel} > ${element.descripcion} </option>`;
                    sel = '';
                });
                
            }
        }
    });
}
// informacion de codigo postalCode
export const infoCp = (cp,colonia=0) => {
    
    if (cp.length == 5) {
        let servicio = `${url}/address/cp/${cp}`;
        let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
        let res = api.call();
        res.then(resultado => {
                if (resultado.response) {
                    let result = resultado.result;
                    document.getElementById('Ciudad').value = result.ciudad;
                    document.getElementById('Estado').value = result.estado;
                    document.getElementById('Municipio').value = result.municipio
                    let colonias = result.colonias;
                    let inHtml = ``;

                    if (colonia == 0) {
                        colonias.forEach(element => {
                            inHtml += `<option>${element}</option>`;
                        });
                    } else {
                        colonias.forEach(element => {
                            let def;
                            if (element == colonia) {
                                def = `selected`;
                            }
                            inHtml += `<option ${def}>${element}</option>`;

                        });
                    }

                    document.getElementById('Colonia').innerHTML = inHtml;
                } else {
                    alert(res.errors)
                }
            });
    }

}
// crud Establecimientos
export const listarEstablecimientos = () =>{
    let servicio = `${url}establishment/listAdmin`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        console.log(resultado);
        if (resultado.response) {
            let cuerpo = document.querySelector("#listaEstableciemientos");
            let data = resultado.result;
            window.llenarModalEliminarEstab = llenarModalEliminarEstab; //para poder llamar la funcion desde el cdocuemnto
            data.forEach(element => {
                let fila = document.createElement(`div`)
               
                fila.innerHTML = `
                <div class="col-xl-12 col-md-12 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div style= "width:129px;">
                            <img src="${element.UrlImag}" class="rounded" width="124" height="93">
                        </div>
                        <div class="col mr-1">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Categoria: ${element.Categoria} - Subcategoria: ${element.SubCategoria}</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">${element.NombreEstablecimiento}</div>
                            Telefono: ${element.Telefono}
                        </div>
                      <div class="col-auto">
                      <a href="agregar-producto.html?idEstab=${element.idEstablecimiento}" class="btn btn-success btn-circle">
                            <i class="fas fa-archive"></i>
                        </a>
                        <a href="agregar-estab.html?id=${element.idEstablecimiento}" class="btn btn-info btn-circle">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" onclick = "llenarModalEliminarEstab(${element.idEstablecimiento})" id="eliminar${element.idEstablecimiento}" class="btn btn-danger btn-circle" data-toggle="modal" data-target="#logoutModal">
                            <i class="fas fa-trash"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
              cuerpo.appendChild(fila);
            });
            //   document.querySelector(`eliminar${element.idEstablecimiento}`).addEventListener('click',llenarModalEliminarEstab(element.idEstablecimiento));
        }else{

        }
    });
}

export const agregarEstablecimiento = (parametros) => {
    let servicio = `${url}establishment/add`;
    let api = new Api(servicio,"POST",parametros,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Establecimiento agregado de manera exitosa")
            document.querySelector("#idEstablecimiento").value = resultado.result;
            document.querySelector("#botonRegistrarEstab").disabled = true;
            document.querySelector("#divDireccion").style.display = "block";
            self.location = "#divDireccion";
        }else{
            alert("Intentalo de Nuevo")
        }
    });
}
export const obtenerEstablecimiento = (id) => {
    let servicio = `${url}establishment/obtain/${id}`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            let data = resultado.result;
            console.log(data);
            // informacion de establecimiento
            document.querySelector("#nombre").value = data.nombre
            document.querySelector("#email").value = data.email
            document.querySelector("#telefono").value = data.telefono
            document.querySelector("#categoria").value = data.idTipoEstablecimiento
            document.querySelector("#informacion").value = data.informacion
            document.querySelector("#etiquetas").value = data.etiquetas
            document.querySelector("#administrador").value = data.idAdministrador
            document.querySelector("#ciudad").value = data.idCiudad
            let subcategorias = data.subcategorias;
            // console.log(subcategorias);
            listarSubCategorias(data.idTipoEstablecimiento,subcategorias);
            // informacion direccione
            document.querySelector("#idDireccion").value = data.idDireccion;
            document.querySelector("#Calle").value = data.calle;
            document.querySelector("#numeroExterior").value = data.numeroExterior;
            document.querySelector("#numeroInterior").value = data.numeroInterior;
            document.querySelector("#CodPostal").value = data.CodPostal;
            if (data.CodPostal != null) {
                infoCp(data.CodPostal,data.Colonia);
            }
            document.querySelector("#Latitud").value = data.Latitud
            document.querySelector("#Longitud").value = data.Longitud
            document.querySelector("#Ciudad").value = data.Ciudad
            
            //ver divs
            document.querySelector("#divDireccion").style.display = "block";
            document.querySelector("#divImagenes").style.display = "block";
            document.querySelector("#divHorarios").style.display = "block";
            // 
            document.querySelector("#imgPerfil").src = data.urlFoto;

            document.querySelector("#imgPortada").style.background = `url('${data.urlPortada}')`;
            // background-image: url('img_girl.jpg');
            initMap( parseFloat(data.Latitud),parseFloat(data.Longitud));
        }
    });
}

export const actualizarEstablecimiento = (parametros,idEstablecimiento = 0)=>{
    console.log(parametros,idEstablecimiento);
    // establishment/update/5
    let servicio = `${url}establishment/update/${idEstablecimiento}`;
    let api = new Api(servicio,"PUT",parametros,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Establecimiento agregado de manera exitosa")
            // document.querySelector("#idEstablecimiento").value = resultado.result;
            // document.querySelector("#botonRegistrarEstab").disabled = true;
            // document.querySelector("#divDireccion").style.display = "block";
            // self.location = "#divDireccion";
        }else{
            alert("Intentalo de Nuevo")
        }
    });
}
export const eliminarEstablecimiento = (idEstablecimiento) => {
    // alert("Se eliminarEstablecimiento")
    let servicio = `${url}establishment/delete/${idEstablecimiento}`;
    let api = new Api(servicio,"DELETE",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            self.location.reload();
        }
    })
}
export const llenarModalEliminarEstab = (id) => {
    document.querySelector("#modalLabelTitle").innerHTML = "Eliminar Establecimiento";
    document.querySelector("#modalLabelBody").innerHTML = "Esta seguro de Eliminar el Establecimiento?";
    document.querySelector("#modalActionButton").innerHTML = "Aceptar";
    document.querySelector("#modalActionButton").addEventListener("click", (e)=>{
        eliminarEstablecimiento(id);
    }) 
}
// en crud
// crud direcciones
export const agregarDireccion = (parametros) => {
    let servicio = `${url}address/add`;
    let api = new Api(servicio,"POST",parametros,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Direccion Guardada de manera exitosa");
            document.querySelector("#idDireccion").value = resultado.result;
            document.querySelector("#divImagenes").style.display = "block";
            document.querySelector("#divHorarios").style.display = "block";
            document.querySelector("#botonGuardarDir").disabled = true;
            self.location = "#divImagenes";
        }else{
            alert("No se pudo Guardar la direccion");
        }
    });
}

export const actualizarDireccion = (parametros,idDireccion) => {
    let servicio = `${url}address/update/${idDireccion}`;
    let api = new Api(servicio,"PUT",parametros,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Direccion Actualizada de manera exitosa");
        }else{
            alert("No se pudo Guardar la direccion");
        }
        
    });
}
// fin direcciones
// cargar img
export const cargarImg = async (form = null, tipo = null, id = null) => {
    if (confirm('Quiere cargar este documento')) {
        let sw = ``;
        if (tipo === "galeria" ) {
             sw = `${url}image/addEstablishmentMenuImage/${id}`;
        } else {
             sw = `${url}image/add/${tipo}/${id}`;
        }
       await fetch(sw, {
                method: 'POST',
                body: new FormData(form),
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res['response']) {
                    alert("Archivo cargado de manera correcta")
                    console.log(res);
                    if (tipo == 2 || tipo == 1) {
                        document.querySelector("#imgPerfil").src = res.result["url"];
                    }else if (tipo == 3){
                        document.querySelector("#imgPortada").style.background = `url('${res.result["url"]}')`;
                    }else if(tipo == 4){
                        document.querySelector("#tipoimg").value = 0;
                        document.querySelector("#idElementoImg").value = 0;
                        listarCategorias(true);
                    }else if (tipo == 5){
                        let idCategoria  =document.querySelector("#idCategoriaParaSubcategoria").value;
                        listarSubCategorias(idCategoria,null,true);
                        document.querySelector("#tipoimg").value = 0;
                        document.querySelector("#idElementoImg").value = 0;    
                    }else if(tipo == "galeria"){
                        window.deleteImaGaleria = deleteImaGaleria;
                        let fila = document.createElement(`div`)
                        fila.className = "card";
                        fila.id = `${res.result.idGaleria}`;
                        fila.innerHTML = `
                        <img class="card-img-top" src="${res.result.url}">
                        <div class="card-body">
                        <center><button type="button" onclick="deleteImaGaleria(${res.result.idGaleria})" class="btn btn-outline-danger"> <i class="fas fa-trash"></i></button></center>
                        <!-- <h5 class="card-title">Card title that wraps to a new line</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
                        </div>
                        `;
                        let galeria = document.querySelector("#galeria");
                        galeria.appendChild(fila);                        
                    }else if(tipo == 7){
                        document.querySelector("#imagenPromocion").src = res.result["url"];
                    }else if(tipo == 8){
                        // alert("Imagen de producto cargada");
                        document.querySelector("#imgProd").src = res.result["url"];
                    };
                } else {
                    alert(res['errors']);
                    console.log(res);
                }
            });
    }
}

//galeria
export const listarGaleria = (idEstablecimiento) => { 
    let servicio = `${url}image/listImage/${idEstablecimiento}`;
    let api = new Api(servicio, "GET",idEstablecimiento,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if(resultado.response){
            console.log(resultado);
            let imgs = resultado.result.Lista;
            window.deleteImaGaleria = deleteImaGaleria;
            imgs.forEach(element => {
                let fila = document.createElement(`div`)
                fila.className = "card";
                fila.id = `idGaleria${element.idGaleria}`;
                fila.innerHTML = `
                <img class="card-img-top" src="${element.urlImagen}">
                <div class="card-body">
                  <center><button type="button" onclick="deleteImaGaleria(${element.idGaleria})" class="btn btn-outline-danger"> <i class="fas fa-trash"></i></button></center>
                  <!-- <h5 class="card-title">Card title that wraps to a new line</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
                </div>
                `;
                let galeria = document.querySelector("#galeria");
                galeria.appendChild(fila);

            });
        }else{

        }
    });
}

export const deleteImaGaleria = (idGaleria) => {
    if (confirm("Esta seguro de elimianar esta Imagen?")) {
         let servicio = `${url}image/deleteImage/${idGaleria}`;
         let token = sessionStorage.getItem('tokenAdmin');
         let api = new Api(servicio,"DELETE",null,token);
         let res = api.call();
         res.then(resultado => {
             if (resultado.response) {
                self.location.reload();
             }
         });
    }
}

//Horarios  
export const cargarHorario = (parametros) => {
    let servicio = `${url}schedule/add`;
    let api = new Api(servicio,"POST",parametros,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Horarios Guardados de manera exitosa");
        }else{
            alert("No se pudieron gurdar los Horarios");
        }
    });
}

export const actualicarHorario =  (parametros, idEstablecimiento) =>{
    let servicio = `${url}schedule/update/${idEstablecimiento}`;
    let api = new Api(servicio,"PUT",parametros,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Horarios Guardados de manera exitosa");
        }else{
            alert("No se pudieron gurdar los Horarios");
        }
    });
}

export const obtenerHorarios = (idEstab) =>{
    let servicio = `${url}schedule/listSchedule/${idEstab}`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            let data = resultado.result.Data;
            let length = data.length;
            if (length!=0) {
                document.querySelector("#existeHorario").value = "1";
                for (let i = 0; i < data.length; i++) {
                    let element = data[i];
                    let check  = document.querySelector(`#checkboxdia${i+1}`);
                    let seleccionar = true;  
                    if (element.status == 0) {
                        seleccionar = false;
                    }else{
                        let checked = check.checked;
                        document.querySelector(`#timeA${i+1}`).disabled = false;
                        document.querySelector(`#timeC${i+1}`).disabled = false;
                        
                    }
                    check.checked = seleccionar;
                    document.querySelector(`#timeA${i+1}`).value = element.horaApertura
                    document.querySelector(`#timeC${i+1}`).value = element.horaCierre

                }
            }
        }
    })
}
// recuperar password
 export const enviarCodigoAEmail = () => {
    console.log();
 }
//  menu activo
export const menuactivo = () => {
    
}

// crud repartidores

export const listarRepartidores = () => {
    let servicio = `${url}user/toList/2`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            window.llenarModalEliminarRepartidor = llenarModalEliminarRepartidor;
            window.llenarModalCerrarSesionRepartidor = llenarModalCerrarSesionRepartidor;
            let data = resultado.result.Data;
            let cuerpo = document.querySelector("#listaRepartidores");
            data.forEach(element => {
                let fila = document.createElement(`div`)
                fila.innerHTML = `
                <div class="col-xl-12 col-md-12 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Tel: ${element.telefono} - Email: ${element.email}</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">${element.nombre} ${element.apellidos}</div>
                    </div>
                    <div class="col-auto">
                        <a href="agregar-repartidores.html?id=${element.idUsuario}" class="btn btn-info btn-circle">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" onclick="llenarModalEliminarRepartidor(${element.idUsuario})" class="btn btn-danger btn-circle" data-toggle="modal" data-target="#logoutModal">
                            <i class="fas fa-trash"></i>
                        </a>
                        <a href="#" onclick="llenarModalCerrarSesionRepartidor(${element.idUsuario})" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#logoutModal">
                        <i class="fas fa-power-off"></i>
                        </a>
                    </div>
                    </div>
                </div>
                </div>
                </div>`;
                cuerpo.appendChild(fila);
            }); 
            
        }else{

        }
        
    });
}

export const CerrarSesionRepartidor = (usuario) => {
    let servicio = `${url}auth/logout`;
    let parametros = {
        "id": usuario
    };
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"POST",parametros,token);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
           self.location.reload();
        }
    });
}

export const llenarModalCerrarSesionRepartidor = (id) => {
    document.querySelector("#modalLabelTitle").innerHTML = "Cerrar Sesion Repartidor";
    document.querySelector("#modalLabelBody").innerHTML = "Esta seguro de Cerrar Sesion del Repartidor?";
    document.querySelector("#modalActionButton").innerHTML = "Aceptar";
    document.querySelector("#modalActionButton").addEventListener("click", (e)=>{
        CerrarSesionRepartidor(id);
    }); 
}

export const agregarRepartidor = (parametros) => {
    let servicio = `${url}user/registerUser`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"POST",parametros,token);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Repartidor agregado");
            document.querySelector("#divImagenes").style.display = "block";
            document.querySelector("#idRepartidor").value = resultado.result;
        }
    });
}

export const obtenerRepartidor = (idRepartidor) => {
    let servicio = `${url}user/informationUser/${idRepartidor}`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    res.then(resultado => {
        console.log(resultado);
        if (resultado.response) {
            document.querySelector("#nombre").value = resultado.result.nombre;
            document.querySelector("#apellidos").value = resultado.result.apellidos;
            document.querySelector("#email").value = resultado.result.email;
            document.querySelector("#sexo").value = resultado.result.sexo;
            document.querySelector("#telefono").value = resultado.result.telefono;
            document.querySelector("#ciudad").value = resultado.result.idCiudad;   
            // div img
            document.querySelector("#divImagenes").style.display = "block";
            document.querySelector("#imgPerfil").src = resultado.result.urlFoto;
        }
    });
}

export const actualizarRepartidor = (parametros,idRepartidor) => { 
    console.log(parametros);
    let servicio = `${url}user/updateInformationUser/${idRepartidor}`;
    let api = new Api(servicio,"PUT",parametros,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Se actualizo el Repartidor")
        }
    });
}

export const llenarModalEliminarRepartidor = (id) => {
    document.querySelector("#modalLabelTitle").innerHTML = "Eliminar Repartidor";
    document.querySelector("#modalLabelBody").innerHTML = "Esta seguro de Eliminar el Repartidor?";
    document.querySelector("#modalActionButton").innerHTML = "Aceptar";
    document.querySelector("#modalActionButton").addEventListener("click", (e)=>{
        eliminarRepartidor(id);
    }) 
}

export const eliminarRepartidor = (idRepartidor) => {
    let servicio = `${url}user/deleteUser/${idRepartidor}`;
    let api = new Api(servicio,"DELETE",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            self.location.reload();
        }
    })
}

// export const detalleOrden = (idOrden) => {
//     self.location = `detalle-orden.html?idOrden=${idOrden}`;
// }


export const obtenerOrden = (idOrden) => {
    let servicio = `${url}order/detailDealer/${idOrden}`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            let data  = resultado.result;
            console.log(data)
            //
            document.querySelector("#DescripcionOrden").innerHTML = `Descripcion: ${data.DescripcionOrden}`
            document.querySelector("#Direccion").innerHTML = `Direccion: ${data.Direccion}`
            document.querySelector("#NombreEntregarA").innerHTML = `Entrega: ${data.NombreEntregarA}`
            document.querySelector("#TelefonoEstablecimiento").innerHTML = `Telefono Negocio: ${data.TelefonoEstablecimiento}`
            document.querySelector("#TelefonoUsuario").innerHTML = `Telefono Usuario: ${data.TelefonoUsuario}`
            document.querySelector("#StatusOrden").innerHTML = `Status: ${data.StatusOrden}`
            document.querySelector("#NombreEstablecimiento").innerHTML = `"${data.NombreEstablecimiento}"`
            document.querySelector("#urlOrigen").innerHTML = `https://www.google.com/maps/search/?api=1&query=${data.LatitudOrigen},${data.LongitudOrigen}`;
            document.querySelector("#urlDestino").innerHTML = `https://www.google.com/maps/search/?api=1&query=${data.LatitudDestino},${data.LongitudDestino}`;
            // puntos 
            let lat1 = parseFloat(data.LatitudDestino);
            let long1 = parseFloat(data.LongitudDestino);

            let lat2 = parseFloat(data.LatitudOrigen);
            let long2 = parseFloat(data.LongitudOrigen);

            let punto1 = {lat: lat1, lng: long1};
            let punto2 = {lat: lat2, lng: long2};
            // The location
            let centroMap = {lat: lat1, lng: long1};
            // console.log(centroMap);
            // The map, centered at zone
            let map
            let markers = [];   
            map = new google.maps.Map(
                                document.getElementById('map'), {zoom: 14, center: centroMap}
                            );
            const icon1 = {
                url: `${refUrlPag}img/pin-map.png`, // url
                scaledSize: new google.maps.Size(60, 60), // size
            };
            
            const icon2 = {
                url: `${refUrlPag}img/repartidor2.png`, // url
                scaledSize: new google.maps.Size(60, 60), // size
            };

            let a = `${data.NombreEntregarA}`;
            let de = `${data.NombreEstablecimiento}`;
        
            const infoA = new google.maps.InfoWindow({
                content: a
            });
        
            const infoDe = new google.maps.InfoWindow({
                content: de
            });

            let markerA = new google.maps.Marker(
                {   position: punto1,
                    icon: icon1,
                    title: `${data.NombreEntregarA}`,
                    map: map,
                    idOrden:data.idOrden
                }
            );

            markerA.addListener('click', function() {
                infoA.open(map, markerA);
            });

            let markerDe = new google.maps.Marker(
                {   position: punto2,
                    icon: icon2,
                    title: `${data.NombreEstablecimiento}`,
                    map: map,
                    idOrden:data.idOrden
                }
            );
            
            markerDe.addListener('click', function() {
                infoDe.open(map, markerDe);
            });

            markers.push(markerA);
            markers.push(markerDe);
            console.log(markers)
        }
    })
}

export const bucarReporteOrdenes = () => {
    let fechaIni  = document.querySelector("#FechaInicio").value;
    let fechaFin = document.querySelector("#FechaFin").value;
    let statusOrden = document.querySelector("#statusOrden").value;
    if (fechaIni == '' || fechaFin == '') {
        alert("Ingrese fechas de inicio y fin validas")
        return false;
    }
    let body = document.querySelector("#bodyTable");
    let servicio = `${url}order/reporteOrdenes/${fechaIni}/${fechaFin}/${statusOrden}`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            let data = resultado.result.data;
            let montoTotal = resultado.result.montoTotal;
            // window.detalleOrden = detalleOrden;
            body.innerHTML = ``;
            document.querySelector("#montoTotal").innerHTML = `Monto: $${montoTotal}`;
            data.forEach(element => {
                let innerHTML = ` <tr id = "orden${element.idOrden}">
                                    <td>${element.idOrden}</td>
                                    <td>${element.FechaPeticion}</td>
                                    <td>${element.NombreRecibe}</td>
                                    <td>${element.NombreEstablecimiento}</td>
                                    <td>${element.NombreRepartidor}</td>
                                    <td id="statusOrden${element.idOrden}" >${element.StatusOrden}</td>
                                    <td>${element.CostoEnvio}</td>
                                    <td> <a href = "detalle-orden.html?idOrden=${element.idOrden}" class="btn btn-outline-info"><i class="fas fa-edit"></i></a></td>
                                </tr> `;
                                body.innerHTML += `${innerHTML}`
            });
            document.getElementById("totalOrdenes").innerHTML = data.length;
            // $('#dataTable').DataTable();
        }else{
            body.innerHTML = `<p style="color:red" >${resultado.errors}</p>`;
            document.getElementById("totalOrdenes").innerHTML = `0`;
        }
    })
}

//ReportDashboardOrden
export const bucarReporteDashboard = () => {
    let de  = document.querySelector("#FechaIn").value;
    let a = document.querySelector("#FechaFi").value;
    if (de == '' || a == '') {
        alert("Ingrese fechas de inicio y fin validas")
        return false;
    }
    let servicio = `${url}order/reportDashboard/${de}/${a}`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            let data = resultado.result;
            console.log(data);
            document.querySelector(`#NumeroOrdenes`).innerHTML = `${data.NumeroOrdenes}`;
            document.querySelector(`#Ganancias`).innerHTML = `${data.Ganancias}`;
    }
  });
}

//ReportDashboardUsuario
export const bucarReporteDashboardUser = () => {
    let de  = document.querySelector("#FechaIn").value;
    let a = document.querySelector("#FechaFi").value;
    if (de == '' || a == '') {
        alert("Ingrese fechas de inicio y fin validas")
        return false;
    }
    let servicio = `${url}order/reportDashboardUser/${de}/${a}`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            let data = resultado.result;
            console.log(data);
            document.querySelector(`#Repartidores`).innerHTML = `${data.NumRepartidores}`;
            document.querySelector(`#NumUsuarios`).innerHTML = `${data.NumUsuarios}`;
    }
  });
}

export const obtenerDetalleOrden = () => {
    let servicio = `${url}order/reporteOrdenes/${fechaIni}/${fechaFin}/${statusOrden}`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            console.log(resultado);
        }
    });
}

export const listarPromoAnuncios = () =>{
    let servicio = `${url}promotion_announcement/list`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        console.log(resultado);
        if (resultado.response) {
            let cuerpo = document.querySelector("#listaPromoAnuncio");
            let data = resultado.result.Lista;
            data.forEach(element => {
                let fila = document.createElement(`div`)
                fila.innerHTML = `
                <div class="col-xl-12 col-md-12 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div style= "width:129px;">
                            <img src="${element.UrlImag}" class="rounded" width="124" height="93">
                        </div>
                        <div class="col mr-1">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Establecimiento: ${element.Establecimiento} - Promociones y Anuncios: ${element.Promociones_o_Anuncios}</div>
                            <div class="h4 mb-0 font-weight-bold text-gray-800">${element.Detalle}</div>
                            <div class="h6 mb-0 font-weight-bold text-gray-800">Descuento: ${element.MontoDescuento}</div>
                            Fecha Expiración: ${element.FechaExpiración}</div><div>
                        </div>
                      <div class="col-auto">
                        <a href="agregar-promoAnuncio.html?id=${element.idPromociones_Anuncios}" class="btn btn-info btn-circle">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" onclick = "llenarModalEliminarPromoAnuncio(${element.idPromociones_Anuncios})" class="btn btn-danger btn-circle" data-toggle="modal" data-target="#logoutModal">
                            <i class="fas fa-trash"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
              cuerpo.appendChild(fila);
            });
        }else{

        }
    });
}

export const listarUsuarios = () => {
    let servicio = `${url}user/toList/1`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            let data = resultado.result.Data;
            let cuerpo = document.querySelector("#bodyTable");
            document.querySelector("#labelTotalUsuarios").innerHTML = `Total de Usuarios: ${resultado.result.Total}`;
            data.forEach(element => {
                let fila = document.createElement('tr');
                fila.innerHTML =`
                                <td>${element.idUsuario}</td>
                                <td>${element.nombre} ${element.apellidos}</td>
                                <td>${element.telefono}</td>
                                <td>${element.email}</td>
                                <td>${element.FechaRegistro}</td>
                               `;
                cuerpo.appendChild(fila);
                // body.innerHTML += `${innerHTML}`
            })
        }else{
            console.log(resultado);
        }
    });
}
//Listar tipo promociones
export const listarTipoPromoAnuncio = () =>{
    let servicio = `${url}promotion_announcement/listTipo`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    res.then(resultado => {
         console.log(resultado);
        if (resultado.response) {
            let data = resultado.result.Lista;
            let selectPromoAnuncio = document.querySelector("#promoAnuncio")
            let inner = `<option disabled selected>Selecciona una opción</option>`;
            data.forEach(element => {
                inner += `<option value ="${element.idTipoPromociones_Anuncios}">${element.descripcion}</option>`;
            });
            selectPromoAnuncio.innerHTML = inner;
        }
    });
}
//Listar establecimiento
export const listarPromoAnuncioEstab = () =>{
    let servicio = `${url}establishment/list`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    res.then(resultado => {
         console.log(resultado);
        if (resultado.response) {
            let data = resultado.result;
            let selectPromoAnuncioEstab = document.querySelector("#establecimiento")
            let inner = `<option disabled selected>Selecciona una opción</option>`;
            data.forEach(element => {
                inner += `<option value ="${element.idEstablecimiento}">${element.NombreEstablecimiento}</option>`;
            });
            selectPromoAnuncioEstab.innerHTML = inner;
        }
    });
}
//Obtener detalle de promociones
export const ObtenerPromoAnuncio = (id) => {
    let servicio = `${url}promotion_announcement/detail/${id}`;
    let api = new Api(servicio,"GET",null,sessionStorage.getItem('tokenAdmin'));
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            let data = resultado.result;
            console.log(data);
            document.querySelector("#establecimiento").value = data.idEstablecimiento;
            document.querySelector("#detalle").value = data.detalle;
            document.querySelector("#promoAnuncio").value = data.idTipoPromociones_Anuncios;
            document.querySelector("#codigoDescuento").value = data.CodigoDescuento;
            document.querySelector("#montoDescuento").value = data.MontoDescuento; 
            document.querySelector("#fechaExpiracion").value = data.FechaExpiración;
            document.querySelector("#imagenPromocion").src = data.UrlImag;
            document.querySelector("#titulo").value = data.titulo;
            document.querySelector("#nota").value = data.nota;
        }
    });
}
//Agregar Promociones
export const agregarPromoAnuncios = (parametros) => {
    let servicio = `${url}promotion_announcement/add`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"POST",parametros,token);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Promocion | Anuncio fue agregado");
            document.querySelector("#divImagenes").style.display = "block";
        }else{
            alert("No se pudo guradar la Promocion");
            console.log(resultado)
        }
    });
}

//Agregar Promociones
export const actualizarPromoAnuncios = (parametros,id) => {
    let servicio = `${url}promotion_announcement/update/${id}`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"PUT",parametros,token);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Promocion | Anuncio fue actualizado");
            
        }else{
            alert("No se pudo guradar la Promocion");
            console.log(resultado)
        }
    });
}
// Productos
let uriImagenProduct = `https://cdn0.iconfinder.com/data/icons/auction-and-competition-outline/64/return_policy-return-product-package-delivery-logistic-512.png`;
export const listarProductos = async(idEstablecimiento)  => {
    let servicio = `${url}product/toListProducts/${idEstablecimiento}`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    await res.then(resultado => {
        if (resultado.response) {
            const cuerpo = document.querySelector("#listaProductos")
            let data = resultado.result;
            console.log(data);
            window.verEditarProducto = verEditarProducto;
            data.forEach(element => {
                let fila = document.createElement(`div`);
                fila.innerHTML = `<div class="col-xl-12 col-md-12 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div style= "width:129px;">
                            <img src="${element.urlFoto}" class="rounded" width="124" height="93">
                        </div>
                        <div class="col mr-1">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Producto:</div>
                            <div class="h4 mb-0 font-weight-bold text-gray-800">${element.producto}</div>
                            <div class="h6 mb-0 font-weight-bold text-gray-800">${element.descripcion}</div>
                            </div><div>
                        </div>
                      <div class="col-auto">
                        <a href="#" onclick = "verEditarProducto(${element.idProducto},'${element.producto}','${element.descripcion}','${element.precio}','${element.urlFoto}','${element.tipoProducto}')" class="btn btn-info btn-circle">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" onclick = "eliminarProducto(${element.idProducto})" class="btn btn-danger btn-circle" data-toggle="modal" data-target="#logoutModal">
                            <i class="fas fa-trash"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
                cuerpo.appendChild(fila);
            });
        }
    });
};

export const agregarProducto = (parametros) => {
    let servicio = `${url}product/registerProduct`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"POST",parametros,token);
    let res = api.call();
    res.then(resultado => {
        if (resultado.response) {
            alert("Producto agregado, puede agregar una imagen!!!");
            document.querySelector("#idProducto").value = resultado.result;
        };
    });
};

export const editarProducto = (id,parametros) => {
    console.log(`Edit producto ${id}`)
};

export const eliminarProducto = () => {

};

export const listarTipoProd = async () => {
    let servicio = `${url}product/toListTipos`;
    let token = sessionStorage.getItem('tokenAdmin');
    let api = new Api(servicio,"GET",null,token);
    let res = api.call();
    await res.then(resultado => {
       if (resultado.response) {
           let tipoProducto = document.querySelector("#tipoProducto");
           let data = resultado.result;
           let fila = `<option value="0"> Seleccione un Tipo </option>`;
           data.forEach(element => {
                fila+= `<option value="${element.idtipo_producto}" >${element.descripcion}</option>`
           })
           tipoProducto.innerHTML = fila;
       }
    });
};

export const verEditarProducto = (id,producto,descripcion,precio,uri,tipoProducto) => {
    console.log("abrir editor");
    document.querySelector("#idProducto").value = id;
    document.querySelector("#producto").value = producto;
    document.querySelector("#descripcion").value = descripcion;
    document.querySelector("#precio").value = precio;
    document.querySelector("#tipoProducto").value = tipoProducto;
    document.querySelector("#fAddProducto").style.display = "block";
    document.getElementById("imgVistaProd").src = uri;
};

export const limpiarFormProducto = () => {
    document.querySelector("#idProducto").value = 0;
    document.querySelector("#producto").value = "";
    document.querySelector("#descripcion").value = "";
    document.querySelector("#precio").value = "";
    document.querySelector("#tipoProducto").value = "";
    document.getElementById("imgVistaProd").src = uriImagenProduct;
};