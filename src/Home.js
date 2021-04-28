import React, { useState, useEffect } from 'react'

export default function Home() {
    const [Items, setItems] = useState([]);
    useEffect(() => {
        const data = localStorage.getItem('data')
        if(data)
        setItems(JSON.parse(data))
      },[])
    return (
        <div className="container">
        <div className="row">
        {Items.map((item,index)=>{
            return <div className="card" key={index}>
                <img src={item.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <h5 className="card-title">{item.price}</h5>
                </div>
                </div>
        })}
        </div>
        </div>
    )
}
