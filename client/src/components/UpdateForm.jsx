import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useHistory, useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { analyzeAnsSentiment } from "../naturalfunc";

const UpdateForm = ({userstate}) => {
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const {id} = useParams()

    const [formState, setFormState] = useState({})

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormState({
          ...formState,
          [name]: value,
          dailyscore:analyzeAnsSentiment(formState.ans1,formState.ans2,formState.ans3,formState.ans4)
        });
      };

      useEffect(() => {
        axios.get("http://localhost:8000/api/moods/" + id, {withCredentials:true})
        .then((res) => {
          console.log(res)
            setFormState(res.data)
        }).catch(err => console.log(err))
    }, [])
    
      const submitHandler = (e) => {
        e.preventDefault();
        axios
          .put("http://localhost:8000/api/moods/" + id, formState, {withCredentials:true})
          .then((res) => history.push("/result/" + res.data._id))
          .catch((err) => {
            console.log(err)
            const errRes = err.response.data.errors;
            const errArr = [];
            for (const key of Object.keys(errRes)) {
              errArr.push(errRes[key].message);
            }
            setErrors(errArr);
          });
       
      };

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
               <Link class="nav-link" to="/form">
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
                
                <form onSubmit={submitHandler} style={{padding:"40px 100px 100px 100px"}}>
                <div class="form-group">
                    <label for="exampleFormControlInput1">How are you today?</label>
                    <p style={{color:"red"}}key={0}>{errors[0]}</p>
                    <input onChange={changeHandler} type="text" class="form-control" name="ans1" id="exampleFormControlInput1" value={formState.ans1}/>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">What was the most impactful thing you did or learned today?</label>
                    <p style={{color:"red"}}key={1}>{errors[1]}</p>
                    <input onChange={changeHandler} type="text" class="form-control" name="ans2" id="exampleFormControlInput1" value={formState.ans2} />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Are you getting closer to meeting your goals? What did you do?</label>
                    <p style={{color:"red"}}key={2}>{errors[2]}</p>
                    <input onChange={changeHandler} type="text" class="form-control" name="ans3" id="exampleFormControlInput1" value={formState.ans3} />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Describe your current mood in one sentence</label>
                    <p style={{color:"red"}}key={3}>{errors[3]}</p>
                    <input onChange={changeHandler} type="text" class="form-control" name="ans4" id="exampleFormControlInput1" value={formState.ans4}/>
                </div>
                <input class="btn btn-secondary" type="submit" value="Submit" />&nbsp;&nbsp;
                <Link to="/pastforms"><button class="btn btn-secondary">Go Back</button></Link>
                </form>
                  
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

export default UpdateForm
