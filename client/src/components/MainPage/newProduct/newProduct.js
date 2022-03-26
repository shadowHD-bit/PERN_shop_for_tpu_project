import './newProduct.scss';

import NewCard from './newproductCard';

function newProduct() {
    return (
      <div className="newProduct">
        <div className='titlePopular'>
              <h3 className='title text-center'>Скоро в наличии...</h3>
              <h3 className='title_arrow text-center'>________________________</h3>
          </div>
          <div className='container'>
              <div className='row'>
                  <div className='col-4'>
                    <NewCard />
                  </div>

                  <div className='col-4'>
                  <NewCard />
                  </div>

                  <div className='col-4'>
                  <NewCard />
                  </div>
              </div>
          </div>
      </div>
    );
  }
  
  export default newProduct;
  