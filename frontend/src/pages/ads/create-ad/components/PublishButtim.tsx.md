

import Col from "react-bootstrap/Col";


const PublishButtim = (props:any) => {


    // ==========================================================================================================
    return (
        <>
              <Col xs={12} md={6} className='mb-4'>
                    {loading ? 
                        <Button variant="contained" fullWidth color='success' className="publish-button">
                            <Spinner animation="border" />
                        </Button>
                            :
                        <Button variant="contained" fullWidth onClick={sendToServer} color='success' className="publish-button">
                            Опубликовать объявление
                        </Button>
                    }
                    <p className="conditions_par">Нажимая "Опубликовать", Вы соглашаетесь с <a href="/conditions">условиями</a> оказания услуг.</p>
                </Col>
        </>
    );
};

export default PublishButtim;