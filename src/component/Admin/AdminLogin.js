import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import medicare from '../images/medicare.jpg'
import Dropdown from 'react-bootstrap/Dropdown';

export class AdminLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: '',
      password: ''
    }
  }
  componentDidMount() {
    axios.get("http://localhost:8102/adminlogin/")
      .then((res) => {
        this.setState({
          users: res.data,
          username: '',
          password: ''
        })
      })
  }
  submit(event, name) {
    event.preventDefault();
    axios.post("http://localhost:8102/adminlogin/", {
      username: this.state.username,
      password: this.state.password
    })
      .then((res) => {

        console.log(res);
        console.log(res.data);
        if (res.data == 0) {

          this.props.history.push("/adminmain1")
        }
        else {
          alert("Credential Invalid")
        }
      })
  }

  render() {
    return (
      <div style={{ marginBottom: "70px" }}>
        <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
          <a className="navbar-brand" href="#">
            <img src={medicare} width="35" height="35" className="d-inline-block align-top" alt="Logo" />
            Medicare
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Dropdown className="nav-item">
                  <Dropdown.Toggle id="dropdown-basic">
                    Login as
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link className="nav-link" to="/login">Patient</Link>
                    <Link className="nav-link" to="/adminlogin">Admin</Link>
                    <Link className="nav-link" to="/doctorlogin">Doctor</Link>
                    <Link className="nav-link" to="/receptionistlogin">Receptionist</Link>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item">
                <Dropdown className="nav-item">
                  <Dropdown.Toggle id="dropdown-basic">
                    Register as
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link className="nav-link" to="/register">Patient</Link>
                  </Dropdown.Menu>
                </Dropdown>
              </li>

            </ul>
          </div>
        </nav>

        <h1 class="text-center">Admin Login</h1>

        <form onSubmit={(e) => this.submit(e, this.state.username)} method="POST">
          <div class="form-group mt-3">
            <label for="exampleInputEmail1">Username</label>
            <input onChange={(e) => this.setState({ username: e.target.value })} value={this.state.username} type="text" class="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter User Name" required />
          </div>
          <div class="form-group mt-3">
            <label for="exampleInputPassword1">Password</label>
            <input onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} type="password" class="form-control mt-2" id="exampleInputPassword1" placeholder="Password" minLength="5" required />
          </div>
          <div class="form-group mt-3">
            <button type="submit" name="action" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AdminLogin

