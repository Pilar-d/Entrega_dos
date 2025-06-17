
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
  <td>${element.nombre_cliente}</td>
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