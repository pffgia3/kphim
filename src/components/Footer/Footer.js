import { Component } from "react";
import logo from "../../images/logo1.png";


// import firebase from "firebase/app";

class Footer extends Component {
  render() {
    return (
      // <footer className="container">
      //   <p className="float-end">
      //     <a href="#">Back to top</a>
      //   </p>
      //   <p>
      //     <a className="navbar-brand" href="/home">
      //       <img className="NavLogo" src={logo} alt="logo" width="80px" />
      //     </a>
      //     © 2021 KPhim <br></br> · kphim.contact@gmail.com
      //   </p>
      //     </footer>
      <footer className="text-center text-lg-start bg-dark text-muted">
        <section className>
          <div className="container text-center text-md-start">
            <div className="row pt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-2">
                <h6 className="text-uppercase fw-bold mb-3">
                  <i class="fas fa-pencil-ruler me-2"></i>
                  Designed by KPhim
                </h6>
                <p>
                  <i class="fas fa-heart me-1 mb-0 pb-0"></i> Chúc bạn sống một cuộc đời
                  hạnh phúc và không phải hối tiếc, love you all!
                </p>
                <p>
                  <i class="fas fa-exclamation-triangle me-1 mt-0 pt-0"></i> ClickPhim go
                  hell.
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">
                  {" "}
                  <i class="far fa-address-book me-2"></i> Liên hệ
                </h6>
                <p>
                  <i className="fas fa-envelope me-1" /> kphim.contact@gmail.com
                </p>
                <p>
                  <i class="fab fa-facebook-square me-2"></i>
                  <a
                    href="https://www.fb.com/kphim.fb/"
                    className="text-reset "
                  >
                    Facebook
                  </a>
                </p>
                {/* <p>
                  <i className="fas fa-phone me-1" /> updating...
                </p> */}
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold ms-1 me-1" href="http://kphim.xyz">
            KPHIM
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
