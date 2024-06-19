import "./CreateTrustline.css";
import { useState } from "react";
import axios from "axios";
import Loader from "../../assets/loader.svg";
import Modal from "../Modal/Modal";
import {
  Asset,
  BASE_FEE,
  Horizon,
  Keypair,
  Operation,
  TransactionBuilder,
} from "@stellar/stellar-sdk";

const CreateTrustline = ({ wallet_data, setActiveItem }) => {
  const [tokenName, setTokenName] = useState({ value: "", charCount: 0 });
  const [amount, setAmount] = useState({ value: "", charCount: 0 });
  const [issuerAddress, setIssuerAddress] = useState({
    value: "",
    charCount: 0,
  });
  const [description, setDescription] = useState({ value: "", charCount: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [successData, setSuccessData] = useState({});

  const handleInputChange = (e, stateFunction, maxLength) => {
    const value = e.target.value;
    const charCount = value.length;
    if (charCount <= maxLength) {
      stateFunction({ value, charCount });
    }
  };

  const handleTokenNameChange = (e, stateFunction, maxLength) => {
    const value = e.target.value;
    const charCount = value.length;

    const regex = /^[a-zA-Z0-9_-]*$/;

    if (charCount <= maxLength && regex.test(value)) {
      stateFunction({ value, charCount });
    }
  };

  const toggleModal = () => {
    setIsModal((prevState) => !prevState);
  };

  const handleCreateTrustline = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");

      const sourceKeyPair = Keypair.fromSecret(wallet_data.secret_key);

      const sourceAccount = await server.loadAccount(sourceKeyPair.publicKey());

      let transaction;

      transaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: "Diamante Testnet",
      })
        .addOperation(
          Operation.changeTrust({
            asset: new Asset(tokenName.value, issuerAddress.value),
          })
        )
        .setTimeout(30)
        .build();
      transaction.sign(sourceKeyPair);
      let res = await server.submitTransaction(transaction);

      const response = {
        data: res,
        title: "Trustline created!",
        field1: "Source Account",
        field2: "Transaction Hash",
      };
      if (res.successful === true) {
        setSuccessData(response);
        setIsLoading(false);
        setIsModal(true);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }

    // try {
    //   let headersList = {
    //     Accept: "*/*",
    //     "Content-Type": "application/json",
    //   };

    //   let bodyContent = JSON.stringify({
    //     publicKey: wallet_data.public_key,
    //     privateKey: wallet_data.secret_key,
    //     tokenSupply: parseInt(initialSupply.value),
    //     tokenName: tokenName.value,
    //   });

    //   let reqOptions = {
    //     url: "https://tokentoolsbackend.diamcircle.com/create-token",
    //     method: "POST",
    //     headers: headersList,
    //     data: bodyContent,
    //   };

    //   let response = await axios.request(reqOptions);
    //   setSuccessData(response.data);

    //   if (response.status === 200) {
    //     setIsModal(true);
    //     setIsLoading(false);
    //   }
    // } catch (e) {
    //   setIsLoading(false);
    //   console.log(e);
    // }
  };

  return (
    <div className="create_trustline">
      {isModal && (
        <Modal
          isOpen={isModal}
          toggleModal={toggleModal}
          successData={successData}
          setActiveItem={setActiveItem}
        />
      )}
      <div className="create_trustline_left">
        <div className="create_trustline_left_top">
          <div className="create_trustline_content_box">
            <h1>Create Trustline</h1>
            <div className="create_trustline_points">
              <li>
                Create a trustline to hold tokens issued by another account.
                Specify the asset name and issuer address.
              </li>
              <li>
                Trustlines prevent spamming in the network by ensuring all
                transactions are authorized.
              </li>
              <li>
                To receive tokens, create a trustline for that token first.
              </li>
              <li>
                Enter the correct asset name and issuer address to set up a new
                type of asset (token) that your account can hold.
              </li>
              <li>
                Once the trustline is created, manage tokens (receive, send, or
                trade) as desired.
              </li>
            </div>
          </div>
        </div>
        <div className="create_trustline_left_bottom"></div>
      </div>
      <div className="create_trustline_right">
        <div className="create_trustline_form">
          <h2>Create Token</h2>
          <form>
            <div className="form-group">
              <label>Asset Name</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="e.g. TITAN"
                  value={tokenName.value}
                  onChange={(e) => handleTokenNameChange(e, setTokenName, 12)}
                />
                <span className="char-count">{tokenName.charCount}/12</span>
              </div>
            </div>
            {/* <div className="form-group">
              <label>Amount</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="e.g. TTN"
                  value={amount.value}
                  onChange={(e) => handleInputChange(e, setAmount, 5)}
                />
                <span className="char-count">{amount.charCount}/5</span>
              </div>
            </div> */}
            <div className="form-group">
              <label>Issuer Address</label>
              <div className="input-container">
                <input
                  type="text"
                  id="initialSupply"
                  placeholder="e.g. GBTJ2L7XRO.....KX4CA5PZE7VWAQIH"
                  value={issuerAddress.value}
                  onChange={(e) => handleInputChange(e, setIssuerAddress, 100)}
                />
              </div>
            </div>

            <div className="create_trustline_button_container">
              <button
                type="submit"
                className="create_btn"
                onClick={(e) => handleCreateTrustline(e)}
                disabled={!tokenName.value || !initialSupply.value || isLoading}
              >
                {isLoading ? (
                  <img src={Loader} style={{ width: "20px", height: "20px" }} />
                ) : (
                  "Create Trustline"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTrustline;
