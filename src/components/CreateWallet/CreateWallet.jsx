import "./CreateWallet.css";
import Copy from "../../assets/copy.svg";
import Eye from "../../assets/eye.svg";
import EyeClosed from "../../assets/eye-closed.svg";
import Loader from "../../assets/loader.svg";
import Check from "../../assets/check.svg";
import Wrong from "../../assets/red-wrong.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createWallet, encrypt } from "../../utils/utils";

const CreateWallet = ({ walletData, setWalletData }) => {
  const navigateTo = useNavigate();

  const [mpinVal, setMpinVal] = useState("");
  const [confirmMpinVal, setConfirmMpinVal] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [loader, setLoader] = useState(false);

  const onCopyClick = () => {
    toast.success("Copied to clipboard");
  };

  const toggleSecretKey = () => {
    setShowSecretKey(!showSecretKey);
  };

  const createWalletClick = async () => {
    setLoader(true);
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: `https://friendbot.diamcircle.io/?addr=${walletData.public_key}`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    if (response.status === 200) {
      const text = encrypt(walletData, mpinVal);
      localStorage.setItem("diam_wallet", text);
      setMpinVal("");
      setConfirmMpinVal("");
      navigateTo("/home", {
        state: {
          walletData: walletData,
        },
      });
    } else {
      setLoader(false);
      toast.error("Something went wrong while creating wallet");
    }
  };

  const handleNewWalletClick = () => {
    const keypair = createWallet();
    setWalletData(keypair);
  };

  const checkPasswordStrength = (password) => {
    const strength = {
      0: { text: "Worst", color: "#FF0000" },
      1: { text: "Bad", color: "#FF6600" },
      2: { text: "Weak", color: "#FFCC00" },
      3: { text: "Good", color: "#33CC00" },
      4: { text: "Strong", color: "#0099CC" },
      5: { text: "Very strong", color: "#0066FF" },
    };
    let score = 0;

    if (!password) return strength[score];

    if (/[a-z]/.test(password)) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[!@#$%^&*()]/.test(password)) score++;

    if (password.length > 6) score++;

    if (score > 5) score = 5;

    return strength[score];
  };

  return (
    <div className="create_wallet_container">
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
      <div className="create_wallet_box">
        <div className="create_wallet_header">
          <div className="create_wallet_header_box">
            <h2 className="create_wallet_header_title">Token Forge</h2>
            <p className="create_wallet_header_desc">
              A Token creation tool by Diamante Net
            </p>
          </div>
        </div>
        <div className="create_wallet_desc">
          <div className="create_wallet_desc_box">
            <div className="create_wallet_desc_title">Create Wallet</div>
            <span className="create_wallet_desc_desc">
              Create a 6-digit PIN code to secure your account. Your private key
              will be encrypted and stored locally on your device, giving you
              sole control over your funds.{" "}
              <strong>
                Keep your private key safe and never share it with anyone
              </strong>
              . Our wallet uses industry-leading security measures to protect
              your assets. However, you are ultimately responsible for the
              safety of your private key.{" "}
              <strong>If you lose it, we cannot recover your funds.</strong>
            </span>
          </div>
        </div>
        <div className="create_wallet_content">
          <div className="create_wallet_content_box">
            <div className="content_box_split_top">
              <div className="content_box_left">
                <div className="create_wallet_pub_key_sec">
                  <h3>Public key</h3>
                  <div className="key_box">
                    <p>{`${walletData.public_key.slice(
                      0,
                      15
                    )}...${walletData.public_key.slice(
                      walletData.public_key.length - 15
                    )}`}</p>
                    <img
                      src={Copy}
                      alt="copy icon"
                      onClick={onCopyClick}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="create_wallet_pub_key_sec">
                  <h3>Secret key</h3>
                  <div className="key_box">
                    {showSecretKey ? (
                      <p>{`${walletData.secret_key.slice(
                        0,
                        15
                      )}...${walletData.secret_key.slice(
                        walletData.secret_key.length - 15
                      )}`}</p>
                    ) : (
                      <p>********************************************</p>
                    )}
                    <img
                      src={showSecretKey ? EyeClosed : Eye}
                      alt={showSecretKey ? "closed eye image" : "eye image"}
                      onClick={toggleSecretKey}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
              <div className="content_box_right">
                <div className="create_wallet_pub_key_sec">
                  <h3> Password</h3>
                  <div className="create_wallet_input_container">
                    <input
                      type="password"
                      className="input_box"
                      maxLength={20}
                      minLength={6}
                      onChange={(e) => setMpinVal(e.target.value)}
                    />
                    {mpinVal.length > 1 && (
                      <span
                        className="password_check"
                        style={{
                          color:
                            checkPasswordStrength(mpinVal) &&
                            checkPasswordStrength(mpinVal).color,
                        }}
                      >
                        {checkPasswordStrength(mpinVal) &&
                          checkPasswordStrength(mpinVal).text}
                      </span>
                    )}
                  </div>
                </div>
                <div className="create_wallet_pub_key_sec">
                  <h3>Confirm Password</h3>
                  <div className="create_wallet_input_container">
                    <input
                      type="password"
                      className="input_box"
                      maxLength={20}
                      minLength={6}
                      onChange={(e) => setConfirmMpinVal(e.target.value)}
                    />
                    {confirmMpinVal.length >= 1 && (
                      <img
                        src={mpinVal == confirmMpinVal ? Check : Wrong}
                        alt=""
                        className="confirm_password_check"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="content_box_split_bottom">
              <button
                className="create_wallet_button"
                onClick={createWalletClick}
                disabled={
                  !mpinVal || !confirmMpinVal || mpinVal !== confirmMpinVal
                }
              >
                {loader ? (
                  <img src={Loader} style={{ width: "20px" }} />
                ) : (
                  <p>Login</p>
                )}
              </button>

              <div className="content_button_para">
                <p onClick={handleNewWalletClick}>Create new address?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWallet;
