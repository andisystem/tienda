const inputQuantity = document.querySelector('.input-quantity');
const btnIncrement = document.querySelector('#increment');
const btnDecrement = document.querySelector('#decrement');

let valueByDefault = parseInt(inputQuantity.value);

// Funciones Click

btnIncrement.addEventListener('click', () => {
	valueByDefault += 1;
	inputQuantity.value = valueByDefault;
});

btnDecrement.addEventListener('click', () => {
	if (valueByDefault === 1) {
		return;
	}
	valueByDefault -= 1;
	inputQuantity.value = valueByDefault;
});

// Toggle
// Constantes Toggle Titles
const toggleDescription = document.querySelector(
	'.title-description'
);
const toggleAdditionalInformation = document.querySelector(
	'.title-additional-information'
);
const toggleReviews = document.querySelector('.title-reviews');

// Constantes Contenido Texto
const contentDescription = document.querySelector(
	'.text-description'
);
const contentAdditionalInformation = document.querySelector(
	'.text-additional-information'
);
const contentReviews = document.querySelector('.text-reviews');

// Funciones Toggle
toggleDescription.addEventListener('click', () => {
	contentDescription.classList.toggle('hidden');
});

toggleAdditionalInformation.addEventListener('click', () => {
	contentAdditionalInformation.classList.toggle('hidden');
});

toggleReviews.addEventListener('click', () => {
	contentReviews.classList.toggle('hidden');
});






document.addEventListener("DOMContentLoaded", () => {
    // Obtener el ID del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Buscar el producto correspondiente en el arreglo de productos
    const productoDetalle = productos.find((producto) => producto.id === productId);

    if (productoDetalle) {
        // Mostrar los detalles del producto en la página
        const detalleProducto = document.getElementById("detalle-producto");
        detalleProducto.innerHTML = `
            <h2>${productoDetalle.titulo}</h2>
            <img src="${productoDetalle.imagen}" alt="${productoDetalle.titulo}">
            <p>Precio: $${productoDetalle.precio}</p>
            <p>Descripción: ${productoDetalle.descripcion}</p>
            <label for="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" min="1" value="1">
            <button id="agregar-al-carrito">Agregar al carrito</button>
        `;

        // Agregar un evento de clic al botón de "Agregar al carrito"
        const botonAgregarCarrito = document.getElementById("agregar-al-carrito");
        botonAgregarCarrito.addEventListener("click", () => {
            const cantidad = parseInt(document.getElementById("cantidad").value);
            if (cantidad > 0) {
                // Agregar el producto al carrito
                agregarAlCarrito(productoDetalle, cantidad);
                alert("Producto agregado al carrito.");
            } else {
                alert("La cantidad debe ser mayor que 0.");
            }
        });
    } else {
        // Producto no encontrado, mostrar un mensaje de error
        const detalleProducto = document.getElementById("detalle-producto");
        detalleProducto.innerHTML = "<p>Producto no encontrado.</p>";
    }
});