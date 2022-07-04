const tienda = document.getElementById("tienda");

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