
const CategoryModel = require('../models/categoryModel');

const CategoryController = {
  create: (req, res) => {
    CategoryModel.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al crear la categoría.', error: err });
      res.status(201).json({ message: 'Categoría creada.', categoryId: result.insertId });
    });
  },

  getAll: (req, res) => {
    CategoryModel.getAll((err, categories) => {
      if (err) return res.status(500).json({ message: 'Error al obtener las categorías.', error: err });
      res.json(categories);
    });
  },

  getById: (req, res) => {
    CategoryModel.getById(req.params.id, (err, category) => {
      if (err) return res.status(500).json({ message: 'Error al obtener la categoría.', error: err });
      if (category.length === 0) return res.status(404).json({ message: 'Categoría no encontrada.' });
      res.json(category[0]);
    });
  },

  update: (req, res) => {
    CategoryModel.update(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar la categoría.', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Categoría no encontrada.' });
      res.json({ message: 'Categoría actualizada.' });
    });
  },

  delete: (req, res) => {
    CategoryModel.delete(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al eliminar la categoría.', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Categoría no encontrada.' });
      res.status(204).send();
    });
  },

  getProductsByCategory: (req, res) => {
    const categoryId = req.params.id;
    CategoryModel.getProductsByCategoryId(categoryId, (err, products) => {
      if (err) {
        return res.status(500).json({ message: `Error al obtener productos para la categoría ${categoryId}.`, error: err });
      }
      res.json(products);
    });
  }

};

module.exports = CategoryController;