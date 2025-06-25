## Proyecto Final - Entrega Final 
### Ingeniería Web y móvil.
**Integrantes:** 
- Ulysses Barreto 21.615.085-6
- Isidora Cisternas 21.592.319-3
- Rodolfo Fernández 21.152.619-K
- Valentina Guzmán   21.268.525-9
- Matías Reyes 21.137.472-1

  
**Carrera:** Ingeniería Civil Informática  
**Fecha de entrega:** 21/04/2025

---

### Cómo ejecutar el proyecto
Debes tener el node.js instalado

1. Clona este repositorio o descarga el `.zip`.
2. En la raíz del proyecto, ejecuta:

```bash
npm install
ionic serve
```
Para ejecutar el BackEnd

- Prerrequisitos:
  - Tener un gestor de base de datos MySQL en funcionamiento (se recomienda usar XAMPP).
  - Tener Node.js instalado.

Pasos:
1. Iniciar MySQL: Abre XAMPP y asegúrate de que el servicio de MySQL esté iniciado.

2. Crear la Base de Datos:
   - Ve a tu gestor de base de datos (ej. http://localhost/phpmyadmin).
   - Crea una nueva base de datos con el nombre exacto: look_4_beauty.
     
3. Crear las Tablas:
   - Selecciona la base de datos look_4_beauty.
   - Ve a la pestaña "SQL".
   - Copia todo el contenido del archivo backend/schema.sql y pégalo en el cuadro de texto.
   - Ejecuta el script. Esto creará todas las tablas, pero las dejará vacías.
   - 
4. Instalar Dependencias y Poblar la Base de Datos:
   - Abre una terminal y navega hasta la carpeta backend del proyecto.
     ```bash
     cd backend
     ```
   - Instala todas las dependencias del servidor:
     ```bash
     npm install
     ```
   - Ejecuta el script de "siembra" para llenar las tablas con los datos de prueba (productos, categorías, etc.):
     ```bash
     npm run seed
     ```

5. Iniciar el Servidor del Backend:
   - En la misma terminal (dentro de la carpeta backend), inicia el servidor:
     ```bash
     npm start
     ```
     
   - Si todo sale bien, verás un mensaje que dice "Servidor de Node.js escuchando en http://localhost:5000". Deja esta terminal abierta.
    
Creación de un Usuario Administrador 

Actualmente, el rol de administrador se asigna manualmente directamente en la base de datos, siendo esta la forma de añadir o eliminar marcas, categorias o productos.

Pasos:

    Crear una cuenta de usuario normal: Primero, utiliza la interfaz de la aplicación para registrar un nuevo usuario a través del formulario "Crear cuenta".

    Acceder a la Base de Datos.

    Ubicar al Usuario:

        Selecciona la base de datos look_4_beauty.

        Abrir la tabla usuarios.

        Buscar la fila correspondiente al usuario que se acaba de registrar. 

    Modificar el Rol:

        Hacer "Click" en editar.

        Buscar la columna llamada rol.

        Cambiar el valor de 'usuario' a 'admin'.

        Guardar los cambios.

Una vez completados estos pasos, la próxima vez que se inicie sesión con ese usuario, tendrá permisos de administrador.
---
# Sistema de comparación de precios de mercado de productos de maquillaje

## Resumen del Proyecto
Look4Beauty es una aplicación web diseñada para centralizar y simplificar la comparación de precios de maquillaje online. Su objetivo fundamental es mitigar la necesidad del consumidor de visitar múltiples sitios de comercios online para encontrar el mejor precio. El sistema permite a los usuarios buscar artículos de maquillaje por nombre, marca, categoría o precio, aplicar filtros personalizables (color, tiendas específicas, tipo de producto, etc) y visualizar una comparativa de precios del mismo producto ofrecido por distintos vendedores online, con enlaces directos a las páginas correspondientes. La aplicación contempla una interfaz responsiva para asegurar la usabilidad en dispositivos móviles y de escritorio.

---

### Descripción del Proyecto

Este proyecto corresponde a la primera entrega parcial del Proyecto Final. Se trata de una aplicación en desarrollo en **Ionic + Angular**.

El proyecto tiene como objetivo diseñar y simular una plataforma web para la comparación de precios de productos cosméticos entre diversas tiendas online, tomando como modelo de referencia la funcionalidad de 'solotodo.cl'.

El diseño en figma de esta entrega incluye casi la totalidad de la navegación prevista para la página, incluyendo: 

Para Desktop y móvil:

- **Inicio**
- **Crear cuenta**
- **Iniciar sesión**
- **Categoría labiales**
- **Vista Producto**
- **Mi Perfil- Perfil**
- **Mi Perfil- Lista de deseos**

Todo esto también incluye la interactividad, integrando además un carrusel en la vista de productos del inicio
y menú mega dropdown para las categorías y para marcas (se pueden encontrar interacciones así en gran parte del prototipo). 


La app (programada) en esta entrega incluye una interfaz para visualizar:
- **Inicio**
- **Mi perfil**
- **Iniciar sesión**
- **Mi lista de deseos**
- **Crear cuenta**

---

## Requerimientos

### Roles del Sistema
- **Sistema**: Automatización de funciones.
- **Administrador**: Control total sobre el sistema.
- **Usuario**: Puede ver información detallada de productos y agregar comentarios.

### Requerimientos Funcionales por Rol


#### Rol-Sistema
- **RF-SIS-01**: El sistema compara los precios del producto respectivo.
- **RF-SIS-02**: El sistema destaca el precio más bajo encontrado del producto respectivo.


#### Rol-Administrador
- **RF-ADM-01**: El administrador puede añadir productos.
- **RF-ADM-02**: El administrador puede editar cualquier producto existente.
- **RF-ADM-03**: El administrador puede eliminar productos que hayan sido descontinuados.

#### Rol-Usuario
- **RF-US-01**: El usuario puede acceder a la lista de productos y sus detalles.
- **RF-US-02**: El usuario puede utilizar la función de búsqueda.
- **RF-US-03**: El usuario puede marcar productos como deseados y estos son agregados a su wishlist.
- **RF-US-04**: El usuario puede acceder a su página de perfil y modificar detalles de su cuenta.
- **RF-US-05**: El usuario puede acceder a las categorías de productos más globales.

### Requerimientos No Funcionales

- **RNF-01: Tiempo de respuesta**
  - El sistema debe responder a operaciones clave (registro, edición, búsqueda) en menos de **2 segundos** en el 95% de los casos.
- **RNF-02: Seguridad**
  - Solo usuarios autenticados pueden ingresar al sistema.
  - Los roles deben restringir el acceso a funciones según permisos (Administrador, Editor, Visualizador).
  - Acceso protegido por HTTPS y almacenamiento seguro de contraseñas.
- **RNF-03: Usabilidad**
  - La interfaz debe ser intuitiva y fácil de usar.
  - Compatible con pantallas móviles y escritorio (responsive design).
- **RNF-04: Compatibilidad**
  - Compatible con los navegadores:
    - Google Chrome
    - Mozilla Firefox
    - Microsoft Edge
    - Safari
    - Opera
- **RNF-05: Escalabilidad**
  - El sistema debe ser capaz de manejar más de **500 productos** sin pérdida notable de rendimiento. 

---

## Arquitectura de la Información
[Estructura de Navegación](https://whimsical.com/look4beauty-RssnWPKSDMGrXbKVyYxjRJ)

**Para más detalle, revisar figma con detenimiento por favor.**

---

## Prototipo de diseño
[Figma - Sistema de comparación de precios de productos cosméticos entre tiendas online](https://www.figma.com/design/nCRlDbV7I8EhWRFFZQ6kzM/Look4Beauty?node-id=53-782&t=ZXB8Zn80NEDQ9Dsx-1)

---

## Librerías usadas con Angular
- Ionic Framework
- Swiper.js (swiper)
- Librerías del Núcleo de Angular (Angular Core, common, forms, router, platform-browse)
- RxJS (Reactive Extensions for JavaScript)
---

## Tecnologías
- **Ionic Framework**
- **Angular** 
- **TypeScript**
- **JavaScript**
- **HTML** 
- **CSS** 
- **SVG (Scalable Vector Graphics)**
- **Angular Router**

---
