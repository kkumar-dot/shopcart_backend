const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {
        console.log(file)
       return cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

// import controllers products
const productController = require('../controllers/productController.js')
const reviewController = require('../controllers/reviewController')

// router
const router = require('express').Router()

// use routers
// router.post('/addProduct', productController.upload , productController.addProduct)
// router.post('/addProduct', productController.addProduct)
router.get('/allProducts', productController.getAllProducts)
router.get('/published', productController.getPublishedProduct)

router.post('/addProduct', upload.single('image'), productController.addProduct)
router.post('/getAllProducts', productController.getAllProducts)

// get product Reviews
router.get('/getProductReviews/:id', productController.getProductReviews)

// Products router
router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

// Review Url and Controller

router.get('/allReviews', reviewController.getAllReviews)
router.post('/addReview/:id', reviewController.addReview)

module.exports = router