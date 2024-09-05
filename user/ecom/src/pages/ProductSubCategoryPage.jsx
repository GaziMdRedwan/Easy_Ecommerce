import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import AppURL from '../api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import axios from 'axios';
import SubCategory from '../components/ProductDetails/SubCategory';

const ProductSubCategoryPage = () => {
  const { category, subcategory } = useParams(); // Use useParams to get URL parameters
  const [productData, setProductData] = useState([]); // State to store product data

  useEffect(() => {
    window.scroll(0, 0); // Scroll to the top when component mounts

    // Fetch product data from API
    axios
      .get(AppURL.ProductListBySubCategory(category, subcategory))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [category, subcategory]); // Effect runs when category or subcategory changes

  return (
    <Fragment>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>

      <div className="Mobile">
        <NavMenuMobile />
      </div>

      <SubCategory
        Category={category}
        SubCategory={subcategory}
        ProductData={productData}
      />

      <div className="Desktop">
        <FooterDesktop />
      </div>

      <div className="Mobile">
        <FooterMobile />
      </div>
    </Fragment>
  );
};

export default ProductSubCategoryPage;
