// variable global
var g_id_usuario = ""

function agregarUsuario(){
    var id_usuario = document.getElementById("txt_id_usuario").value;
    var dv_usuario = document.getElementById("txt_dv_usuario").value;
    var nombres_usuario = document.getElementById("txt_nombres_usuario").value;
    var apellidos_usuario = document.getElementById("txt_apellidos_usuario").value;
    var email_usuario = document.getElementById("txt_email_usuario").value;
    var celular_usuario = document.getElementById("txt_celular_usuario").value;
    var username_usuario = document.getElementById("txt_username_usuario").value;
    var password_usuario = document.getElementById("txt_password_usuario").value;


const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
    "id_usuario": id_usuario, 
    "dv": dv_usuario,
    "nombres": nombres_usuario,
    "apellidos": apellidos_usuario,
    "email": email_usuario,
    "celular": celular_usuario,
    "username":username_usuario,
    "password": password_usuario,
    "fecha_registro":"2025-05-12 12:17"

});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

fetch("http://144.126.136.43/api/usuario", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        console.log(result);
        window.location.href = "listar.html";
    })
    .catch((error) => console.error(error));

}

function listarUsuario(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/usuario", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            json.forEach(completarFila)
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

function completarFila(element, index, arr){
    arr[index] = document.querySelector("#tbl_usuario").innerHTML +=
     `<tr>
  <td>${element.id_usuario}-${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
   <td>${element.username}</td>
  <td>${element.password}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm text-dark'><b>Actualizar</b></a>
  <br><br>
  <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm text-white'><b>Eliminar</b></a>
  </td>
  </tr>`

}

function actualizarUsuario(){

    var nombres_usuario = document.getElementById("txt_nombres_usuario").value;
    var apellidos_usuario = document.getElementById("txt_apellidos_usuario").value;
    var email_usuario = document.getElementById("txt_email_usuario").value;
    var celular_usuario = document.getElementById("txt_celular_usuario").value;
    var username_usuario = document.getElementById("txt_username_usuario").value;
    var password_usuario = document.getElementById("txt_password_usuario").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({

    "nombres": nombres_usuario,
    "apellidos": apellidos_usuario,
    "email": email_usuario,
    "celular": celular_usuario,
    "username":username_usuario,
    "password": password_usuario
   
    });

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/usuario/"+g_id_usuario, requestOptions)
        .then((response)=> {
            if(response.status == 200){
                alert("usuario actualizado")
                window.location.href = "listar.html"
            }
        })
        .then((result) => console.log(result))
        .then((error) => console.log(error));
    }

    function obtenerIdActualizacion(){
        const queryString = window.location.search;
        const parametros = new URLSearchParams(queryString);
        const p_id_usuario = parametros.get("id");

        g_id_usuario = p_id_usuario;
        alert(p_id_usuario)

        obtenerDatosActualizacion(p_id_usuario)
    }

    function obtenerDatosActualizacion(id_usuario){

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("http://144.126.136.43/api/usuario/"+id_usuario, requestOptions)
            .then((response) => response.json())
            .then((json) => json.forEach(completarFormulario))
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    function completarFormulario(element, index, arr){
        var id_usuario = element.id_usuario;
        var dv_usuario = element.dv;
        var nombres_usuario = element.nombres;
        var apellidos_usuario = element.apellidos;
        var email_usuario = element.email;
        var celular_usuario = element.celular;
        var username_usuario = element.username;
        var password_usuario = element.password;

        document.getElementById("txt_id_usuario").value = id_usuario;
        document.getElementById("txt_dv_usuario").value = dv_usuario;
        document.getElementById("txt_nombres_usuario").value = nombres_usuario;
        document.getElementById("txt_apellidos_usuario").value = apellidos_usuario;
        document.getElementById("txt_email_usuario").value = email_usuario;
        document.getElementById("txt_celular_usuario").value = celular_usuario;
        document.getElementById("txt_username_usuario").value = username_usuario;
        document.getElementById("txt_password_usuario").value = password_usuario;

    }

    function eliminarUsuario(){
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        fetch("http://144.126.136.43/api/usuario/"+ g_id_usuario, requestOptions)
            .then((response) => {
                if(response.status == 200) {
                    //redireccionamos a la lista de usuarios
                    window.location.href = "listar.html";
                }
            })
    }

    function obtenerIdEliminacion(){

        const queryString = window.location.search;
        const parametros = new URLSearchParams(queryString);
        const p_id_usuario = parametros.get("id");
        g_id_usuario = p_id_usuario;

        obtenerDatosEliminacion(p_id_usuario)
    }


    function obtenerDatosEliminacion(id_usuario){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("http://144.126.136.43/api/usuario/"+id_usuario, requestOptions)
            .then((response) => response.json())
            .then((json) => json.forEach(completarEtiqueta))
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    function completarEtiqueta(element, index, arr){

        var nombresUsuario = element.nombres;
        var apellidosUsuario = element.apellidos;

        document.getElementById("lbl_usuario").innerHTML = "<b>" + nombresUsuario + " " + apellidosUsuario + "</b>";
    }

