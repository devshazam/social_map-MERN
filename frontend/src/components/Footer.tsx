import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Footer(){
    return (
	<>
<footer>
		<Container>
            
            <Row>
              <Col xs={12} lg={3}>
			  <div className="column">
							<p className="heading">Документы:</p>
							<ul>
							<li><a href="/oferta">Договор офетры</a></li></ul>
						</div>
              </Col>
              <Col xs={12} lg ={3}>
			  <div className="column">
							<p className="heading"><a className="sjdkit" href="https://seo-cy.ru/">Разработка сайтов</a></p>
								<ul>
							<li>Технология @Jack_Lee</li></ul>

						</div>
              </Col>
			  <Col xs={12} lg ={3}>
			  <div className="column">
				
							<p className="heading">Адреса:</p>
							<ul><li className="hr">ул. Петропавловская 87</li>
							<li className="hr">ул. Казахская 25 </li>
							<li className="hr">ул. 2-я Динамовская д. 6 (производство)</li>
</ul>
						</div>		
              </Col>
			  <Col xs={12} lg ={3}>
			  <div className="column">
							<p className="heading">Контакты:</p>
							<ul>
							<li>Email: <a  href="mailto:<a href='mailto: info@kopi34.ru">kopi34@yandex.ru</a></li>
							<li>Тел: <a href='tel:89093802519'>+7(909) 380-25-19</a></li>
							<li>Тел: <a href='tel:+78442599161'>+7 (8442) 59-91-61</a></li></ul>
							<p>График работы с 09:00 до 19:00</p>
						</div>
              </Col>
            </Row>
			<p >2023 © Копи-Принт - полиграфические услуги. Фирма работает с 2011г.</p>
          </Container>
		  </footer>

	  </>

		  

        
    );
};

export default Footer;