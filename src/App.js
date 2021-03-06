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



  const loadAllFavoriteMovies = async() => {
    let listFavoritMovies = await Model.getFavoriteMovies();
    setFavoriteMovies(listFavoritMovies);
    console.log("data");
    console.log(listFavoritMovies);
    
  }




  const addItemHandler = async (info) => {
    // alert("title:" + (info.original_name || info.original_title));
     let resp = await axios.post(`http://localhost:5000/movieinfo`,{
         title: (info.original_name || info.original_title),
         overview: (info.overview || "empty")
     });

      if (resp.data) {
        loadAllFavoriteMovies();
        toast.success("Movie info saved successfully");
      }
  
 }



 const deleteHandler = async (info) => {
  const url = `http://localhost:5000/movieinfo/${info._id}`;

  await axios.delete(url)
    .then(response => {
      loadAllFavoriteMovies();
      toast.info("Movie info REMOVED successfully");
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
 }

  useEffect(() => {
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

      <ResultTable favorites={favoriteMovies} onDeleteHandler={deleteHandler}/>
       
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