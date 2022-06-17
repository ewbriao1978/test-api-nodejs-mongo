/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";



export default {
    getFavoriteMovies: async () => {
        await console.log("getFavoriteMovies");
        let result = await axios.get(`http://localhost:5000/movieinfo`);
        await console.log("getFavoriteMovies - exit");
        return result.data;
    }

  
}