import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
// import './App.css';
const getLocalStorage=()=>{
  let list=JSON.parse(localStorage.getItem('list'))
  if (list){
    return list
  }
  else
  {
    return []
  }
}

function App() {

  const [name,setName]=useState('');
  const [list,setList]=useState(getLocalStorage());
  const [isEditing,setIsEditing]=useState(false)
  const [editId,setEditId]=useState(null);
  const [alert,setAlert]=useState({show:false,message:"",type:""})
  const handleSubmit=(e)=>{
    e.preventDefault()
    if (!name){
       setAlert({
        show:true,message:"Please enter value",type:"danger"
       })
    }
    else if(name && isEditing){
   
       setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      setAlert({
        show:true,message:"Item updated",type:"success"
       })

    }
    else{
    setAlert({show:true ,type:'success',message: 'Item added to the list'});

      const newItem ={id : new Date().getTime().toString(),title:name}
      setList([...list,newItem])
      setName('')
    }
  }
  const clearList=()=>{
    setAlert({show:true ,type:'danger',message: 'empty list'});
    setList([])
  }
  const removeItem=(id)=>{
    setAlert({
      show:true,message:"Item removed" ,type:"danger"
     })
     setList(list.filter((item)=>item.id !==id))

  }
  const editItem=(id)=>{
    const specificItem= list.find((item)=> item.id===id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return <><section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
    {alert.show && <Alert {...alert} setAlert={setAlert} list={list}/> }
    <h3>Todo List</h3>
    <div className='form-control'>
<input text="text" className='grocery' placeholder="eg. eggs" value={name} onChange={(e)=>setName(e.target.value)}/>
<button type='submit' className='submit-btn'>
  {isEditing ? 'edit' :'submit'}
</button>
    </div>
    </form>
   { list.length >0 &&(
   <div className='grocery-container'>
    <List items={list} removeItem={removeItem} editItem={editItem}/>
    <button className='clear-btn' onClick={clearList}>clear items</button>    
    </div>)}
  </section>
  </>
}

export default App