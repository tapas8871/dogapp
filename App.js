
import './App.css';
import {Form} from "react-bootstrap"
import { useState ,useEffect} from 'react';
import Axios from "axios"
import{CircularProgress} from 'material-ui/core'

function App() {
  const[breed, setBreed] = useState([])
  const[selectedBreed,setSelectedBreed] = useState("")
  const[images,setImages] = useState()

  useEffect(()=>{
    var URL = "https://dog.ceo/api/breeds/list/all";
    Axios
    .get(URL)
    .then(res =>{
      for(var a in res.data.message){
        if(res.data.message[a].length != 0)
        for( var b in res.data.message[a])
        breed.push(a + "/" + b)
        else
           breed.push(a)
        setBreed(prev =>[...breed])
      }
    }).then((r)=>{
      setSelectedBreed(breed[0])
      loadImages(breed[0]);
    })
  }, [])

   function loadImages(category){
     var URL = `https://dog.ceo/api/breed/${category}/images`;
     Axios
    .get(URL)
    .then(res =>{
      setImages(prev =>[...res.data.message])
      }
    )
   }  
        
   

  return (
    <div className="App">
      {selectedBreed}
       <Form>
         <Form.Group>
           <Form.Control as = "select" onChange = {
             (e) =>{setSelectedBreed(e.target.value);
              setImages([])
              loadImages(selectedBreed)
             }
             } >{
             breed.map(b =>{
               return <option key = {b}>{b}</option> 
             })
           }
             
           </Form.Control>
         </Form.Group>
       </Form>
       {images.length == 0 ?
       (<div className='centre'>
         <CircularProgress/>

       </div>)
        <div className = "image">
        {
          images.map(i =>{
            return (
              <img src={i}/>

            )
           })

       }
        </div>
     
    )  }
  
 
   
  


export default App;
