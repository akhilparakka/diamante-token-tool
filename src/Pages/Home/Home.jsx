import { useLocation } from "react-router-dom";
import "./Home.css";
import DiamLogo from "../../assets/diam_logo.svg";
import DiamLogoName from "../../assets/diam_logo_name.svg";
import CopyWhite from "../../assets/copy_white.svg";
import { ToastContainer, toast } from "react-toastify";
import ListIcon from "../../assets/list_icon.svg";
import { useEffect, useState } from "react";
import { getBalance } from "../../utils/utils";
import CreateToken from "../../components/CreateToken/CreateToken";
import ManageToken from "../../components/ManageToken/ManageToken";
import CreateTrustline from "../../components/CreateTrustline/CreateTrustline";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";

const Home = () => {
  const location = useLocation();
  const { walletData } = location.state;

  const [activeItem, setActiveItem] = useState(0);
  const [balance, setBalance] = useState("");

  const onCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(walletData.public_key);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const handleListItemClick = (index) => {
    setActiveItem(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accountBalance = await getBalance(walletData.public_key);
      setBalance(accountBalance);
    };

    fetchData();
  }, []);

  return (
    <div className="home">
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
      <div className="home_left">
        <div className="hamburger-menu-container">
          <HamburgerMenu
            walletData={walletData}
            balance={balance}
            setActiveItem={setActiveItem}
          />
        </div>
        <div className="home_left_top">
          <div className="home_logo_container">
            <img
              src={DiamLogo}
              alt="diam logo"
              style={{ width: "50%", height: "30%" }}
            />
            <img
              src={DiamLogoName}
              alt="diam logo name"
              style={{ width: "85%", height: "30%" }}
            />
          </div>
          <div className="home_left_address_box">
            <p>{`${walletData.public_key.slice(
              0,
              10
            )}...${walletData.public_key.slice(
              walletData.public_key.length - 10
            )}`}</p>
            <img
              src={CopyWhite}
              alt="copy white icon"
              style={{ cursor: "pointer" }}
              onClick={onCopyClick}
            />
          </div>
          <div className="home_left_address_box">Balance: {balance} DIAM</div>
        </div>
        <div className="separator"></div>
        <div className="home_left_middle">
          <div className="home_left_lists_container">
            <li
              className={`home_list_item ${activeItem === 0 ? "active" : ""}`}
              onClick={() => handleListItemClick(0)}
            >
              <img src={ListIcon} alt="" />
              <p>Create Token</p>
            </li>
            <li
              className={`home_list_item ${activeItem === 1 ? "active" : ""}`}
              onClick={() => handleListItemClick(1)}
            >
              <img src={ListIcon} alt="" />
              <p>Manage Token</p>
            </li>
            <li
              className={`home_list_item ${activeItem === 2 ? "active" : ""}`}
              onClick={() => handleListItemClick(2)}
            >
              <img src={ListIcon} alt="" />
              <p>Make Trustline</p>
            </li>
          </div>
        </div>
        <div className="separator"></div>
        <div className="home_left_bottom">
          <div className="home_left_footer">
            <p>Token Forge by</p>
            <p>Diamante Net</p>
          </div>
        </div>
      </div>
      <div className="home_right">
        {activeItem === 0 ? (
          <CreateToken wallet_data={walletData} setActiveItem={setActiveItem} />
        ) : activeItem === 1 ? (
          <ManageToken wallet_data={walletData} setActiveItem={setActiveItem} />
        ) : activeItem === 2 ? (
          <CreateTrustline
            wallet_data={walletData}
            setActiveItem={setActiveItem}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Home;
