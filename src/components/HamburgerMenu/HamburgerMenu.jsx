import { useEffect, useState } from "react";
import "./HamburgerMenu.css";

const HamburgerMenu = ({ walletData, balance, setActiveItem }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = (event) => {
    if (event.target.tagName !== "LI") {
      setMenuOpen(!menuOpen);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <nav role="navigation" className="navigate">
      <div id="menuToggle" onClick={handleToggle}>
        <input type="checkbox" checked={menuOpen} readOnly />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu" className={menuOpen ? "open" : ""}>
          <header>
            <div className="add_bal_box">{`${walletData.public_key.slice(
              0,
              10
            )}...${walletData.public_key.slice(
              walletData.public_key.length - 10
            )}`}</div>
            <div className="add_bal_box">Balance: {balance} DIAM</div>
          </header>
          <li onClick={() => setActiveItem(0)}>Create Token</li>
          <li onClick={() => setActiveItem(1)}>Manage Token</li>
          <li onClick={() => setActiveItem(2)}>Create Trustline</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default HamburgerMenu;
