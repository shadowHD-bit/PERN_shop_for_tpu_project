import './brands.scss';
import CardBrands from './brandsCard';
import Carousel from 'react-bootstrap/Carousel'


function brands() {
    return (
      <div className="brands">
            <div className='titlePopular'>
              <h3 className='title text-center'>Сотрудничество с брендами</h3>
              <h3 className='title_arrow text-center'>________________________________</h3>
          </div>


        <Carousel indicators={false} variant='dark'>
            <Carousel.Item>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-md-1'></div>
                    <div className='col-md-2'><CardBrands /></div>
                    <div className='col-md-2'><CardBrands /></div>
                    <div className='col-md-2'><CardBrands /></div>
                    <div className='col-md-2'><CardBrands /></div>
                    <div className='col-md-2'><CardBrands /></div>
                    <div className='col-md-1'></div>
                </div>
            </Carousel.Item>

            <Carousel.Item>
            <div className='row justify-content-center align-items-center'>
                    <div className='col-md-1'></div>
                    <div className='col-md-2'><CardBrands /></div>
                    <div className='col-md-2'><CardBrands /></div>
                    <div className='col-md-2'><CardBrands /></div>
                    <div className='col-md-2'><CardBrands /></div>
                    <div className='col-md-2'><CardBrands /></div>
                    <div className='col-md-1'></div>
                </div>
            </Carousel.Item>

        </Carousel>
  
      </div>
    );
  }
  
  export default brands;
  