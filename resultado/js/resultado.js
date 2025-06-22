
var g_id_resultado = "";


function agregarResultado(){
    var id_resultado = document.getElementById("txt_id_resultado").value;
    var nombre_resultado = document.getElementById("txt_nombre_resultado").value;
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id_resultado": id_resultado,
        "nombre_resultado": nombre_resultado,
        "fecha_registro": "2025-05-12 12:17"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/resultado", requestOptions)
        .then((response)=> response.text())
        .then((result)=> {
            console.log(result);
            window.location.href = "listar.html";
        })
        .catch((error)=> console.error(error));
}


function listarResultado(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/resultado", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            json.forEach(completarFila)
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_resultado").innerHTML  +=
  `<tr>
  <td>${element.id_resultado}</td>
  <td>${element.nombre_resultado}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning btn-sm text-dark'><b>Actualizar</b></a>
  <a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger btn-sm text-white'><b>Eliminar</b></a>
  </td>
  </tr>`
}


function actualizarResultado(){

    var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nombre_resultado": nombre_resultado
    });

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/resultado/"+g_id_resultado, requestOptions)
        .then((response) => {
            if(response.status == 200){
                //alert("resultado actualizado")
                window.location.href = "listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
}

function obtenerIdActualizacion(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_resultado = parametros.get("id");

    g_id_resultado = p_id_resultado;
    alert(p_id_resultado)

    obtenerDatosActualizacion(p_id_resultado)
}

function obtenerDatosActualizacion(id_resultado){

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/resultado/"+id_resultado, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFormulario))
        .then((result) => console.log(result))
        .then((error) => console.error(error));
}

function completarFormulario(element, index, arr){

    var id_resultado = element.id_resultado;
    var nombre_resultado = element.nombre_resultado;
    var fecha_registro = element.fecha_registro;

    document.getElementById("txt_id_resultado").value = id_resultado;
    document.getElementById("txt_nombre_resultado").value = nombre_resultado;
    document.getElementById("txt_fecha_registro").value = fecha_registro;
}

function eliminarResultado(){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/resultado/"+ g_id_resultado, requestOptions)
        .then((response) => {
            if(response.status == 200){
                //redireccionamos a la lista de resultado
                window.location.href = "listar.html";
            }
        } )
}

function obtenerIdEliminacion(){

    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_resultado = parametros.get("id");
    g_id_resultado = p_id_resultado;

    obtenerDatosEliminacion(p_id_resultado);
}

function obtenerDatosEliminacion(id_resultado){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/resultado/"+id_resultado, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarEtiqueta))
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
}

function completarEtiqueta(element, index, arr){

    var id_resultado = element.id_resultado;
    var nombre_resultado = element.nombre_resultado;

    document.getElementById("lbl_resultado").innerHTML = 
     "<b>" + "Identificador: " + "</b>" + id_resultado + "<br>" + "<b>" + "Nombres: " +  "</b>" + nombre_resultado;

}