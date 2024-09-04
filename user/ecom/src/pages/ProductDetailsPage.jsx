import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import AppURL from '../api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import SuggestedProduct from '../components/ProductDetails/SuggestedProduct';
import axios from 'axios';
import SliderLoading from '../components/PlaceHolder/SliderLoading';

const ProductDetailsPage = () => {
  const { code } = useParams(); // Use useParams to get the route parameter
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    window.scroll(0, 0);

    axios
      .get(AppURL.ProductDetails(code))
      .then((response) => {
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [code]);

  if (mainDiv === "d-none") {
    return (
      <Fragment>
        <div className="Desktop">
          <NavMenuDesktop />
        </div>

        <div className="Mobile">
          <NavMenuMobile />
        </div>

        <SliderLoading isLoading={isLoading} />

        <div className="Desktop">
          <FooterDesktop />
        </div>

        <div className="Mobile">
          <FooterMobile />
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="Desktop">
          <NavMenuDesktop />
        </div>

        <div className="Mobile">
          <NavMenuMobile />
        </div>

        <ProductDetails data={productData} />
        <SuggestedProduct />

        <div className="Desktop">
          <FooterDesktop />
        </div>

        <div className="Mobile">
          <FooterMobile />
        </div>
      </Fragment>
    );
  }
};

export default ProductDetailsPage;
