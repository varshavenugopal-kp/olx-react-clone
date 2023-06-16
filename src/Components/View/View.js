import React,{useEffect,useState,useContext} from 'react';
import {PostContext} from '../../store/postContext'

import './View.css';
import { firebaseContext } from '../../store/FirebaseContext';
import {   collection, getDocs, query, where } from 'firebase/firestore';

function View() {
  const[userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(PostContext)
  const {firebase}=useContext(firebaseContext)
  const {db} = useContext(firebaseContext)
  useEffect(()=>{
    
    const userQuery=query(
        collection(db,'users'),
        where('id','==',postDetails.userId)
    )
    getDocs(userQuery).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            setUserDetails(doc.data())
        })
    })
   
},[postDetails.userId])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
