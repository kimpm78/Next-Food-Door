import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
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
                      <a href={item.link}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={classes.footer__right}>
            2022-2024 Food Eats All Right Reserved
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
      { label: "紹介", link: "/" },
      { label: "個人情報保護方針", link: "/" },
      { label: "利用規約", link: "/" },
    ],
  },
  {
    title: "利用方法",
    items: [
      { label: "注文する", link: "/" },
      { label: "配達", link: "/" },
      { label: "アプリダウンロード", link: "/" },
    ],
  },
  {
    title: "地図",
    items: [
      { label: "全ての都市を表示", link: "/" },
      { label: "全ての国を見る", link: "/" },
    ],
  },
  {
    title: "登録する",
    items: [
      { label: "加盟レストランとして登録する", link: "/" },
      { label: "配達パートナーとしてとして登録する", link: "/" },
      { label: "ビジネス用アカウントを作成する", link: "/" },
    ],
  },
  {
    title: "問い合わせる",
    items: [
      { label: "注文に関するヘルプ", link: "/" },
      { label: "アカウントとお支払い", link: "/" },
      { label: "メンバーショプとロイヤルティ", link: "/" },
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

export default Footer;
