import React, {useState, useEffect} from "react";
import "../../style/styles.css";


function CstmIncrementationPanier({ icone, nombre, nbrIncrementationMax }) {

// State
    const [nbrIcones, setNbrIcones] = useState(1);

    
// Function
    const handleIncrement = () => {
        if (nbrIcones < nbrIncrementationMax) {
            setNbrIcones(nbrIcones + 1);
        }
    };
  
    const handleDecrement = () => {
        if (nbrIcones > 1) {
            setNbrIcones(nbrIcones - 1);
        }
    };


// useContext Hook
    useEffect(() => {  
        setNbrIcones(nombre);
    }, []);

    // useEffect(() => {  
    //     setNbrIcones(nombre);
    // }, []);


// Render    
    return (

        <div>

            <div>
                {[...Array(nbrIcones)].map((_, index) => (
                    <img key={index} src={icone} alt="icone_article" style={{ width: "30px", height: "30px", marginRight: "5px" }} />
                ))}
            </div>
            
            <button onClick={handleIncrement} disabled={nbrIcones === 5}>+</button>
            <button onClick={handleDecrement} disabled={nbrIcones === 1}>-</button>
        
        </div>

    );

}

export default CstmIncrementationPanier;
