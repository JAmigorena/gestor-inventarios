export let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

// Función para guardar el inventario en localStorage.
export function guardarInventario() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Función para mostrar mensajes en el DOM.
export function mostrarMensaje(mensaje, tipo = 'info') {
    const mensajesDiv = document.getElementById('mensajes');
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = tipo;
    mensajeDiv.textContent = mensaje;
    mensajesDiv.appendChild(mensajeDiv);
    setTimeout(() => {
        mensajeDiv.remove();
    }, 5000);
}

// Función para agregar un nuevo producto al inventario.
export function agregarProducto() {
    try {
        const nombre = document.getElementById('nombre').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const precio = parseFloat(document.getElementById('precio').value);

// Validación de campos obligatorios y valores positivos.
        if (!nombre || cantidad <= 0 || precio <= 0) {
            throw new Error('Por favor, completa todos los campos con valores positivos.');
        }

// Verifica si el producto ya existe en el inventario.
        const productoExistente = inventario.find(producto => producto.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad += cantidad; // Sumar la cantidad si el producto ya existe
        } else {
            inventario.push({ nombre, cantidad, precio });
        }

        guardarInventario();
        mostrarMensaje(`Producto ${nombre} agregado al inventario.`);
        consultarInventario();
    } catch (error) {
        mostrarMensaje(error.message, 'error');
    }
}

// Función para actualizar la cantidad de un producto en el inventario.
export function actualizarProducto() {
    const nombre = document.getElementById('nombreActualizarCantidad').value;
    const nuevaCantidad = parseInt(document.getElementById('nuevaCantidad').value);

// Validación de campos obligatorios y valores positivos.
    if (!nombre || nuevaCantidad <= 0) {
        mostrarMensaje('Por favor, completa todos los campos con valores positivos.', 'error');
        return;
    }

    const producto = inventario.find(producto => producto.nombre === nombre);
    if (producto) {
        producto.cantidad = nuevaCantidad;
        guardarInventario();
        mostrarMensaje(`Cantidad del producto ${nombre} actualizada.`);
        consultarInventario();
    } else {
        mostrarMensaje(`Producto ${nombre} no encontrado.`, 'error');
    }
}

// Función para actualizar el precio de un producto en el inventario.
export function actualizarPrecioProducto() {
    const nombre = document.getElementById('nombreActualizarPrecio').value;
    const nuevoPrecio = parseFloat(document.getElementById('nuevoPrecio').value);

// Validación de campos obligatorios y valores positivos.
    if (!nombre || nuevoPrecio <= 0) {
        mostrarMensaje('Por favor, completa todos los campos con valores positivos.', 'error');
        return;
    }

    const producto = inventario.find(producto => producto.nombre === nombre);
    if (producto) {
        producto.precio = nuevoPrecio;
        guardarInventario();
        mostrarMensaje(`Precio del producto ${nombre} actualizado.`);
        consultarInventario();
    } else {
        mostrarMensaje(`Producto ${nombre} no encontrado.`, 'error');
    }
}

// Función para consultar y mostrar en la web todos los productos del inventario.
export function consultarInventario() {
    const inventarioDiv = document.getElementById('inventario');
    inventarioDiv.innerHTML = '<h2>Inventario</h2>';

    if (inventario.length === 0) {
        inventarioDiv.innerHTML += '<p>No hay productos en el inventario.</p>';
    } else {
        inventario.forEach((producto, index) => {
            const productoDiv = document.createElement('div');
            productoDiv.innerHTML = `Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: ${producto.precio}`;

// Botón para eliminar el producto.
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.onclick = () => eliminarProducto(index);

            productoDiv.appendChild(btnEliminar);
            inventarioDiv.appendChild(productoDiv);
        });
    }
}

// Función para calcular y mostrar el valor total del inventario.
export function calcularValorInventario() {
    let valorTotal = 0;
    for (let i = 0; i < inventario.length; i++) {
        valorTotal += inventario[i].cantidad * inventario[i].precio;
    }
    mostrarMensaje(`El valor total del inventario es $${valorTotal}.`);
}

// Función para eliminar un producto del inventario.
export function eliminarProducto(index) {
    const producto = inventario[index];
    inventario.splice(index, 1);
    guardarInventario();
    mostrarMensaje(`Producto ${producto.nombre} eliminado del inventario.`);
    consultarInventario();
}

// Función para vaciar el inventario.
export function vaciarInventario() {
    inventario = [];
    guardarInventario();
    mostrarMensaje('Inventario vaciado.');
    consultarInventario();
}

// Función para ordenar productos por precio usando Lodash
function ordenarProductosPorPrecio() {
    const productosOrdenados = _.orderBy(inventario, ['precio'], ['asc']);
    actualizarVistaInventario(productosOrdenados);
}

// Función para actualizar la vista del inventario
function actualizarVistaInventario(productos) {
    const contenedorInventario = document.getElementById('inventario');
    contenedorInventario.innerHTML = ''; // Limpiar la vista actual

    productos.forEach(producto => {
        const itemProducto = document.createElement('div');
        itemProducto.className = 'producto';
        itemProducto.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
        `;
        contenedorInventario.appendChild(itemProducto);
    });
}

// Llama a la función de ordenamiento al cargar el inventario
ordenarProductosPorPrecio();

