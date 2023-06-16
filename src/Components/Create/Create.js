import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { addDoc,collection } from 'firebase/firestore';
import {firebaseContext,AuthContext} from '../../store/FirebaseContext'
import { uploadBytes ,getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { ref } from 'firebase/storage';


const Create = () => {
  const navigate=useNavigate()
  const {db,storage}=useContext(firebaseContext)
  const {user}=useContext(AuthContext)
  const[name,setName]=useState('')
  const [category,setCategory]=useState('')
  const[price,setPrice]=useState('')
  const[image,setImage]=useState(null)
  const date = new Date().toDateString()
  const handleSubmit=(e)=>{
    e.preventDefault()
  
  const storageRef = ref(storage,'Images/'+image.name)
  
    uploadBytes(storageRef,image).then((reference)=>{
      console.log('fghjk');
        getDownloadURL(reference.ref).then((url)=>{
          console.log(url);
            addDoc(collection(db,'products'),{
                name,
                category:category,
                price,
                url,
                userId:user.uid,
                createdAt:date
            }).then(()=>{
                navigate('/')
            })
        })
    })
    }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" value={price} onChange={(e)=>setPrice(e.target.value)} name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image) :'' }></img>
          <form>
            <br />
            <input
            onChange={(e)=>{
              setImage(e.target.files[0])
            }}
             type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn" type='submit'>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
