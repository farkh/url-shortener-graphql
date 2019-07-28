import React from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

const NotFound = () => {
    return (
        <Container>
            <Row>
                <Col xs="12" md={{ size: 10, offset: 1 }} style={{ marginTop: 100 }}>
                    <img
                        src="https://vignette.wikia.nocookie.net/lucifer/images/6/65/Lucifer_Devil_Form_Season_4_Finale.png/revision/latest?cb=20190508204112"
                        alt=""
                        style={{ maxWidth: '100%' }}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs="12" md={{ size: 6, offset: 3 }} style={{ textAlign: 'center', paddingTop: 20 }}>
                    <h1>404</h1>
                    <h3>YOU DO NOT BELONG HERE! GO HOME!</h3>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
