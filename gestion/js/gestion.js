
var g_id_gestion = "";

function agregarGestion(){

  var id_gestion = document.getElementById("txt_id_gestion").value;
  var txt_nombres_usuario = document.getElementById("txt_nombres_usuario").value;
  var txt_apellidos_usuario = document.getElementById("txt_apellidos_usuario").value;
  var txt_nombres_cliente = document.getElementById("txt_nombres_cliente").value;
  var txt_apellidos_cliente = document.getElementById("txt_apellidos_cliente").value;
  var txt_resultado = document.getElementById("txt_resultado").value;
  var txt_tipo_gestion = document.getElementById("txt_tipo_gestion").value;
  var txt_comentarios = document.getElementById("txt_comentarios").value;
  var txt_fecha_registro = document.getElementById("txt_fecha_registro").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id_gestion": id_gestion,
    "nombres_usuario": txt_nombres_usuario,
    "apellidos_usuario": txt_apellidos_usuario,
    "nombres_cliente": txt_nombres_cliente,
    "apellidos_cliente": txt_apellidos_cliente,
    "nombre_resultado": txt_resultado,
    "nombre_tipo_gestion": txt_tipo_gestion,
    "comentarios": txt_comentarios,
    "fecha_registro": txt_fecha_registro
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.136.43/api/gestion", requestOptions)
    .then((response)=> response.text())
    .then((result)=> {
        console.log(result);
        window.location.href = "listar.html";
    })
    .catch((error)=> console.error(error))



    
}


function agregar(){
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "query": "select g.id_gestion,u.nombres as nombres_usuario,u.apellidos as apellidos_usuario,c.nombres as nombres_cliente,c.apellidos as apellidos_cliente, r.nombre_resultado,tg.nombre_tipo_gestion,g.comentarios, g.fecha_registro from gestion g,usuario u,cliente c,resultado r,tipo_gestion tg where g.id_usuario = u.id_usuario and g.id_cliente = c.id_cliente and g.id_resultado = r.id_resultado and g.id_tipo_gestion = tg.id_tipo_gestion"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.136.43/dynamic", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));



}




function listarGestion(){

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "query": "select g.id_gestion,u.nombres as nombres_usuario,u.apellidos as apellidos_usuario,c.nombres as nombres_cliente,c.apellidos as apellidos_cliente, r.nombre_resultado,tg.nombre_tipo_gestion,g.comentarios, g.fecha_registro from gestion g,usuario u,cliente c,resultado r,tipo_gestion tg where g.id_usuario = u.id_usuario and g.id_cliente = c.id_cliente and g.id_resultado = r.id_resultado and g.id_tipo_gestion = tg.id_tipo_gestion"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.136.43/dynamic", requestOptions)
  .then((response) => response.json())
  .then((json) => {
    json.forEach(completarFila)
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

  }

function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_gestion").innerHTML  +=
  `<tr>
  <td>${element.id_gestion}</td>
  <td>${element.nombres_usuario}</td>
  <td>${element.apellidos_usuario}</td>
  <td>${element.nombres_cliente}</td>
  <td>${element.apellidos_cliente}</td>
  <td>${element.nombre_resultado}</td>
  <td>${element.nombre_tipo_gestion}</td>
  <td>${element.comentarios}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_gestion}' class='btn btn-warning btn-sm text-dark'><b>Actualizar</b></a>
  <a href='eliminar.html?id=${element.id_gestion}' class='btn btn-danger btn-sm text-white'><b>Eliminar</b></a>
  </td>
  </tr>`
}


function actualizarGestion(){
  
  var txt_nombres_usuario = document.getElementById("txt_nombres_usuario").value;
  var txt_apellidos_usuario = document.getElementById("txt_apellidos_usuario").value;
  var txt_nombres_cliente = document.getElementById("txt_nombres_cliente").value;
  var txt_apellidos_cliente = document.getElementById("txt_apellidos_cliente").value;
  var txt_resultado = document.getElementById("txt_resultado").value;
  var txt_tipo_gestion = document.getElementById("txt_tipo_gestion").value;
  var txt_comentarios = document.getElementById("txt_comentarios").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "nombres_usuario": txt_nombres_usuario,
    "apellidos_usuario": txt_apellidos_usuario,
    "nombres_clientes": txt_nombres_cliente,
    "apellidos_usuario": txt_apellidos_cliente,
    "nombre_resultado": txt_resultado,
    "nombre_tipo_gestion": txt_tipo_gestion,
    "comentarios": txt_comentarios,
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.136.43/dynamic"+ g_id_gestion, requestOptions)
    .then((response)=> {
      if(response.status == 200){
        //alert("gestion actualizada")
        window.location.href = "listar.html"
      }
    })
    .then((result)=> console.log(result))
    .catch((error) => console.error(error));
}

function obtenerIdActualizacion(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_gestion = parametros.get("id");

  g_id_gestion = p_id_gestion;
  alert(p_id_gestion)

  obtenerDatosActualizacion(p_id_gestion)
}

function obtenerDatosActualizacion(id_gestion){

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.136.43/dynamic/"+id_gestion, requestOptions)
    .then((response)=> response.json())
    .then((json)=> json.forEach(completarFormulario))
    .then((result)=> console.log(result))
    .catch((error)=> console.error(error));
}

function completarFormulario(element, index, arr){
  var id_gestion = element.id_gestion;
  var nombres_usuario = element.nombres_usuario;
  var apellidos_usuario = element.apellidos_usuario;
  var nombres_cliente = element.nombres_cliente;
  var apellidos_cliente = element.apellidos_cliente;
  var nombre_resultado = element.nombre_resultado;
  var nombre_tipo_resultado = element.nombre_tipo_resultado;
  var comentarios = element.comentarios;
  var fecha_registro = element.fecha_registro;

  document.getElementById("txt_id_gestion").value = id_gestion;
  document.getElementById("txt_nombres_usuario").value = nombres_usuario;
  document.getElementById("txt_apellidos_usuario").value = apellidos_usuario;
  document.getElementById("txt_nombres_cliente").value = nombres_cliente;
  document.getElementById("txt_apellidos_cliente").value = apellidos_cliente;
  document.getElementById("txt_resultados").value = nombre_resultado;
  document.getElementById("txt_tipo_gestion").value = nombre_tipo_resultado;
  document.getElementById("txt_comentarios").value = comentarios;
  document.getElementById("txt_fecha_registro").value = fecha_registro;
}

function eliminarGestion(){
  const requestOptions = {
    method: "DELETE",
    redirect: "follow"
  };

  fetch("http://144.126.136.43/dynamic/" + g_id_gestion, requestOptions)
    .then((response)=> {
      if(response.status == 200){
        //redireccionamos a la lista de gestion
        window.location.href = "listar.html";
      }
    })
}


function obtenerIdEliminacion(){

  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_gestion = parametros.get("id");
  g_id_gestion = p_id_gestion;

  obtenerDatosEliminacion(p_id_gestion);
}

function obtenerDatosEliminacion(id_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.136.43/dynamic/"+ id_gestion, requestOptions)
    .them((response)=> response.json())
    .then((json)=> json.forEach(completarEtiqueta))
    .then((result)=> console.log(result))
    .catch((error)=> console.error(error));
}


function completarEtiqueta(element, index, arr){

  //falta completar
}