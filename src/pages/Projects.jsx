import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import { allProjects } from '../services/allApis'
import ProjectCard from '../components/ProjectCard'

function Projects() {

  const [projects, setProjects] = useState([])
  const [logStatus, setLogStatus] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getData()
      setLogStatus(true)
    }
    else {
      console.log("Login First");
      setLogStatus(false)
    }
  }, [search])

  console.log(projects)

  const getData = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
    const result = await allProjects(header,search)
    console.log(result)
    if (result.status == 200) {
      setProjects(result.data)
    }
    else {
      console.log(result.response.data)
    }
  }


  return (
    <>
      <Header status={true} />
      <div className="p-5">
        <h3>All Projects</h3>
        <input type="text" name='' onChange={(e)=>{setSearch(e.target.value)}} className='form-control w-25 mb-5 mt-5' placeholder='Enter Languages for Project Search' id='' />
        {
          logStatus ?
            <Row>
              {
                projects.length > 0 ?
                  projects.map(item => (
                    <Col>
                      <ProjectCard project={item} />
                    </Col>
                  ))
                  :

                  <h1 className='text-center text-danger'>No Projects Available</h1>
              }

            </Row>
            :
            <h2 className='tect-center text-warning'>Please Login First to get Projects</h2>
        }

      </div>
    </>
  )
}

export default Projects