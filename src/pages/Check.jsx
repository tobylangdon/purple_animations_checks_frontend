import { useState, useEffect } from "react";
import axios from 'axios'


export default function Check(){
    const [allData, setAllData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/anim')
            .then((res) => {
                console.log(res.data)
                setAllData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return(<div>
           {allData.map((d) => {
            return(
                <>
                    <img width='20%' src={`images/${d.image_id}.gif`}/>
                    <p>Anim ID : {d.anim_id}</p>
                
                </>

            )
           })} 

    </div>)


}