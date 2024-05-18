import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <>
      <div>
        <Row className='d-flex justify-content-between bg-light p-4'>
          <Col>
            <h3>Project Fair 2024</h3>
            <p style={{ textAlign: 'justify' }}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, molestias, hic reiciendis ipsa facilis quasi fugit, eum tempore fugiat maxime repudiandae soluta vitae omnis. Iure maxime magni aspernatur quidem veritatis.</p>
          </Col>
          <Col className='d-flex flex-column align-items-center'>
            <h3 className='mb-3'>Links</h3>
            <Link className='mb-2' to={'/'}>Landing</Link>
            <Link className='mb-2' to={'/auth'}>Login</Link>
          </Col>
          <Col className='d-flex flex-column'>
            <h3 className='mb-3'>References</h3>
            <a href="https://react-bootstrap.netlify.app/" target='_blank' className='mb-2'>React Bootstrap</a>
            <a href="https://react.dev/" target='_blank' className='mb-2'>React</a>
          </Col>
        </Row>
        <h6 className='text-center mt-2'>Project Fair 2024 &copy; All rights reserved.</h6>
      </div>
    </>
  )
}

export default Footer