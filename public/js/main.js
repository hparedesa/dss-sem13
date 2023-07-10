listarArticulos();

function listarArticulos(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost:10003/API/articulos", requestOptions)
        .then(response => response.json())
        .then(function(result){
            var objLista=document.getElementById("listaArt");
            console.log(objLista);
            var strHTML="";

            result.forEach(element => {
                strHTML +="<li>"+element.nombre+"</li> ";
                //console.log("<li>"+element.nombre+"</li> ");
            });
            objLista.innerHTML=strHTML;
        })
        //.then(result => console.log(result))
        .catch(error => console.log('error', error));

}

