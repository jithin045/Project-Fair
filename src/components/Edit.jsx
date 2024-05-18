import React, { useEffect,useContext } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../services/server_url';
import { toast } from 'react-toastify';
import { editProject } from '../services/allApis';
import { editProjectResponseContext } from '../Context Api/Contextapi';


function Edit({project}) {
    const [show, setShow] = useState(false);
    const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)

    const [projectData,setProjectData] =useState({
       id:project._id, title:project.title,overview:project.overview,language:project.language,github:project.github,demo:project.demo,projectImage:""     
    })

    const [imgStatus,setImageStatus]=useState(false)
    const [preview,setPreview]=useState("")

    useEffect(()=>{
        if(projectData.projectImage.type=="image/jpg" || projectData.projectImage.type=="image/jpeg" || projectData.projectImage.type=="image/png"){
            setImageStatus(false)
            setPreview(URL.createObjectURL(projectData.projectImage))
        }
        else{
            setImageStatus(true)
            setPreview("")
        }
    },[projectData.projectImage])

    console.log(projectData);

    const handleUpdate=async()=>{
        console.log(projectData);
        const {title,overview,language,github,demo,projectImage}=projectData
        if(!title || !overview || !language || !github || !demo ){
            toast.warning("Invalid Inputs!! Enter Valid Input data in every Fields!!")
        }
        else{
            const formData=new FormData()
            formData.append("title",title)
            formData.append("overview",overview)
            formData.append("language",language)
            formData.append("github",github)
            formData.append("demo",demo)
            preview?formData.append("image",projectImage):formData.append("image",project.image)
     
            const token=sessionStorage.getItem("token")

            if(preview){
                const reqHeader={
    
                        "Content-Type":"multipart/form-data",
                        "Authorization":`Bearer ${token}`
                   }
                   const result=await editProject(projectData.id,formData,reqHeader)
                   if(result.status==200){
                    toast.success(`Project ${projectData.title} Updated Successfully`)
                    handleClose()
                    setEditProjectResponse()
                   }
                   else{
                    toast.warning(result.response.data)
                   }
                }
                else{
                    const reqHeader={
    
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                   }
                   const result=await editProject(projectData.id,formData,reqHeader)
                   if(result.status==200){
                    toast.success(`Project ${projectData.title} Updated Successfully`)
                    handleClose()
                    setEditProjectResponse()
                   }
                   else{
                    toast.warning(result.response.data)
                   }
                }
            }
            handleClose()
     
           
    }

    const handleClose = () =>{

        setShow(false);
        setPreview("")
        setProjectData({
            id:project._id, title:project.title,overview:project.overview,language:project.language,github:project.github,demo:project.demo,projectImage:"" 
        })
    } 
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn ' onClick={handleShow} >
            <i className="fa-solid fa-pen-to-square fa-2xl"  style={{color:'#18898d'}}></i>
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
                                <input type="file" name="" style={{display:'none'}} onChange={(e)=>{setProjectData({...projectData,projectImage:e.target.files[0]})}} />
                                <img className='img-fluid' src={preview?preview:`${base_url}/uploads/${project.image}`} alt="" />

                            </label>

                            {
                                imgStatus &&
                                <p className='text-danger'>Image extension Invalid!! Image should be JPG,JPEG,PNG</p>
                            }
                           
                            </Col>
                            <Col className='mb-2'>
                                <div >
                                    <FloatingLabel className='mb-3' controlId="titleinp" label="Title" >
                                        <Form.Control onChange={(e)=>{setProjectData({...projectData,title:e.target.value})}} value={projectData.title} type="text" placeholder="project title" />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="overviewinp" label="OverView">
                                        <Form.Control onChange={(e)=>{setProjectData({...projectData,overview:e.target.value})}} value={projectData.overview} type="text" placeholder="Brief about Project" />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="langinp" label="Languages">
                                        <Form.Control onChange={(e)=>{setProjectData({...projectData,language:e.target.value})}} value={projectData.language} type="text" placeholder="Languages Used" />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="githubinp" label="GitHub Url">
                                        <Form.Control onChange={(e)=>{setProjectData({...projectData,github:e.target.value})}} value={projectData.github} type="text" placeholder="Github Url" />
                                    </FloatingLabel>
                                </div>
                            </Col>
                            <FloatingLabel controlId="demoinp" label="Demo Url">
                                        <Form.Control onChange={(e)=>{setProjectData({...projectData,demo:e.target.value})}} value={projectData.demo} type="text" placeholder="Demo Url" />
                                    </FloatingLabel>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>Upload</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default Edit