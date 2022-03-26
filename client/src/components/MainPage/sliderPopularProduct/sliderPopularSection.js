import 'bootstrap/dist/css/bootstrap.min.css';
import './sliderPopular.scss';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel'

import CardPopular from './сard';


function sliderPopular() {
    return (
      <div className="sliderPopular">
          <div className='titlePopular'>
              <h3 className='title text-center'>Популярные товары</h3>
              <h3 className='title_arrow text-center'>________________________</h3>
          </div>
        
        <div className='card_popular'>

        <Carousel indicators={false} variant='dark'>
        <Carousel.Item>
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-2'><CardPopular /></div>
                <div className='col-md-2'><CardPopular /></div>
                <div className='col-md-2'><CardPopular /></div>
                <div className='col-md-2'><CardPopular /></div>
                <div className='col-md-2'></div>
            </div>
        </Carousel.Item>

        <Carousel.Item>
        <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-2'><CardPopular /></div>
                <div className='col-md-2'><CardPopular /></div>
                <div className='col-md-2'><CardPopular /></div>
                <div className='col-md-2'><CardPopular /></div>
                <div className='col-md-2'></div>
            </div>
        </Carousel.Item>

        </Carousel>

        
        </div>

      </div>
    );
  }
  
export default sliderPopular;
  