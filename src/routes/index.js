var express = require('express');
var cssSpriteCtrl = require('../controllers/cssSprite.js');
var router = express.Router();

router.get('/', cssSpriteCtrl.renderIndex);
router.get('/images/:path', cssSpriteCtrl.getImageList);
router.get('/images', cssSpriteCtrl.getImageList);
router.post('/generate', cssSpriteCtrl.generate);

module.exports = router;