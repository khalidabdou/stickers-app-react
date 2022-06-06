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
  const [image, setImage] = useState('');
  const [selectedFile, setSeletedFile] = useState(null);
  const [disabled, setDisabled] = useState(true);


  const handleChange = e => {
    setCategory(e.value);
    
    if (e.value === "") {
      setDisabled(true);  
    }else setDisabled(false);
    
  };
  let handleChangeFile = e => {
    var file = e.target.files[0];
    console.log(file.name);
    setImage(file.name);
  };

  function addCat() {

    stickersService.addCat({ category, image }).then(response => {
      setRespo(response.data);
      setCategory('');
      setImage('');
      const formData = new FormData();
      // Update the formData object 
      formData.append(
        "fileuplaod",
        selectedFile,
        selectedFile.name
      );
      console.log(response.data, formData);
    })
  }
  function onFileChange(event) {
    // Update the state 

    setSeletedFile(event.target.files[0]);
    //this.setState({ selectedFile: event.target.files[0] }); 
  };

  function onFileUpload() {
    // Create an object of formData 
    const formData = new FormData();

    // Update the formData object 
    formData.append("file", selectedFile);
    formData.append("fileName", selectedFile.name);
    formData.append("name", category);
    console.log(formData.get("fileName"));
    stickersService.upload(formData).then(response => {
      console.log(response);
      setCategory('')
      setSeletedFile(null)
   
      setDisabled(true);  
      
      setRespo(response.data)
    })



    // Details of the uploaded file 
    //stickersService.upload(formData)

    // Request made to the backend api 
    // Send formData object 
    //axios.post("upload", formData); 
  };

  function fileData() {
    if (selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  function alter() {
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
            <Form.Control type="text" placeholder="Name" value={category} onChange={event => handleChange(event.target)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control type="File" maxLength={9} required accept='image/*' onChange={e => onFileChange(e)} />
          </Form.Group>
          {alter()}
          {fileData()}
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={disabled} onClick={onFileUpload}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default DialogAddCat;