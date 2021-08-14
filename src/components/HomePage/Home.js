import { Component, useEffect, useState } from "react";
// import logo from "../../images/logo1.png";
import axios from "axios";
import "./Home.css"

import FilmItem from "../FilmItem/FilmItem";
import PopupItem from "../FilmItem/PopupItem";
import FilmItem2 from "../FilmItem/FilmItem2";
// import firebase from "firebase/app";


function Home () {
  const [top, getTop] = useState([]);
  const [recommend, getRecommend] = useState([]);
  const [trending, getDataTrending] = useState([]);
  const [newF, getNewF] = useState([]);
  const [ObjectItem, getObjectItem] = useState([]);
    const postsPerPage = 12;
  const dataExample = [
    {
      actor: "James Luis, Lebron Jamse, Lukaku,...",
      country: "us",
      createDay: "2021-07-20",
      description:
        "Trận chiến cuối cùng của các siêu anh hùng trước thế lực mạnh mẽ của Thanos, kẻ sở hữu cả 6 viên đá vô cực.",
      director: "KENNY YOU",
      id: 24,
      img: "https://ss-images.saostar.vn/wp700/2019/04/02/4887547/avengers-endgame-dolby-1165441.jpeg",
      length: "3h03p",
      level: "PG13",
      numofchap: "0",
      onlist: "recommend",
      priceVip: "3",
      status: 1,
      title: "Avenger: Infinity War",
      type: { action: "action", hollywood: "hollywood", scifi: "scifi" },
      year: "2019",
      yttrailer:
        '<iframe width="max-content" height="315" src="https://www.youtube.com/embed/E7EOjkGVmyo" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>',
    },
    {
      actor: "Ngô Thanh Vân, Ngô Thừa Ân, Ngô Kiến Huy,....",
      country: "us",
      createDay: "2021-07-24",
      description:
        "phim được thêm bằng client admin, không phải trực tiếp trên database. TESTTT Hello, it's me I was wondering if after all these years you'd like to meet To go over everything They say that time's supposed to heal ya",
      director: "It's me",
      id: 23,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Felis_silvestris_silvestris_Luc_Viatour.jpg/310px-Felis_silvestris_silvestris_Luc_Viatour.jpg",
      length: "1h54",
      level: "PG16",
      numofchap: "0",
      onlist: "no",
      priceVip: "10",
      status: 1,
      title: "First add from admin page",
      type: { scifi: "scifi" },
      year: "2021",
      yttrailer:
        '<iframe width="max-content" height="315" src="https://www.youtube.com/embed/E7EOjkGVmyo" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>',
    },
    {
      actor: "All the ghosts in the world",
      country: "America",
      createDay: "2021-07-22",
      description:
        "Hi vọng bạn sẽ tìm được câu trả lời cho câu hỏi: Chúng ta sống, để làm gì?",
      director: "Ed & Warren",
      id: 22,
      img: "https://petrotimes.vn/stores/news_dataimages/trucvan/052016/07/23/4-phim-kinh-di-dang-xem-nhat-mua-he-2016.jpg",
      length: "120min",
      level: "R",
      numofchap: 0,
      priceVip: "10",
      status: 1,
      title: "The cọnuring 2",
      type: { horror: "horror", scifi: "scifi" },
      year: "2021",
      yttrailer:
        '<iframe width="max-content" height="315" src="https://www.youtube.com/embed/E7EOjkGVmyo" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>',
    },
    {
      actor: "The big Shark",
      country: "America",
      createDay: "2021-07-20",
      description:
        "Hi vọng bạn sẽ tìm được câu trả lời cho câu hỏi: Chúng ta sống, để làm gì?",
      director: "Mr.Fish",
      id: 19,
      img: "https://www.uplevo.com/img/designbox/poster-phim-jaws.jpg",
      length: "120min",
      level: "R",
      numofchap: 0,
      onlist: "trending",
      priceVip: "10",
      status: 1,
      title: "JAWS",
      type: { action: "action", hollywood: "hollywood", horror: "horror" },
      year: "2021",
      yttrailer:
        '<iframe width="max-content" height="315" src="https://www.youtube.com/embed/E7EOjkGVmyo" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>',
    },
    {
      actor: "Phonix and Dragon",
      country: "America",
      createDay: "2021-07-20",
      description:
        "Hi vọng bạn sẽ tìm được câu trả lời cho câu hỏi: Chúng ta sống, để làm gì?",
      director: "Batman",
      id: 21,
      img: "https://genk.mediacdn.vn/2019/10/28/photo-3-157223428377635797016.jpg",
      length: "120min",
      level: "PG16",
      numofchap: 0,
      onlist: "trending",
      priceVip: "10",
      status: 1,
      title: "JOKER",
      type: { action: "action", crime: "crime", drama: "drama" },
      year: "2021",
      yttrailer:
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    },
    {
      actor: "Hijomaka, Tacpu, Hovisdor",
      country: "America",
      description:
        "Hi vọng bạn sẽ tìm được câu trả lời cho câu hỏi: Chúng ta sống, để làm gì?",
      director: "Tiveer Quatani",
      id: 20,
      img: "https://www.uplevo.com/img/designbox/poster-phim-the-silence-of-the-lambs.jpg",
      length: "120min",
      level: "R",
      numofchap: 0,
      onlist: "recommend",
      priceVip: "10",
      status: 1,
      title: "The silence of the lamb",
      type: {
        action: "action",
        drama: "drama",
        hollywood: "hollywood",
        horror: "horror",
      },
      year: "2021",
      yttrailer:
        '<iframe width="max-content" height="315" src="https://www.youtube.com/embed/E7EOjkGVmyo" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>',
    },
 
  ];

  // carousel1 
  const loadCarousel = async () => {
    let items = document.querySelectorAll("#recipeCarousel #t4item");
    items.forEach((el) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          next = items[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
      i++;
    });

    // carousel2 4 item
    let item2 = document.querySelectorAll("#recipeCarousel2 #t4item");
    item2.forEach((el) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          next = item2[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });

    // carousel3 4 item
    let item3 = document.querySelectorAll("#recipeCarousel3 #t4item");
    item3.forEach((el) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          next = item3[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
  }

  const fetchPosts = async () => {
    // const res = await axios.get("https://kfapi.herokuapp.com/recommend");
    // getRecommend(res.data);

    // const res2 = await axios.get("https://kfapi.herokuapp.com/trending");
    // getDataTrending(res2.data);

    // 0 new update
    // 1 trending
    // 2 recommend
    // 3 top
    const res3 = await axios.get(process.env.REACT_APP_API_LOCAL + "/home2");
    getNewF(res3.data[0])
    getRecommend(res3.data[2]);
    getDataTrending(res3.data[1]);
    getTop(res3.data[3]);
 
    // console.log("+++", res3.data[3]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // console.log(trending);
      if(recommend.length != 0)
      loadCarousel();
  });

  // if(recommend.length != 0)
  // {

  // }


  return (
    <main className="bd-content order-1 py-5" id="content">
      {/* Top list */}
      <div
        id="myCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={3}
            aria-label="Slide 4"
          />
        </div>
        <div className="carousel-inner">
          {top.slice(0, 4).map((item, index) =>
            index == 0 ? (
              <div className="carousel-item active" id="first-carousel">
                <img
                  className="bd-placeholder-img"
                  width="100%"
                  height="100%"
                  src={item.backimg}
                ></img>

                <div className="container">
                  <div className="carousel-caption text-start">
                    <h1>{item.title}</h1>
                    <p className="mota">{item.description}</p>
                    <p>
                      <a
                        className="btn btn-lg btn-danger"
                        href={"/watch/" + item.id}
                      >
                        Xem ngay!
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="carousel-item" id="first-carousel">
                <img
                  className="bd-placeholder-img"
                  width="100%"
                  height="100%"
                  src={item.backimg}
                />

                <div className="container">
                  <div className="carousel-caption text-start">
                    <h1>{item.title}</h1>
                    <p className="mota">{item.description}</p>
                    <p>
                      <a
                        className="btn btn-lg btn-danger"
                        href={"/watch/" + item.id}
                      >
                        Xem ngay!
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <hr className="featurette-divider danger" />

      {/* List Trending */}
      <div className="container text-center my-3">
        <h2 className="text-list">
          <i class="fas fa-chart-line"></i> Trending
        </h2>
        <div className="row mx-auto my-auto justify-content-center">
          <div
            id="recipeCarousel2"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              {trending.map((item, index) => (
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
              {trending.map((item, index) => (
                <FilmItem
                  stt={index}
                  id={item.id}
                  title={item.title}
                  year={item.year}
                  img={item.img}
                />
              ))}
            </div>
            <a
              className="carousel-control-prev bg-transparent w-aut"
              href="#recipeCarousel2"
              role="button"
              data-bs-slide="prev"
              id="button-left"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
            </a>
            <a
              className="carousel-control-next bg-transparent w-aut"
              href="#recipeCarousel2"
              role="button"
              data-bs-slide="next"
              id="button-rigth"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Recommend */}
      <div className="container text-center my-3">
        <h2 className="text-list">
          <i class="far fa-thumbs-up"></i> Phim hay chọn lọc
        </h2>
        <div className="row mx-auto my-auto justify-content-center">
          <div
            id="recipeCarousel3"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              {recommend.map((item, index) => (
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
              {recommend.map((item, index) => (
                <FilmItem
                  stt={index}
                  id={item.id}
                  title={item.title}
                  year={item.year}
                  img={item.img}
                  recommend={1}
                />
              ))}
            </div>
            <a
              className="carousel-control-prev bg-transparent w-aut"
              href="#recipeCarousel3"
              role="button"
              data-bs-slide="prev"
              id="button-left"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
            </a>
            <a
              className="carousel-control-next bg-transparent w-aut"
              href="#recipeCarousel3"
              role="button"
              data-bs-slide="next"
              id="button-rigth"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* lIST NEW update */}
      <div className="container">
        <h2 id="custom-components">Vừa cập nhật</h2>
        <div className="row">
          {newF.slice(0, 8).map((item, index) => (
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
          {newF.slice(0, 8).map((item, index) => (
            <FilmItem2
              stt={index}
              id={item.id}
              title={item.title}
              year={item.year}
              img={item.img}
            />
          ))}
        </div>
      </div>

      {/* Static Data */}
      {/*    <div className="container text-center my-3">
        <h2 className="text-list">
          <i class="fas fa-chart-line"></i> Trending (static data)
        </h2>
        <div className="row mx-auto my-auto justify-content-center">
          <div
            id="recipeCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              <div>
                <PopupItem
                  id={0}
                  title={"FILM 1"}
                  year={"2020"}
                  yttrailer='<iframe
                  width="max-content"
                  height="315"
                  src="https://www.youtube.com/embed/E7EOjkGVmyo"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>'
                  description={
                    "The Div is the most usable tag in web development because it helps us to separate out data in the web page and we can create a particular section for particular data or function in the web pages. It is used to the group of various tags of HTML so that sections can be created and style can be applied to them."
                  }
                />
                <PopupItem
                  id={1}
                  title={"FILM 2"}
                  year={"2019"}
                  yttrailer='<iframe
                  width="max-content"
                  height="315"
                  src="https://www.youtube.com/embed/E7EOjkGVmyo"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>'
                  description={
                    "The Div is the most usable tag in web development because it helps us to separate out data in the web page and we can create a particular section for particular data or function in the web pages. It is used to the group of various tags of HTML so that sections can be created and style can be applied to them."
                  }
                />
                <PopupItem
                  id={2}
                  title={"FILM 3"}
                  year={"2018"}
                  yttrailer='<iframe
                  width="max-content"
                  height="315"
                  src="https://www.youtube.com/embed/E7EOjkGVmyo"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>'
                  description={
                    "The Div is the most usable tag in web development because it helps us to separate out data in the web page and we can create a particular section for particular data or function in the web pages. It is used to the group of various tags of HTML so that sections can be created and style can be applied to them."
                  }
                />
                <PopupItem
                  id={3}
                  title={"FILM 4"}
                  year={"2017"}
                  yttrailer='<iframe
                  width="max-content"
                  height="315"
                  src="https://www.youtube.com/embed/E7EOjkGVmyo"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>'
                  description={
                    "The Div is the most usable tag in web development because it helps us to separate out data in the web page and we can create a particular section for particular data or function in the web pages. It is used to the group of various tags of HTML so that sections can be created and style can be applied to them."
                  }
                />
                <FilmItem
                  stt={0}
                  id={0}
                  title={"FILM 1"}
                  year={"2020"}
                  img="https://m.media-amazon.com/images/I/71QnSpuvhiL._AC_SY741_.jpg"
                />
                <FilmItem
                  stt={1}
                  id={1}
                  title={"FILM 2"}
                  year={"2019"}
                  img="https://m.media-amazon.com/images/I/71QnSpuvhiL._AC_SY741_.jpg"
                />
                <FilmItem
                  stt={2}
                  id={2}
                  title={"FILM 3"}
                  year={"2018"}
                  img="https://m.media-amazon.com/images/I/71QnSpuvhiL._AC_SY741_.jpg"
                />
                <FilmItem
                  stt={3}
                  id={3}
                  title={"FILM 4"}
                  year={"2017"}
                  img="https://m.media-amazon.com/images/I/71QnSpuvhiL._AC_SY741_.jpg"
                />
                <FilmItem
                  stt={4}
                  id={4}
                  title={"FILM 5"}
                  year={"2012"}
                  img="https://m.media-amazon.com/images/I/71QnSpuvhiL._AC_SY741_.jpg"
                />
                <FilmItem
                  stt={5}
                  id={5}
                  title={"FILM 6"}
                  year={"2007"}
                  img="https://m.media-amazon.com/images/I/71QnSpuvhiL._AC_SY741_.jpg"
                />
                <FilmItem
                  stt={6}
                  id={6}
                  title={"FILM 7"}
                  year={"2019"}
                  img="https://m.media-amazon.com/images/I/71QnSpuvhiL._AC_SY741_.jpg"
                />
                <FilmItem
                  stt={7}
                  id={7}
                  title={"FILM 8"}
                  year={"2020"}
                  img="https://m.media-amazon.com/images/I/71QnSpuvhiL._AC_SY741_.jpg"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev bg-transparent w-aut"
              href="#recipeCarousel"
              role="button"
              data-bs-slide="prev"
              id="button-left"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
            </a>
            <a
              className="carousel-control-next bg-transparent w-aut"
              href="#recipeCarousel"
              role="button"
              data-bs-slide="next"
              id="button-rigth"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
 */}
    </main>
  );
}

export default Home;
