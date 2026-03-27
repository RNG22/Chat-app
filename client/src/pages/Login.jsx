import React from 'react'
import { useContext } from 'react';
import { Alert,Button,Form,Row,Col,Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const { loginInfo, setLoginInfo, updateLoginInfo, loginError, isLoginLoading, loginUser } = useContext(AuthContext);
  return (
    <>
    <Form className='w-50 mx-auto' onSubmit={loginUser}>
<Row className='mb-3' style={{
  height:"100VH",
  justifyContent:"center",
  paddingTop:"10%"
}}>
  <Col>
  <Stack  gap={3}>
   <h2 className='text-center'>Login</h2>
   <Form.Control type="email" placeholder="Email" className='me-auto' onChange={(e)=>updateLoginInfo({...loginInfo,email:e.target.value})} />
   <Form.Control type="password" placeholder="Password" className='me-auto' onChange={(e)=>updateLoginInfo({...loginInfo,password:e.target.value})} />
   <Button variant="primary" type="submit" >
    {isLoginLoading ? "Logging in..." : "Login"}
  </Button>
  {loginError && (
    <Alert variant='danger' className='text-center'>
      {loginError.message}
      {/* Don't have an account? <Alert.Link href="/register">Register</Alert.Link> */}
    </Alert>
  )}
  </Stack>
  </Col>
</Row>

    </Form>
    </>
  )
}
