import React, { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import MessageBox from "../component/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CartScreen() {
    const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`http://localhost:5000/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, product is out of stock");
    }

    ctxDispatch({
      type: "CART_ADD_ITEMS",
      payload: { ...item, quantity },
    });
  };


  const removeItemHandler = (item) => {
    ctxDispatch({type: "CART_REMOVE_ITEM", payload: item})
  }

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to='/'>Go shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((items) => {
                return (
                  <ListGroup.Item key={items._id}>
                    <Row className='align-items-center'>
                      <Col md={4}>
                        <img
                          src={items.image}
                          alt={items.name}
                          className='img-fluid rounded img-thumnail'
                        />{" "}
                        <Link to={`/product/${items.slug}`}>{items.name}</Link>
                      </Col>
                      <Col md={3}>
                        <Button
                          variant='light'
                          onClick={() =>
                            updateCartHandler(items, items.quantity - 1)
                          }
                          disabled={items.quantity === 1}
                        >
                          <i className='fas fa-minus-circle'></i>
                        </Button>
                        {""}
                        <span>{items.quantity}</span>
                        {""}
                        <Button
                          variant='light'
                          onClick={() =>
                            updateCartHandler(items, items.quantity + 1)
                          }
                          disabled={items.quantity === items.countInStock}
                        >
                          <i className='fas fa-plus-circle'></i>
                        </Button>
                      </Col>
                      <Col md={3}>${items.price}</Col>
                      <Col md={2}>
                        <Button
                          onClick={() =>
                            removeItemHandler(items)
                          }
                          variant='light'
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    {""}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      type='button'
                      onClick={checkoutHandler}
                      variant='primary'
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
