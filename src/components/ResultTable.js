/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./ResultTable.css";



export default (props) => {



    return(

        <div className="classResult">
                    <h1>Listas de Favoritos</h1>

            
           <div className="resultTable">
            
                { props.favorites.map((item,key) => {
              
                return(
                    <div key={key} className="resultRow">
                        <p key={key}> {item.title} </p>
                    </div>

                );
               
                })}

            </div>

           
        </div>


    );

}