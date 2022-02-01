import React, { useState, useEffect } from "react";
import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";

interface ProgressBarProps {
  range: number[];
  min: number;
  max: number;
  width: number;
  current?: number;
  gradientColors?: string[];
}

const ProgressBar = ({
  range,
  min,
  max,
  width,
  current,
  gradientColors,
}: ProgressBarProps) => {
  const whole = range[1] - range[0];
  const part = max - min;
  const partWidth = whole === part ? width : (width * part) / whole;
  const paddingLeftRatio = min - range[0];
  const paddingLeft = (paddingLeftRatio * width) / whole;

  if (current !== undefined) {
    console.log("🚀 ~ file: ProgressBar.tsx ~ line 32 ~ current", current);
    const pointPaddingRatio = current - min;
    const porintPadding = (pointPaddingRatio * width) / whole;
    return (
      <div
        className={css`
          width: ${width}px;
          height: 5px;
          border-radius: 10px;
          background-color: #cecece;
        `}
      >
        <div
          className={css`
            width: ${partWidth}px;
            height: 5px;
            border-radius: 10px;
            background-color: #ebebeb;
            margin-left: ${paddingLeft}px;
            overflow: hidden;
            display: flex;
            align-items: center;
          `}
        >
          <div
            className={css`
              width: 5px;
              height: 5px;
              padding: 2px;
              border-radius: 10px;
              background-color: #cecece;
              margin-left: ${porintPadding - 4.5}px;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <div
              className={css`
                width: 5px;
                height: 5px;
                border-radius: 5px;
                background-color: #ffffff;
              `}
            ></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={css`
          width: ${width}px;
          height: 5px;
          border-radius: 10px;
          background-color: #cecece;
        `}
      >
        <div
          className={css`
            width: ${partWidth}px;
            height: 5px;
            border-radius: 10px;
            background-color: #ebebeb;
            margin-left: ${paddingLeft}px;
          `}
        ></div>
      </div>
    );
  }
};

export default ProgressBar;
