import { useState , useEffect} from 'react'
import circle from './assets/circle.png'
import {ThreeDots} from 'react-loader-spinner'

function Residentinfo({url,Api,key}) {
    const [api,setApi]=useState()
    const [loader,setLoader]=useState(true)
    useEffect(()=>{
        setLoader(true)
        fetch(url).then(res=> res.json()).then(res=>{
        setApi(res)
        setTimeout(()=>{setLoader(false)},1000)
      })
      
      },[Api])

    return(
        <div className="character" key={key}>
            {loader==true?
            (<ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#4fa94d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
                 />):(
                    <>
                        <div className="status">
                        <div className={api?.status=="Dead"?"light__red":api?.status=="Alive"?"light__green":"light__gray"}></div>
                        <p>{api?.status}</p>
                        </div>
                        <div className="char_img">
                        <img className='img'  src={api?.image} alt="" />
                        </div>
            
                        <p>Nombre: {api?.name}</p>
                        <p>Especie: {api?.species}</p>
                        <p>Genero: {api?.gender}</p>
                        <p>Origen: {api?.origin.name}</p>
                        <p>Episodios: {api?.episode.length}</p>
                    </>
                 )}
            
        </div>
    )
}
export default Residentinfo