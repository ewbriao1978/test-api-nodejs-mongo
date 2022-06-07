/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';


export default() => {


  const [movieList, setMovieList] = useState([]);


  useEffect(() => {
    const loadAll = async () => {

      let list = await Tmdb.getHomeList();
      setMovieList(list);
      
    }

    loadAll();

  },[]);
  


  return(
    <div className="page">
       
       <section className="lists">
         {movieList.map((item, key) => (
           <div>

             <MovieRow key={key} title={item.title} items={item.items}/>

           </div>
         ))}
       </section>

      
       {movieList.length <=0 &&

          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
          </div>
       }


    </div>

  );


}