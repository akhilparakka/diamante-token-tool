import { useState } from "react";
import { createWallet } from "../../utils/utils";
import "./Intro.css";

const Intro = ({ setWalletData, setPage }) => {
  const handleCreateWalletClick = () => {
    const keypair = createWallet();
    setWalletData(keypair);
    setPage("create_wallet");
  };

  const handleImportWalletClick = () => {
    setPage("import_wallet");
  };

  return (
    <div className="intro_content">
      <div className="intro_content_box">
        <div className="intro_content_inside">Token Forge</div>
        <div className="intro_content_inside_desc">
          A Token creation tool by Diamante Net
        </div>
        <div className="intro_button_container">
          <button
            className="intro_button"
            onClick={() => handleCreateWalletClick()}
          >
            Create Wallet
          </button>
          <button
            className="intro_button"
            style={{
              background: "linear-gradient(90deg, #A80097 0%, #6900D2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              border: "1px solid black",
            }}
            onClick={() => handleImportWalletClick()}
          >
            Import Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
