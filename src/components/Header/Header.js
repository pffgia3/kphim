import { Component } from "react";
import logo from "../../images/logo1.png";
import userimg from "../../images/userimg2.jpg"
import "./Header.css";
import firebase from "firebase/app";
// import "firebase/auth";
// import firebase from "firebase/app";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      year: "",
      username: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitYear = this.onSubmitYear.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log(e.target.value);
    var typeSearch = "/search/" + e.target.value;
    this.setState({
      search: typeSearch,
    });
  }

  onSubmitYear(e) {
    e.preventDefault();
    // console.log(e.target.value);
    var typeSearch = "/category/nam/" + e.target.value;
    this.setState({
      year: typeSearch,
    });
  }

  componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          let x = user.displayName;
          this.setState({ username: x });
        });
  }

  render() {
    const { user, signOut } = this.props;
    return (
      <header>
        <nav
          className="navbar navbar-expand-md navbar-dark fixed-top bg-dark"
          id="header-real"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/home">
              <img className="NavLogo" src={logo} alt="logo" width="80px" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/category/phim/tat-ca"
                  >
                    T???T C???
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/category/the-loai/phim-le"
                  >
                    PHIM L???
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/category/the-loai/phim-bo"
                  >
                    PHIM B???
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link dropdown-toggle active"
                    data-toggle="dropdownyear"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    N??M
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="dropdownyear"
                  >
                    <li>
                      <a className="dropdown-item" href="/category/nam/2022">
                        2022
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/category/nam/2021">
                        2021
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/category/nam/2020">
                        2020
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/category/nam/2019">
                        2019
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/category/nam/2018">
                        2018
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/category/nam/2017">
                        2017
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/category/nam/2016">
                        2016
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/category/nam/2015">
                        2015
                      </a>
                    </li>
                    <li>
                      {/* <a className="dropdown-item" href="/category/nam/old">
                        &lt; 2014
                      </a> */}
                      <form action={this.state.year} method="get">
                        <input
                          type="number"
                          placeholder="1975"
                          onChange={this.onSubmitYear}
                          // name="year"
                        ></input>
                      </form>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link dropdown-toggle active"
                    data-toggle="dropdowntype"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    TH??? LO???I
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="dropdowntype"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/the-loai/hanh-dong"
                      >
                        H??NH ?????NG
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/the-loai/vien-tuong"
                      >
                        VI???N T?????NG
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/the-loai/kinh-di"
                      >
                        KINH D???
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/the-loai/anime"
                      >
                        ANIME
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/the-loai/chinh-kich"
                      >
                        CH??NH K???CH
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/the-loai/lang-man"
                      >
                        L??NG M???N
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/the-loai/hai"
                      >
                        H??I
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/the-loai/toi-pham"
                      >
                        T???I PH???M
                      </a>
                    </li>
                    {/* <li>
                      <a className="dropdown-item" href="/the-loai/hollywood">
                        HOLLYWOOD
                      </a>
                    </li> */}
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/the-loai/gia-dinh"
                      >
                        GIA ????NH - TR??? EM
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link dropdown-toggle active"
                    data-toggle="dropdowntype"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    QU???C GIA
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="dropdowntype"
                  >
                    <li>
                      <a className="dropdown-item" href="/category/quoc-gia/my">
                        PHIM M???
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/quoc-gia/nhat"
                      >
                        PHIM NH???T
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/quoc-gia/han"
                      >
                        PHIM H??N
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/quoc-gia/viet"
                      >
                        PHIM VI???T NAM
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/quoc-gia/trung"
                      >
                        PHIM TRUNG
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/category/quoc-gia/quoc-gia-khac"
                      >
                        KH??C...
                      </a>
                    </li>
                    {/*  */}
                  </ul>
                </li>
              </ul>
              <form
                className="d-flex me-3"
                action={this.state.search}
                method="get"
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.onSubmit}
                />

                <button className="btn btn-outline-light" type="submit">
                  Search
                </button>
              </form>

              <div className="nav-item holdimg ">
                <button
                  className="btn btn-dark "
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="nav-link"
                    aria-current="page"
                    href="/login"
                    id="nutDangNhap"
                    src={userimg}
                  ></img>
                </button>
                <ul
                  className="dropdown-menu  dropdown-menu-dark dropdown-menu-end"
                  aria-labelledby="dropdownMenuLink"
                >
                  {/* {console.log("xx")} */}
                  {this.state.username != null ? (
                    <div>
                      {/* <li>
                        <a className="dropdown-item" href="/login">
                          {this.state.username}
                        </a>
                      </li> */}
                      <li>
                        <a className="dropdown-item" href="/my-vip">
                          My Vip Phim
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/my-koin">
                          V?? Koin
                        </a>
                      </li>

                      <li>
                        <a className="dropdown-item" href="/voucher">
                          Nh???p Voucher
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/ma-gioi-thieu">
                          M?? gi???i thi???u
                        </a>
                      </li>

                      <li>
                        <a
                          className="dropdown-item"
                          href="/home"
                          onClick={() =>
                            firebase
                              .auth()
                              .signOut()
                              .then(function () {})
                          }
                        >
                          ????ng xu???t
                        </a>
                      </li>
                    </div>
                  ) : (
                    <div>
                      <li>
                        <a className="dropdown-item" href="/login">
                          ????ng nh???p
                        </a>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
