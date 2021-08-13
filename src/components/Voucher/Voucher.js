import React, { Component } from "react";
import firebase from "firebase/app";
import "./Voucher.css";
import meo1 from "../../images/meo1.webp";
import axios from "axios";
class Voucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeInput: "",
      isLoading: false,
      isUser: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      codeInput: e.target.value,
    });
  }

  async useVoucher() {
    if (this.state.codeInput != "" && this.state.codeInput != null) {
      let that = this;
      //   alert(this.state.codeInput)
      //   this.setState({ isLoading: true });
      if (firebase.auth().currentUser != null) {
        // console.log(firebase.auth().currentUser.getIdToken());
        // alert(this.state.codeInput + firebase.auth().currentUser.displayName);
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
            // alert(idToken);
            axios
              .all([
                axios.post(process.env.REACT_APP_API_LOCAL + "/voucher", {
                  token: idToken,
                  voucher: that.state.codeInput,
                }),
              ])
              .then(
                axios.spread(function (res) {
                //   that.setState({ isLoading: false });
                  if (res.data.kq == true)
                    alert("Cộng " + res.data.coin + " Koin !!!");
                  else if (res.data == "NotFoundCode")
                    alert("Error: Voucher không đúng!");
                  else if (res.data == "NotYourCode")
                    alert(
                      "Error: Hãy nhập code từ người đã giới thiệu bạn, không phải code của bạn!"
                    );
                  else if (res.data == "UsedCode")
                    alert("Error: Voucher đã được sử dụng, hãy kiểm tra lại!");
                })
              )
              .catch((error) => alert(error));
          })
          .catch((error) => alert(error));
      }
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      let x = user;
      if(x==null) // not login yet
        this.setState({ isUser: "-1" });
      else
        this.setState({ isUser: x });
      
    });
  }

  render() {
    return (
      <div>
        <div className="container py-3">
          {this.state.isUser != null ? (
            this.state.isUser == "-1" ? (
              <header>
                <img
                  className="mt-5 pt-2 pb-2"
                  src={meo1}
                  width={250}
                  height={160}
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
                  src={meo1}
                  width={250}
                  height={160}
                ></img>
                <h4 className="mt-2 mb-5">
                  Theo dõi{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/kphim.fb/"
                  >
                    Facebook
                  </a>{" "}
                  để săn Voucher nhé
                </h4>

                <input
                  class="form-control w-100"
                  type="input"
                  name="voucher"
                  id="voucher"
                  placeholder=" Nhập voucher của bạn ở đây"
                  onChange={this.onSubmit}
                />
                <button
                  className="btn btn-outline-warning mt-3 d-inline"
                  id="buttomSearch"
                  onClick={() => this.useVoucher()}
                >
                  Sử dụng
                </button>
              </header>
            )
          ) : (
            <header>
              <img
                className="mt-5 pt-2 pb-2"
                src={meo1}
                width={250}
                height={160}
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

export default Voucher;
