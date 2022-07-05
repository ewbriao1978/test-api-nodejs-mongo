/* eslint-disable import/no-anonymous-default-export */
import React,  { useState } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';



export default (props) => {

    const [scrollX,setScrollX] = useState(0);
    const [info, setInfo] = useState(null);


    const handleLeftArrow = () => {

        let x = scrollX + Math.round(window.innerWidth /2);
        if (x>0){
            x=0;
        }
        setScrollX(x);

    }


    const handleRightArrow = () => {

        let x = scrollX - Math.round(window.innerWidth /2);
        let listW = props.items.results.length * 150;
        if ((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);

    }

  const onAddItemHandler = (e,item) => {
    props.onAddItemHandler(item);

  }

    return (
        
        <div className="movieRow">
            <h2>{props.title}</h2>


            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>





            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{

                    marginLeft: scrollX,
                    width: props.items.results.length * 150
                
                
                }}>
                {props.items.results.length > 0 && props.items.results.map((item, key)=>(

                    <div key={key} className="movieRow--item" onClick={((e) => onAddItemHandler(e,item))} >

                       <img alt={item.original_title} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}/>
                       
                    </div>

                ))}
                </div>
            </div>

        </div>

    );
}