const initFirebaseRealtime = () => {
    const dbFireBase = firebase.database().ref().child(`Orden`);
    // elementos que cambien
    dbFireBase.on('child_changed',snap => {
        let valorSnap = snap.val();
        // console.log(valorSnap)
        if(valorSnap.StatusOrden < 6 ){
            let statusOrden = status.find(res => res.s == valorSnap.StatusOrden);
            document.getElementById(`statusOrden${valorSnap.idOrden}`).innerHTML = `${statusOrden.valor}`;
        }else{
            let padre = document.getElementById("bodyTable");
            let hijo = document.getElementById(`orden${valorSnap.idOrden}`);
            if(hijo){
                padre.removeChild(hijo);
                let totalOrdenes = document.getElementById("totalOrdenes").innerHTML;
                totalOrdenes = parseInt(totalOrdenes)
                totalOrdenes = totalOrdenes - 1;
                document.getElementById("totalOrdenes").innerHTML = `${totalOrdenes}`;
            }   
        }
    })
    // elementos que se agreguen
    dbFireBase.on('child_added',snap => {
        let body = document.querySelector("#bodyTable");
        let valorSnap = snap.val();
        // console.log(valorSnap)
        if(valorSnap.StatusOrden < 6){
            if(!document.getElementById(`orden${valorSnap.idOrden}`)){
                let totalOrdenes = document.getElementById("totalOrdenes").innerHTML;
                // console.log(totalOrdenes)
                if(totalOrdenes == 0){
                    body.innerHTML = ``;
                }
                totalOrdenes = parseInt(totalOrdenes)
                totalOrdenes = totalOrdenes + 1;
                document.getElementById("totalOrdenes").innerHTML = `${totalOrdenes}`;
                let f = new Date();
                let fecha = `${f.getFullYear()}-${f.getMonth()+1}-${f.getDate()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
                let statusOrden = status.find(res => res.s == valorSnap.StatusOrden);

                let innerHTML = ` <tr id = "orden${valorSnap.idOrden}">
                <td>${valorSnap.idOrden}</td>
                <td>${fecha}</td>
                <td>${valorSnap.NombreRecibe}</td>
                <td>${valorSnap.NombreEstablecimiento}</td>
                <td>${valorSnap.NombreRepartidor}</td>
                <td id="statusOrden${valorSnap.idOrden}" >${statusOrden.valor}</td>
                <td>${valorSnap.CostoEnvio}</td>
                <td> <a href = "detalle-orden.html?idOrden=${valorSnap.idOrden}" class="btn btn-outline-info"><i class="fas fa-edit"></i></a></td>
                </tr> `;
                let elementosAnteriores = body.innerHTML;
                body.innerHTML = `${innerHTML}${elementosAnteriores}`;
            }
        }
    })
   
}

const status = [
    { s: '1', valor: "Recibida" },
    { s: '2', valor: "Atendiendo orden" },
    { s: '3', valor: "En establecimiento" },
    { s: '4', valor: "En camino" },
    { s: '5', valor: "En lugar de entrega" }
];

export {
    initFirebaseRealtime
}