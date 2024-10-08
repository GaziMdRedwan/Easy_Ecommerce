import React, { Component } from 'react'
import { Fragment } from 'react'
import {Navbar,Container, Row, Col,Button,Card,Modal,ListGroup,ListGroupItem} from 'react-bootstrap';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/1684156655845.jpg'
class Profile extends Component {
     render() { 

          let name;
          let email;
          if(this.props.user){
               name = this.props.user.name;
               email = this.props.user.email;
          }

          if(!localStorage.getItem('token')){
               return <Navigate to="/login" />
          }


          return (
              <Fragment> 
     <div className="section-title text-center mb-55"><h2>User Profile Page</h2>         
          </div>

          <Container>
               <Row>

                    <Col lg={4} md={4} sm={12} >

                    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={Image} className="userprofile" />
 
  <ListGroup className="list-group-flush">
        
    <ListGroupItem> <Link className="text-link" to="/orderlist"> <p className="product-name-on-card"> Order List </p></Link> </ListGroupItem>
  </ListGroup>
   
</Card>


                    </Col>


                    <Col lg={8} md={8} sm={12} >
                    <ul className="list-group">
<li className="list-group-item">Name :  {name} </li>
<li className="list-group-item">Email :  {email} </li>
               </ul>
                    </Col>


               </Row>
          </Container> 


              </Fragment>
          )
     }
}

export default Profile