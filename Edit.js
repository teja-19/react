import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Modal,ModalHeader,ModalBody,Row,Col, ModalFooter} from 'reactstrap';
import '../App.css';
import {Button} from 'react-bootstrap';

const Edit=({id})=>{
    
    const[modal,setModal]=useState(false);
    const[todos,setTodos]=useState(null);
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[draft,setDraft]=useState(true);
    // const {id}=useParams();

    const handleSubmit=(e)=>
    {
        e.preventDefault();
      const data= {title,description,draft};
        fetch("http://localhost:8000/todos/"+id,{
           method:"PUT",
           headers:{"content-type":"application/json"},
           body: JSON.stringify(data)
        }).then((res)=>{
               alert('Updated Succesfully'); 
               window.location.reload();
        
        }).catch((err)=>{
            console.log(err.message);
        })
        setModal(false);
       
    
    }
     useEffect(()=>{
        fetch("http://localhost:8000/todos/"+id).then((res)=>{
            return res.json();
        }).then((resp)=>{
                  setTitle(resp.title);
                  setDescription(resp.description);

        }).catch((err)=>{
            console.log(err.message);
        })
     },[]);

     const Deleteitem=(id)=>
    {
         if(window.confirm('Do you want to delete')){
            fetch("http://localhost:8000/todos/"+id,{
           method:"DELETE",
        }).then((res)=>{
               alert('Deleted Succesfully'); 
                window.location.reload();
        
        }).catch((err)=>{
            console.log(err.message);
        })
       
         }
    }
    return(

        <div>
            &nbsp;
            
        <button className="but--edit"  type="submit"  onClick={()=>setModal(true)}><i className="fa fa-edit"></i></button>
        <Modal size="500px"
        isOpen={modal}
        toggle={()=>setModal(!modal)}>
            <ModalHeader  toggle={()=>setModal(!modal)}>
           
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Edit Todo
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
                    <ModalFooter>
                    <button className="but" class="btn btn-success" type="submit">Update</button>
                    <button className='but--del'  type="submit" class="btn btn-danger" onClick={()=>Deleteitem(id)}>Delete</button>
                    </ModalFooter>
                </form>
                
            </ModalBody>
        </Modal>
        {/* <button className="btn-mt-3" onClick={()=>setModal(true)}><i class="fa fa-plus"></i>Edit Todo</button> */}
        
   

          
            
           

        
       </div>

    )
}
export default Edit;
