import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const SearchMovie = ({onSearch}) =>{

    const[searchKey,setSearchKey] = useState("")

    const handleInputChange = (event) => {
        setSearchKey(event.target.value);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchKey);
        setSearchKey('')
      };
    return(
    <>
        <form onSubmit={handleSubmit} style={{margin:10 ,color:'black', fontFamily:'Arial, Helvetica, sans-serif;'}}>
        <div className="search_btn">
        <input style={{color:'black'}}
        type="text"
        value={searchKey}
        onChange={handleInputChange}
        placeholder="Buscar película"
         ></input>
        </div>

        </form>
     </>

    )
}


export default SearchMovie