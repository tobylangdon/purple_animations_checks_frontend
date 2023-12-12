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
                <div className='checkCont'>
                    <img width='20%' src={`https://ipfs.filebase.io/ipfs/QmVatn6pGcc1vtygFhaCGYoKBTG8p2XfUMwZmfwNSh7umu/${d.image_id}.gif`}/>
                    <img width='20%' src={`normal/${d.anim_id}.gif`}/>
                
                </div>

            )
           })} 

    </div>)


}