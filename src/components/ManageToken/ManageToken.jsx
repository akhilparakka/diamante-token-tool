import "./ManageToken.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Token from "../../assets/token.svg";
import Copy from "../../assets/copy.svg";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const ManageToken = ({ wallet_data, setActiveItem }) => {
  const [assetData, setAssetData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    async function fetchData() {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      let reqOptions = {
        url: `https://diamtestnet.diamcircle.io/accounts/${wallet_data.public_key}`,
        method: "GET",
        headers: headersList,
      };
      try {
        let response = await axios.request(reqOptions);
        setAssetData(response.data.balances);
        setLoader(false);
      } catch (error) {
        toast.error("Something went wrong");
        setLoader(false);
      } finally {
        setLoader(false);
      }
    }
    fetchData();
  }, []);

  const handleCopyClick = async (issuer) => {
    try {
      await navigator.clipboard.writeText(issuer);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <div className="manage_token">
      <h1>Manage Tokens</h1>
      {assetData.length <= 1 ? (
        loader ? (
          <div className="manage_token_no_assets">
            <Loader />
          </div>
        ) : (
          <div className="manage_token_no_assets">
            <h1>
              No Tokens Found!{" "}
              <span onClick={() => setActiveItem(0)}>Create one?</span>
            </h1>
          </div>
        )
      ) : (
        <div className="manage_token_data">
          {assetData.map((asset, index) => {
            if (asset.asset_type !== "native") {
              return (
                <div className="card" key={index}>
                  <div className="asset_top">
                    <img src={Token} alt="token image" />
                    <p>{asset.asset_code}</p>
                    <p>
                      {parseFloat(asset.balance).toFixed(3)}{" "}
                      {asset.asset_code.slice(0, 4)}
                    </p>
                  </div>
                  <div className="asset_bottom">
                    <p>{`${asset.asset_issuer.slice(
                      0,
                      12
                    )}...${asset.asset_issuer.slice(-12)}`}</p>
                    <img
                      src={Copy}
                      alt="copy icon"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCopyClick(asset.asset_issuer)}
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default ManageToken;
