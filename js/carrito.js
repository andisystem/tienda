let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    Swal.fire({
        title: 'Ingresa tus datos',
        html:
            '<input id="name" class="swal2-input" placeholder="Nombre y Apellido" required="required">' +
            '<input id="phone" class="swal2-input" placeholder="Número de teléfono" required="required">' +
            '<input id="email" class="swal2-input" placeholder="Correo electrónico" required="required">' +
            '<input id="company" class="swal2-input" placeholder="Ciudad" required="required">' +
            '<input id="profession" class="swal2-input" placeholder="País" required="required">',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
            // Recopila los valores ingresados por el usuario
            const nombre = document.getElementById('name').value;
            const telefono = document.getElementById('phone').value;
            const correo = document.getElementById('email').value;
            const ciudad = document.getElementById('company').value;
            const pais = document.getElementById('profession').value;
            const total = document.getElementById('total').innerText;

            // Obtener los productos del carrito de compra
            const carrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

            // Puedes realizar acciones con los datos ingresados aquí
            console.log('Nombre: ' + nombre);
            console.log('Teléfono: ' + telefono);
            console.log('Correo: ' + correo);
            console.log('Ciudad: ' + ciudad);
            console.log('País: ' + pais);

            // Construir el cuerpo del correo electrónico
            let body = `Nombre: ${nombre}\n`;
            body += `Teléfono: ${telefono}\n`;
            body += `Correo electrónico: ${correo}\n`;
            body += `Ciudad: ${ciudad}\n`;
            body += `País: ${pais}\n\n`;
            body += "Productos:\n";
            carrito.forEach((item) => {
                body += `- ${item.titulo} (Cantidad: ${item.cantidad}, Subtotal: ${item.precio}, Total: ${item.precio * item.cantidad})\n`;
            });
            body += `Valor Total: $ ${total}\n`;


            // Construir el cuerpo del correo de confirmación al cliente
            let confirmacionBody = `Gracias por su compra, ${nombre}.\n`;
            confirmacionBody += 'Hemos recibido sus datos y procesaremos su compra con éxito.\n';
            // Puedes personalizar el mensaje de confirmación según tus necesidades.
            confirmacionBody += 'Confirmo el pedido:\n';
            confirmacionBody += `Nombre: ${nombre}\n`;
            confirmacionBody += `Teléfono: ${telefono}\n`;
            confirmacionBody += `Correo electrónico: ${correo}\n`;
            confirmacionBody += `Ciudad: ${ciudad}\n`;
            confirmacionBody += `País: ${pais}\n\n`;
            confirmacionBody += "Productos:\n";
            carrito.forEach((item) => {
                confirmacionBody += `- ${item.titulo} (Cantidad: ${item.cantidad}, Subtotal: ${item.precio}, Total: ${item.precio * item.cantidad})\n`;
            });
            confirmacionBody += `Valor Total: $ ${total}\n`;

            // Validación: Verifica que los campos obligatorios estén completos
            if (!nombre || !telefono || !correo || !ciudad || !pais) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
            }else{


            // Configurar el servicio de EmailJS
            emailjs.init("dE5hbDtP0q7v-chkh");

            // Enviar el correo electrónico
            emailjs.send("default_service", "template_9wtvduj", {
                to_name: "Andrés Rodríguez",
                to_email: "andisystemcolombia@gmail.com",
                from_name: nombre,
                from_email: correo,
                message: body,
            });
            // Enviar el correo al cliente
            emailjs.send("default_service", "template_9wtvduj", {
                to_name: nombre,
                to_email: correo,
                from_name: "Andisystem",
                from_email: "andisystemcolombia@gmail.com",
                message: confirmacionBody,
            }).then((response) => {
                if (response.status === 200) {
                    // Envío exitoso, muestra una notificación
                    Swal.fire('¡Compra exitosa!', 'Se ha enviado un correo de confirmación.', 'success');
                } else {
                    // Error en el envío, muestra una notificación de error
                    Swal.fire('Error al enviar el correo', 'Por favor, inténtalo de nuevo más tarde.', 'error');
                }
            });


            }

            



        }
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");
        }
    });
}