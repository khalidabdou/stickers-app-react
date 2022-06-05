import { Row, Col, Button, Nav, Modal, Form, DropdownButton, Dropdown } from 'react-bootstrap'
import React, { Component, useState } from 'react';


function ModelAddPack() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className='me-2' onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose} >

        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Form className='p-4'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Pack Name</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
          <Form.Label>Category</Form.Label>
          <select className="form-select" aria-label="Default select example">
            <option selected="">Category</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </select>
          </Form.Group>


          <Form.Group className="mb-3" controlId="">
            <Form.Label>Stickers</Form.Label>
            <Form.Control type="File" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default ModelAddPack;