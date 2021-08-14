import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Search/Search.css";
import FilmItem2 from "../FilmItem/FilmItem2";
import PopupItem from "../FilmItem/PopupItem";

function Search() {
  const { keysearch } = useParams();
  const postsPerPage = 8;
  const [showCategory, setshowCategory] = useState(keysearch);
  const [searchResult, setSearchResult] = useState([]);

  const [data, getData] = useState([]);
  const [last, getLast] = useState([]);
  const [first, getFirst] = useState([]);
  const [nowpage, getNowpage] = useState(1);

  useEffect(() => {
    getNowpage(1);

    // if (!order) window.location.href = window.location.href + "/new";

    // if (keysearch != "no") setSearchResult(dataExample);

    getApiData(keysearch, -1, "next");
  }, []);

  const getApiData = async (keysearch, last, nextOrPrev) => {
    try {
        // console.log(last+">>");
      const res = await axios.get(
        process.env.REACT_APP_API_LOCAL +
          "/searchfilm/" +
          keysearch +
          "/" +
          last +
          "/" +
          nextOrPrev
      );
      getData(res.data);
      getLast(res.data[res.data.length - 1].id);
      getFirst(res.data[0].id); 
    } catch (e) {
      console.log("Không có kết quả");
    }
  };

  function getPagingData(step) {
    // step: next prev, start
    // console.log("next page" + keysearch + "__" + last+ "_last");

    if (step == "next") {
      getApiData(keysearch, last, step);
      getNowpage(nowpage + 1);
    } else if (step == "prev") {
      getApiData(keysearch, first, step);
      getNowpage(nowpage - 1);
    } else {
      // ve dau trang
      getApiData(keysearch, -1, "next");
      getNowpage(1);
    }
  }

  return (
    <div>
      <main className="bd-content order-1 py-5" id="content">
        <div className="container">
          {/* check result  */}
          {data.length !== 0 ? (
            <div>
              <h2 id="page">
                <i class="fas fa-search"></i> Kết quả tìm kiếm cho "{keysearch}"
              </h2>
              <p>- Trang {nowpage} -</p>
              {/* <p>- Try search "no" => no result -</p> */}

              <div className="row">
                {data.slice(0, postsPerPage).map((item, index) => (
                  <PopupItem
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    yttrailer={item.yttrailer}
                    year={item.year}
                    actor={item.actor}
                    director={item.actor}
                    level={item.level}
                    length={item.length}
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

              {/* Debug Area */}

              {/* ===last: {12 * page - 13}======next: {12 * page}=== */}

              <nav>
                <ul
                  className="pagination d-flex justify-content-center"
                  id="pagination-ul"
                >
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
                      href="#page"
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
                      href="#page"
                      aria-label="Next"
                    >
                      <i class="fas fa-caret-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
              {/* End Debug Area  */}
              {/* <nav>
                <ul
                  className="pagination d-flex justify-content-center"
                  id="pagination-ul"
                >
                  <li className="page-item">
                    <a
                      className={
                        "btn btn-lg btn" +
                        (!searchResult[postsPerPage * page - postsPerPage - 1] // disable perv (no data)
                          ? "-secondary dis"
                          : "-outline-danger")
                      }
                      href={parseInt(page) - 1}
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="ps-3 pt-2">Trang {page}</li>
                  <li className="page-item ms-3">
                    <a
                      className={
                        "btn btn-lg btn" +
                        (!searchResult[postsPerPage * page] // disable next (end data)
                          ? "-secondary dis"
                          : "-outline-danger")
                      }
                      disabled
                      tabindex="-1"
                      href={parseInt(page) + 1}
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
             */}
            </div>
          ) : (
            <h2 id="custom-components" className="pt-5 mt-5 no-result">
              <i class="fas fa-times"></i> Không tìm thấy kết quả nào cho "
              {keysearch}"
            </h2>
          )}
        </div>
      </main>
    </div>
  );
}
export default Search;
