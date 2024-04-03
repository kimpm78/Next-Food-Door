import React, { useState } from "react";

import classes from "./Footer.module.css";

const Banner = () => {
  const [showUberOneInfo, setShowUberOneInfo] = useState(true);

  const handleDismissUberOneInfo = () => {
    setShowUberOneInfo(false);
  };

  return (
    <footer className={classes.footer__wrap}>
      <div className={classes.footer}>
        {showUberOneInfo && (
          <div className={classes.uberOneInfo}>
            <p>
              Uber One のご利用で配達手数料が ¥0
              <button onClick={handleDismissUberOneInfo}>X</button>
            </p>
          </div>
        )}
        <div className={classes.footer__inner}>{/* Footer 내용 */}</div>
      </div>
    </footer>
  );
};

export default Banner;
