const RegUsuarios = JSON.parse(localStorage.getItem("RegUsuarios"));

let divv = document.getElementById("div1");

divv.innerHTML= ` <b class="colorText">Nombre: ${RegUsuarios[0].nombre} </b> <br>
<b class="colorText">Apelido: ${RegUsuarios[0].apellido} </b> <br>
<b class="colorText">Email: ${RegUsuarios[0].mail} </b>`