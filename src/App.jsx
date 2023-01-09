import { useState , useEffect} from 'react'
import Loader from './Loader'
import './App.css'
import banner from './assets/banner.webp'
import bannerSmall from './assets/banner-small.webp'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import Residentinfo from './Residentinfo'


function App() {
  const [screen,setScreen]=useState(window.innerWidth)
  const [api,setApi]=useState()
  const [loader,setLoader]=useState(true)
  const [input,setInput]=useState("")
  const [search,setSearch]=useState(false)
  const [result, setResult]=useState()
  const [shake,setShake]=useState(false)
  useEffect(()=>{
    let location=Math.round(Math.random()*126)
    fetch(`https://rickandmortyapi.com/api/location/${location}`).then(res=> res.json()).then(res=>{
    setApi(res)
    setTimeout(()=>{setLoader(false)},2000)
  })
  
  },[])

  function filter() {
    
      fetch(`https://rickandmortyapi.com/api/location/?name=${input}`)
      .then(res => res.json()).then(res => {
        setResult(res)
        if (search==true) {
          setSearch(false)
        }else{
          setSearch(true)
        }
      })
  }
  return (
    <>
      {loader==true?(
      <Loader/>
      ):(
      <>
        <header className='hero-banner'>
          {screen<=580?<img src={bannerSmall} alt="" />:<img src={banner} alt="" />}
        </header>
        <main>
          <div className='navbar'>
            <div className='info'>
              <div><span>Nombre:</span><p> {api.name}</p></div>
              <div><span>Tipo:</span><p> {api.type}</p></div>
              <div><span>Dimension:</span><p> {api.dimension}</p></div>
              <div><span>Poblacion:</span><p> {api.residents.length}</p></div>
            </div>
            <div className='search-bar'>
              <input type="text" placeholder='Ubicacion' value={input} onChange={e=>{setInput(e.target.value)}} />
              <button className={shake==true?"shake":""} onClick={()=>{
                if (input!="") {
                  filter()
                }else{
                  setSearch(false)
                  setShake(true)
                  setTimeout(()=>{setShake(false)},1000)
                }
              }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              {search==true?<div className="results">{result.results.map(e=>(<div key={e.id+e.name} onClick={()=>{
                fetch(`https://rickandmortyapi.com/api/location/${e.id}`).then(res=> res.json()).then(res=>{
                  setApi(res)
                  setSearch(false)
                  
                })
              }}>{e.name}</div>))}</div>:<></>}
              
            </div>
          </div>
          <div className="char-list">
          {api.residents.map(e=>(<Residentinfo key={e.image} url={e} Api={api} />))}
          </div>
            
          
        </main>
      </>
      )}
    </>
  )
}

export default App
