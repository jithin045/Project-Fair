import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addProject } from '../services/allApis';
import { addProjectResponseContext } from '../Context Api/Contextapi';


function Add() {
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    console.log(useContext(addProjectResponseContext));
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("")
    const [projectData, setProjectData] = useState({
        title: "", overview: "", language: "", github: "", demo: "", projectImage: ""
    })
    const [imageStatus, setImageStatus] = useState(false)

    useEffect(() => {
        console.log(projectData);
        if (projectData.projectImage.type == "image/jpg" || projectData.projectImage.type == "image/jpeg" || projectData.projectImage.type == "image/png") {
            // console.log("Image is correct format");
            // console.log(URL.createObjectURL(projectData.projectImage));
            setImageStatus(false)
            setPreview(URL.createObjectURL(projectData.projectImage))

        }
        else {
            console.log("Invalid file fromat!! Image should be jpg,jpeg or png!!");
            setImageStatus(true)
            setPreview("")
        }
    }, [projectData.projectImage])

    const handleAddProject = async () => {

        const { title, overview, language, github, demo, projectImage } = projectData
        if (!title || !overview || !language || !github || !demo || !projectImage) {
            toast.warning("Invalid Inputs!! Enter Valid Input data in every Fields!!")
        }


        else {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("overview", overview)
            formData.append("language", language)
            formData.append("github", github)
            formData.append("demo", demo)
            formData.append("image", projectImage)

            const token = sessionStorage.getItem('token')
            console.log(token);

            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }



            const result = await addProject(formData, reqHeader)
            if (result.status = 200) {
                toast.success("Project Added Successfully")
                setProjectData({
                    title: "", overview: "", language: "", github: "", demo: "", projectImage: ""
                })
                handleClose()
                setAddProjectResponse(result)
              
            }


            else {
                toast.error(result.response.data)
            }

            console.log(result);
        }
    }

    console.log(projectData);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn mt-2 mb-4' onClick={handleShow} style={{ backgroundColor: '#18898d', color: 'white' }}>
                <i className="fa-solid fa-plus fa-lg me-2"></i>
                Add Projects
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col>
                                <label >
                                    <input onChange={(e) => { setProjectData({ ...projectData, projectImage: e.target.files[0] }) }} type="file" name="in" id="" style={{ display: 'none' }} />
                                    <img className='img-fluid' src={preview ? preview : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"} alt="in" />
                                </label>
                                {
                                    imageStatus &&
                                    <p className='text-danger'>Invalid file fromat!! Image should be jpg,jpeg or png!!</p>
                                }

                            </Col>
                            <Col className='mb-2'>
                                <div >
                                    <FloatingLabel className='mb-3' controlId="titleinp" label="Title" >
                                        <Form.Control onChange={e => setProjectData({ ...projectData, title: e.target.value })} type="text" placeholder="project title" />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="overviewinp" label="OverView">
                                        <Form.Control onChange={e => setProjectData({ ...projectData, overview: e.target.value })} type="text" placeholder="Brief about Project" />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="langinp" label="Languages">
                                        <Form.Control onChange={e => setProjectData({ ...projectData, language: e.target.value })} type="text" placeholder="Languages Used" />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="githubinp" label="GitHub Url">
                                        <Form.Control onChange={e => setProjectData({ ...projectData, github: e.target.value })} type="text" placeholder="Github Url" />
                                    </FloatingLabel>
                                </div>
                            </Col>
                            <FloatingLabel controlId="demoinp" label="Demo Url">
                                <Form.Control onChange={e => setProjectData({ ...projectData, demo: e.target.value })} type="text" placeholder="Demo Url" />
                            </FloatingLabel>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProject}>Save</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default Add