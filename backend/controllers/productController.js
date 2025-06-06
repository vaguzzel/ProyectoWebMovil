
const ProductModel = require('../models/productModel');

const ProductController = {
  create: (req, res) => {
    ProductModel.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al crear el producto.', error: err });
      res.status(201).json({ message: 'Producto creado.', productId: result.insertId });
    });
  },

  getAll: (req, res) => {
    ProductModel.getAll((err, products) => {
      if (err) return res.status(500).json({ message: 'Error al obtener los productos.', error: err });
      res.json(products);
    });
  },

  getById: (req, res) => {
    ProductModel.getById(req.params.id, (err, product) => {
      if (err) return res.status(500).json({ message: 'Error al obtener el producto.', error: err });
      if (product.length === 0) return res.status(404).json({ message: 'Producto no encontrado.' });
      res.json(product[0]);
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