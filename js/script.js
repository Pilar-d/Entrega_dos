//variable global

var g_id_cliente = "";


function agregarCliente(){

    //obtenemos los datos del formulario
    var id_cliente = document.getElementById("txt_id_cliente").value;
    var txt_dv = document.getElementById("txt_dv").value;
    var txt_nombres = document.getElementById("txt_nombres").value;
    var txt_apellidos = document.getElementById("txt_apellidos").value;
    var txt_email = document.getElementById("txt_email").value;
    var txt_celular = document.getElementById("txt_celular").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id_cliente":id_cliente,
  "dv": txt_dv,
  "nombres": txt_nombres,
  "apellidos": txt_apellidos,
  "email": txt_email,
  "celular": txt_celular,
  "fecha_registro": "2025-05-12 12:17"
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
  <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a>
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
        //alert("usuario actualizado")
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

  document.getElementById("txt_id_cliente").value = idCliente;
  document.getElementById("txt_dv").value = dvCliente; 
  document.getElementById("txt_nombres").value = nombreCliente;
  document.getElementById("txt_apellidos").value = apellidoCliente;
  document.getElementById("txt_celular").value = celularCliente;
  document.getElementById("txt_email").value = emailCliente;
  
}



 /*  obtener id de usuario a eliminar

  consultar api rest para obtener los datos del usuario nombre y apellidos */

  function validacionFormulario(){
    var id_cliente = document.getElementById("tex_id_cliente").value;
    var dv_cliente = document.getElementById("txt_dv").value;
    var nombre_cliente = document.getElementById("txt_nombres").value;
    var apellido_cliente = document.getElementById("txt_celular").value;
    var email_cliente = document.getElementById("txt_email").value;
    var telefono_cliente = document.getElementById("txt_celular").value;

    if (id_cliente == ""){
      alert("porfavor ingrese: RUT")
    }
    if(dv_cliente == ""){
      alert("porfavor ingrese: DIGITO VERIFICADOR")
    }
    if(nombre_cliente == ""){
      alert("porfavor ingrese: NOMBRES")
    }
    if(apellido_cliente == ""){
      alert("porvafor infrese: APELLIDOS")
    }
    if(email_cliente){
      alert("porfavor ingrese: EMAIL VALIDO")
    }
    if(telefono_cliente){
      alert("porfavor ingrese: TELEFONO")
    }
    
  }

  //funcion eliminar

  function eliminarCliente(){
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };

    fetch("http://144.126.136.43/api/cliente/" + g_id_cliente, requestOptions)
    .then((response) => {
      if(response.status == 200){
      //redireccionamos a la lista de clientes
      window.location.href = "listar.html";
    }
    })
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

  var nombreCliente = element.nombres;
  var apellidoCliente = element.apellidos;
 
  document.getElementById("lbl_cliente").innerHTML = "<b>" + nombreCliente + " " + apellidoCliente + "</b>";
}


