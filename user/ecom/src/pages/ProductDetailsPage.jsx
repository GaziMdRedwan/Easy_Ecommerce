import React, { Component, Fragment } from 'react';
import AppURL from '../api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import SliderLoading from '../components/PlaceHolder/SliderLoading';
import axios from 'axios';

// Importing useParams for functional components
import { useParams } from 'react-router-dom';

// Refactor to functional component
const ProductDetailsPage = (props) => {
    const { code } = useParams(); // Get the product code from URL params
    const [ProductData, setProductData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState("d-block"); // Initialize with loading state
    const [mainDiv, setMainDiv] = React.useState("d-none");

    React.useEffect(() => {
        window.scroll(0, 0);

        axios.get(AppURL.ProductDetails(code)).then(response => {
            setProductData(response.data);
            setIsLoading("d-none");
            setMainDiv("");
        }).catch(error => {
            console.error("Error fetching product details:", error);
            // Handle error state if needed
        });
    }, [code]); // Run effect when code changes

    const User = props.user;

    return (
        <Fragment>
            <div className="Desktop">
                <NavMenuDesktop />
            </div>

            <div className="Mobile">
                <NavMenuMobile />
            </div>

            {mainDiv === "d-none" ? (
                <SliderLoading isLoading={isLoading} />
            ) : (
                <ProductDetails data={ProductData} user={User} />
            )}

            <div className="Desktop">
                <FooterDesktop />
            </div>

            <div className="Mobile">
                <FooterMobile />
            </div>
        </Fragment>
    );
};

export default ProductDetailsPage;
