const express = require('express');
const ProductService = require('./../service/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schema/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});

router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(updateProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(202).json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',validatorHandler(getProductSchema, 'params'), async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.status(200).json(rta);
});

module.exports = router;
