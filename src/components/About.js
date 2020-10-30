import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {FaGithub, FaJsSquare} from 'react-icons/fa'

class About extends Component{
    render(){
        return(
            <React.Fragment>
                <Jumbotron>
                    <h1>About Page</h1>
                </Jumbotron>
                <Container>
                    <b>This app was made in ReactJS and uses a REST API that uses the ExpressJS framework along with Postgres with Sequelize ORM for database. </b><br/><br/>
                    <Button variant="dark" href="https://github.com/DhavalKotak/"><FaGithub color="white" /> Profile</Button>&ensp;
                    <Button variant="success" href="https://github.com/DhavalKotak/shower-frontend"><FaJsSquare color="white" /> Repository</Button>
                </Container><br/>

            </React.Fragment>
        )
    }
}

export default About