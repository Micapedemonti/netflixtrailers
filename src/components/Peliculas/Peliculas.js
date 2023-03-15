import { useEffect,useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import './Peliculas.css';
import logo from "../../logo-netflix.png"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchMovie from "../SearchMovie/SearchMovie";


const Peliculas = () =>{
// const apiUrl= "https://api.themoviedb.org/3";
const apiUrl ="https://api.themoviedb.org/3"
const api_Key="3856a59021f3204b5e5eea09bd7e9329";
const imagePath="https://image.tmdb.org/t/p/original";
const urlImage="https://image.tmdb.org/t/p/original";


//variables de estado

const[movies,setMovies]=useState([])

const[trailer, setTrailer]=useState(null)
const[movie, setMovie]=useState({title: "Loading Movies"})
const[playing, setPlaying]=useState(false)

//funcion para realizar la peticion por get a la api

const fetchMovies = async(searchKey) =>{
  const type = searchKey ? "search":"discover"
  const {data:{results},
}=await axios.get (`${apiUrl}/${type}/movie`,{
  params:{
    api_key:api_Key,
    query:searchKey,
  },
});


setMovies(results)
setMovie(results[0])

//Del resultado de la coleccion traera del primero su id
if (results.lenght){
  await fetchMovie(results[0].id)
}
}

//funcion para la peticion de un solo objeto y mostrar en reproductor de video
const fetchMovie = async(id) =>{
const {data}= await axios.get(`${apiUrl}/movie/${id}`,{
  params:{
    api_key: api_Key,
    append_to_response:"videos"
  }
})


// si existe el video y existe el resultado entonces retornamos el trailer
if (data.videos && data.videos.results){
  const trailer = data.videos.results.find (
    (vid)=> vid.name === "Official Trailer"
  );
  setTrailer(trailer ? trailer : data.videos.results[0])
}
setMovie(data)
}


const selectMovie = async(movie)=>{
  fetchMovie(movie.id)
  setMovie(movie)
  window.scrollTo(0,0)
}

useEffect(()=>{
  fetchMovies()
},[])

return (

  //contenedor que mostrara las peliculas actuales
  <div className="body-container">

    {/* buscador */}
    <div className="container-form" >
    <div className='logo'>
    <img src={logo} width="200" height="50" className='logo_img' alt="logo" />
   </div>
   <SearchMovie onSearch={fetchMovies}/>
    </div>

    {/* aqui va todo el contenedordel banner y del reproductor de video */}


    <div>
      <main>
        {movie ? (
          <div
            className="viewtrailer" style={{ height:'80vh',
              backgroundImage: `url("${imagePath}${movie.backdrop_path}")`,
              }}
            >
          {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductorContainer"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container-trailer">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton-trailer"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                          <PlayArrowIcon fontSize="large"/>
                        Play Trailer

                      </button>
                    ) : (
                     <h1 style={{color:'rgba(230, 9, 19, 1)', fontSize:'20px'}}> Sorry, no trailer available</h1>
                    )}
                    <div className="trailer-info">
                    <h1 className="text-white">{movie.title}</h1>
                    <p className="text-white" >{movie.overview}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>
    <h2 className="text-center mt-5 mb-5" style={{color:'white'}}>Trailer Movies</h2>
    <div className="row">
      {movies.map((movie=>(
       <div key={movie.id} className="col-md-4 mb-3" onClick={()=>selectMovie(movie)}>
          <img src ={`${urlImage + movie.poster_path}`} alt=""height={600}width="100%"/>
          <h2  style={{color:'white', fontFamily:'Arial, Helvetica, sans-serif',fontSize:'20px'}}>{movie.title}</h2>
       </div>

      )))}
    </div>
  
  </div>
)

}

export  default Peliculas