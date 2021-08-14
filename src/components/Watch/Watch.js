import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import "../Watch/Watch.css";
import firebase from "firebase/app";

function Watch() {
    const { id, name } = useParams();
    const [data, getData] = useState([]);
    const [datatit, getDatatit] = useState([]);

    const [nowchap, setnowchap] = useState(1);
    const [nowServer, setnowServer] = useState(1); 
    
    const [listchap, setlistchap] = useState([]);
    const [Init, setInit] = useState(false);

    const dataExampleItem = 
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
        priceVip: "7",
        status: 1,
        title: "Avenger: Infinity War",
        type: { action: "action", hollywood: "hollywood", scifi: "scifi" },
        year: "2019",
        yttrailer:
          '<iframe width="max-content" height="315" src="https://www.youtube.com/embed/E7EOjkGVmyo" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>',
      }
    ;
    const dataExampleLink = [
        {"chap":1,"film_id":24,"id":7,"link":"<div style=\"position: relative; padding-top: 56.25%; padding-right:100%\"><iframe src=\"https://lstream.media/7a4e5711fd6b685caee142c28a6cf9141c06dab8?autoplay=true\\\" frameborder=\"0\" style=\"border: none; position: absolute; top: 0; height: 100%; width: 100%; margin-left:-50%\\\" height=\"100%\" width=\"100%\" allowfullscreen=\"true\" ></iframe> </div>","server":1},
        {"chap":2,"film_id":24,"id":8,"link":" <div style=\"position: relative; padding-top: 56.25%; padding-right:100%\"><iframe src=\"https://lstream.media/7a4e5711fd6b685caee142c28a6cf9141c06dab8\"frameborder=\"0\"style=\"border: none; position: absolute; top: 0; height: 100%; width: 100%; margin-left:-50%\\\"           height=\"100%\"           width=\"100%\"           allowfullscreen=\"true\"         ></iframe>       </div>","server":1},
        {"chap":1,"film_id":24,"id":10,"link":"<div style=\"position: relative; padding-top: 56.25%;\"><iframe src=\"https://iframe.mediadelivery.net/embed/4702/8fb57d67-e4f8-4cab-9a7e-11923dc4fc7d?autoplay=true\" loading=\"lazy\" style=\"border: none; position: absolute; top: 0; height: 100%; width: 100%; margin-left:-50%\" allow=\"accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;\" allowfullscreen=\"true\"></iframe></div>","server":2},
        {"chap":2,"film_id":24,"id":11,"link":'<iframe width="640" height="360" src="https://short.ink/Z2u34FCMs" frameborder="0" scrolling="0" allowfullscreen></iframe>',"server":2},
        {"chap":3,"film_id":24,"id":12,"link":"<iframe width=\"640\" height=\"360\" src=\"https://short.ink/GJuL0skWt\" frameborder=\"0\" scrolling=\"0\" allowfullscreen></iframe>","server":1,"vip":"false"},
        {"chap":4,"film_id":24,"id":13,"link":"<iframe width=\"640\" height=\"360\" src=\"https://short.ink/GJuL0skWt\" frameborder=\"0\" scrolling=\"0\" allowfullscreen></iframe>","server":1,"vip":"false"},
       {"chap":4,"film_id":24,"id":14,"link":"<iframe width=\"640\" height=\"360\" src=\"https://short.ink/GJuL0skWt\" frameborder=\"0\" scrolling=\"0\" allowfullscreen></iframe>","server":2,"vip":"true"}
    ];

    const getDataApi = async () => {
      try{
        const res = await axios.get(
          process.env.REACT_APP_API_LOCAL + "/watch/" + id
        );
        getData(res.data);

        const res2 = await axios.get(
          process.env.REACT_APP_API_LOCAL + "/info/" + id
        );
        getDatatit(res2.data);

        // console.log(res.data)
        var a = [];
          res.data.forEach((item) => {
            if (!a.includes(item.chap)) a.push(item.chap);
          });
          setlistchap(a);
          setInit(true);
        
        // console.log("]]")
        if (!name) {
          let x = window.location.href + "/" + (res2.data.title.replaceAll(" ","-"));
          window.location.replace(x);
        }
      }
      catch(e){
        console.log(e);
      }
    }

     const getDataVip = async () => {
        if (firebase.auth().currentUser != null) {
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(function (idToken) {
              axios
                .all([
                  axios.post(process.env.REACT_APP_API_LOCAL + "/watch2", {
                    token: idToken,
                    fid: id,
                  }),
                ])
                .then(
                  axios.spread(function (res) {
                    // that.setState({ isLoading: false })
                    // console.log();
                    getData(res.data);
                  })
                )
                .catch((error) => console.log(error));
            });
        }
     };

    useEffect(() => {
      getDataApi();
      // console.log(name);
      firebase.auth().onAuthStateChanged((user) => {
          // let x = user.displayName;
          // this.setState({ username: x });
          getDataVip();
        });

    },[]);

    function changeChap(value) {
        // console.log(value);
        setnowchap(value)
        setnowServer(1);
    }

    function changeServer(value) {
      setnowServer(value);
    //   setnowServerclea(1);
    }

    function vipPricePlan() {
      var x = document.getElementById("PricePlan");
      // var y = document.getElementById("buttonGoPlan");
      if (x.style.display === "none") {
        x.style.display = "flex";
        // y.style.display = "none";
      } 
      else x.style.display = "none";
    }

    // Baosl ỗi

      const [selectedClient, setSelectedClient] = useState("link");
      function handleSelectChange(event) {
        setSelectedClient(event.target.value);
      }
      const [inputField, setInputField] = useState({});
      function inputsHandler(e) {
        setInputField(e.target.value);
      }

      const doBaoloi = (token, mess, header) =>
        axios
          .post(process.env.REACT_APP_API_LOCAL + "/thembaoloi", {
            token: token,
            mess: mess,
            header: header,
          })
          .then((res) => res.data);
        

      const submitButton = () => {
        // alert(inputField);
        // alert(selectedClient);
        // getisLoading(true);
        if (firebase.auth().currentUser != null) {
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(function (idToken) {
              // if(selectedClient=="link")
              if (selectedClient=="link")
                  var mes =
                    inputField + "___" + id + "/" + nowchap + "/" + nowServer;
              else var mes = inputField; 
              doBaoloi(idToken, mes, selectedClient).then((res) => {
                if (res == false) alert(res);
                else {
                  alert(res);
                  window.location.reload();
                }
              });
                // .finally(getisLoading(false));
            });
        } else {
          alert("Login first")
        }
      };

    // 

    const UnLockVip = (plan) => {
      // getisLoading(true);
      if (firebase.auth().currentUser != null) {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
               axios.post(process.env.REACT_APP_API_LOCAL +"/unlockvip", {
                 token: idToken, fid: id, day: plan})
      // .then((res) => res.data)
              // .then((res) => res.data)
               .then((res) => {
                // console.log(res.data.mess);
                if (res.data.kq == false) alert(res.data.mess);
                else { 
                  alert(res.data.mess);
                  window.location.reload();
                }
              })
              // .finally(getisLoading(false));
          });
      } else {
        window.location.replace("/login");
      }
    };

    return (
      <div>
        <div className="container py-3">
          <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-2 mb-2 pt-2 border-bottom">
              <span className="fs-2">
                {datatit.title}{" "}
                <button
                  className="btn btn-sm btn-primary ms-1"
                  data-bs-toggle="modal"
                  data-bs-target="#ModalBaoloi"
                >
                  Báo lỗi
                </button>
                <div
                  className="modal fade"
                  id="ModalBaoloi"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  {" "}
                  <div className="modal-dialog mt-5 pt-5 ">
                    <div className="modal-content bg-dark text-white ps-5 pe-5">
                      <p>
                        <br></br>
                        Thông báo lỗi
                        <br></br>
                        <div className="pt-4 pb-3">
                          <label
                            for="cars"
                            style={{
                              display: "inline-block",
                              marginRight: "3%",
                            }}
                          >
                            Vấn đề bạn gặp phải:{" "}
                          </label>
                          <select
                            id="header"
                            value={selectedClient}
                            onChange={handleSelectChange}
                            name="header"
                          >
                            <option value="link" selected>
                              {" "}
                              Lỗi phim
                            </option>
                            <option value="koin">Lỗi nạp và Vip</option>
                            <option value="req">Yêu cầu phim</option>
                            <option value="other">Khác</option>
                          </select>
                        </div>
                        <label
                          style={{ display: "inline-block", marginRight: "3%" }}
                          for="nd"
                        >
                         Mô tả:
                        </label>
                        <input
                          id="nd"
                          type="text"
                          name="mess"
                          required=""
                          onChange={inputsHandler}
                        ></input>
                        <br></br>
                        <br></br>
                        <button onClick={submitButton}>Gửi</button>
                        <br></br>
                        <br></br>
                      </p>
                    </div>
                  </div>
                </div>
              </span>
            </div>
            <div className="pb-2 mb-2 pt-2 border-bottom">
              {data.map(
                (item) =>
                  item.chap == nowchap &&
                  item.server == nowServer &&
                  (item.link != "VIP" ? (
                    <div
                      className="pricing-header p-3 pb-md-4 mx-auto text-center"
                      id="iframeLinkBody"
                      dangerouslySetInnerHTML={{
                        __html: item.link,
                      }}
                    ></div>
                  ) : (
                    <div>
                      <h5> Mở VIP để xem server này </h5>
                      <img
                        src="https://cdn.streamelements.com/uploads/06a09189-b665-435f-b5cf-147d727e52bb.gif"
                        width={300}
                      ></img>
                    </div>
                  ))
              )}
            </div>
            <nav
              class="navbar  bg-dark mx-auto"
              style={{ width: " fit-content" }}
            >
              <div class="container-fluid justify-content-start mx-auto">
                Chap:{" "}
                {listchap.map((item, index) => (
                  <button
                    className={
                      "btn btn-outline-danger ms-3 " +
                      (item == nowchap ? "active" : "")
                    }
                    type="button"
                    onClick={() => changeChap(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </nav>

            <nav
              class="navbar  bg-dark mx-auto mt-2"
              style={{ width: " fit-content" }}
            >
              <div class="container-fluid justify-content-start mx-auto ">
                Server:
                {
                  // Server Thuong =Secondary     Server Vip=Warning
                  data.map(
                    (item, index) =>
                      item.chap == nowchap && (
                        <button
                          className={
                            "btn ms-3 btn-outline-" +
                            (item.link == "VIP" || item.vipLink == "VIP"
                              ? "warning "
                              : "secondary ") +
                            "" +
                            (item.server == nowServer ? "active" : "")
                          }
                          type="button"
                          onClick={() => changeServer(item.server)}
                        >
                          {item.server}
                        </button>
                      )
                  )
                }
              </div>
            </nav>
          </header>
          <main className="mt-3">
            <div className="vipPricePlan mb-3" id="buttonGoPlan">
              <a
                className="btn btn-outline-danger"
                onClick={() => vipPricePlan()}
                // href="#PricePlan"
              >
                <h5>
                  Mở tất cả server VIP chỉ từ{" "}
                  <strong>{datatit.priceVip} Koin</strong>
                </h5>
              </a>
            </div>
            <div
              className="row row-cols-1 row-cols-md-3 mb-3 text-center"
              id="PricePlan"
              style={{ display: "none" }}
            >
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm border-secondary">
                  <div className="card-header py-3 text-white bg-secondary border-secondary">
                    <h4 className="my-0 fw-normal">FREE</h4>
                  </div>
                  <div className="card-body">
                    <h2 className="card-title pricing-card-title">
                      0 🅺oin
                      <small className="text-muted fw-light">
                        <br></br> /Mãi mãi
                      </small>
                    </h2>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>✓ Tất cả các Server Free</li>
                      <li>✓ Không giới hạn thời gian</li>
                      <li>
                        ✗ <del>Server Vip</del>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="w-100 btn btn-lg btn-secondary"
                    >
                      Miễn phí
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm border-light">
                  <div className="card-header py-3 text-dark bg-light border-light">
                    <h4 className="my-0 fw-normal">Xem liền</h4>
                  </div>
                  <div className="card-body">
                    <h2 className="card-title pricing-card-title">
                      {datatit.priceVip} 🅺oin
                      <small className="text-muted fw-light">
                        <br></br> /7 ngày
                      </small>
                    </h2>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>✓ Tất cả các Server Free</li>
                      <li>✓ Tất cả các Server VIP</li>
                      <li>➢ Thích hợp xem liền.</li>
                    </ul>
                    <button
                      type="button"
                      className="w-100 btn btn-lg btn-light"
                      onClick={() => UnLockVip(1)}
                    >
                      Kích hoạt
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm border-info">
                  <div className="card-header py-3 text-white bg-info border-info">
                    <h4 className="my-0 fw-normal">Enterprise</h4>
                  </div>
                  <div className="card-body">
                    <h2 className="card-title pricing-card-title">
                      {Math.round(
                        parseInt(datatit.priceVip) + datatit.priceVip / 2
                      )}{" "}
                      🅺oin
                      <small className="text-muted fw-light">
                        {" "}
                        <br></br> /14 ngày
                      </small>
                    </h2>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>✓ Tất cả các Server Free</li>
                      <li>✓ Tất cả các Server VIP</li>
                      <li>➢ Thỉnh thoảng xem một chút</li>
                    </ul>
                    <button
                      type="button"
                      className="w-100 btn btn-lg btn-info"
                      onClick={() => UnLockVip(2)}
                    >
                      Kích hoạt
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm border-primary">
                  <div className="card-header py-3 text-white bg-primary border-primary">
                    <h4 className="my-0 fw-normal">Enterprise</h4>
                  </div>
                  <div className="card-body">
                    <h2 className="card-title pricing-card-title">
                      {Math.round(
                        2 * parseInt(datatit.priceVip) +
                          parseInt(datatit.priceVip) / 2
                      )}{" "}
                      🅺oin
                      <small className="text-muted fw-light">
                        {" "}
                        <br></br> /28 ngày
                      </small>
                    </h2>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>✓ Tất cả các Server Free</li>
                      <li>✓ Tất cả các Server VIP</li>
                      <li>➢ Không có thời gian xem</li>
                    </ul>
                    <button
                      type="button"
                      className="w-100 btn btn-lg btn-primary"
                      onClick={() => UnLockVip(3)}
                    >
                      Kích hoạt
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <h2 className="display-6 text-center mb-4">Compare plans</h2>
            <div className="table-responsive">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th style={{ width: "34%" }} />
                    <th style={{ width: "22%" }}>Free</th>
                    <th style={{ width: "22%" }}>Pro</th>
                    <th style={{ width: "22%" }}>Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="text-start">
                      Public
                    </th>
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-start">
                      Private
                    </th>
                    <td />
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th scope="row" className="text-start">
                      Permissions
                    </th>
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-start">
                      Sharing
                    </th>
                    <td />
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-start">
                      Unlimited members
                    </th>
                    <td />
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-start">
                      Extra security
                    </th>
                    <td />
                    <td />
                    <td>
                      <svg className="bi" width={24} height={24}>
                        <use xlinkHref="#check" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
         */}
          </main>
        </div>
      </div>
    );

}
  

export default Watch;
