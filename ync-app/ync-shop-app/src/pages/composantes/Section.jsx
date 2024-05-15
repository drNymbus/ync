import React , {useState, useContext, useEffect} from "react";
import DataContext from "../context/BrutDataProvider";

import "../style/styles.css";


function CstmSection({page}) {

// State
    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);


// Context
    const { fetchSectionData } = useContext(DataContext);


// Effect
    useEffect(() => {

        const section_data = fetchSectionData(page);

        setImage(section_data.section_data.image);
        setName(section_data.section_data.name);

    }, []);


// Render
    return (

    <div className="custom-section-container">

        { image && <div className="custom-section-image">

            <img src={image} alt="Home Icon" />

        </div> }

        { name && <div className="custom-section-title">

            <p>{name}</p>

        </div> }

    </div>

    );

}

export default CstmSection;
