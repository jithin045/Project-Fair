import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjects } from '../services/allApis'


function Landing() {

  const [token, setToken] = useState("")
  const [projects, setProjects] = useState([])

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
    getHomeProjects()
  }, [])

  const getHomeProjects = async () => {
    const result = await homeProjects()
    console.log(result);
    if (result.status == 200) {
      setProjects(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }

  console.log(projects);

  return (
    <>
      <div className='w-100 p-5 d-flex align-items-center ' style={{ height: '100vh' }}>
        <Row>
          <Col className='d-flex align-items-center' >
            <div>
              <h1 className='display-4 mb-2 ' style={{ color: '#0a3c5f' }}><b>Project Fair 2024</b></h1>
              <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur molestiae
                officia fugit repellendus ipsa repudiandae error corrupti assumenda rem deserunt.</p>
              {
                token ?
                  <Link to={'/dash'} className='btn text-white rounded  ' style={{ backgroundColor: '#fdd247' }}>Manage Your Projects</Link>

                  :

                  <Link to={'/auth'} className='btn text-white rounded ' style={{ backgroundColor: '#18898d' }}>Start to Explore..</Link>

              }

            </div>

          </Col>
          <Col>
            <img src="https://d57439wlqx3vo.cloudfront.net/iblock/b07/b0761659bdf68e5c9bb84037cc8431ec/c9a7e2442e872729ea37be0eb08b5d81.jpg" className='img-fluid' alt="" />
          </Col>
        </Row>
      </div>

      <div className='p-5 w-100'>
        <h2 className='text-center mt-4 mb-5 '>Projects For You...</h2>


        <marquee behavior="" direction="">
          <div className='d-flex justify-content-evenly mt-5 mb-5'>


            {
              projects.length > 0 ?
                projects.map(item => (
                  <ProjectCard project={item} />
                ))
                :
                <h5>No Projects Available</h5>


            }

          </div>

        </marquee>


        <div className='text-center mt-5'>
          <Link className='text-decoration-none' to={'/projects'}>CLICK FOR MORE...</Link>
        </div>
      </div>


    </>
  )
}

export default Landing