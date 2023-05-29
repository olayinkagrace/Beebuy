import React, { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import { Col, Row } from "react-bootstrap";
import Product from "../component/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIl":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("https://beebuy.onrender.com/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        // dispatch({ type: "FETCH_FAIl", payload: error.message });
        dispatch({ type: "FETCH_FAIl", payload: error.message });
      }
      // setProducts(result.data)
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>BeeBuy</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className='products'>
        <Row>
          {loading ? (
            // <div>loading</div>
            <LoadingBox />
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
          ) : (
            products.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3} className='mb-3'>
                <Product product={product}></Product>
              </Col>
            ))
          )}
        </Row>
      </div>
    </div>
  );
}

export default HomeScreen;
