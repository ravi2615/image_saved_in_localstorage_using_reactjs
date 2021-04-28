
import React, { useState, useEffect } from "react";

function Add() {
  const [name,setName] =useState("");
  const [price,setPrice] =useState(0);
  const [description,setDesc] =useState("");
  const [image,setImage] =useState("");
  const [Items, setItems] = useState([]);

  const onNameChange = (event) =>{
      setName(event.target.value);
  };
  const onPriceChange = (event) =>{
    setPrice(event.target.value);
};
const onDescChange = (event) =>{
  setDesc(event.target.value);
};
  const onImageChange = async (event) =>{
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setImage(base64);
};
  useEffect(() => {
    const data = localStorage.getItem('data')
    if(data)
    setItems(JSON.parse(data))
  },[])

  useEffect(() => {
    localStorage.setItem('data',JSON.stringify(Items))
  })

  const listofItems = () => {
      if(name!==''&&image!==''&&description!==''&&price!==''){
        const data = {'name': name, 'price': price, 'description': description, 'image':  image}
      setItems((oldItems) => {
          return [...oldItems, data ];
      });
      
  }else
      setName("");
      setImage('')
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const deleteItems =(id) =>{

      setItems((oldItems) => {
          return oldItems.filter((arrElem, index) => {
              return index !== id;
          })
      })
  }


return(
  <>
     <div className = "main_div">
         <div className = "center_div">
             <br/>
             <h1>Add Products</h1>
             <br/>
             <input type ="text" placeholder ="Add a Items"
              value ={name}
             onChange= { onNameChange } />
             <input type ="number" placeholder ="Add Price"
              value ={price}
             onChange= { onPriceChange } />
             <textarea placeholder ="Add Price"
              value ={description}
             onChange= { onDescChange } ></textarea>
             <input type ="file" placeholder ="Add image"
              
             onChange= { onImageChange } />
             <button className="newbtn" onClick = {listofItems} >
                 Add Product
             </button>
             </div>
             <table className="table table-hover table-responsive-md" border="2">
                <thead>
    <tr>
    <th scope="col"></th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>

                 { Items.map( (itemVal,index) =>{
                   return  <tr key={index}>           
                  <th scope="row"><img src={itemVal.image} alt="" width='100'  height= '80' /></th>
                    <th scope="row">{itemVal.name}</th>
                    <td>{itemVal.description}</td>
                    <td>{itemVal.price}</td>
                    <td><button className="newbtn-1" aria-hidden="true" onClick={() => {
                        deleteItems(itemVal.id);
                    }} >
                    Remove
                    </button>
                    </td></tr>
                 } ) }
             
  </tbody>
</table>
            
     </div>
  </>
);
}

export default Add;
