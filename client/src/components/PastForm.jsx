import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {useHistory, Link} from "react-router-dom"
import moment from 'moment'
const PastForm = ({userstate}) => {
  const[moods, setMoods] = useState([])
  const [state, setState] = useState(false) 
  const history = useHistory()

  useEffect(() => {
    axios.get("http://localhost:8000/api/user",{withCredentials:true})
        .then(res =>{
          setMoods(res.data.moodScore)
          console.log(moods)
          console.log(userstate)
        })
}, [state]) 

const deleteHandler = (id) => {
    axios.delete("http://localhost:8000/api/moods/" + id, {withCredentials:true})
     .then(() => {
      setState(!state)})
     .catch(err => console.log(err))
}

    return (
        <div>
            <>
        <div id="wrapper">
          <ul
            class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            <a class="sidebar-brand d-flex align-items-center justify-content-center">
              <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
              </div>
              <div class="sidebar-brand-text mx-3">Mood Score Today</div>
            </a>

            <li class="nav-item active">
              <Link class="nav-link" to="/dashboard">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li class="nav-item">
               <Link class="nav-link" to={`/form/${userstate._id}`}>
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Fill out a form</span></Link>
            </li>

            <li class="nav-item">
               <Link class="nav-link" to="/pastforms">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Past Forms</span></Link>
            </li>

            <li class="nav-item">
            <Link class="nav-link" to="/calendar">
                <i class="fas fa-fw fa-table"></i>
                <span>Calender</span>
              </Link>
            </li>
         </ul>
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button
                  id="sidebarToggleTop"
                  class="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i class="fa fa-bars"></i>
                </button>

                <ul class="navbar-nav ml-auto">
                  <li class="nav-item dropdown no-arrow mx-1">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="alertsDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-bell fa-fw"></i>
                    </a>
                  </li>

                  <li class="nav-item dropdown no-arrow mx-1">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="messagesDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-envelope fa-fw"></i>
                    </a>
                  </li>

                  <div class="topbar-divider d-none d-sm-block"></div>

                  <li class="nav-item dropdown no-arrow">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                       {userstate.firstName}
                      </span>
                      <img
                        class="img-profile rounded-circle"
                        src="img/undraw_profile.svg"
                      ></img>
                    </a>

                    <div
                      class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <a class="dropdown-item" href="#">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                      </a>
                      <a class="dropdown-item" href="#">
                        <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                      </a>

                      <div class="dropdown-divider"></div>
                      <a
                        class="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>

              <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">
                    These are the forms that you have filled out. Feel free to modify them!
                  </h1>
                </div>
                <div>
                
                {moods.map((mood, i) => {
                return <div key={i} className="d-flex justify-content-between align-items-center p-4" style={{border:"1px lightgray solid", margin:"50px", borderRadius:"10px"}}>
                    <h5>Form {i + 1}</h5>
                    <h5>Created at:<br/> {moment(mood.createdAt).format('ll')}</h5>
                    <h5>Updated at: <br/> {moment(mood.updatedAt).format('ll')}</h5>
                    <Link to={`/update/${mood._id}`}><button className="btn btn-secondary" >View | Edit <img style={{width:"25px"}} src="https://cdn-icons-png.flaticon.com/512/2040/2040995.png" alt="edit icon" /></button></Link>&nbsp;
                    <button className="btn btn-secondary" onClick={() => deleteHandler(mood._id)}>Delete <img style={{width:"25px"}} src="https://cdn-icons-png.flaticon.com/512/3221/3221897.png" alt="delete icon" /></button>&nbsp;
                </div>
            })}
                  
                </div>

                <div class="row"></div>
              </div>
            </div>

            <a class="scroll-to-top rounded" href="#page-top">
              <i class="fas fa-angle-up"></i>
            </a>

            <div
              class="modal fade"
              id="logoutModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Ready to Leave?
                    </h5>
                    <button
                      class="close"
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    Select "Logout" below if you are ready to end your current
                    session.
                  </div>
                  <div class="modal-footer">
                    <button
                      class="btn btn-secondary"
                      type="button"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <a class="btn btn-primary" href="login.html">
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
        </div>
    )
}

export default PastForm
