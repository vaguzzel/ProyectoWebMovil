
const ProductModel = require('../models/productModel');

const ProductController = {
  create: (req, res) => {
    // 1. Separar los datos del producto de sus ofertas
    const { ofertas, ...productData } = req.body;

    if (req.file) {
      // Si se subió una imagen, asignamos su URL al producto
      // Ej: 'images/image-1679603387794-293257803.png'
      productData.image_url = 'images/' + req.file.filename;
    } else if (!productData.image_url) {
      // Opcional: Asignar una imagen por defecto si no se sube ninguna
      productData.image_url = 'images/placeholder-product.jpg';
    }

    let parsedOffers = [];
    try {
      // Intentamos parsear las ofertas, asumiendo que vienen como un string JSON
      if (ofertas && typeof ofertas === 'string') {
        parsedOffers = JSON.parse(ofertas);
      } else if (Array.isArray(ofertas)) {
        // Si ya es un array, lo usamos directamente
        parsedOffers = ofertas;
      }
    } catch (e) {
      console.error("Error al parsear las ofertas:", e);
      return res.status(400).json({ message: 'El formato de las ofertas es inválido.' });
    }

    // Validar que los datos básicos existan
    if (!productData.nombre || !productData.marca_id || !productData.categoria_id) {
      return res.status(400).json({ message: 'Nombre, marca y categoría son requeridos.' });
    }

    // 2. Llamar al nuevo método del modelo que maneja la transacción
    ProductModel.createWithOffers(productData, parsedOffers, (err, result) => {
      if (err) {
        console.error("Error en transacción:", err);
        return res.status(500).json({ message: 'Error al crear el producto.', error: err });
      }
      res.status(201).json({ message: 'Producto y sus precios creados exitosamente.', productId: result.insertId });
    });
  },

  getAll: (req, res) => {
    ProductModel.getAll((err, products) => {
      if (err) return res.status(500).json({ message: 'Error al obtener los productos.', error: err });
      res.json(products);
    });
  },

  getById: (req, res) => {
    const productId = req.params.id;

    // 1. Primero, obtenemos los detalles del producto.
    ProductModel.getById(productId, (err, products) => {
      if (err) {
        // Logueamos el error para depuración en el servidor
        console.error("Error en getById (product):", err);
        return res.status(500).json({ message: 'Error al obtener el producto.', error: err });
      }

      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }

      const product = products[0];

      // 2. Luego, obtenemos sus ofertas de precios.
      ProductModel.getOffersByProductId(productId, (err, offers) => {
        if (err) {
            // Logueamos el error para depuración en el servidor
            console.error("Error en getOffersByProductId:", err);
            return res.status(500).json({ message: 'Error al obtener las ofertas del producto.', error: err });
        }

        // 3. Combinamos los resultados y los enviamos como una sola respuesta.
        product.ofertas = offers; // Añadimos el array de ofertas al objeto del producto
        res.json(product);
      });
    });
  },

  update: (req, res) => {
    const productId = req.params.id;
    const { ofertas, ...productData } = req.body;

    // Verificar si se está subiendo una nueva imagen
    if (req.file) {
      productData.image_url = 'images/' + req.file.filename;
    }

    // El array de ofertas puede venir como string JSON desde un form-data, o como array
    let parsedOffers = [];
    try {
        if (ofertas && typeof ofertas === 'string') {
            parsedOffers = JSON.parse(ofertas);
        } else if (Array.isArray(ofertas)) {
            parsedOffers = ofertas;
        }
    } catch (e) {
        console.error("Error al parsear las ofertas en la actualización:", e);
        return res.status(400).json({ message: 'El formato de las ofertas es inválido.' });
    }

    ProductModel.updateWithOffers(productId, productData, parsedOffers, (err, result) => {
      if (err) {
        // El modelo ya loguea el error específico, aquí solo enviamos la respuesta
        return res.status(500).json({ message: 'Error al actualizar el producto.', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
      res.json({ message: 'Producto actualizado exitosamente.' });
    });
  },

  delete: (req, res) => {
    ProductModel.delete(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al eliminar el producto.', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado.' });
      res.status(204).send();
    });
  },

  buscarProductos: (req, res) => { // <-- Se quita el async
  const palabraClave = req.query.q;
  if (!palabraClave) {
    return res.status(400).json({ message: 'El parámetro de búsqueda "q" es requerido.' });
  }
  
  // Se llama al modelo con el estilo de callback
  ProductModel.buscarPorPalabraClave(palabraClave, (err, productosEncontrados) => {
    if (err) {
      console.error('Error en el controlador al buscar productos:', err);
      return res.status(500).json({ message: 'Error interno del servidor al buscar productos.' });
    }
    res.json(productosEncontrados);
  });
}
 

};

module.exports = ProductController;