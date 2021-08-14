// import classNames from 'classnames';
import React, { Component } from "react";
import "./filmItem.css";
import Popup from "reactjs-popup";

  const typeReq = [
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
  const typeClient = [
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

  const qgReq = ["us", "ko", "ja", "vi", "ch", "wo"];
  const qgClient = ["Mỹ", "Hàn Quốc", "Nhật Bản", "Việt Nam", "Trung Quốc", "..."];


class PopupItem extends Component {
  constructor(props) {
    super(props);
     this.state = {
      quocgia: "",
      id: null,
      theloai: [],
      clientype:"",
    };
  }

  componentDidUpdate(){
    // this.setState({id: this.props.id});
  }

  forcetoUpdate(){
    // console.log(this.state.id +" != "+ this.props.id);
        if (this.state.id != this.props.id){

          let i = 0;
          let newqg=""
          qgReq.forEach((qg) => {
            if (qg == this.props.country)
                  newqg= qgClient[i];
            i++;
          });

          let newtype="";
          const aaa = this.props.type;
          // console.log( aaa[1])

          for (var propertyName in aaa) {
             for (let j = 0; j < typeReq.length; j++) {
              if (typeReq[j] == propertyName) {
                if(newtype=="")
                  newtype = typeClient[j];
                else
                  newtype = newtype + ", "+ typeClient[j];
                break;
              }
            }
          }
          this.setState({
            clientype: newtype,
            id: this.props.id,
            quocgia: newqg,
          });

        }
  }


  render() {
    return (
      <div
        className="modal fade"
        id={"ItemModal" + this.props.id}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {this.state.id != this.props.id && this.forcetoUpdate()}
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header" id="header-popup">
              <h5 className="modal-title" id="exampleModalLabel">
                {this.props.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="bt-close"
              />
            </div>
            <div className="modal-body" id="body-popup">
              <div
                className="yttrailer"
                dangerouslySetInnerHTML={{ __html: this.props.yttrailer }}
              >
                {/* <iframe
                  width="max-content"
                  height="315"
                  src="https://www.youtube.com/embed/E7EOjkGVmyo"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe> */}
              </div>
            </div>
            <div className="modal-footer" id="footer-popup">
              <p>
                {this.props.year} | {this.props.level} | Thời lượng:{" "}
                {this.props.length}
              </p>
              <p> Quốc gia: {this.state.quocgia} </p>
              <p>Thể Loại: {this.state.clientype}</p>
              <div id="desp">{this.props.description}</div>
              <br></br>
              <p>
                {" "}
                {/* Diễn viên: Adof Hitman, James Wana, Lena Goden,... | Đạo diễn:Bitche Perchi{" "} */}
                Diễn viên: {this.props.actor} | Đạo diễn: {this.props.director}
              </p>
            </div>
            <div className="modal-footer" id="footer-popup">
              <a
                href={"/watch/" + this.props.id}
                type="button"
                className="btn btn-danger"
                id="button-xemphim"
              >
                XEM PHIM
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }


}

export default PopupItem;


