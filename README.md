## Proyecto Final - Entrega Parcial 1  
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

---

# Sistema de comparación de precios de mercado de productos de maquillaje

## Resumen del Proyecto
Look4Beauty es una aplicación web diseñada para centralizar y simplificar la comparación de precios de maquillaje online. Su objetivo fundamental es mitigar la necesidad del consumidor de visitar múltiples sitios de comercios online para encontrar el mejor precio. El sistema permite a los usuarios buscar artículos de maquillaje por nombre, marca, categoría o precio, aplicar filtros personalizables (color, tiendas específicas, tipo de producto, etc) y visualizar una comparativa de precios del mismo producto ofrecido por distintos vendedores online, con enlaces directos a las páginas correspondientes. La aplicación contempla una interfaz responsiva para asegurar la usabilidad en dispositivos móviles y de escritorio.

---

### Descripción del Proyecto

Este proyecto corresponde a la primera entrega parcial del Proyecto Final. Se trata de una aplicación en desarrollo en **Ionic + Angular**.

El proyecto tiene como objetivo diseñar y simular una plataforma web para la comparación de precios de productos cosméticos entre diversas tiendas online, tomando como modelo de referencia la funcionalidad de 'solotodo.cl'.

El diseño en figma de esta entrega incluye la navegación prevista para la página, incluyendo: 

Para Desktop y móvil:

- **Inicio**
- **Crear cuenta**
- **Iniciar sesión**
- **Categoría labiales**
- **Vista Producto**
- **Mi Perfil- Perfil**
- **Mi Perfil- Lista de deseos**

Todo esto también incluye la interactividad, integrando además un carrusel en la vista de productos del inicio 
y menú mega dropdown para las categorías y para marcas.


La app (programada) en esta entrega incluye una interfaz para visualizar:
- **Inicio**
- **Mi perfil**
- **Iniciar sesión**
- **Mi ista de deseos**
- **Crear cuenta**

---

## Requerimientos

### Roles del Sistema
- **Sistema**: Automatización de funciones.
- **Administrador**: Control total sobre el sistema.
- **Moderador**: Puede añadir, actualizar, eliminar productos y moderar comentarios.
- **Usuario**: Puede ver información detallada de productos y agregar comentarios.

### Requerimientos Funcionales por Rol


#### Rol-Sistema
- **RF-SIS-01**: El sistema compara los precios del producto respectivo.
- **RF-SIS-02**: El sistema destaca el precio más bajo encontrado del producto respectivo.


#### Rol-Administrador
- **RF-ADM-01**: El administrador puede añadir productos.
- **RF-ADM-02**: El administrador puede editar cualquier producto existente.
- **RF-ADM-03**: El administrador puede eliminar productos que hayan sido descontinuados.
- **RF-ADM-04**: El administrador puede configurar alertas de baja de precios.
- **RF-ADM-05**: El administrador puede configurar alertas de vuelta de stock.
- **RF-ADM-06**: El administrador puede ver y gestionar las cuentas de usuario.


#### Rol-Moderador
- **RF-MOD-01**: El moderador puede registrar nuevos productos ingresando:
  - Nombre
  - Código (ID único)
  - Categoría
  - Precio
  - Stock (entero positivo)
  - Descripción
- **RF-MOD-02**: El moderador puede editar productos existentes.
- **RF-MOD-03**: El moderador puede aplicar filtros y buscar productos por nombre, código, categoría, stock o precio.
- **RF-MOD-04**: El moderador puede eliminar o fijar comentarios en listas de comentarios de productos.
- **RF-MOD-05**: El moderador puede comentar en la sección de un producto para resolver dudas o dar recomendaciones a usuarios.

#### Rol-Usuario
- **RF-US-01**: El usuario puede acceder a la lista de productos y sus detalles.
- **RF-US-02**: El usuario puede utilizar la función de búsqueda y filtrado por nombre, marca, tipo, precio o palabras clave.
- **RF-US-03**: El usuario puede dar su opinión y calificación de un producto que compró y el lugar de donde lo compró.
- **RF-US-04**: El usuario puede marcar productos como deseados y estos son agregados a su wishlist.
- **RF-US-05**: El usuario puede acceder a su página de perfil y modificar detalles de su cuenta.
- **RF-US-06**: El usuario puede acceder a las categorías de productos más globales.
- **RF-US-07**: El usuario puede comentar en la sección de un producto para resolver dudas o dar recomendaciones.

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

---

## Prototipo de diseño
[Figma - Sistema de comparación de precios de productos cosméticos entre tiendas online](https://www.figma.com/design/nCRlDbV7I8EhWRFFZQ6kzM/Look4Beauty?node-id=53-782&t=ZXB8Zn80NEDQ9Dsx-1)

---

## Librerías usadas con Angular
- Ionic Framework
- Swiper.js (swiper)
- Angular Core
- Angular Common
- Angular Route
---

## Tecnologías
- **Ionic Framework** (v7+)
- **Angular** (v15+)
- **TypeScript**
- **Capacitor** (para plugins nativos, si aplica)
- **SASS** (para estilos)
- **RxJS** (para manejo reactivo)
- **Angular Router** (para navegación entre vistas)

---
