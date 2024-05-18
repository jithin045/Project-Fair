import React, { useContext, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { userLogin, userRegister } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context Api/AuthContext';


function Auth() {

    const {authStatus, setAuthStatus} = useContext(TokenAuthContext)

    const [status, setStatus] = useState(true)

    const [data, setData] = useState({
        username: "", email: "", password: ""
    })

    const navigate = useNavigate()

    const changeStatus = () => {
        setStatus(!status)
    }

    const handleRegister = async () => {
        console.log(data);
        const { username, email, password } = data
        if (!username || !email || !password) {
            toast.warning("Invalid Details!!...Enter the form details properly")
        } else {
            const result = await userRegister(data)
            console.log(result);
            if (result.status == 201) {
                toast.success("User Registration Successfull")
                setData({ username: "", password: "", email: "" })
                setStatus(true)
            } else {
                toast.error(result.response.data)
            }
        }
    }


    const handleLogin = async () => {
        const { email, password } = data
        if (!email || !password) {
            toast.warning("Invalid Details!!...Enter the form details properly")
        }
        else {
            const result = await userLogin({ email, password })
            console.log(result);
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("username", result.data.user)
                sessionStorage.setItem("userDetails",JSON.stringify(result.data.userDetails))
                toast.success("Login Successfull!!")
                navigate('/')
                setAuthStatus(true)
            }
            else {
                toast.error(result.response.data)
            }
        }
    }
        return (
            <>
                <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '100vh' }}>
                    <div className='shadow border w-50 p-4'>
                        <Row>
                            <Col sm={12} md={6}>

                                <img className='img-fluid' src="https://cdni.iconscout.com/illustration/premium/thumb/biometric-security-4916162-4092822.png" alt="" />
                            </Col>
                            <Col sm={12} md={6}>

                                {
                                    status ?
                                        <h3 >Login</h3>
                                        :
                                        <h3>Register</h3>
                                }

                                <div className='mt-4'>
                                    {
                                        !status &&
                                        <FloatingLabel className='mb-3' controlId="user" label="Username">
                                            <Form.Control type="text" placeholder="username" onChange={(e) => { setData({ ...data, username: e.target.value }) }} />
                                        </FloatingLabel>

                                    }
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email address"
                                        className="mb-3"
                                    >
                                        <Form.Control type="email" placeholder="name@example.com" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingPassword" label="Password">
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                    </FloatingLabel>
                                </div>
                                <div className='mt-3 d-flex justify-content-between'>
                                    {
                                        status ?
                                            <button className='btn rounded' style={{ backgroundColor: '#18898d', color: 'white' }} onClick={handleLogin} >

                                                <span >Login</span>

                                            </button>
                                            :
                                            <button className='btn rounded' style={{ backgroundColor: '#18898d', color: 'white' }} onClick={handleRegister} >

                                                <span >Register</span>

                                            </button>
                                    }


                                    <button className='btn btn-link' style={{ color: '#18898d' }} onClick={changeStatus} >
                                        {
                                            status ?
                                                <span><b>Are You New?</b></span>
                                                :
                                                <span><b>Already A User?</b></span>
                                        }
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>

            </>
        )
    }

    export default Auth