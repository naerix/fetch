///////////////////////////////////registro de usuario///////////////////////////////////////
class Usuarios{
    constructor(nombre,apellido,usuario,mail,contraseña){
        this.nombre=nombre;
        this.apellido=apellido;
        this.usuario=usuario;
        this.mail=mail;
        this.contraseña=contraseña;
    }
}

const UsuariosRegistrados = [];


function registro(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let usuario = document.getElementById("usuario").value;
    let mail = document.getElementById("mail").value;
    let contraseña = document.getElementById("contraseña").value;

    const userReg = new Usuarios(nombre,apellido,usuario,mail,contraseña);

    UsuariosRegistrados.push(userReg);

    localStorage.setItem("RegUsuarios",JSON.stringify(UsuariosRegistrados));

    alerta();
}

const btnReg = document.getElementById("reg");



btnReg.addEventListener("click", () =>{
    event.preventDefault();
    registro();
})


function alerta(){
    Swal.fire({
        title: 'Registro Exitoso!',
        text: 'Por favor inicie sesion',
        incon: 'sucess',
        confirmButtonText: 'Iniciar Sesion',
        cancelButtonText: 'Cancelar',
        showCancelButton: true
    }).then((result)=>{
        if(result.isConfirmed){
            window.location="login.html"
        }
        else{
            window.location="../index.html"
        }
    })
}



const tienda = documen.getElementById("tienda");

tienda.addEventListener('click', ()=> {
    pedirRe()
})

function pedirRe(){
    alrt()
}
function alrt(){
    Swal.fire({
        title: 'Para ingresar a la tienda debe Registrase',
        text: 'por favor registrese o inicie sesion',
        incon: 'sucess',
        confirmButtonText: 'ok',
        cancelButtonText: 'Cancelar',
        showCancelButton: true
    }).then((result)=>{
        if(result.isConfirmed){
            window.location="pages/signup.html"
        }
        else{
            window.location="index.html"
        }
    })
}