import React from "react";
import { Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Image from "react-bootstrap/Image";

export default function Home() {
    return (
        <>
            <Container>
                <Carousel
                    data-bs-theme="dark"
                    className="mb-5 d-none d-sm-block"
                >
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/file/main-banner/banner-2.jpg"
                            alt="First slide"
                        />
                        {/* <Carousel.Caption>
          <h3>Полиграфия в Волгограде!</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/file/main-banner/banner-1.jpg"
                            alt="Second slide"
                        />
                        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
                    </Carousel.Item>
                </Carousel>

                <Row className="mb-5">
                    <Col xs={12} sm={6} lg={3} className="mb-3">
                        <a href="/produce/banner">
                            <Image
                                src="/file/home/banner.jpg"
                                thumbnail
                                className="img-mob"
                            />
                        </a>
                    </Col>
                    
                    <Col xs={12} sm={6} lg={3} className="mb-3">
                        <a href="/produce/samokleyka">
                            <Image
                                src="/file/home/samokleyky.png"
                                thumbnail
                                className="img-mob"
                            />
                        </a>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className="mb-3">
                        <a href="/3d-details">
                            <Image
                                src="/file/home/3d.jpg"
                                thumbnail
                                className="img-mob"
                            />
                        </a>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className="mb-3">
                        <a href="/produce/vizitki">
                            <Image
                                src="/file/home/vizitki.jpg"
                                thumbnail
                                className="img-mob"
                            />
                        </a>
                    </Col>
                </Row>

                <h2>Все скидки Красноармейского района!</h2>


                {/* TODO - карта яндекс */}
                <div className="contacts__map" id="map">
                  <iframe id="iframe-map" src="https://yandex.ru/map-widget/v1/?um=constructor%3A5c026c8b1d39d8438c5a2f7eca3c7779041f6c19eac5844e20ab76f1c95a0cdd&amp;source=constructor" width="100%" height="400" frameBorder="0"></iframe>
                </div>

            </Container>
        </>
    );
}
