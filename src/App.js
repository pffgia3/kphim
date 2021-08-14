import './App.css';
import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/HomePage/Home";
import Watch from "./components/Watch/Watch";
import Caterogy from './components/Category/Category';
import Search from './components/Search/Search';
import Login from './components/Login/Login';
import Voucher from './components/Voucher/Voucher';
import ads1 from "./images/ads1.gif";
// firebase


import firebase from "firebase/app";
import MaGioiThieu from './components/Voucher/MaGioiThieu';
import Koin from './components/Voucher/Koin';
import MyVip from './components/Voucher/MyVip';
import Loading from './components/Loading/Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      recommend: {},
      trending: {},
      isLoading:true,

      currentUser: null,
      authUser: false,
      userinfo: null,
    };
  }

  componentDidMount(){
      firebase.auth().onAuthStateChanged((user) => {
        let that = this;
        axios.all([axios.get(
              process.env.REACT_APP_API_LOCAL +
                "/checkConnectApi")])
          .then(
             axios.spread(function (rs) {
                that.setState({ isLoading: rs.data })
                })
             )
      });
  }

  render() {
    const { user } = this.props;
    return (
      <div className="App">
        <Header currentUser={firebase.auth().currentUser} />

        <div id="ads1" className="ms-2">
          <img src={ads1}>
          </img>{" "}
        </div>

        {this.state.isLoading && (
        <Loading/>
        )}
        <div className="bodyall pb-5">
          <Router>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path={["/watch/:id", "/watch/:id/:name"]}>
              <Watch />
            </Route>
            <Route
              exact
              path={[
                // "/the-loai/:value",
                // "/nam/:value",
                // "/quoc-gia/:value",
                // "/phim/:value",
                "/category/:type/:value",
                // "/the-loai/:value/:page",
                // "/nam/:value/:page",
                // "/quoc-gia/:value/:page",
                // "/phim/:value/:page",
                "/category/:type/:value",
              ]}
            >
              <Caterogy />
            </Route>
            <Route exact path="/search/:keysearch">
              <Search />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/voucher">
              <Voucher />
            </Route>
            <Route path="/ma-gioi-thieu">
              <MaGioiThieu />
            </Route>
            <Route path="/my-koin">
              <Koin />
            </Route>
            <Route path="/my-vip">
              <MyVip />
            </Route>
          </Router>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
