import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import AppURL from '../api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import Category from '../components/ProductDetails/Category';
import axios from 'axios';

const ProductCategoryPage = () => {
  const { category } = useParams(); // Get the category from URL parameters
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductListByCategory(category))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [category]);

  return (
    <Fragment>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>

      <div className="Mobile">
        <NavMenuMobile />
      </div>

      <Category Category={category} ProductData={productData} />

      <div className="Desktop">
        <FooterDesktop />
      </div>

      <div className="Mobile">
        <FooterMobile />
      </div>
    </Fragment>
  );
};

export default ProductCategoryPage;
