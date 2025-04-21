import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../logo/Logo';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './nav-bar-styles.module.css';
import { useUser } from '@clerk/clerk-react';


const NavigationBar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role;

    return (
        <>
          <Navbar bg="light" data-bs-theme="light" sticky='top' className={styles.navbarContainer}>
            <Container>
              <Logo />  
              <Navbar.Brand>SynerG+</Navbar.Brand>
              <Nav className="me-auto">
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/stats'>
                  <Nav.Link>My Stats</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/auth'>
                  <Nav.Link>Account</Nav.Link>
                </LinkContainer>

                {userRole === 'admin' && (
                  <LinkContainer to='/create-challenge'>
                    <Nav.Link>Create Challenge</Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Container>
          </Navbar>
        </>
    );
};

export default NavigationBar;