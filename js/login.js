function login(){
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    const RegUsuarios = JSON.parse(localStorage.getItem("RegUsuarios"));

    for(let i = 0; i<RegUsuarios.length;i++){
        if(user === RegUsuarios[i].usuario && password === RegUsuarios[i].contraseña){
            alerta2()
            
        }

        else{
            alertainorrecta()
        }
    }
}

const iniciarsession = document.getElementById("login");

iniciarsession.addEventListener("click", () =>{
    event.preventDefault();
    login();
})


function alerta2(){
    Swal.fire({
        title: 'Has iniciado sesion corectamente!',
        incon: 'sucess',
    }).then((result)=>{
        if(result.isConfirmed){
            window.location="perfildeusuario.html"
        }
    })
}

function alertainorrecta(){
    Toastify({
        text: "Usuario o contraseña incorrectos",
        duation: 4000 ,
        gravity: 'center',
        position:'center',
        style:{ background: '#FE4949' }
    }).showToast();
}


function CargarJson(){
    
    fetch('../data/users.json')
    .then(response => response.json())
    .then( data => {
        console.log(data.nombre)
    })
    .catch( () => console.log('intente denuevo'))
    }
CargarJson();