import React from 'react'
import { Alert,Button,Form,Row,Col,Stack } from 'react-bootstrap'

export const Register = () => {
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
   <h2 className='text-center'>Register</h2>
   <Form.Control type="text" placeholder="Username" className='me-auto' />
   <Form.Control type="email" placeholder="Email" className='me-auto' />
   <Form.Control type="password" placeholder="Password" className='me-auto' />
   <Button variant="primary" type="submit">
    Register
  </Button>
  <Alert variant='danger' className='text-center'>
    An error occurred while registering. Please try again.
    {/* Already have an account? <Alert.Link href="/login">Login</Alert.Link> */}
  </Alert>
  </Stack>
  </Col>
</Row>

    </Form>
    </>
  )
}
