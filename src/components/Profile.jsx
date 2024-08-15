import React, { useState, useEffect } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import server_url from '../services/server_url'
import { updateProfile } from '../services/allApis';
import { toast } from 'react-toastify';

function Profile() {

    const [existingProfile, setExistingProfile] = useState("")

    const [preview, setPreview] = useState("")

    const [open, setOpen] = useState(false)

    const [user, setUser] = useState({
        id: "", username: "", email: "", password: "", github: "", linkedin: "", profile: ""
    })

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
            setUser({
                id: userDetails._id, username: userDetails.username, email: userDetails.email, password: userDetails.password,
                github: userDetails.github, linkedin: userDetails.linkedin, profile: ""
            })
            setExistingProfile(userDetails.profile)
        }
    }, [open])

    useEffect(() => {
        if (user.profile) {
            setPreview(URL.createObjectURL(user.profile))
        }
        else {
            setPreview("")
        }
    }, [user.profile])

    const handleProfileUpdate = async() => {
        console.log(user);
        const { username, password, email, github, linkedin, profile } = user
        if (!username || !password || !email || !github || !linkedin ) {
            toast.warning("Enter Valid Inputs!!")
        }
        else {
            const formData = new FormData()
            formData.append("username", username)
            formData.append("password", password)
            formData.append("email", email)
            formData.append("github", github)
            formData.append("linkedin", linkedin)
            preview?formData.append("profile",profile):formData.append("profile",existingProfile)
            

            const header={
                "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type":preview?"multipart/form-data":"application/json"
            }

            const result=await updateProfile(header,formData)
            if(result.status==200){
                console.log(result.data);
                toast.success("Profie Updated Successfully")
                sessionStorage.setItem("userDetails",JSON.stringify(result.data))
                setOpen(!open)
            }
            else{
                toast.error(result.response.data)
            }
        }
    }

    console.log(user);

    return (
        <>
            <div className='p-3 border shadow border-3 m-3'>
                <div className="d-flex justify-content-between">
                    <h4>Profile</h4>
                    <button className='btn' onClick={() => { setOpen(!open) }}>
                        <i className='fa-solid fa-down-long' style={{ color: '#63e6be' }} />
                    </button>
                </div>
                {
                    open &&

                    <div>
                        <div className='d-flex justify-content-center' >
                            <label >
                                <input type="file" name='' onChange={(e) => setUser({ ...user, profile: e.target.files[0] })} id='in' style={{ display: 'none' }} />
                                {
                                    existingProfile == "" ?
                                        <img className='img-fluid mb-3' style={{ width: '150px' }} src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcrHz4vrNrDq6VEqSADONhWK6hIdSbmI7WJV_OxLlZA&s"} alt="img" />
                                        :
                                        <img className='img-fluid mb-3' style={{ width: '150px' }} src={preview ? preview : `${server_url}/uploads/${existingProfile}`} alt="img" />
                                }


                            </label>
                        </div>
                        <FloatingLabel controlId="user" label="username" className="mb-3">
                            <Form.Control type="text" placeholder="username" value={user?.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        </FloatingLabel>
                        <FloatingLabel controlId="git" label="GitLink" className="mb-3">
                            <Form.Control type="text" placeholder="Git Account Url" value={user?.github} onChange={(e) => setUser({ ...user, github: e.target.value })} />
                        </FloatingLabel>
                        <FloatingLabel controlId="user" label="LinkedIn Url" className="mb-3">
                            <Form.Control type="text" placeholder="LinkedIn Url" value={user?.linkedin} onChange={(e) => setUser({ ...user, linkedin: e.target.value })} />
                        </FloatingLabel>
                        <div className='d-grid mt-3'>
                            <button className='btn btn-block btn-warning' onClick={handleProfileUpdate}>UPDATE</button>
                        </div>
                    </div>
                }


            </div>
        </>
    )
}

export default Profile