import MainSlider from './sliderMain/slider';
import PopularSlider from './sliderPopularProduct/sliderPopularSection';
import LightBox from './lightbox/lightbox';
import NewProduct from './newProduct/newProduct';
import News from './newsSlider/news';
import Brands from './brands/brands';


function mainPage() {
    return (
        <div className='mainPage'>
            <MainSlider />
            <LightBox/>
            <PopularSlider />
            <NewProduct />
            <News />
            <Brands />
        </div>
    );
  }

export default mainPage;