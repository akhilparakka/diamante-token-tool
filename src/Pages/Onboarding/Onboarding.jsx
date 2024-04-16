import "./Onboarding.css";
import DiamLogo from "../../assets/diam_logo.svg";
import DiamLogoName from "../../assets/diam_logo_name.svg";
import Intro from "../../components/Intro/Intro";
import CreateWallet from "../../components/CreateWallet/CreateWallet";
import { useState } from "react";

const Onboarding = () => {
  const [walletData, setWalletData] = useState({});
  const [page, setPage] = useState("intro");

  return (
    <div className="onboarding">
      <div className="onboarding_left">
        <div className="onboarding_logo_name">
          <img src={DiamLogo} alt="" className="onboarding_logo" />
          <img src={DiamLogoName} alt="" className="onboarding_logo_name" />
        </div>
      </div>
      <div className="onboarding_right">
        {page === "intro" ? (
          <Intro setWalletData={setWalletData} setPage={setPage} />
        ) : (
          <CreateWallet walletData={walletData} setWalletData={setWalletData} />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
