// URL base de la API 
const API_URL= 'http://localhost:4000/productos';

// Función para mostrar el formulario
function formularioProducto(){
    document.getElementById('formularioNuevo').style.display='block'
}

// Función para crear un nuevo producto en la base de datos
function crearProducto() {
    // Obtener los valores del formulario
    const nombre =document.getElementById('producto').value;
    const precio =document.getElementById('precio').value;
    const cantidad =document.getElementById('cantidad').value;

    // Crear petición HTTP POST
    const xhr =new XMLHttpRequest();
    xhr.open('POST',API_URL,true);
    xhr.setRequestHeader('Content-Type','application/json');
     
    // Manejar la respuesta del servidor
    xhr.onload=function(){
        alert('Producto creado')
        verInventario(); // Actualizar el inventario
    };
    
    // Enviar los datos como JSON 
    xhr.send(JSON.stringify({
        nombre,
        precio,
        cantidad
    }))
}
// Función para ver el inventario completo
function verInventario(){
    // Crear petición HTTP GET
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL, true);

    xhr.onload = function () {
        // Convertir la respuesta JSON a objeto JavaScript
        const productos = JSON.parse(xhr.responseText);
    
        // Crear tabla HTML con los productos
        let html='<table border ="2"><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Acciones</th></tr>';
        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];

            html += '<tr>' +
                '<td>' + p.nombre + '</td>' +
                '<td>' + p.precio + '</td>' +
                '<td>' + p.cantidad + '</td>' +
                '<td>' +
                        '<button onclick="mostrarActualizar(\'' + p._id + '\', \'' + p.nombre + '\', ' + p.precio + ', ' + p.cantidad + ')">Actualizar</button>' +
                    '<button onclick="eliminarProducto(\'' + p._id + '\')">Eliminar</button>' +
                '</td>' +
            '</tr>';
        }

        html += '</table>';
        // Mostrar la tabla en el div inventario
        document.getElementById('inventario').innerHTML = html;
    };

    xhr.send();
}

// Función para mostrar el formulario de actualización con datos del producto
function mostrarActualizar(id, nombre, precio, cantidad) {
    // Crear HTML del formulario con los valores actuales
    const form =
        '<div>' +
            '<h3>Actualizar producto</h3>' +
            "<input id='updNombre' value='" + nombre + "'>" +
            "<input id='updPrecio' type='number' value='" + precio + "'>" +
            "<input id='updCantidad' type='number' value='" + cantidad + "'>" +
            "<button onclick=\"actualizarProducto('" + id + "')\">Guardar cambios</button>" +
        '</div>';

    // Mostrar el formulario en el div inventario
    document.getElementById('inventario').innerHTML = form;
}

// Función para actualizar un producto 
function actualizarProducto(id) {
    // Obtener los nuevos valores del formulario
    const nombre = document.getElementById('updNombre').value;
    const precio = document.getElementById('updPrecio').value;
    const cantidad = document.getElementById('updCantidad').value;

    // Crear petición HTTP PUT
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', API_URL + '/' + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        alert('Producto actualizado');
        verInventario(); // Actualizar el inventario
    };

    // Enviar los datos actualizados como JSON
    xhr.send(JSON.stringify({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    }));
}

// Función para eliminar 
function eliminarProducto(id) {
    // Crear petición HTTP DELETE
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', API_URL + '/' + id, true);

    xhr.onload = function () {
        alert('Producto eliminado');
        verInventario(); // Actualizar el inventario
    };

    xhr.send();
}
