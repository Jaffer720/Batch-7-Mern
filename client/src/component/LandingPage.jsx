import React, { useState, useEffect } from 'react';
import { Box, Grid, Container } from '@mui/material';
import img1 from '../../public/mens.png';
import img2 from '../../public/kids.png';
import img3 from '../../public/junaid.png';
import kidsImg from '../../public/shirt.png';
import mensImg from '../../public/mjacket.jpeg';
import womensImg from '../../public/wjacket.jpeg';
import otherImg from '../../public/shirt.png';  // Add an image for 'Other'
import CategoryCard from './CategoryCard';

const slider = [
  { image: img1 },
  { image: img2 },
  { image: img3 }
];

const categories = [
  {
    title: 'Child',
    image: kidsImg,
    description: 'Discover the latest trends in kids\' fashion with a special 5% discount on all items. Perfect for every occasion!',
  },
  {
    title: 'Women',
    image: womensImg,
    description: 'Elegant and stylish, our women\'s collection offers the perfect blend of comfort for any wardrobe.',
  },
  {
    title: 'Men',
    image: mensImg,
    description: 'From casual wear to formal attire, explore our men\'s collection designed for versatility and comfort.',
  },
  {
    title: 'Other',
    image: otherImg,
    description: 'Explore unique items in our "Other" category, perfect for anyone looking for something special.',
  }
];

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slider.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ backgroundColor: 'ghostwhite' }}>
      {/* Slider Section */}
      <Box sx={{ width: '100%', height: '350px', position: 'relative' }}>
        <img
          src={slider[currentImageIndex].image}
          alt="Slider Image"
          width="100%"
          height="350px"
          style={{ position: 'absolute', transition: 'opacity 0.7s' }}
        />
      </Box>

      {/* Category Cards */}
      <Container sx={{ flexGrow: 1, padding: '2rem 0' }}>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{
                padding: 2,
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' }
              }}>
                <CategoryCard {...category} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
