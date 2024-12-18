import React, { useState } from "react";
import "./Login.css"; // Stil dosyasını ayırmanızı öneririm.
import { useDispatch } from "react-redux";
import { hrDispatch } from "../../../stores";
import { fetchLogin } from "../../../stores/features/authSlice";
import { fetchForgotPassword } from "../../../stores/features/forgotPasswordSlice";
import Swal from "sweetalert2";

function Login() {
  const dispatch = useDispatch<hrDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordEmail, setForgotPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const doLogin = () => {
    const payload = {
      email,
      password,
    };
    if (payload.email === "" || payload.password === "") {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Mail adresi veya parola boş bırakılamaz.",
      });
      return;
    }
    dispatch(fetchLogin(payload));
  };

  const doForgotPassword = () => {
    if (forgotPasswordEmail === "") {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Mail adresi boş bırakılamaz.",
      });
      return;
    } else if (!forgotPasswordEmail.includes("@")) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Gecersiz mail adresi girdiniz.",
      });
      return;
    }

    dispatch(fetchForgotPassword({ forgotPasswordEmail }));
  };

  return (
    <>
      <section className="vh-100 ">
        <div className="container-fluid body-login-bg-color">
          <div className="row align-items-center">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4 text-center">
                <i
                  className="fa-solid fa-person-through-window fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#fcfcfd" }}
                ></i>
                <span className="h1 fw-bold mb-0 text-color-login">Logo</span>
              </div>

              <div className="d-flex align-items-center px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5 justify-content-center">
                <form style={{ width: "23rem" }}>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example18"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 position-relative"
                  >
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="form2Example28"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                      className={`fas ${
                        passwordVisible ? "fa-eye-slash" : "fa-eye"
                      } position-absolute top-50 end-0 translate-middle-y me-3`}
                      style={{ cursor: "pointer" }}
                      onClick={togglePasswordVisibility}
                    ></i>
                  </div>

                  <div className="pt-1 row">
                    <button
                      className="btn btn-outline-light btn-lg"
                      type="button"
                      onClick={doLogin}
                    >
                      Login
                    </button>
                    <div className="col text-end mt-3">
                      <p className="small mb-5 pb-lg-2 text-color-login">
                        <a
                          className=" text-color-login"
                          href="#!"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Forgot password?
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                alt="Login image"
                className="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Sifre Sifirlama
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Mail Adresinizi Giriniz"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPassword(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Kapat
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={doForgotPassword}
              >
                Gonder
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
