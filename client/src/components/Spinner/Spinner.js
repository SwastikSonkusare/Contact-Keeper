import React from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

import "./Spinner.scss";

const Spinner = () => {
  const override = css`
    display: block;
    border-color: #171010;
  `;

  return (
    <div className="spinner">
      <ClipLoader css={override} size={20} /> Loading
    </div>
  );
};

export default Spinner;
