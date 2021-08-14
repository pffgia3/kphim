import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Category/Category.css";
import FilmItem2 from "../FilmItem/FilmItem2";
import PopupItem from "../FilmItem/PopupItem";
import Loading from "../Loading/Loading";

function Caterogy() {
  const { type, value, order } = useParams();
  const postsPerPage = 4;
  const [showCategory, setshowCategory] = useState(value);
  const [data, getData] = useState([]);
  const [last, getLast] = useState([]);
  const [first, getFirst] = useState([]);
  const [nowpage, getNowpage] = useState(1);
  const [keysearch, getKeysearch] = useState([]);
  const [isLoading, getisLoading] = useState(false);

  const theloaiRequest = [
    "tat-ca",
    "phim-le",
    "phim-bo",
    "hanh-dong",
    "anime",
    "lang-man",
    "vien-tuong",
    "kinh-di",
    "gia-dinh",
    "hai",
    "chinh-kich",
    "gia-dinh",
    "toi-pham",
    "my",
    "han",  
    "nhat",
    "viet",
    "trung",
    "quoc-gia-khac",
    "old",
  ];
  const theloaiClient = [
    "Tất cả phim",
    "Phim lẻ",
    "Phim bộ",
    "Phim hành động",
    "Phim anime",
    "Phim lãng mạn",
    "Phim viễn tưởng",
    "Phim kinh dị",
    "Phim gia đình & trẻ em",
    "Phim hài",
    "Phim chính kịch",
    "Phim gia đình & trẻ em",
    "Phim tội phạm",
    "Phim Mỹ",
    "Phim Hàn Quốc",
    "Phim Nhật Bản",
    "Phim Việt Nam",
    "Phim Trung Quốc",
    "Phim các nước khác",
    "Phim trước 2014",
  ];
  const inDatabase = [
    "all",
    "single",
    "series",
    "action",
    "anime",
    "romantic",
    "scifi",
    "horror",
    "family",
    "comedy",
    "drama",
    "family",
    "crime",
    "us",
    "ko",
    "ja",
    "vi",
    "ch",
    "wo",
    "old",
  ];
  const getApiData = async (keysearch, last, nextOrPrev) => {
    try{
    const res = await axios.get(process.env.REACT_APP_API_LOCAL+"/caterogy/"+type+"/"+keysearch+"/"+last + "/" + nextOrPrev);
    // console.log(res.data);
    getData(res.data);
    getLast(res.data[res.data.length - 1].id);
    getFirst(res.data[0].id);
    getisLoading(false)
    // console.log("/caterogy/"+type+"/"+keysearch+"/"+last);
    // console.log(res.data[(res.data.length)-1].id);
    }
    catch(e){
      console.log(e);
    }
  }

   function  getPagingData(step) {
     // step: next prev, start
    // console.log("next page"+ keysearch + "__" +last);
    getisLoading(true);
    if (step == "next") {
      getApiData(keysearch, last, step);
      getNowpage(nowpage + 1);
    } else if (step == "prev"){ 
      getApiData(keysearch, first, step);
      getNowpage(nowpage - 1);
    }
    else { // ve dau trang
      getApiData(keysearch, -1, "next");
      getNowpage(1);
    }
  };

  // init
  useEffect(() => {
    getNowpage(1)

    // if(!order)
    //   window.location.href = window.location.href+"/new";
  

    var i = 0;
    for (let x of theloaiRequest) {
      if (x == value) {
        // console.log(theloaiClient[i] + "__" + i);
        setshowCategory(theloaiClient[i]);
        break;
      }
      i++;
    }
    getKeysearch(value);
    var keyfirst = value;
    for (let i = 0; i < theloaiRequest.length; i++) {
      if (theloaiRequest[i] == value) {
        getKeysearch(inDatabase[i]);
        keyfirst = inDatabase[i];
      }
    }

    getApiData(keyfirst, -1, "next");
  }, []);

  return (
    <div>
      {/* {console.log(data.length)} */}
      {isLoading && <Loading/>}
      <main className="bd-content order-1 py-5" id="content">
        <div className="container">
          <h2 id="page">{showCategory}</h2>
          <p>- Trang {nowpage} - </p>
          <div>
            {/* <a
              className={
                "btn me-5 btn-sm btn-outline-light " +
                (order === "new" ? "active" : "")
              }
              href={"/" + type + "/" + value + "/new"}
            >
              Mới nhất
            </a>
            <a
              className={
                "btn btn-sm btn-outline-light " +
                (order === "old" ? "active" : "")
              }
              href={"/" + type + "/" + value + "/old"}
            >
              Cũ nhất
            </a> */}
          </div>

          {/* {console.log(data.length)} */}
          {data.length != 0 && (
            <div className="row mt-4">
              {/* {console.log(data)} */}
              {data.slice(0, postsPerPage).map((item, index) => (
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
              {data.slice(0, postsPerPage).map((item, index) => (
                <FilmItem2
                  stt={index}
                  id={item.id}
                  title={item.title}
                  year={item.year}
                  img={item.img}
                />
              ))}
            </div>
          )}

          {/* Debug Area */}

          {/* ===last: {12 * page - 13}======next: {12 * page}=== */}

          {/* End Debug Area  */}

          {/*  test 2 paging*/}
          <nav>
            <ul
              className="pagination d-flex justify-content-center"
              id="pagination-ul"
            >
              <li className="page-item">
                <a
                  className={
                    "btn me-2 btn-lg btn" +
                    (nowpage == 1 // disable perv (no data)
                      ? "-secondary dis"
                      : "-outline-danger")
                  }
                  id="goEndFirst"
                  onClick={() => getPagingData("start")}
                  aria-label="Previous"
                >
                  <i class="fas fa-backward"></i>{" "}
                </a>
              </li>
              <li className="page-item">
                <a
                  className={
                    "btn btn-lg btn" +
                    (nowpage == 1 // disable perv (no data)
                      ? "-secondary dis"
                      : "-outline-danger")
                  }
                  id="next-prev"
                  onClick={() => getPagingData("prev")}
                  aria-label="Previous"
                >
                  <i class="fas fa-caret-left"></i>
                </a>
              </li>
              <li className="ps-3 pt-2">Trang {nowpage}</li>
              <li className="page-item ms-3">
                <a
                  className={
                    "btn btn-lg btn" +
                    (!data[postsPerPage] // disable next (end data)
                      ? "-secondary dis"
                      : "-outline-danger")
                  }
                  id="next-prev"
                  onClick={() => getPagingData("next")}
                  aria-label="Next"
                >
                  <i class="fas fa-caret-right"></i>
                </a>
              </li>
              <li>
                <a
                  className="btn ms-2 btn-lg btn-outline-danger"
                  href="#page"
                  id="goEndFirst"
                >
                  <i class="fas fa-chevron-up"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </div>
  );
}
export default Caterogy;
