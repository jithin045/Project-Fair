import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import server_url from '../services/server_url'

function ProjectCard({project}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card style={{ width: '17rem' }}>
                <Card.Img onClick={handleShow} style={{height:"150px"}} variant="top" src={project.image?`${server_url}/uploads/${project.image}`:"https://i.pinimg.com/736x/d6/ca/85/d6ca85481300d2a5e73ab3c48a088a96.jpg"} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>

            {/* modal */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                        <img className='img-fluid' style={{height:"150px"}} src={project.image?`${server_url}/uploads/${project.image}`:"https://i.pinimg.com/736x/d6/ca/85/d6ca85481300d2a5e73ab3c48a088a96.jpg"} alt="" />
                        </Col>
                        <Col>
                        <h4>{project.title}</h4>
                        <p>{project.overview}</p>
                        <h6>{project.languages}</h6>
                        <div className='mt-3 p-3 d-flex justify-content-evenly'>
                            <a href={project.github}>
                                <i className='fa-brands fa-github fa-xl'></i>
                            </a>
                            <a href={project.demo}>
                                <i className='fa-solid fa-link fa-xl'></i>
                            </a>
                        </div>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>

        </>
    )
}

export default ProjectCard