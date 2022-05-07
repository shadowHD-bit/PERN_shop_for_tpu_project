import MainSlider from './sliderMain/slider';
import PopularSlider from './SliderPopularProduct/SliderPopularSection';
import LightBox from './lightbox/lightbox';
import NewProduct from './newProduct/newProduct';
import News from './newsSlider/news';
import Brands from './brands/brands';
import { observer } from 'mobx-react-lite';


const mainPage = observer(() => {
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
  })

export default mainPage;