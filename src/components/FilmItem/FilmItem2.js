// import classNames from 'classnames';
import React, { Component } from "react";
import "./filmItem2.css";
import Popup from "reactjs-popup";

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

class FilmItem2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-6 col-md-4 col-xl-3 mb-3" id="phimItem">
        <div className="d-block">
          <img
            className="img-thumbnail mb-2"
            src={this.props.img}
            alt=""
            width={480}
            height={300}
            loading="lazy"
            data-bs-toggle="modal"
            data-bs-target={"#ItemModal" + this.props.id}
          />
          <h3 className="h6 mb-1">
            {this.props.id}.{this.props.title}
          </h3>
        </div>
        <p className="text-muted">({this.props.year})</p>
      </div>
    );
  }


}

export default FilmItem2;


