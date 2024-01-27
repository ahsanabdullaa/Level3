import React from "react";
import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

export default function footer() {
  return (
    <div>
      <footer>
        <div className="footer">
          <div className="footer__logo">
            <img src="" alt="" />
          </div>
          <div className="footer__social">
            <a href="https://www.facebook.com/">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/">
              <InstagramIcon />
            </a>
            <a href="https://www.twitter.com/">
              <XIcon />
            </a>
          </div>

          <div className="footer__rights">
            <p>© 2024 Pizza Online</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
