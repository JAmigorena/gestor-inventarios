import { guardarInventario, consultarInventario, mostrarMensaje, agregarProducto, actualizarProducto, actualizarPrecioProducto, calcularValorInventario, eliminarProducto, vaciarInventario } from './gestorInventario.js';

// Mostrar el inventario al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    consultarInventario();
// Asignar eventos a los botones después de cargar el DOM
    document.getElementById('agregarProductoBtn').addEventListener('click', agregarProducto);
    document.getElementById('actualizarCantidadBtn').addEventListener('click', actualizarProducto);
    document.getElementById('actualizarPrecioBtn').addEventListener('click', actualizarPrecioProducto);
    document.getElementById('consultarInventarioBtn').addEventListener('click', consultarInventario);
    document.getElementById('calcularValorInventarioBtn').addEventListener('click', calcularValorInventario);
    document.getElementById('vaciarInventarioBtn').addEventListener('click', vaciarInventario);
});

