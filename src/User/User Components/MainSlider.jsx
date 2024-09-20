import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../User CSS/MainSlider.css';

export default function MainSlider() {
  return (
    <>
      <Container fluid className="SliderContainer">
        <Row className="align-items-center row">
          <Col md={7} className="heroTextContainer">
            <h1 className="heroTitle">Find a Job that Suits Your Interests & Skills</h1>
            <p className="heroSubtitle">
              Discover thousands of opportunities across industries. Start your journey now and shape your future!
            </p>
            <button className="heroButton">FIND JOBS</button>
          </Col>
          <Col md={5} className="heroImgContainer"></Col>
        </Row>
      </Container>
    </>
  );
}
