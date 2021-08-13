// import classNames from 'classnames';
import React, { Component } from "react";
import "./filmItem.css";
import Popup from "reactjs-popup";

// import so1 from "../../images/so1.png";
// import so2 from "../../images/so2.png";
// import so3 from "../../images/so3.png";
// import so4 from "../../images/so4.png";
// import so5 from "../../images/so5.png";
// import so6 from "../../images/so6.png";
// import so7 from "../../images/so7.png";
// import so8 from "../../images/so8.png";
// import so9 from "../../images/so9.png";
// import so10 from "../../images/so10.png";
  const inData = [
    "action",
    "anime",
    "romantic",
    "scifi",
    "horror",
    "family",
    "comedy",
    "series",
    "drama",
    "single",
  ];
  const inClient = [
    "hành động",
    "anime",
    "lãng mạn",
    "viễn tưởng",
    "kinh dị",
    "gia đình",
    "hài hước",
    "series",
    "chính kịch",
    "phim lẻ",
  ];

class FilmItem extends Component {
  constructor(props) {
    super(props);
  }

  renderNumber(){
    switch (this.props.stt) {
      case 0:
        var so1 = require("../../images/so1.png").default;
        return (
          <img
            src={so1}
            className="number-img"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          ></img>
        );
      case 1:
        var so2 = require("../../images/so2.png").default;
        return (
          <img
            src={so2}
            className="number-img"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          ></img>
        );
      case 2:
        var so3 = require("../../images/so3.png").default;
        return (
          <img
            src={so3}
            className="number-img"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          ></img>
        );
      case 3:
          var so4 = require("../../images/so4.png").default;
        return (
          <img
            src={so4}
            className="number-img"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          ></img>
        );
      case 4:
          var so5 = require("../../images/so5.png").default;
        return (
          <img
            src={so5}
            className="number-img"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          ></img>
        );
      case 5:
          var so6 = require("../../images/so6.png").default;
        return (
          <img
            src={so6}
            className="number-img"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          ></img>
        );
      case 6:
          var so7 = require("../../images/so7.png").default;
        return (
          <img
            src={so7}
            className="number-img"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          ></img>
        );
      case 7:
          var so8 = require("../../images/so8.png").default;
        return (
          <img
            src={so8}
            className="number-img"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          ></img>
        );
      case 8:
          var so9 = require("../../images/so9.png").default;
        return (
          <img
            src={so9}
            className="number-img"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          ></img>
        );
      case 9:
          var so10 = require("../../images/so10.png").default;
        return (
          <img
            src={so10}
            className="number-img"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          ></img>
        );
      default:
        <img
          src={so6}
          className="number-img"
          data-bs-toggle="modal"
          data-bs-target={"#ItemModal" + this.props.id}
        ></img>;
    }
    
  }
  
  render() {
    return (
      <div
        className={"carousel-item " + (this.props.stt == 0 ? "active" : "")}
        id="t4item"
      >
        {/* {console.log(this.props.stt + "----" + this.props.id)} */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-img column">
              <figure>
                {" "}
                <img
                  src={this.props.img}
                  className="img-fluid"
                  data-bs-toggle="modal"
                  data-bs-target={"#ItemModal" + this.props.id}
                />
                {this.props.recommend != 1 &&  this.renderNumber()
                }
               
              </figure>
            </div>
            <div class="card-body">
              <h5 class="card-title" id="title-item">
                {this.props.title}{" "}
              </h5>
              <p class="card-text" id="year-item">
                ({this.props.year})
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }


}

export default FilmItem;


