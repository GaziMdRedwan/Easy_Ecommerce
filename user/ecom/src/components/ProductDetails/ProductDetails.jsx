import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

class ProductDetails extends Component {
  imgOnClick(event) {
    let imgSrc = event.target.getAttribute('src');
    let previewImg = document.getElementById('previewImg');
    if (previewImg) {
      previewImg.setAttribute('src', imgSrc);
    }
  }

  PriceOption(price, special_price) {
    if (special_price === 'na') {
      return <p className="product-price-on-card">Price: ${price}</p>;
    } else {
      return (
        <p className="product-price-on-card">
          Price: <strike className="text-secondary">${price}</strike> ${special_price}
        </p>
      );
    }
  }

  render() {
    let ProductAllData = this.props.data;

    if (
      !ProductAllData['productList'] || 
      !ProductAllData['productDetails'] || 
      ProductAllData['productList'].length === 0 || 
      ProductAllData['productDetails'].length === 0 || 
      ProductAllData['productDetails'][0].product_id !== ProductAllData['productList'][0].id
    ) {
      return (
        <Container>
          <center>
          <div className="section-title text-center mb-55" style={{ color: 'red' }}>
          <p style={{ fontSize: '32px', fontWeight: 'bold'}}>NO DETAILS FOUND ON THIS PRODUCT</p>
          </div>
          </center>
        </Container>
      );
    }

    let title = ProductAllData['productList'][0]?.title;
    let brand = ProductAllData['productList'][0]?.brand;
    let category = ProductAllData['productList'][0]?.category;
    let subcategory = ProductAllData['productList'][0]?.subcategory;

    let price = ProductAllData['productList'][0]?.price;
    let product_code = ProductAllData['productList'][0]?.product_code;
    let special_price = ProductAllData['productList'][0]?.special_price;

    let product_id = ProductAllData['productDetails'][0]?.product_id;
    let short_description = ProductAllData['productDetails'][0]?.short_description;
    let long_description = ProductAllData['productDetails'][0]?.long_description;

    let image_one = ProductAllData['productDetails'][0]?.image_one;
    let image_two = ProductAllData['productDetails'][0]?.image_two;
    let image_three = ProductAllData['productDetails'][0]?.image_three;
    let image_four = ProductAllData['productDetails'][0]?.image_four;
    let color = ProductAllData['productDetails'][0]?.color;
    let size = ProductAllData['productDetails'][0]?.size;

    var ColorDiv = 'd-none';
    if (color !== 'na') {
      let ColorArray = color.split(',');
      var ColorOption = ColorArray.map((ColorList, i) => (
        <option key={i} value={ColorList}>{ColorList}</option>
      ));
      ColorDiv = '';
    }

    var SizeDiv = 'd-none';
    if (size !== 'na') {
      let SizeArray = size.split(',');
      var SizeOption = SizeArray.map((SizeList, i) => (
        <option key={i} value={SizeList}>{SizeList}</option>
      ));
      SizeDiv = '';
    }

    return (
      <Fragment>
        <Container fluid={true} className="BetweenTwoSection">
          <div className="breadbody">
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to={`/productcategory/${category}`}>{category}</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to={`/productsubcategory/${category}/${subcategory}`}>{subcategory}</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to={`/productdetails/${product_id}`}>{title}</Link></Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Row className="p-2">
            <Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
              <Row>
                <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                  <img id="previewImg" className="bigimage" src={image_one} alt={title} />
                  <Container className="my-3">
                    <Row>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img onClick={this.imgOnClick.bind(this)} className="w-100 smallimage product-sm-img" src={image_one} alt="Product" />
                      </Col>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img onClick={this.imgOnClick.bind(this)} className="w-100 smallimage product-sm-img" src={image_two} alt="Product" />
                      </Col>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img onClick={this.imgOnClick.bind(this)} className="w-100 smallimage product-sm-img" src={image_three} alt="Product" />
                      </Col>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img onClick={this.imgOnClick.bind(this)} className="w-100 smallimage product-sm-img" src={image_four} alt="Product" />
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                  <h5 className="Product-Name">{title}</h5>
                  <h6 className="section-sub-title">{short_description}</h6>

                  {this.PriceOption(price, special_price)}

                  <h6 className="mt-2">Category: <b>{category}</b></h6>
                  <h6 className="mt-2">SubCategory: <b>{subcategory}</b></h6>
                  <h6 className="mt-2">Brand: <b>{brand}</b></h6>
                  <h6 className="mt-2">Product Code: <b>{product_code}</b></h6>

                  <div className={ColorDiv}>
                    <h6 className="mt-2">Choose Color</h6>
                    <select className="form-control form-select">
                      <option>Choose Color</option>
                      {ColorOption}
                    </select>
                  </div>

                  <div className={SizeDiv}>
                    <h6 className="mt-2">Choose Size</h6>
                    <select className="form-control form-select">
                      <option>Choose Size</option>
                      {SizeOption}
                    </select>
                  </div>

                  <div>
                    <h6 className="mt-2">Choose Quantity</h6>
                    <select className="form-control form-select">
                      <option>Choose Quantity</option>
                      {[...Array(10).keys()].map(i => <option key={i} value={i + 1}>{i + 1}</option>)}
                    </select>
                  </div>

                  <div className="input-group mt-3">
                    <button className="btn site-btn m-1"><i className="fa fa-shopping-cart"></i> Add To Cart</button>
                    <button className="btn btn-primary m-1"><i className="fa fa-car"></i> Order Now</button>
                    <button className="btn btn-primary m-1"><i className="fa fa-heart"></i> Favourite</button>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6} lg={6} sm={12} xs={12}>
                  <h6 className="mt-2">DETAILS</h6>
                  <p>{long_description}</p>
                </Col>
                <Col md={6} lg={6} sm={12} xs={12}>
                  <h6 className="mt-2">REVIEWS</h6>
                  <p className="p-0 m-0"><span className="Review-Title">X</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span></p>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>

                  <p className="p-0 m-0"><span className="Review-Title">Y</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span></p>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>

                  <p className="p-0 m-0"><span className="Review-Title">Z</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span></p>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default ProductDetails;
