import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import AppURL from '../api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import axios from 'axios';
import SearchList from '../components/ProductDetails/SearchList';

const SearchPage = () => {
  const { searchkey } = useParams(); // Use useParams to get URL parameters
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductBySearch(searchkey))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [searchkey]);

  return (
    <Fragment>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>

      <div className="Mobile">
        <NavMenuMobile />
      </div>

      <SearchList SearchKey={searchkey} ProductData={productData} />

      <div className="Desktop">
        <FooterDesktop />
      </div>

      <div className="Mobile">
        <FooterMobile />
      </div>
    </Fragment>
  );
};

export default SearchPage;
