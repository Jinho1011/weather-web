import React, { useState, useEffect } from "react";
import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import { StateProps } from "../interfaces/interface";

interface boxProps extends StateProps {
  title: string;
  icon: any;
  content: any;
}

const Box = ({ state, icon, title, content }: boxProps) => {
  const LightenDarkenColor = (col: string, amt: number) => {
    var num = parseInt(col.substring(1), 16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00ff) + amt;
    var g = (num & 0x0000ff) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
  };

  const BoxContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 16px 16px 16px 16px;
    border-radius: 20px;
    background-color: #${LightenDarkenColor(state.backgroundColor, 7)};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(0, 0, 0, 0.2);
  `;

  const BoxTitle = styled.span`
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: "Noto Sans KR", sans-serif;
    color: #e9e9e9;
    font-weight: 500;
    font-size: 14px;
  `;

  const BoxDivider = styled.div`
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #e9e9e9;
  `;

  const BoxContentContainer = styled.div`
    padding-top: 20px;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    gap: 28px;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <BoxContainer>
      <BoxTitle>
        {icon}
        {title}
      </BoxTitle>
      <BoxDivider />
      <BoxContentContainer>{content}</BoxContentContainer>
    </BoxContainer>
  );
};

export default Box;
