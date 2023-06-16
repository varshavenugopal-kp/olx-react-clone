import React,{useContext,useState,useEffect} from 'react';
import {db,collection,getDocs} from 'firebase/firestore'
import Heart from '../../assets/Heart';
import './Post.css';
import { firebaseContext } from '../../store/FirebaseContext';
import { Link, useNavigate } from 'react-router-dom';
import {PostContext} from '../../store/postContext'

function Posts() {
 const {db,auth}=useContext(firebaseContext)
 const[products,setProducts]=useState([])
 const {setPostDetails}=useContext(PostContext)
 const navigate=useNavigate()

 useEffect(() => {
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products')); // Replace 'yourCollection' with the name of your Firestore collection
      const fetchedData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(fetchedData);
      setProducts(fetchedData);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  fetchData();
  
}, []);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product=>{

          
         return <div
            className="card"
            onClick={()=>{
              setPostDetails(product)
              navigate('/viewpost')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>})}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
