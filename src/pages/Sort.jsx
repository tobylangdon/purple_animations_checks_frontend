import { useState, useEffect } from "react";
import styles from './Sort.module.css'
import axios from 'axios'

export default function Sort(){
    const [prevNumber, setPrevNumber] = useState()
    const [currImage, setCurrImage] = useState(0);
    const [isShark, setIsShark] = useState(false)
    const [currInput, setCurrInput] = useState()
    const [arr, setArr] = useState([])
    const [allData, setAllData] = useState([])

    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(allData)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";
    
        link.click();
      };




    const getData=()=>{
        fetch(`data.json`
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            
            
            
            return response.json()
          })
          .then(function(response) {
            // console.log(response.data)
            if(response.data[currImage].attributes[1].value === 'Shark'){
                setIsShark(true)
            }
            else{
                setIsShark(false)
            }
          });
      }

    useEffect(() => {
        axios.get('https://purple-check-backend.onrender.com/api/anim')
            .then((res) => {
                console.log(res.data)
                setCurrImage(res.data.length)
                setAllData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const sendToDatabase = async (image_id, anim_id) => {
        await axios.post('https://purple-check-backend.onrender.com/api/anim', {image_id, anim_id})
            .then((res) => {
                console.log(res.data)
                setAllData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleInput = (e) => {
        console.log(arr)
        if(e.target.value !== ''){
            console.log(e.currentTarget.value)
            setCurrInput(e.currentTarget.value)
            
            setCurrImage(currImage + 1)
            setArr((prev) => [...prev, e.target.value])
            sendToDatabase(currImage, e.target.value)
        }
        
    }
    
    
    useEffect(() => {
        // setPrevv(currInput)
        getData()
        setCurrInput('')
    }, [currInput])

    useEffect(() => {
        getData();
    }, [currImage])



    return(
    <><div className={styles.main}>
            <div className={styles.left}>
                <img className={styles.imageToCheck} src={`https://ipfs.filebase.io/ipfs/QmVatn6pGcc1vtygFhaCGYoKBTG8p2XfUMwZmfwNSh7umu/${currImage}.gif`}/>
                <div className={styles.arrows}>
                    {/* <p>{arr[arr.length - 2 ]}</p> */}
                    <button onClick={() => setCurrImage(currImage - 1)}>Back</button>
                    <button onClick={() => setCurrImage(currImage + 1)}>Forward</button>
                </div>
                <input type='number' value={currInput} onChange={handleInput}/>
                <p>Image ID: {currImage}</p>
                <p>Animation ID: {allData[currImage]?.anim_id}</p>
            </div>
            <div className={styles.right}>
                <img src={`normal/${isShark ? 'shark_white' : ''}1.gif`}/>
                <img src={`normal/${isShark ? 'shark_white' : ''}2.gif`}/>
                <img src={`normal/${isShark ? 'shark_white' : ''}3.gif`}/>
                <img src={`normal/${isShark ? 'shark_white' : ''}4.gif`}/>
                <img src={`normal/${isShark ? 'shark_white' : ''}5.gif`}/>
                <img src={`normal/${isShark ? 'shark_white' : ''}6.gif`}/>


            </div>
            



        </div>
        <p style={{margin: 'auto', textAlign: 'center'}}>{allData.length} / 4000</p>


        <input onChange={(e) => setCurrImage(e.target.value)}  type='number' placeholder="go to id"></input>
        
        <button style={{margin: '10px'}} onClick={exportData}>Download data</button>
        </>)
    


}