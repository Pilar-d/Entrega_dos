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