import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

import classes from "./Banner.module.css";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const hideBannerHandler = () => {
    setIsVisible(false);
  };

  return (
    <footer>
      {isVisible && (
        <div className={classes.banner}>
          <div className={classes.bannerContent}>
            <p className={classes.bannerText}>
              Next Food Door のご利用で配達手数料が ¥0
            </p>
            <button
              className={classes.bannerButton}
              onClick={hideBannerHandler}
            >
              <ClearIcon />
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Banner;
