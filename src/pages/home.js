import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import Register from './register';
import Cookies from 'universal-cookie';
import { Container, Col, Row, Nav, Navbar, Button } from "react-bootstrap";



//const url="http://localhost:3005/empresas/";
const urlPost="https://ironfistdb.herokuapp.com/register";
const urlUser="https://ironfistdb.herokuapp.com/users/";
//urls for testing in a local server
const urlPost2="http://localhost:3003/register";
const urlUser2="http://localhost:3003/users/";



const cookies = new Cookies();
// get token generated on login
const token = cookies.get("TOKEN");
  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }



class App extends Component {


state={

  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    email: '',
    password: '',
    active: '',
    //tipoModal: ''
  }
}

peticionGet=()=>{
axios.get(urlUser).then(response=>{
  this.setState({data: response.data});
  console.log(response.data);
}).catch(error=>{
  console.log(error.message);
})
}


peticionPost=async()=>{
  delete this.state.form.id;
 await axios.post(urlPost,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(urlUser+this.state.form.id, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}


peticionPatch=()=>{
   axios.patch(urlUser+this.state.form.id, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }
  ).catch(error=>{
    console.log(error.message);
  })}

peticionDelete=()=>{
  axios.delete(urlUser+this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarEmpresa=(empresa)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: empresa.id,
      email: empresa.email,
   
      active: (empresa.active ? 'true' : 'false'),
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
//shows the changes made in the add or update form (only for testing)
//console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  



  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br />

          
          <Button variant="success" href='/register'>Add new user</Button>

            <Button type="submit" style={{marginLeft: 400, color:"white"}} variant="danger" onClick={() => logout()}>
            Logout
            </Button>
  
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Active</th>

          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(empresa=>{
          return(
            <tr>
          <td>{empresa.id}</td>
          <td>{empresa.email}</td>
          <td>{empresa.active ? "Yes": "No"}</td>

          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(empresa); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(empresa); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id : this.state.data.length+1 }/>
                    <br />
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={form?form.email: ''}/>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" id="password" placeholder='Only if is required when editing' onChange={this.handleChange} value={form?form.password: ''}/>
                    <br />

                    <label htmlFor="active">Active? :  </label>
                    <input className="form-control" type="text" name="active" id="active" placeholder='Only' onChange={this.handleChange} value={form?form.active: ''}/>

                    <br />

                    <br />

                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal==='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPatch()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar a la empresa {form && form.email}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default App;
