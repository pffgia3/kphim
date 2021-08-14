import React, { Component } from "react";
import firebase from "firebase/app";
import "./Voucher.css";
import FilmItem2 from "../FilmItem/FilmItem2";
import PopupItem from "../FilmItem/PopupItem";
import meo7 from "../../images/meo7.gif"
import axios from "axios";
class MyVip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isUser: null,
      data: [],
    };
  }

  getinfo() {
    {
      let that = this;
      axios
        .all([
          axios.get(
            process.env.REACT_APP_API_LOCAL +
              "/myvipphim/" +
              firebase.auth().currentUser.email
          ),
        ])
        .then(
          axios.spread(function (mycode) {
            // console.log(mycode.data)
            that.setState({
              data: mycode.data,
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
                  Đăng nhập để xem!
                </h4>{" "}
                <div className="mb-5 pb-5"></div>
              </header>
            ) : (
              <header>
                <img
                  className="mt-5 pt-2 pb-2"
                  src={meo7}
                  width={250}
                ></img>
                <h4 className="mt-2 mb-2">Phim Vip đã mở!</h4>
                <p>- Phim hết hạn Vip sẽ không xuất hiện ở đây -</p>
                {(this.state.data.length != 0 && this.state.data!="nothing" && this.state.data!="Wrong") ? (
                  <div className="row mt-4">
                    {/* {console.log(data)} */}
                    {this.state.data.map((item, index) => (
                      <PopupItem
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        yttrailer={item.yttrailer}
                        year={item.year}
                        actor={item.actor}
                        director={item.director}
                        type={item.type}
                        level={item.level}
                        length={item.length}
                        country={item.country}
                      />
                    ))}
                    {this.state.data.map((item, index) => (
                      <FilmItem2
                        stt={index}
                        id={item.id}
                        title={item.title}
                        year={item.year}
                        img={item.img}
                      />
                    ))}
                  </div>
                ):
                <h3>- Không có phim nào -</h3>}
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

export default MyVip;
