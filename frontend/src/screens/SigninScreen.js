import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

function SigninScreen() {
  const navigate = useNavigate();

  //to get redirect from url
  // const { search } = useLocation();
  // const { redirectInUrl } = new URLSearchParams(search).get("redirect");
  // const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);

  //get  user info from state
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/" || "/shipping");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/shipping");
    }
  }, [navigate, userInfo]);

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className='my-3'>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <div className='mb-3'>
          <Button type='submit'>Sign In</Button>
        </div>
        <div className='mb-3'>
          New Customer? {""}
          <Link to={`/signup`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}

export default SigninScreen;
