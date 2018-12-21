import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './starPop.css'

export default function starPop(num) {
   let starNumber = Math.ceil((num - 50) / 10);
   let starOn = <FontAwesomeIcon icon={faStar} color="black" className="star" />
   return (

    //    Array.from(new Array(starNumber)).map((trackPop) => {
               <div className="star">
                   {starOn}
               </div>
)}