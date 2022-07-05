/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import ResultTable from './components/ResultTable';
import Model from './Model';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default() => {


  const [movieList, setMovieList] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);



  const addItemHandler = async (info) => {
     alert("title:" + (info.original_name || info.original_title));
     let resp = await axios.post(`http://localhost:5000/movieinfo`,{
         title: (info.original_name || info.original_title),
         overview: (info.overview || "empty")
     });

      if (resp.data) toast.success("Movie info saved successfully");
    
  
 }



  useEffect(() => {
    const loadAllFavoriteMovies = async() => {
      console.log("entered");
      let listFavoritMovies = await Model.getFavoriteMovies();
      console.log("get all data");
      setFavoriteMovies(listFavoritMovies);
      console.log("data");
      console.log(listFavoritMovies);
      
    }
    loadAllFavoriteMovies();

    const loadAll = async () => {

      let list = await Tmdb.getHomeList();
      setMovieList(list);
      
      
    }

    loadAll();
    //

  },[]);
  


  return(
    <div className="page">
      <ToastContainer autoClose={800}/>

      <ResultTable favorites={favoriteMovies} />
       
       <section className="lists">
         {movieList.map((item, key) => (
           <div>

             <MovieRow key={key} item={item} title={item.title} items={item.items} favorites={favoriteMovies} onAddItemHandler={addItemHandler}/>

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