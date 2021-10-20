const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
      success:true,
      product
  })
})

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
  const products = await apiFeature.query;
  res.status(200).json({
    success:true,
    products
  });
})

// Get Product Details -- Admin
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
      success:true,
      product
  })
})

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
      success:true,
      product
  })
})

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

 await product.remove(); // I did blunder here, instead of product.remove, I wrote Product.remove deleting entire data.

  res.status(200).json({
      success:true,
      message: "Product deleted successfully"
  })
})