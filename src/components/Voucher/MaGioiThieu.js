import React, { Component } from "react";
import firebase from "firebase/app";
import "./Voucher.css";

import axios from "axios";
class MaGioiThieu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeInput: "",
      isLoading: false,
      isUser: null,
      mycode: [],
      getmycode: false,
      code: null,
      used: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      codeInput: e.target.value,
    });
  }

  napcoin() {
    if (this.state.codeInput != "" && this.state.codeInput != null) {
      let that = this;
      this.setState({ isLoading: true });
      if (firebase.auth().currentUser != null) {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
            axios
              .all([
                axios.post(process.env.REACT_APP_API_LOCAL + "/usecode", {
                  token: idToken,
                  code: that.state.codeInput,

                }),
              ])
              .then(
                axios.spread(function (res) {
                  that.setState({ isLoading: false });
                  if (res.data == true) alert("Cộng 20 Koin !!!");
                  else if (res.data == "NotFoundCode")
                    alert("Error: Code không đúng!");
                  else if (res.data == "NotYourCode")
                    alert(
                      "Error: Hãy nhập code từ người đã giới thiệu bạn, không phải code của bạn!"
                    );
                  else if (res.data == "OnlyOne")
                    alert("Error: Bạn chỉ có thể nhập code 1 lần!!");
                })
              )
              .catch((error) => console.log(error));
          });
      }
    }
  }

  getinfo() {
    {
      console.log("hehexxx");
      let that = this;
      axios
        .all([
          axios.get(
            process.env.REACT_APP_API_LOCAL +
              "/mycode/" +
              firebase.auth().currentUser.uid
          ),
        ])
        .then(
          axios.spread(function (mycode) {
            console.log("hehee", mycode.data);
            that.setState({
              mycode: mycode.data,
              getmycode: true,
              code: mycode.data[0].code,
              used: mycode.data[0].xaicodegioithieu,
            });
          })
        )
        .catch((error) => console.log(error));
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      let x = user;
      if (x == null) this.setState({ isUser: "-1" });
      else {
        this.setState({ isUser: x });
             this.getinfo();
      }
    });
  }

  componentDidUpdate() {
    // if (this.state.isUser != null && this.state.getmycode == false)
 
  }

  render() {
    return (
      <div>
        {}
        <div className="container py-3">
          {this.state.isUser != null ? (
            this.state.isUser == "-1" ? (
              <header>
                <img
                  className="mt-5 pt-2 pb-2"
                  src="https://j.gifs.com/y70kBb.gif"
                  width={250}
                ></img>
                <h4 className="mt-2 mb-5">
                  Đăng nhập để thực hiện chức năng này!
                </h4>{" "}
                <div className="mb-5 pb-5"></div>
              </header>
            ) : (
              <header>
                <img
                  className="mt-5 pt-2 pb-2"
                  src="https://j.gifs.com/y70kBb.gif"
                  width={250}
                ></img>
                <h4 className="mt-2 mb-2">Mã giới thiệu!</h4>
                <p className="mt-2 mb-0">Mỗi người chỉ được nhập một lần!</p>
                <p className="mb-0">Nhập mã để cả hai cùng nhận 20 Koin</p>
                <p>
                  {console.log(this.state.mycode[0])}
                  Mã của bạn:{" "}
                  {/* {this.state.mycode[0] != undefined && (
                    <strong>{this.state.mycode[0].code}</strong>
                  )}{" "} */}
                  <strong className="text-light">{this.state.code}</strong>- Hãy chia sẻ cho bạn bè!
                </p>

                <input
                  class="form-control w-100"
                  type="input"
                  name="voucher"
                  id="voucher"
                  placeholder=" Nhập mã ở đây"
                  placeholder={
                    this.state.used == false
                      ? "Nhập code ở đây"
                      : "Bạn đã nhập code rồi"
                  }
                  onChange={this.onSubmit}
                  disabled={this.state.used == true}
                />

                <button
                  className="btn btn-outline-warning mt-3 d-inline"
                  id="buttomSearch"
                  onClick={() => this.napcoin()}
                 disabled={this.state.used == true}
                >
                  Sử dụng
                </button>
              </header>
            )
          ) : (
            <header>
              <img
                className="mt-5 pt-2 pb-2"
                src="https://j.gifs.com/y70kBb.gif"
                width={250}
              ></img>
              <h4 className="mt-2 mb-5">Kiểm tra đăng nhập...</h4>{" "}
              <div className="mb-5 pb-5"></div>
            </header>
          )}
        </div>
      </div>
    );
  }
}

export default MaGioiThieu;
