import './news.scss';
import Carousel from 'react-bootstrap/Carousel'
import CardNews from './newsCard';

function news() {
    return (
      <div className="news">
            <div className='titlePopular'>
              <h3 className='title text-center'>Последнии новости влога...</h3>
              <h3 className='title_arrow text-center'>________________________________</h3>
          </div>

          <Carousel indicators={false}>
            <Carousel.Item>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-md-1'></div>
                    <div className='col-md-3'><CardNews /></div>
                    <div className='col-md-3'><CardNews /></div>
                    <div className='col-md-3'><CardNews /></div>
                    <div className='col-md-1'></div>
                </div>
            </Carousel.Item>

            <Carousel.Item>
            <div className='row justify-content-center align-items-center'>
                    <div className='col-md-1'></div>
                    <div className='col-md-3'><CardNews /></div>
                    <div className='col-md-3'><CardNews /></div>
                    <div className='col-md-3'><CardNews /></div>
                    <div className='col-md-1'></div>
                </div>
            </Carousel.Item>

        </Carousel>
  
      </div>
    );
  }
  
  export default news;
  