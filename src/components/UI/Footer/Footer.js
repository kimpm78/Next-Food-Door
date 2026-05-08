import React from "react";
import PropTypes from "prop-types";
import classes from "./Footer.module.css";

const Footer = ({ onNavigate }) => {
  return (
    <footer className={classes.footer__wrap}>
      <div className={classes.footer}>
        <div className={classes.footer__inner}>
          <div className={classes.footer__menu}>
            {footerMenuItems.map((menu, index) => (
              <div key={index}>
                <h3>{menu.title}</h3>
                <ul>
                  {menu.items.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.link}
                        onClick={(event) => {
                          if (!item.isExternal && onNavigate) {
                            event.preventDefault();
                            onNavigate(item.link);
                          }
                        }}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noreferrer" : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={classes.footer__right}>
            © 2022-2026 メシドア All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

const footerMenuItems = [
  {
    title: "情報",
    items: [
      { label: "紹介", link: "/about" },
      { label: "個人情報保護方針", link: "/privacy" },
      { label: "利用規約", link: "/terms" },
    ],
  },
  {
    title: "利用方法",
    items: [
      { label: "注文する", link: "/how-to-order" },
      { label: "配達", link: "/delivery" },
      { label: "アプリダウンロード", link: "/app-download" },
      { label: "地図", link: "/map" },
    ],
  },
  {
    title: "登録する",
    items: [
      { label: "加盟レストランとして登録する", link: "/restaurant-register" },
      {
        label: "配達パートナーとして登録する",
        link: "/delivery-partner-register",
      },
      { label: "ビジネス用アカウントを作成する", link: "/business-register" },
    ],
  },
  {
    title: "問い合わせる",
    items: [
      { label: "注文に関するヘルプ", link: "/contact/order" },
      { label: "アカウントとお支払い", link: "/contact/account-payment" },
      { label: "メンバーシップとロイヤルティ", link: "/contact/membership" },
    ],
  },
  {
    title: "SNS",
    items: [
      { label: "Instagram", link: "/" },
      { label: "Twitter", link: "/" },
      { label: "Facebook", link: "/" },
      { label: "YouTube", link: "/" },
    ],
  },
];


Footer.propTypes = {
  onNavigate: PropTypes.func,
};

export default Footer;
