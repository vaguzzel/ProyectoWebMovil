
const ProductModel = require('../models/productModel');

const ProductController = {
  create: (req, res) => {
    // 1. Separar los datos del producto de sus ofertas
    const { ofertas, ...productData } = req.body;

    // Validar que los datos básicos existan
    if (!productData.nombre || !productData.marca_id || !productData.categoria_id) {
      return res.status(400).json({ message: 'Nombre, marca y categoría son requeridos.' });
    }

    // 2. Llamar al nuevo método del modelo que maneja la transacción
    ProductModel.createWithOffers(productData, ofertas, (err, result) => {
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
    ProductModel.update(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar el producto.', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado.' });
      res.json({ message: 'Producto actualizado.' });
    });
  },

  delete: (req, res) => {
    ProductModel.delete(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al eliminar el producto.', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado.' });
      res.status(204).send();
    });
  }
};

module.exports = ProductController;