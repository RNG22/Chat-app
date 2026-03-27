import React from 'react'
import { useContext } from 'react'
import { Alert,Button,Form,Row,Col,Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext';

export const Register = () => {
  // const { user } = useContext(AuthContext);
  const { registerInfo, updateRegisterInfo, registerError, isRegisterLoading, registerUser } = useContext(AuthContext);
  return (
    <>
    <Form onSubmit={registerUser} className='w-50 mx-auto'>
<Row className='mb-3' style={{
  height:"100VH",
  justifyContent:"center",
  paddingTop:"10%"
}}> 
  <Col>
  <Stack  gap={3}>
   <h2 className='text-center'>Register</h2>
   {/* <p className='text-center'>Welcome, {user.name}!</p> */}
   <Form.Control type="text" placeholder="Username" className='me-auto' onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
   <Form.Control type="email" placeholder="Email" className='me-auto' onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
   <Form.Control type="password" placeholder="Password" className='me-auto' onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
   <Button variant="primary" type="submit">
    {isRegisterLoading ? "Creating Your Account..." : "Register"}
  </Button>
  {registerError?.error && (
    <Alert variant='danger' className='text-center'>
      {registerError?.message || "An error occurred during registration. Please try again."}
      {/* Already have an account? <Alert.Link href="/login">Login</Alert.Link> */}
    </Alert>
  )}
  </Stack>
  </Col>
</Row>

    </Form>
    </>
  )
}
