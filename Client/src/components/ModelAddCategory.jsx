import { Alert, Col, Button, Nav, Modal, Form } from 'react-bootstrap'
import React, { Component, useState } from 'react';
import stickersService from "../services/stickers.service";
import axios from "axios";
function DialogAddCat() {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [respo, setRespo] = useState('');
  const [category, setCategory] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");


  const handleChange = e => {
    setCategory(e.value);
    if (e.value === "") {
      setDisabled(true);  
    }else setDisabled(false);  
  };


  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };



  function onFileUpload() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append('category', category);
    stickersService.upload(formData).then(response => {
      console.log(response);
      setCategory('')
     
      setDisabled(true);      
      setRespo(response.data)
    })

  };



  function alert() {
      return <Alert key='0' variant='success'>{respo}</Alert>
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
            <Form.Control type="text" required placeholder="Name" value={category} onChange={event => handleChange(event.target)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" maxLength={9} required accept='image/*' onChange={saveFile} />
          </Form.Group>
          {alert()}

          <Button type='button' variant="primary" disabled={disabled} onClick={onFileUpload}>
            Save Changes
          </Button>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default DialogAddCat;