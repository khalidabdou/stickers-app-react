import { Row, Col, Button, Nav, Modal, Form, Alert } from 'react-bootstrap'
import React, { Component, useState } from 'react';
import stickersService from '../services/stickers.service';


function ModelAddPack(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [respo, setRespo] = useState('');

  const [file, setFile] = useState();
  const [tray, settray] = useState();
  const [animated, setAnimated] = useState(0);
  const [packName, setPackName] = useState("")
  const [disabled, setDisabled] = useState(true);

  const handleChangePackName = e => {
    setPackName(e.value);
    console.log(packName);
    if (e.value === "") {
      setDisabled(true);
    } else setDisabled(false);
  };

  function addPack() {
    const formData = new FormData();
    let stickers = [];

    for (let i = 0; i < file.length; i++) {

      formData.append(`file`, file[i])
    }

    formData.append(`tray`, tray);

    //formData.append("file", file);
    formData.append('packName', packName);
    formData.append('categoryId', props.category.id);
    formData.append('animated', animated);
    stickersService.uploadStikcers(formData).then(response => {
      setRespo(response.data);
      setPackName('');
    })
  }

  const saveFile = (e) => {
    setFile(e.target.files);
  };

  const trayImage = (e) => {
    console.log(e.target.files[0]);
    settray(e.target.files[0]);
  }

  const animate = (e) => {
    console.log(e.target.value);
    setAnimated(e.target.value);
  }

  function alert() {
    return <Alert key='0' variant='success'>{respo}</Alert>
  }

  return (
    <>
      <Button variant="primary" className='me-2' onClick={handleShow}>
        Add Pack
      </Button>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Form className='p-4'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Pack Name</Form.Label>
            <Form.Control type="text" placeholder="Enter pack name" onChange={e => handleChangePackName(e.target)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>category {props.category.id}</Form.Label>
            <Form.Control type="email" placeholder="Enter pack name" disabled value={props.category.name} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="">
            <Form.Label>Tray image </Form.Label>
            <Form.Control type="File" accept='image/png' required onChange={trayImage} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Stickers</Form.Label>
            <Form.Control type="File" accept='image/webp' required multiple onChange={saveFile} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
          <Form.Label>is animated</Form.Label>
            <Form.Select className='mb-3' aria-label="Default select example" onChange={animate}>
              <option value="" disabled selected>is Animated</option>
              <option value="1">YES</option>
              <option value="0">NO</option>
            </Form.Select>
          </Form.Group>
          {alert()}
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="primary" disabled={disabled} onClick={addPack}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelAddPack;