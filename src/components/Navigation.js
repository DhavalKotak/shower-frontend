import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/shower.png'

class Navigation extends Component{

    render(){
        return(
            <Navbar expand="lg" style={{background: "#191e3e"}}>
                <Navbar.Brand href="">
                    <Nav.Link>
                        <Link to="/"><img src={logo} alt="logo"/></Link>
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link>
                            <Link to="/playlist">Playlist</Link>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <Link to="/about">About</Link>
                        </Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation