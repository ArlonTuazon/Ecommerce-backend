const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll ({
    include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then (dbTags => res.json(dbTags))
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne ({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then (dbTags => res.json(dbTags))
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Tag.create ({
    tag_name: req.body.tag_name
  })
  .then (dbTags => res.json(dbTags))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update (req.body, {
    where: {
      id: req.params.id
    }
  })
  .then (dbTags => {
    if (!dbTags) {
      res.status(400).json({message: 'Tag ID not found'});
      return;
    }
    res.json(dbTags);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then (dbTags => {
    if (!dbTags) {
      res.status(400).json({message: 'Tag ID not found'});
      return;
    }
    res.json(dbTags);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
