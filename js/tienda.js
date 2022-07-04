const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCrd = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const frag = document.createDocumentFragment();
let carrito = {};

document.addEventListener('DOMContentLoaded', ()=>{
    datosFetch();
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        printCarrito()
    }
});
cards.addEventListener('click', e =>{
    addToCarrito(e)
})

items.addEventListener('click', e => {
    btnAction(e)
})

const datosFetch = async () => {
    try {
        const res = await fetch('http://127.0.0.1:5500/data/api.json');
        const data = await res.json();
        printCards(data);
    } catch (error) {
        console.log(error)
    }
}

const printCards = data =>{
    data.forEach(producto => {
        templateCrd.querySelector('h5').textContent = producto.title;
        templateCrd.querySelector('p').textContent = producto.precio;
        templateCrd.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCrd.querySelector('.btn-dark').dataset.id= producto.id;
        const clonar = templateCrd.cloneNode(true)
        frag.appendChild(clonar)
    });
    cards.appendChild(frag);
}

const addToCarrito = e =>{
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation()
    AlertaCarrito()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto};
    printCarrito()
}

const printCarrito = () => {
    //console.log(carrito)
    items.innerHTML = '';
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

        const clone = templateCarrito.cloneNode(true);
        frag.appendChild(clone);
    })
    items.appendChild(frag);

    PrintFooter();

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const PrintFooter = () =>{
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0);
    
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);

    frag.appendChild(clone);
    footer.appendChild(frag);

    const btnEliminar = document.getElementById('vaciar-carrito')
    btnEliminar.addEventListener('click', () => {
        carrito= {}; 
        printCarrito()
    });
}

const btnAction = e =>{
    //Aumentar
    if(e.target.classList.contains('btn-info')){
        console.log(carrito[e.target.dataset.id])
        
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        printCarrito()
    }
    //Disminir 
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }

        printCarrito()
    }
    e.stopPropagation()
}

function AlertaCarrito(){
    Toastify({
        text: "Agregado al carrito",
        duation: 4000 ,
        gravity: 'center',
        position:'center',
        style:{ background: '#212529' }
    }).showToast();
}
