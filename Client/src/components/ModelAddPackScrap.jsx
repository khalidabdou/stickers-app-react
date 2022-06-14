import { Row, Col, Button, Nav, Modal, Form, Alert } from 'react-bootstrap'
import React, { Component, useState } from 'react';
import stickersService from '../services/stickers.service';


function ModelAddPack(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [respo, setRespo] = useState('');

  const [packUrl, setPackUrl] = useState();

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

  const handleChangePackUrl = e => {
    setPackUrl(e.value);
    if (e.value === "") {
      setDisabled(true);
    } else setDisabled(false);
  }

  function addPackScrap() {
    setRespo('wait for response');
    const formData = new FormData();
    formData.append('packName', packName);
    formData.append('sticker_url', packUrl);
    formData.append('categoryId', props.category.id);
    formData.append('animated', animated);
    stickersService.scrap(formData).then(response => {
      setRespo(response.data);
      setPackUrl('');
    }
    )
  }

  const animate = (e) => {
    console.log(e.target.value);
    setAnimated(e.target.value);
  }

  function alert() {
    if (respo === "") {
      return null;
    }else if (respo === "wait for response") {
    return <Alert key='0' variant='success' className='d-flex align-items-center'>{respo} 
    <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </Alert>
  }else if (respo === "success") {
    return <Alert key='0' variant='success' className='d-flex align-items-center'>{respo}
    </Alert>
  }
  else if (respo.includes("error")) {
    return <Alert key='0' variant='danger' className='d-flex align-items-center'>{respo}
    </Alert>
  }
  }

  return (
    <>
      <Button variant="info" className='me-2' onClick={handleShow}>
        Scrap
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Pack url</Form.Label>
            <Form.Control type="text" placeholder="Enter pack url" onChange={e => handleChangePackUrl(e.target)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>category {props.category.id}</Form.Label>
            <Form.Control type="email" placeholder="Enter pack name" disabled value={props.category.name} />
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
          <Button type='submit' variant="primary" disabled={disabled} onClick={addPackScrap}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelAddPack;