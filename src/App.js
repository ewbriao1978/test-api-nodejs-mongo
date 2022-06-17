/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import ResultTable from './components/ResultTable';
import Model from './Model';


export default() => {


  const [movieList, setMovieList] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(()=>{
    const loadAllFavoriteMovies = async() => {
      console.log("entered");
      let listFavoritMovies = await Model.getFavoriteMovies();
      console.log("get all data");
      setFavoriteMovies(listFavoritMovies);
      console.log("data");
      console.log(listFavoritMovies);
      
    }
    loadAllFavoriteMovies();
  },[])


  useEffect(() => {
    const loadAll = async () => {

      let list = await Tmdb.getHomeList();
      setMovieList(list);
      
      
    }

    loadAll();
    //

  },[]);
  


  return(
    <div className="page">
      <ResultTable favorite={favoriteMovies} />
       
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