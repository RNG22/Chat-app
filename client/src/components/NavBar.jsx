import React from 'react'
import { useContext } from 'react';
import { Container, Navbar, Nav,Stack, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Notification } from './Chat/Notification';
export const NavBar = () => {

    const { user ,logoutUser} = useContext(AuthContext);
  return (
    <Navbar bg="dark" className='mb-4' style={{height:"3.75rem"}}>
        <Container>
            <h2>
            <Link to="/" className='text-decoration-none link-light'>
            Chat-App
            </Link>
            </h2>
            {/* {user && (
                <span className='text-warning'>Logged in as {user.name}</span>
            )} */}
            <Nav>
                <Stack direction='horizontal'>
                {/* {user ? (
                    <>
                        <Notification />
                        <Link className='text-decoration-none link-light' onClick={() => logoutUser()} to="/login">
                            Logout
                        </Link>
                    </>
                ) : ( */}
                {user ? (
  <>
    <Notification />

    <Dropdown align="end">
      <Dropdown.Toggle
        variant="dark"
        id="dropdown-basic"
        className="three-dot-toggle"
      >
        ⋮
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className='username' disabled>
          {user.name}
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item className='logout' onClick={logoutUser}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </>
) : (
                    <>
                        <Link to="/login" className='text-decoration-none link-light'>
                            Login
                        </Link>
                        <Link to="/register" className='text-decoration-none link-light'>
                            Register
                        </Link>
                    </>
                )}
                </Stack>
            </Nav>
        </Container>
    </Navbar>
  )
}
