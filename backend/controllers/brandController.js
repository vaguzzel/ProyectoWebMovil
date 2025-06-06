
const BrandModel = require('../models/brandModel');

const BrandController = {
  // Crear nueva marca
  create: (req, res) => {
    BrandModel.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al crear la marca.', error: err });
      res.status(201).json({ message: 'Marca creada.', brandId: result.insertId });
    });
  },

  // Obtener todas las marcas
  getAll: (req, res) => {
    BrandModel.getAll((err, brands) => {
      if (err) return res.status(500).json({ message: 'Error al obtener las marcas.', error: err });
      res.json(brands);
    });
  },

  // Obtener marca por ID
  getById: (req, res) => {
    BrandModel.getById(req.params.id, (err, brand) => {
      if (err) return res.status(500).json({ message: 'Error al obtener la marca.', error: err });
      if (brand.length === 0) return res.status(404).json({ message: 'Marca no encontrada.' });
      res.json(brand[0]);
    });
  },

  // Actualizar marca
  update: (req, res) => {
    BrandModel.update(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar la marca.', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Marca no encontrada.' });
      res.json({ message: 'Marca actualizada.' });
    });
  },

  // Eliminar marca
  delete: (req, res) => {
    BrandModel.delete(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al eliminar la marca.', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Marca no encontrada.' });
      res.status(204).send(); // 204 No Content
    });
  }
};

module.exports = BrandController;