import React from 'react'
import { Alert,Button,Form,Row,Col,Stack } from 'react-bootstrap'

export const Login = () => {
  return (
    <>
    <Form className='w-50 mx-auto'>
<Row className='mb-3' style={{
  height:"100VH",
  justifyContent:"center",
  paddingTop:"10%"
}}>
  <Col>
  <Stack  gap={3}>
   <h2 className='text-center'>Login</h2>
   <Form.Control type="email" placeholder="Email" className='me-auto' />
   <Form.Control type="password" placeholder="Password" className='me-auto' />
   <Button variant="primary" type="submit">
    Login
  </Button>
  <Alert variant='danger' className='text-center'>
    An error occurred while logging in. Please try again.
    {/* Don't have an account? <Alert.Link href="/register">Register</Alert.Link> */}
  </Alert>
  </Stack>
  </Col>
</Row>

    </Form>
    </>
  )
}
