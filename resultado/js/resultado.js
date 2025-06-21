
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
