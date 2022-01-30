import React, { useState, useEffect } from "react";
import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import { StateProps, State, Hourly } from "../interfaces/interface";

interface boxProps {
  title: string;
  content: any;
}

type combinedProps = StateProps & boxProps;

const Box = ({ state, title, content }: combinedProps) => {
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
    padding: 16px 0 16px 16px;
    border-radius: 20px;
    background-color: #${LightenDarkenColor(state.backgroundColor, 10)};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14), 0 6px 6px rgba(0, 0, 0, 0.2);
  `;

  const BoxTitle = styled.span`
    font-family: "Noto Sans KR", sans-serif;
    color: #d1d1d1;
    font-weight: 500;
    font-size: 14px;
  `;

  const BoxDivider = styled.div`
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #cfcfcf;
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
      <BoxTitle>{title}</BoxTitle>
      <BoxDivider />
      <BoxContentContainer>{content}</BoxContentContainer>
    </BoxContainer>
  );
};

export default Box;
