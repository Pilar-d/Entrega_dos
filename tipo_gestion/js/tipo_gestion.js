//variable global

var g_id_tipo_gestion = "";

function agregarTipoGestion(){

    if(!validacionFormulario()){
    return;
  }

    var id_tipo_gestion = document.getElementById("txt_id_tipo_gestion").value; 
    var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;
    var fecha_registro = document.getElementById("txt_fecha_registro").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id_tipo_gestion": id_tipo_gestion,
        "nombre_tipo_gestion": nombre_tipo_gestion,
        "fecha_registro": fecha_registro
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/tipo_gestion", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        console.log(result);
        window.location.href = "listar.html";
    })
    .catch((error) => console.error(error));
}

function listarTipoGestion(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/tipo_gestion", requestOptions)
    .then((response) => response.json())
    .then((json)=> {
        json.forEach(completarFila)
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_tipo_gestion").innerHTML  +=
  `<tr>
  <td>${element.id_tipo_gestion}</td>
  <td>${element.nombre_tipo_gestion}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_tipo_gestion}' class='btn btn-warning btn-sm text-dark'><b>Actualizar</b></a>
  <a href='eliminar.html?id=${element.id_tipo_gestion}' class='btn btn-danger btn-sm text-white'><b>Eliminar</b></a>
  </td>
  </tr>`
}

function actualizarTipoGestion(){


    var txt_nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nombre_tipo_gestion": txt_nombre_tipo_gestion
    });

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/tipo_gestion/"+g_id_tipo_gestion, requestOptions)
        .then((response) => {
            if(response.status == 200){
                //alert(tipo de gestion actualizado)
                window.location.href = "listar.html"
            }
        })
        .then((result)=> console.log(result))
        .catch((error)=> console.error(error))
}

function obtenerIdActualizacion(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_tipo_gestion = parametros.get("id");

    g_id_tipo_gestion = p_id_tipo_gestion;
    alert(p_id_tipo_gestion)

    obtenerDatosActualizacion(p_id_tipo_gestion)
}

function obtenerDatosActualizacion(id_tipo_gestion){

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/tipo_gestion/"+id_tipo_gestion, requestOptions)
    .then((response)=> response.json())
    .then((json)=> json.forEach(completarFormulario))
    .then((result)=> console.log(result))
    .catch((error)=> console.log(error));

}

function completarFormulario(element, index, arr){
    var id_tipo_gestion = element.id_tipo_gestion;
    var nombre_tipo_gestion = element.nombre_tipo_gestion;
    var fecha_registro = element.fecha_registro;

    document.getElementById("txt_id_tipo_gestion").value = id_tipo_gestion;
    document.getElementById("txt_nombre_tipo_gestion").value = nombre_tipo_gestion;
    document.getElementById("txt_fecha_registro").value = fecha_registro;
}

//funcion eliminar

function eliminarTipoGestion(){

    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/tipo_gestion/" + g_id_tipo_gestion, requestOptions)
        .then((response) => {
            if(response.status == 200) {
                window.location.href = "listar.html";
            }
        });
}

function obtenerIdEliminacion(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_tipo_gestion = parametros.get("id");
    g_id_tipo_gestion = p_id_tipo_gestion;

    obtenerDatosEliminacion(p_id_tipo_gestion);
}

function obtenerDatosEliminacion(id_tipo_gestion){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/tipo_gestion/"+id_tipo_gestion, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarEtiqueta))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

function completarEtiqueta(element, index, arr){
    var id_tipo_gestion = element.id_tipo_gestion;
    var nombre_tipo_gestion = element.nombre_tipo_gestion;

    document.getElementById("lbl_tipo_gestion").innerHTML =  "<b>" + "Identificador: " + "</b>" + id_tipo_gestion + "<br>" + "</b>" + "<b>" + "Nombre: " + "</b>" + nombre_tipo_gestion + "<b>";

}


//validacion formulario

// solo números
function soloNumeros(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}
// solo letras (incluye tildes y espacios)
function soloLetras(input) {
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
}
// solo números, guiones, espacios y dos puntos (para fecha)
function validarFechaRegistro(input) {
    input.value = input.value.replace(/[^0-9:\-\s]/g, '').slice(0, 19);
}

function validacionFormulario() {
    const identificador = document.getElementById("txt_id_tipo_gestion").value.trim();
    const nombres = document.getElementById("txt_nombre_tipo_gestion").value.trim();
    const fecha = document.getElementById("txt_fecha_registro").value.trim();

    const soloNumerosRegex = /^[0-9]+$/;
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const fechaValida = /^[0-9:\-\s]{1,19}$/;

    if (identificador === "" || !soloNumerosRegex.test(identificador) || identificador.length > 8) {
        alert("Ingrese un identificador válido, solo números");
        return false;
    }

    if (nombres === "" || !soloLetrasRegex.test(nombres)) {
        alert("Ingrese un nombre válido, solo letras.");
        return false;
    }

    if (fecha === "" || !fechaValida.test(fecha)) {
        alert("Ingrese una fecha válida: ejemplo 2025-10-05 20:00:00");
        return false;
    }

    return true;
}