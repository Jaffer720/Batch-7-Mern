import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem as MuiMenuItem,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material'; // Importing necessary icons
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';


import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { BASEURL } from '../URL';



// Backend API URL
const API_URL = `${BASEURL}/api/product/`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    image: '',
    category: '',
    subCategory: '',
    size: '',
    color: '',
    price: '',
    brand: '',
    description: '',
    stock: '',
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        const { products } = response.data;
        const processedProducts = products.map(product => ({
          ...product,
          image: `http://localhost:8000/${product.image}`,
        }));
        setProducts(processedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Product Name',
        size: 130,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={row.original.image}
              alt={row.original.name}
              style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px', borderRadius: '5px' }}
            />
            <span>{row.original.name}</span>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 80,
      },
      {
        accessorKey: 'subCategory',
        header: 'Sub-Category',
        size: 80,
      },
      {
        accessorKey: 'price',
        header: 'Price ($)',
        size: 60,
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        size: 50,
      },
      {
        accessorKey: 'color',
        header: 'Color',
        size: 60,
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 50,
        Cell: ({ row }) => (
          <Box display="flex" gap={1}>
            <IconButton
              onClick={() => {
                setFormValues(row.original);
                setIsEditing(true);
                setOpenModal(true);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={async () => {
                try {
                  await axios.delete(`${API_URL}${row.original._id}`);
                  setProducts(products.filter(product => product._id !== row.original._id));
                } catch (error) {
                  console.error('Error deleting product:', error);
                }
              }}
            >
              <Delete />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedProduct(row.original);
                setOpenDetailModal(true);
              }}
            >
              <Visibility />
            </IconButton>
          </Box>
        ),
      },
    ],
    [products]
  );

  const table = useMaterialReactTable({
    columns,
    data: products,
  });

  const handleAddProduct = () => {
    setIsEditing(false);
    setFormValues({
      name: '',
      category: '',
      subCategory: '',
      size: '',
      color: '',
      price: '',
      brand: '',
      description: '',
      stock: '',
    });
    setOpenModal(true);
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (isEditing) {
      try {
        await axios.put(`${API_URL}${formValues._id}`, formData);
        setProducts(products.map((product) =>
          product._id === formValues._id ? { ...formValues } : product
        ));
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      try {
        const response = await axios.post(API_URL, formData);
        setProducts([...products, response.data.data]);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f0f2f5' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={handleAddProduct}
      >
        Add New Product
      </Button>
      <Box sx={{ overflowX: 'auto' }}>
        <MaterialReactTable table={table} />
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '1%', width: 400, borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </Typography>
          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            <form>
              <TextField
                label="Product Name"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={formValues.category}
                  onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                  label="Category"
                >
                  <MuiMenuItem value="Men">Men</MuiMenuItem>
                  <MuiMenuItem value="Women">Women</MuiMenuItem>
                  <MuiMenuItem value="Child">Child</MuiMenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Sub-Category</InputLabel>
                <Select
                  value={formValues.subCategory}
                  onChange={(e) => setFormValues({ ...formValues, subCategory: e.target.value })}
                  label="Sub-Category"
                >
                  <MuiMenuItem value="Shirt">Shirt</MuiMenuItem>
                  <MuiMenuItem value="Pants">Pants</MuiMenuItem>
                  <MuiMenuItem value="Dress">Dress</MuiMenuItem>
                  <MuiMenuItem value="Jacket">Jacket</MuiMenuItem>
                  <MuiMenuItem value="Skirt">Skirt</MuiMenuItem>
                  <MuiMenuItem value="Shorts">Shorts</MuiMenuItem>
                  <MuiMenuItem value="Other">Other</MuiMenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Size</InputLabel>
                <Select
                  value={formValues.size}
                  onChange={(e) => setFormValues({ ...formValues, size: e.target.value })}
                  label="Size"
                >
                  <MuiMenuItem value="Small">Small</MuiMenuItem>
                  <MuiMenuItem value="Medium">Medium</MuiMenuItem>
                  <MuiMenuItem value="Large">Large</MuiMenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Color"
                value={formValues.color}
                onChange={(e) => setFormValues({ ...formValues, color: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                value={formValues.price}
                onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Image"
                type="file"
                onChange={(e) => setFormValues({ ...formValues, image: e.target.files[0] })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Brand"
                value={formValues.brand}
                onChange={(e) => setFormValues({ ...formValues, brand: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Stock"
                value={formValues.stock}
                onChange={(e) => setFormValues({ ...formValues, stock: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleFormSubmit}>
                {isEditing ? 'Save Changes' : 'Add Product'}
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>

     {/* Detail Modal */}
{selectedProduct && (
  <Modal open={openDetailModal} onClose={() => setOpenDetailModal(false)}>
    <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '1%', width: 400, borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom>
        Product Details
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <img
          src={selectedProduct.image} // Display the product image
          alt={selectedProduct.name}
          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px' }}
        />
        <Typography variant="body1">{selectedProduct.name}</Typography>
      </Box>
      <Typography>Category: {selectedProduct.category}</Typography>
      <Typography>Sub-Category: {selectedProduct.subCategory}</Typography>
      <Typography>Size: {selectedProduct.size}</Typography>
      <Typography>Color: {selectedProduct.color}</Typography>
      <Typography>Price: {selectedProduct.price}</Typography>
      <Typography>Stock: {selectedProduct.stock}</Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => setOpenDetailModal(false)}>
        Close
      </Button>
    </Box>
  </Modal>
)}
    </Box>
  );
};

export default ProductList;
