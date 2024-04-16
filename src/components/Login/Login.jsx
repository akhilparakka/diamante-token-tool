import "./Login.css";
import DiamLogo from "../../assets/diam_logo.svg";
import DiamLogoName from "../../assets/diam_logo_name.svg";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { decrypt } from "../../utils/utils";

const Login = ({ diam_details }) => {
  const navigateTo = useNavigate();

  const [mpinVal, setMpinVal] = useState("");

  const loginClick = () => {
    const data = decrypt(diam_details, mpinVal);
    if (data) {
      navigateTo("/home", {
        state: {
          walletData: data,
        },
      });
    } else {
      toast.error("Invalid MPIN");
    }
  };

  return (
    <div className="login">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="login_left">
        <div className="login_logo_name">
          <img src={DiamLogo} alt="" className="login_logo" />
          <img src={DiamLogoName} alt="" className="login_logo_name" />
        </div>
      </div>
      <div className="login_right">
        <div className="login_container">
          <div className="login_box">
            <div className="login_header">
              <div className="login_header_box">
                <h2 className="login_header_title">Mintify</h2>
                <p className="login_header_desc">
                  A Minting tool by Diamante Net
                </p>
              </div>
            </div>
            <div className="login_desc">
              <div className="login_desc_box">
                <div className="login_desc_title">Login</div>
                <span className="login_desc_desc">
                  Enter you Password to login
                </span>
              </div>
            </div>
            <div className="login_content">
              <div className="login_content_box">
                <h3>Password</h3>
                <input
                  className="login_mpin_box"
                  type="password"
                  maxLength={20}
                  minLength={6}
                  onChange={(e) => setMpinVal(e.target.value)}
                ></input>
                <button
                  className="login_button"
                  onClick={loginClick}
                  disabled={mpinVal.length <= 5}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
