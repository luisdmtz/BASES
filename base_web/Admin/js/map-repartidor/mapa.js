import {refUrlPag} from '../../../js/config/config.js';
// iniciar mapa
let map
let markers = [];
const  initMap = (latitud,longitud) => {
    // The location
    let centroMap = {lat: latitud, lng: longitud};
    // console.log(centroMap);
    // The map, centered at zone
    map = new google.maps.Map(
                                document.getElementById('map'), {zoom: 14, center: centroMap}
                            );
}

const initFirebaseRealtime = (idZona) => {
    // referencia
    
    // fetch()
    // primera consulta de datos = 
    const dbFireBase = firebase.database().ref().child(`Repartidor/${idZona}`);
    // solo una consulta de datos en ese momentos
    dbFireBase.once('value').then(snap => {
        // pre.innerText = JSON.stringify(snap.val());
        let listaDrivers = JSON.stringify(snap.val());
        listaDrivers = JSON.parse(listaDrivers);
        // console.log(listaDrivers);
        eliminatPuntos();
        for (const key in listaDrivers) {
            if (listaDrivers.hasOwnProperty(key)) {
                const element = listaDrivers[key];
                console.log(element)
                if(element.activo == 1 && element.idUsuario != null){
                    let newPunt = {lat: element.latitud, lng: element.longitud};
                    let titulo = `${element.nombre}`;
                    agregarPunto(element,newPunt,titulo,element.idUsuario);
                }
            }
        }
        // numero de activos
        // console.log("duplicate",duplicate)
        document.querySelector("#numeroConductores").innerHTML = ` Numero de conductores Activos : ${markers.length}`;
    });

    dbFireBase.on('child_changed',snap => {
        let valorSnap = snap.val();
        // console.log(valorSnap.idUsuario)
        // buscar repetido y eliminarlo para dibijar el nuevo
        let duplicate = false;
        for (let i = 0; i < markers.length; i++) {
            let element = markers[i];
            if (element.idUsuario == valorSnap.idUsuario){
                markers[i].setMap(null)
                markers.splice(i,1);
                duplicate = true;
            }
        }
        let newPunt = {lat: valorSnap.latitud, lng: valorSnap.longitud};
        let titulo = `${valorSnap.nombre}`;
        agregarPunto(valorSnap,newPunt,titulo,valorSnap.idUsuario,duplicate);
        // numero de activos
        console.log("duplicate",duplicate)
        document.querySelector("#numeroConductores").innerHTML = ` Numero de conductores Activos : ${markers.length}`;
    })

}
// agregar puntos en el mapa
const agregarPunto = (element,punto,titulo,idUsuario,duplicate = false) =>{
    if (!duplicate) {
        let cuerpoLista = document.querySelector("#listaDrivers");
        console.log(cuerpoLista)
        cuerpoLista.innerHTML += `
        <div class="card" style="margin-bottom:0px;margin-top:10px">
            <div class="card-header" id="lista${idUsuario}" style="padding: 0px" >
            <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${idUsuario}" aria-expanded="false" aria-controls="collapse${idUsuario}">
                ${titulo}
                </button>
            </h2>
            </div>
            <div id="collapse${idUsuario}" class="collapse" aria-labelledby="lista${idUsuario}" data-parent="#accordionExample">
            <div class="card-body">
                Modelo:<br>
                Placa:
            </div>
            </div>
        </div>`   
    }
    console.log(titulo,punto);    
    const icon = {
        url: `${refUrlPag}img/repartidor2.png`, // url
        scaledSize: new google.maps.Size(60, 60), // size
    };

    let contentString = `${titulo}`;

    const infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    let marker = new google.maps.Marker(
        {   position: punto,
            icon: icon,
            title: `${titulo}`,
            map: map,
            idUsuario:idUsuario
        }
    );
    console.log(marker);
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
    markers.push(marker);
}

const eliminatPuntos =()=>{
    let cuerpoLista = document.querySelector("#listaDrivers");
    cuerpoLista.innerHTML = '';
    for (i in markers) {
        markers[i].setMap(null);
      }
      markers.length = 0;
}



export {
    initMap,
    initFirebaseRealtime
}