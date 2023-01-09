import {MutatingDots} from 'react-loader-spinner'
import ram from './assets/tt.png'
import './Loader.css'
function Loader(params) {
    return (
       <div className='Loader'>
         <MutatingDots 
        height="100"
        width="100"
        color="#bdffa6"
        secondaryColor= '#bdffa6'
        radius='12.5'
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass="svg"
        visible={true}
        />
         <img className='loaderimg' src={ram} alt="" />
       </div>
        


      )
}
export default Loader