import { useState } from "react";
import "./ImportWallet.css";
import { ToastContainer, toast } from "react-toastify";
import * as StellarSdk from "@stellar/stellar-sdk";

const ImportWallet = () => {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(false);
  const [publicKey, setPublicKey] = useState("");

  const handleChange = (e) => {
    setSecret(e.target.value);
    if (e.target.value.length > 1) {
      try {
        const keyPair = StellarSdk.Keypair.fromSecret(e.target.value);
        setPublicKey(keyPair.publicKey());
        setError(false);
      } catch (e) {
        setError(true);
        setPublicKey("");
      }
    } else if (e.target.value.length < 1) {
      setError(false);
      setPublicKey("");
    }
  };

  const importWalletClick = () => {};

  return (
    <div className="import_wallet_container">
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
      <div className="import_wallet_box">
        <div className="import_wallet_header">
          <div className="import_wallet_header_box">
            <h2 className="import_wallet_header_title">Token Forge</h2>
            <p className="import_wallet_header_desc">
              A Token tool powered by Diamante Net
            </p>
          </div>
        </div>
        <div className="import_wallet_desc">
          <div className="import_wallet_desc_box">
            <div className="import_wallet_desc_title">import Wallet</div>
            <span className="import_wallet_desc_desc">
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
        <div className="import_wallet_content">
          <div className="import_wallet_content_box">
            <div className="import_wallet_pub_key_sec">
              <h3>Secret key</h3>
              <input
                className={`key_box ${error ? "error" : ""}`}
                value={secret}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="import_wallet_pub_key_sec">
              <h3>Public key</h3>
              <div
                className="key_box"
                style={{
                  padding: "25px",
                  boxSizing: "border-box",
                  width: "93%",
                }}
              >
                {publicKey
                  ? `${publicKey.slice(0, 18)}...${publicKey.slice(-18)}`
                  : ""}
              </div>
            </div>
            <button
              className="import_wallet_button"
              onClick={importWalletClick}
            >
              <p>Login</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportWallet;
