import { Row, Col, Button, Nav, Modal, Form } from 'react-bootstrap'
import React, { Component, useState } from 'react';
import stickersService from "../services/stickers.service";

function DialogAddCat() {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const handleChange = e => {
    setCategory(e.value);
  };
  let handleChangeFile = e => {
    var file = e.target.files[0];
    console.log(file.name);
    setImage(file.name);
  };

  function addCat() {
    stickersService.addCat({category,image}).then(response => { })
  }



  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose} >

        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Form className='p-4'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" placeholder="Name" value={category} onChange={event => handleChange(event.target)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control type="File" maxLength={1} required accept='image/*' onChange={e => handleChangeFile(e)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addCat}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default DialogAddCat;