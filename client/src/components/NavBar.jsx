import React from 'react'
import { Container, Navbar, Nav,Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const NavBar = () => {
  return (
    <Navbar bg="dark" className='mb-4' style={{height:"3.75rem"}}>
        <Container>
            <h2>
            <Link to="/" className='text-decoration-none link-light'>
            Chat-App
            </Link>
            </h2>
            <span className='text-warning'>Logged in as Rutuja</span>
            <Nav>
                <Stack direction='horizontal' gap={3}>
                <Link to="/login" className='text-decoration-none link-light'>
                    Login
                </Link>
                <Link to="/register" className='text-decoration-none link-light'>
                    Register
                </Link>
                </Stack>
            </Nav>
        </Container>
    </Navbar>
  )
}
