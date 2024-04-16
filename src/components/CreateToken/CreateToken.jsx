import "./CreateToken.css";
import { useState } from "react";
import axios from "axios";
import Loader from "../../assets/loader.svg";
import Modal from "../Modal/Modal";

const CreateToken = ({ wallet_data, setActiveItem }) => {
  const [tokenName, setTokenName] = useState({ value: "", charCount: 0 });
  const [symbol, setSymbol] = useState({ value: "", charCount: 0 });
  const [initialSupply, setInitialSupply] = useState({
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

  const handleCreateTokenClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        publicKey: wallet_data.public_key,
        privateKey: wallet_data.secret_key,
        tokenSupply: parseInt(initialSupply.value),
        tokenName: tokenName.value,
      });

      let reqOptions = {
        url: "http://10.0.0.233:3000/create-token",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await axios.request(reqOptions);
      setSuccessData(response.data);

      if (response.status === 200) {
        setIsModal(true);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="create_nft">
      {isModal && (
        <Modal
          isOpen={isModal}
          toggleModal={toggleModal}
          successData={successData}
          setActiveItem={setActiveItem}
        />
      )}
      <div className="create_nft_left">
        <div className="create_nft_left_top">
          <div className="create_nft_content_box">
            <h1>Create custom token on Diamante Net</h1>
            <div className="create_nft_points">
              <li>Effortless, quick, and user-friendly NFT generator</li>
              <li>No need for intricate smart contract programming</li>
              <li>Gain full ownership of the NFTs you create</li>
              <li>Enable buyers to mint your NFTs with ease</li>
              <li>
                Use your personal wallet to sign and initiate the creation
                process
              </li>
            </div>
          </div>
        </div>
        <div className="create_nft_left_bottom"></div>
      </div>
      <div className="create_nft_right">
        <div className="create_wallet_form">
          <h2>Create Token</h2>
          <form>
            <div className="form-group">
              <label>Token Name</label>
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
              <label>Symbol</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="e.g. TTN"
                  value={symbol.value}
                  onChange={(e) => handleInputChange(e, setSymbol, 5)}
                />
                <span className="char-count">{symbol.charCount}/5</span>
              </div>
            </div> */}
            <div className="form-group">
              <label>Initial Supply</label>
              <div className="input-container">
                <input
                  type="number"
                  id="initialSupply"
                  placeholder="e.g. 1000"
                  value={initialSupply.value}
                  onChange={(e) => handleInputChange(e, setInitialSupply, 10)}
                />
                <span className="char-count">{initialSupply.charCount}/10</span>
              </div>
            </div>
            {/* <div className="form-group">
              <label htmlFor="description">Description</label>
              <div className="input-container">
                <textarea
                  id="description"
                  style={{ resize: "none" }}
                  placeholder="Description"
                  value={description.value}
                  onChange={(e) => handleInputChange(e, setDescription, 200)}
                ></textarea>
                <span className="char-count">{description.charCount}/200</span>
              </div>
            </div> */}
            <div className="create_nft_button_container">
              <button
                type="submit"
                className="create_btn"
                onClick={(e) => handleCreateTokenClick(e)}
                disabled={!tokenName.value || !initialSupply.value || isLoading}
              >
                {isLoading ? (
                  <img src={Loader} style={{ width: "20px", height: "20px" }} />
                ) : (
                  "Create token"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateToken;
