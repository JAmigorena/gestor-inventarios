// Declaración de un array vacío para almacenar los productos.
const inventario = [];

// Función para agregar un nuevo producto al inventario.
function agregarProducto() {
  // Pide al usuario que ingrese el nombre del producto.
  const nombre = prompt("Ingrese el nombre del producto:");
  // Pide al usuario que ingrese la cantidad del producto.
  const cantidad = parseInt(prompt("Ingrese la cantidad del producto:"));
  // Pide al usuario que ingrese el precio del producto.
  const precio = parseFloat(prompt("Ingrese el precio del producto:"));
  // Agrega un objeto con las propiedades nombre, cantidad y precio al array de inventario.
  inventario.push({ nombre, cantidad, precio });
  // Muestra una alerta indicando que el producto ha sido agregado.
  alert(`Producto ${nombre} agregado al inventario.`);
}

// Función para actualizar la cantidad de un producto en el inventario.
function actualizarProducto() {
  // Pide al usuario que ingrese el nombre del producto que desea actualizar.
  const nombre = prompt("Ingrese el nombre del producto que desea actualizar:");
  // Pide al usuario que ingrese la nueva cantidad del producto.
  const nuevaCantidad = parseInt(prompt("Ingrese la nueva cantidad del producto:"));
  // Busca el producto en el array de inventario.
  const producto = inventario.find(producto => producto.nombre === nombre);
  // Si el producto existe, actualiza su cantidad.
  if (producto) {
    producto.cantidad = nuevaCantidad;
    // Muestra una alerta indicando que la cantidad ha sido actualizada.
    alert(`Cantidad del producto ${nombre} actualizada.`);
  } else {
    // Muestra una alerta indicando que el producto no se encontró.
    alert(`Producto ${nombre} no encontrado.`);
  }
}

// Función para actualizar el precio de un producto en el inventario.
function actualizarPrecioProducto() {
  // Pide al usuario que ingrese el nombre del producto cuyo precio desea actualizar.
  const nombre = prompt("Ingrese el nombre del producto cuyo precio desea actualizar:");
  // Pide al usuario que ingrese el nuevo precio del producto.
  const nuevoPrecio = parseFloat(prompt("Ingrese el nuevo precio del producto:"));
  // Busca el producto en el array de inventario.
  const producto = inventario.find(producto => producto.nombre === nombre);
  // Si el producto existe, actualiza su precio.
  if (producto) {
    producto.precio = nuevoPrecio;
    // Muestra una alerta indicando que el precio ha sido actualizado.
    alert(`Precio del producto ${nombre} actualizado.`);
  } else {
    // Muestra una alerta indicando que el producto no se encontró.
    alert(`Producto ${nombre} no encontrado.`);
  }
}

// Función para consultar y mostrar en la consola todos los productos del inventario.
function consultarInventario() {
  // Muestra un mensaje en la consola indicando el inicio de la lista de productos.
  console.log("Inventario de productos:");
  // Recorre cada producto en el array y muestra sus detalles en la consola.
  inventario.forEach(producto => {
    console.log(`Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: ${producto.precio}`);
  });
}

// Función para calcular y mostrar el valor total del inventario.
function calcularValorInventario() {
  let valorTotal = 0;
  // Recorre cada producto en el array y suma su valor total (cantidad * precio) al valor total.
  for (let i = 0; i < inventario.length; i++) {
    valorTotal += inventario[i].cantidad * inventario[i].precio;
  }
  // Muestra el valor total del inventario en una alerta.
  alert(`El valor total del inventario es $${valorTotal}.`);
  console.log(`El valor total del inventario es $${valorTotal}.`);
}

// Menú interactivo para que el usuario elija una acción.
function menu() {
  let opcion = "";
  do {
    opcion = prompt("Seleccione una opción:\n1. Agregar producto\n2. Actualizar cantidad de producto\n3. Actualizar precio de producto\n4. Consultar inventario\n5. Calcular valor del inventario\n6. Salir");
    switch (opcion) {
      case "1":
        agregarProducto();
        break;
      case "2":
        actualizarProducto();
        break;
      case "3":
        actualizarPrecioProducto();
        break;
      case "4":
        consultarInventario();
        break;
      case "5":
        calcularValorInventario();
        break;
      case "6":
        alert("Saliendo del sistema.");
        break;
      default:
        alert("Opción no válida. Intente nuevamente.");
    }
  } while (opcion !== "6");
}

// Iniciar el menú interactivo.
menu();
