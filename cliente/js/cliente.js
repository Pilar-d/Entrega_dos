//variable global

var g_id_cliente = "";

function agregarCliente(){

  //agregar validacion

  if(!validacionFormulario()){
    return;
  }

    //obtenemos los datos del formulario
    var id_cliente = document.getElementById("txt_id_cliente").value;
    var txt_dv = document.getElementById("txt_dv").value;
    var txt_nombres = document.getElementById("txt_nombres").value;
    var txt_apellidos = document.getElementById("txt_apellidos").value;
    var txt_email = document.getElementById("txt_email").value;
    var txt_celular = document.getElementById("txt_celular").value;
    var fecha_registro = document.getElementById("txt_fecha_registro").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id_cliente":id_cliente,
  "dv": txt_dv,
  "nombres": txt_nombres,
  "apellidos": txt_apellidos,
  "email": txt_email,
  "celular": txt_celular,
  "fecha_registro": fecha_registro
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.136.43/api/cliente", requestOptions)
  .then((response) => response.text())
  .then((result) => {
      console.log(result);
      window.location.href = "listar.html";
  })
  .catch((error) => console.error(error));
}

function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.136.43/api/cliente", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila)
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }

function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_cliente").innerHTML  +=
  `<tr>
  <td>${element.id_cliente}-${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm text-dark'><b>Actualizar</b></a>
  <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm text-white'><b>Eliminar</b></a>
  </td>
  </tr>`
}


function actualizarCliente(){

  var txt_nombres = document.getElementById("txt_nombres").value;
  var txt_apellidos = document.getElementById("txt_apellidos").value;
  var txt_email = document.getElementById("txt_email").value;
  var txt_celular = document.getElementById("txt_celular").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "nombres": txt_nombres,
    "apellidos": txt_apellidos,
    "email": txt_email,
    "celular": txt_celular
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.136.43/api/cliente/"+g_id_cliente, requestOptions)
    .then((response) => {
      if(response.status == 200){
        //alert("cliente actualizado")
        window.location.href = "listar.html";

    }
   
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

}

  function obtenerIdActualizacion(){
    //posisionamos en la barra de direcciones
    const queryString = window.location.search;

    //extraemos los parametros
    const parametros = new URLSearchParams(queryString);

    //obtenemos el id de la persona a actualizar
    const p_id_cliente = parametros.get("id");

    //asignamos valor a variable global
    g_id_cliente = p_id_cliente;
    alert(p_id_cliente)

    obtenerDatosActualizacion(p_id_cliente)
  }

function obtenerDatosActualizacion(id_cliente){

const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("http://144.126.136.43/api/cliente/"+id_cliente, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarFormulario))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function completarFormulario(element, index, arr){
  var idCliente = element.id_cliente;
  var dvCliente = element.dv;
  var nombreCliente = element.nombres;
  var apellidoCliente = element.apellidos;
  var emailCliente = element.email;
  var celularCliente = element.celular;
  var fechaRegistro = element.fecha_registro;

  document.getElementById("txt_id_cliente").value = idCliente;
  document.getElementById("txt_dv").value = dvCliente; 
  document.getElementById("txt_nombres").value = nombreCliente;
  document.getElementById("txt_apellidos").value = apellidoCliente;
  document.getElementById("txt_celular").value = celularCliente;
  document.getElementById("txt_email").value = emailCliente;
  document.getElementById("txt_fecha_registro").value = fechaRegistro;
  
}

//funcion eliminar

 function eliminarCliente() {

  const requestOptions = {
    method: "DELETE",
    redirect: "follow"
  };

  fetch("http://144.126.136.43/api/cliente/" + g_id_cliente, requestOptions)
    .then((response) => {
      if (response.status == 200) {
        // Redireccionamos a la lista de clientes
        window.location.href = "listar.html";
      }
    });
}

  function obtenerIdEliminacion(){

    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_cliente = parametros.get("id");
    g_id_cliente = p_id_cliente;

    obtenerDatosEliminacion(p_id_cliente);
  }

  function obtenerDatosEliminacion(id_cliente){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

fetch("http://144.126.136.43/api/cliente/"+id_cliente, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarEtiqueta))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function completarEtiqueta(element, index, arr){

  var id_cliente = element.id_cliente;
  var dv = element.dv;
  var nombreCliente = element.nombres;
  var apellidoCliente = element.apellidos;
 
  document.getElementById("lbl_cliente").innerHTML =  " <b>" + " Rut: " + "</b>" + id_cliente + "-" + dv + " <br>" + "<b>" + "Nombres: " + "</b>" +  nombreCliente + " <br>" + " <b>" + "Apellidos: " + " </b>"   + apellidoCliente;
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

// solo dígito o letra 'k/K'
function soloDV(input) {
    input.value = input.value.replace(/[^0-9kK]/g, '');
}

// solo números, guiones, espacios y dos puntos (para fecha)
function validarFechaRegistro(input) {
    input.value = input.value.replace(/[^0-9:\-\s]/g, '').slice(0, 19);
}

function validacionFormulario() {
    const rut = document.getElementById("txt_id_cliente").value.trim();
    const dv = document.getElementById("txt_dv").value.trim();
    const nombres = document.getElementById("txt_nombres").value.trim();
    const apellidos = document.getElementById("txt_apellidos").value.trim();
    const email = document.getElementById("txt_email").value.trim();
    const celular = document.getElementById("txt_celular").value.trim();
    const fecha = document.getElementById("txt_fecha_registro").value.trim();

    const soloNumerosRegex = /^[0-9]+$/;
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const dvValido = /^[0-9kK]{1}$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const celularValido = /^[0-9]{9}$/;
    const fechaValida = /^[0-9:\-\s]{1,19}$/;

    if (rut === "" || !soloNumerosRegex.test(rut) || rut.length > 8) {
        alert("Ingrese un RUT válido, solo números 8 dígitos.");
        return false;
    }

    if (dv === "" || !dvValido.test(dv)) {
        alert("Ingrese un dígito verificador válido (1 dígito o 'k').");
        return false;
    }

    if (nombres === "" || !soloLetrasRegex.test(nombres)) {
        alert("Ingrese nombres válidos, solo letras.");
        return false;
    }

    if (apellidos === "" || !soloLetrasRegex.test(apellidos)) {
        alert("Ingrese apellidos válidos, solo letras.");
        return false;
    }

    if (email === "" || !emailValido.test(email)) {
        alert("Ingrese un correo electrónico válido.");
        return false;
    }

    if (celular === "" || !celularValido.test(celular)) {
        alert("Ingrese un celular válido de 8 números.");
        return false;
    }

    if (fecha === "" || !fechaValida.test(fecha)) {
        alert("Ingrese una fecha válida: ejemplo 2025-10-05 20:00:00");
        return false;
    }

    return true;
}

