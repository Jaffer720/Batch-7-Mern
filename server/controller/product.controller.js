import Product from '../model/product.model.js';

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id; 
    
    const product = await Product.findById(productId);

    if (!product) return res.status(404).send('Product not found');
    
    product.set(req.body); 
    await product.save();
    
    res.status(200).json({ message: 'Product Updated', Data: product });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Internal Server Error', Error_Info: error.message });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id; 
    
    const product = await Product.findByIdAndDelete(productId);

    if (!product) return res.status(404).send('Product not found');
    
    res.status(200).json({ message: 'Product deleted successfully', Data: product });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Internal Server Error', Error_Info: error.message });
  }
};

export const viewSingleProduct = async (req, res, next) => {
  try {
    const productId = req.params.id; 
    
    const product = await Product.findById(productId);

    if (!product) return res.status(404).send('Product not found');
    
    res.status(200).json({ message: 'Product Details', Data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', Error_Info: error.message });
  }
};

export const viewAllProduct = async (req, res, next) => {
  try {
    console.log("ViewAllProduct Endpoint Triggered");
    const query = {};
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 50;
    const sort = req.query.sort;

    if (req.query.productname) {
      query.name = new RegExp(req.query.productname, 'i'); 
    }

    const products = await Product.find(query)
      .sort(sort) 
      .skip((page - 1) * limit) 
      .limit(limit);

    const totalProducts = await Product.countDocuments(query);
    res.send({
      message: 'Product Details',
      products,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
      },
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Internal Server Error', Error_Info: error.message });
  }
};

export const addProduct = async (req, res, next) => {
  try {
    // const productData = req.body;
    // const product = new Product(productData);
    const file = req.file
    if(!file){
      return res.status(400).json({message:'Picture is required'})
    }
    const productData = req.body;
    const product = new Product({...productData, image:file.path});
    await product.save();
    res.status(201).json({ message: 'Product added successfully', Data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', Error_Info: error.message });
  }
};
