import React,{useEffect, useState} from 'react';
import {Modal,ModalHeader,ModalBody,Row,Col} from 'reactstrap';
import {Button} from 'react-bootstrap';
//import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import Edit from './Edit';
import axios from 'axios';


function Add(){
    const[val,setVal]=useState('');
    const[modal,setModal]=useState(false);
    const[todos,setTodos]=useState(null);
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[draft,setDraft]=useState(true);
   
    var id;
    const handleSubmit=(e)=>
    {
        e.preventDefault();
      const data= {title,description,draft};
        fetch("http://localhost:8000/todos",{
           method:"POST",
           headers:{"content-type":"application/json"},
           body: JSON.stringify(data)
        }).then((res)=>{
               alert('Saved Succesfully'); 
               window.location.reload();      
        
        }).catch((err)=>{
            console.log(err.message);
        })
        setModal(false);
       
    
    }
    const handleSearch=async(e)=>{
        e.preventDefault();
        return await axios.get(`http://localhost:8000/todos?q=${val}`)
        .then((response)=>{
            setTodos(response.data);
            setVal("");
        }).catch((err)=>console.log(err));
    }
    const handleReset=()=>{
        loadUserData();
    }
    const loadUserData=async()=>{
             return await axios.get("http://localhost:8000/todos")
             .then((response)=>setTodos(response.data))
             .catch((err)=>console.log(err));
    };
    useEffect(()=>{
        loadUserData();
    },[]);
    // const Deleteitem=(id)=>
    // {
    //      if(window.confirm('Do you want to delete')){
    //         fetch("http://localhost:8000/todos/"+id,{
    //        method:"DELETE",
    //     }).then((res)=>{
    //            alert('Deleted Succesfully'); 
    //             window.location.reload();
        
    //     }).catch((err)=>{
    //         console.log(err.message);
    //     })
       
    //      }
    // }
    const handleFilter=async(val)=>
    {
        return await axios.get(`http://localhost:8000/todos?draft=${val}`)
        .then((response)=>{
            setTodos(response.data);
        }).catch((err)=>console.log(err));

    }
 

    
    
    useEffect(()=>{
        fetch("http://localhost:8000/todos").then((res)=>{
               return res.json();
        }).then((resp)=>{
          setTodos(resp);
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])
    return(
       <div>
        <form style={{
            margin:'auto',
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center",
         }}
         className="d-flex input-group w auto"
         onSubmit={handleSearch}
         >
        <input type="text" className="form-control" placeholder="Search" value={val} onChange={(e)=>setVal(e.target.value)}/>
          <button type="submit" className='mx-1' >Search</button>
          <button className='mx-2'onClick={()=>handleReset()}>Reset</button>
         </form>
         <button color="green" className="dra" onClick={()=>handleFilter(true)}>Drafts</button>
         <button color="Red" style={{margin:"2px"}} onClick={()=>handleFilter(false)}>Completed</button>
        <Modal size="500px"
        isOpen={modal}
        toggle={()=>setModal(!modal)}>
            <ModalHeader  toggle={()=>setModal(!modal)}>
           
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Add/Edit Todo
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={24}>
                            <div>
                            <input value={title} onChange={e=>setTitle(e.target.value)} className='form-control' type="text" required placeholder="title"/><br/>
                            </div>
                        </Col>
                        <Col lg={24}>
                            <div>
                            <textarea value={description} onChange={e=>setDescription(e.target.value)} className='form-control' placeholder= "description" required/><br/>
                            </div>
                        </Col>
                        <Col lg={24}>
                            <div>
                            <input checked={draft} onChange={e=>setDraft(e.target.checked)}type="checkbox" className='form-check-input'/>
                            <label className="form-check-label" >Is Draft</label>
                            </div>
                        </Col>
                    </Row>
                    <button className="but" class="btn btn-success" type="submit">Save</button>
                </form>
                
            </ModalBody>
        </Modal>
        <button className="btn-mt-3" onClick={()=>setModal(true)}><i class="fa fa-plus"></i>Add Todo</button>
        <br/><br/>
        <div className='Para'>
            {   todos &&
                todos.map(item=>(
                     <div key={item.id} style={{width: 340,
                        border: '2px solid black'}}>
                     <p><b>{item.title}</b> 
                     <br/>{item.description}</p>
                    
                    
                     {/* <button  class="btn btn-success" type="submit"><i className="fa fa-edit"></i></button>&nbsp;&nbsp; */}
                     <Edit id={item.id}/>
                     {/* <button className='but--del'  type="submit" onClick={()=>Deleteitem(item.id)}><i className="fa fa-trash"></i></button> */}
                     {/* <p>{item.description}</p> */}
                     

                    </div>
                ))
            }
        </div>

          
            
           

        
       </div>

    )

}

export default Add; 
