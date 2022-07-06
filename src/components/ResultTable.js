/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./ResultTable.css";
import DeleteIcon from '@mui/icons-material/Delete';



export default (props) => {

    const deleteItemHandler = (e,item) => {
        props.onDeleteHandler(item);    
      }
    

    return(

        <div className="classResult">
                    <h1>Listas de Favoritos</h1>

            
           <div className="resultTable">
            
                { props.favorites.map((item,key) => {
              
                return(
                    <div key={key} className="resultRow">
                        <p key={key}> {item.title} </p>
                        <div key={key} className="trashIcon" onClick={((e) => deleteItemHandler(e,item))}>
                         
                            <DeleteIcon style={{fontSize: 30}} />
                         
                        </div>    
                    </div>

                );
               
                })}

            </div>

           
        </div>


    );

}