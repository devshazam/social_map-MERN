import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const Contacts = () => {
    return (
        <>
            <Container>
                <h1 className="mb-3">Контакты</h1>
                <Row className="mb-5">
                    <Col xs={12} md={6}>
                        <strong>Компания:</strong>
                        <br />
                        <div className="address">"KopiPrint"</div>
                        <br />
                        <strong>Телефоны:</strong>
                        <br />
                        <a href='tel:89093802519'>+7(909) 380-25-19</a>
                        <br />
							          <a href='tel:+78442599161'>+7 (8442) 59-91-61</a>
                    </Col>
                    <Col xs={12} md={6}>
                        <strong>Email:</strong>
                        <br />
                        <div className="address"><a title="Email" href="mailto:kopi34@yandex.ru" target="_blank">kopi34@yandex.ru</a></div>
                        <br />
                        <strong>Адреса:</strong>
                        <br />
                        Волгоград, ул. Петропавловская 87
                        <br />
                        Волгоград, ул. Казахская 25
                    </Col>
                </Row>
                {/* TODO - карта яндекс */}
                <div className="contacts__map" id="map">
                  <iframe id="iframe-map" src="https://yandex.ru/map-widget/v1/?um=constructor%3A5c026c8b1d39d8438c5a2f7eca3c7779041f6c19eac5844e20ab76f1c95a0cdd&amp;source=constructor" width="100%" height="400" frameBorder="0"></iframe>
                </div>
            </Container>
        </>
    );
};

export default Contacts;
