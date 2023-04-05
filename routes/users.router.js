const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();


router.get('/', (req, res) => {
  const users = []
  const { size } = req.query;
  const limit = size || 10;
  for(let i = 0; i < limit; i++) {
    users.push({
      name: faker.name.fullName(),
      sexo: faker.name.gender(),
      image: faker.image.imageUrl()
    })
  }
  res.status(200).json(users);
});

router.post('/', (req, res) => {
    const { body }  = req.body;
    res.status(201).json({
      message: 'created',
      data: body
    })
})


module.exports = router;
