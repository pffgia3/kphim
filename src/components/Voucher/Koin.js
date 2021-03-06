import React, { Component } from "react";
import firebase from "firebase/app";
import "./Voucher.css";
import meo6 from "../../images/meo6.gif"
import axios from "axios";
class Koin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mycoin: null,
      momo: null,
      airpay: null,
      bank: null,
      menhgia: 10,
      inputMGD: "",
      getinfo: false,
      isLoading: false,
      type: "momo",
      isUser: null,
    };
    this.getCombo = this.getCombo.bind(this);
    this.getMenhgia = this.getMenhgia.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      inputMGD: e.target.value,
    });
  }

  getCombo = (e) => {
    this.setState({
      type: e.target.value,
    });
  };
  getMenhgia = (e) => {
    this.setState({
      menhgia: e.target.value,
    });
  };

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

  NapKoin() {
    // alert(this.state.type + "_"+ this.state.inputMGD +"_"+this.state.menhgia);
    if (this.state.inputMGD != "" && this.state.inputMGD != null) {
      let that = this;
      this.setState({ isLoading: true });
      if (firebase.auth().currentUser != null) {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
            axios
              .all([
                axios.post(process.env.REACT_APP_API_LOCAL + "/napkoin", {
                  token: idToken,
                  type: that.state.type,
                  mgd: that.state.inputMGD,
                  tien: that.state.menhgia,
                }),
              ])
              .then(
                axios.spread(function (res) {
                  that.setState({ isLoading: false });
                  if (res.data == true) {
                    that.setState({ inputMGD: "" });
                    alert(
                      "???? ghi nh???n th??ng tin n???p Koin, Koin s??? ?????n tay b???n trong 24h!"
                    );
                  } else if (res.data == "Exist")
                    alert(
                      "Th??ng tin n???p n??y ???? c?? trong h??? th???ng, xin th??ng c???m ch??? x??u."
                    );
                  else if (res.data == false)
                    alert(
                      "???? x???y ra l???i: L???i n???p!"
                    );
                })
              )
              .catch((error) => console.log(error));
          });
      }
    }
  }

  getinfo() {
    if (this.state.getinfo == false) {
      let that = this;
      let x;
      axios
        .all([
          axios.get(
            process.env.REACT_APP_API_LOCAL +
              "/mykoin/" +
              firebase.auth().currentUser.email
          ),
          axios.get(process.env.REACT_APP_API_LOCAL + "/stk"),
        ])
        .then(
          axios.spread(function (mycode, getstk) {
            // console.log("hehee", mycode.data.coin, getstk.data.momo);
            that.setState(
              {
                mycoin: mycode.data.coin,
                momo: getstk.data.momo,
                airpay: getstk.data.airpay,
                bank: getstk.data.bank,
                getinfo: true,
              },
              function () {
                x = 1;
              }
            );
          })
        )
        .catch((error) => console.log(error));
    }
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
                  src={meo6}
                  width={250}
                  height={160}
                ></img>
                <h4 className="mt-2 mb-5">
                  ????ng nh???p ????? th???c hi???n ch???c n??ng n??y!
                </h4>{" "}
                <div className="mb-5 pb-5"></div>
              </header>
            ) : (
              <header>
                <img
                  className="mt-5 pt-2 pb-2"
                  src={meo6}
                  height={160}
                  width={250}
                ></img>
                <h4 className="mt-2 mb-2">B???n ??ang c??</h4>
                <h2 className=" mb-3">{this.state.mycoin} ????oin </h2>
                <div className="row g-5">
                  <div className="col-md-6">
                    <ul class="icon-list thu-nhat">
                      <li className="text-muted">
                        <i class="far fa-hand-point-right pe-2"></i> Ch???n m???nh
                        gi?? v?? ph????ng th???c.{" "}
                      </li>
                      <li className="text-muted">
                        <i class="far fa-hand-point-right pe-2"></i> Th???c hi???n
                        chuy???n ti???n.
                      </li>
                      <li className="text-muted">
                        <i class="far fa-hand-point-right pe-2"></i> Copy v?? g???i
                        m?? giao d???ch.
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6" id="thu-2-repsonsive">
                    <ul class="icon-list icon-first">
                      <li className="text-muted">
                        <i class="fas fa-hourglass-half pe-2"></i> Koin s??? ???????c
                        n???p trong 24h.
                      </li>
                      <li className="text-muted">
                        <i class="fas fa-hourglass-half pe-2"></i> Qu?? 24h, li??n
                        h??? h??? tr???:
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.facebook.com/kphim.fb/"
                          className="ps-1 pe-1"
                        >
                          Facebook
                        </a>
                      </li>
                      <li className="text-muted">
                        <i class="fas fa-hourglass-half pe-2"></i> Ch?? ?? nh???p
                        th??ng tin ch??nh x??c
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="mt-0 mb-0 pt-0 pb-0">-------------</p>
                {this.state.isLoading == true ? (
                  <div>
                    <h3> ??ang x??? l??... </h3>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3 mt-0 pt-0">
                      {" "}
                      <div className="d-inline-block text-light me-2 mb-2">
                        {" "}
                        M???nh gi??:{" "}
                        <select
                          name="type"
                          id="coin"
                          onChange={this.getMenhgia.bind(this)}
                          value={this.state.menhgia}
                        >
                          <option value="10">10k</option>
                          <option value="20">20k</option>
                          <option value="50">50k</option>
                          <option value="100">100k</option>
                        </select>{" "}
                      </div>
                      <div className="d-inline-block text-light ms-2">
                        {" "}
                        Ph????ng th???c:{" "}
                        <select
                          type="select"
                          name="coin"
                          id="coin"
                          onChange={this.getCombo.bind(this)}
                          value={this.state.type}
                        >
                          <option value="momo">Momo</option>
                          <option value="airpay">Airpay</option>
                          <option value="bank">Chuy???n Kho???n</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-light mb-2">
                      {this.state.type == "momo" && (
                        <h6>
                          Chuy???n kho???ng {this.state.menhgia}k v??o t??i kho???n
                          Momo: <h4>{this.state.momo}</h4>{" "}
                        </h6>
                      )}
                      {this.state.type == "airpay" && (
                        <h6>
                          Chuy???n kho???ng {this.state.menhgia}k v??o t??i kho???n
                          Airpay: <h4>{this.state.airpay}</h4>{" "}
                        </h6>
                      )}
                      {this.state.type == "bank" && (
                        <h6>
                          Chuy???n kho???ng {this.state.menhgia}k v??o t??i kho???n:{" "}
                          <h4>{this.state.bank}</h4>{" "}
                        </h6>
                      )}
                    </div>
                    <input
                      class="form-control w-100"
                      type="input"
                      name="voucher"
                      id="voucher"
                      placeholder=" Nh???p m?? giao d???ch"
                      onChange={this.onSubmit}
                    />

                    <button
                      className="btn btn-lg btn-outline-warning mt-3 d-inline"
                      id="buttomSearch"
                      onClick={() => this.NapKoin()}
                    >
                      X??c nh???n
                    </button>
                  </div>
                )}
              </header>
            )
          ) : (
            <header>
              <img
                className="mt-5 pt-2 pb-2"
                src={meo6}
                height={160}
                 width={250}
              ></img>
              <h4 className="mt-2 mb-5">Ki???m tra ????ng nh???p...</h4>{" "}
              <div className="mb-5 pb-5"></div>
            </header>
          )}
        </div>
      </div>
    );
  }
}

export default Koin;
