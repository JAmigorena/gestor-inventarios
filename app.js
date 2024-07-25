// Inicializa el inventario desde localStorage o crea un nuevo array vacío.
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

// Función para guardar el inventario en localStorage.
function guardarInventario() {
  localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Función para mostrar mensajes en el DOM.
function mostrarMensaje(mensaje, tipo = 'info') {
  const mensajesDiv = document.getElementById('mensajes');
  const mensajeDiv = document.createElement('div');
  mensajeDiv.className = tipo;
  mensajeDiv.textContent = mensaje;
  mensajesDiv.appendChild(mensajeDiv);
  setTimeout(() => {
    mensajeDiv.remove();
  }, 3000);
}

// Función para agregar un nuevo producto al inventario.
function agregarProducto() {
  const nombre = document.getElementById('nombre').value;
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const precio = parseFloat(document.getElementById('precio').value);

  if (nombre && cantidad && precio) {
    inventario.push({ nombre, cantidad, precio });
    guardarInventario();
    mostrarMensaje(`Producto ${nombre} agregado al inventario.`);
    consultarInventario();
  } else {
    mostrarMensaje('Por favor, completa todos los campos.', 'error');
  }
}

// Función para actualizar la cantidad de un producto en el inventario.
function actualizarProducto() {
  const nombre = document.getElementById('nombreActualizarCantidad').value;
  const nuevaCantidad = parseInt(document.getElementById('nuevaCantidad').value);

  if (nombre && nuevaCantidad) {
    const producto = inventario.find(producto => producto.nombre === nombre);
    if (producto) {
      producto.cantidad = nuevaCantidad;
      guardarInventario();
      mostrarMensaje(`Cantidad del producto ${nombre} actualizada.`);
      consultarInventario();
    } else {
      mostrarMensaje(`Producto ${nombre} no encontrado.`, 'error');
    }
  } else {
    mostrarMensaje('Por favor, completa todos los campos.', 'error');
  }
}

// Función para actualizar el precio de un producto en el inventario.
function actualizarPrecioProducto() {
  const nombre = document.getElementById('nombreActualizarPrecio').value;
  const nuevoPrecio = parseFloat(document.getElementById('nuevoPrecio').value);

  if (nombre && nuevoPrecio) {
    const producto = inventario.find(producto => producto.nombre === nombre);
    if (producto) {
      producto.precio = nuevoPrecio;
      guardarInventario();
      mostrarMensaje(`Precio del producto ${nombre} actualizado.`);
      consultarInventario();
    } else {
      mostrarMensaje(`Producto ${nombre} no encontrado.`, 'error');
    }
  } else {
    mostrarMensaje('Por favor, completa todos los campos.', 'error');
  }
}

// Función para consultar y mostrar en la web todos los productos del inventario.
function consultarInventario() {
  const inventarioDiv = document.getElementById('inventario');
  inventarioDiv.innerHTML = '<h2>Inventario</h2>';

  if (inventario.length === 0) {
    inventarioDiv.innerHTML += '<p>No hay productos en el inventario.</p>';
  } else {
    inventario.forEach(producto => {
      const productoDiv = document.createElement('div');
      productoDiv.innerHTML = `Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: ${producto.precio}`;
      inventarioDiv.appendChild(productoDiv);
    });
  }
}

// Función para calcular y mostrar el valor total del inventario.
function calcularValorInventario() {
  let valorTotal = 0;
  for (let i = 0; i < inventario.length; i++) {
    valorTotal += inventario[i].cantidad * inventario[i].precio;
  }
  mostrarMensaje(`El valor total del inventario es $${valorTotal}.`);
}

// Asignar eventos a los botones.
document.getElementById('agregarProductoBtn').addEventListener('click', agregarProducto);
document.getElementById('actualizarCantidadBtn').addEventListener('click', actualizarProducto);
document.getElementById('actualizarPrecioBtn').addEventListener('click', actualizarPrecioProducto);
document.getElementById('consultarInventarioBtn').addEventListener('click', consultarInventario);
document.getElementById('calcularValorInventarioBtn').addEventListener('click', calcularValorInventario);

// Mostrar el inventario al cargar la página.
consultarInventario();
