// import React, { Component, useState } from "react";

// import withFirebaseAuth from "react-with-firebase-auth";
// import firebase from "firebase/app";
// import "firebase/auth";


import "./Login.css"
import img from "../../images/logo1.png";
import img2 from "../../images/catlogin.png";

import axios from "axios";
import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firebaseAppAuth = firebaseApp.auth();
  const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
  };

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added: false,
      redirect: false,
      afterLogin: false,
    };
  }

  async checkAccount() {
    firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
            // alert(idToken)
            axios
              .all([
                axios.post(
                  process.env.REACT_APP_API_LOCAL + "/checkLoginGoogle",
                  { token: idToken }),
              ])
              .then(
                axios.spread(function (res) {
                  if (res.data == "created") alert("Chào mừng đến kphim");
                  else if(res.data == "error") alert("Opps, có gì đó sai sai");
                })
              )
              .catch((error) => console.log(error));
          });
      }

  componentDidMount() {
    // console.log("in did login", firebase.auth().currentUser);
  }

  componentDidUpdate() {
    if (firebase.auth().currentUser != null && this.state.added == false) {
      this.checkAccount();
       this.setState({ added: true });
      // check new user
    } else if (
      firebase.auth().currentUser == null &&
      this.state.added == true
    ) {
      this.setState({ added: false });
    }
  }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    // console.log("+++" + user); 
    return (
      <main className="form-signin">
        <img
          className="logologin mb-0 mt-4 mb-3"
          src={img}
          alt=""
          width={280}
          height={150}
        />
        <h1 className="h3 mb-3 fw-normal">
          LOGIN
          {/* {!firebase.auth() && console.log(firebase.auth().currentUser)} */}
        </h1>
        {user ? (
          <div>
            <p>
              Xin chào {user.displayName}, bạn đã đăng nhập thành công, chúc bạn
              xem phim vui vẻ~{" "}
            </p>
            <button
              className="w-40 h-30 btn btn-sm btn-danger"
              onClick={signOut}
            >
              Đăng xuất <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        ) : (
          <div>
            <p>Đăng nhập đơn giản với tài khoản Google</p>
            <button
              className="w-100 btn btn-lg btn-danger"
              onClick={signInWithGoogle}
            >
              Sign in with Google <i class="fab fa-google"></i>
            </button>
          </div>
        )}

        <img className="mt-5 pt-2" src={img2} />
        {/* <p className="mt-5 mb-3 text-muted"> Thiết kế bởi @Kphim ©2021</p> */}
      </main>
    );
  }
}


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Login);

