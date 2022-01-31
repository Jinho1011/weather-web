import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import { StateProps } from "../interfaces/interface";

import Box from "../components/Box";

const WeekContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const Content = ({ state }: StateProps) => {
  return <></>;
};

const Week = ({ state }: StateProps) => {
  return (
    <WeekContainer>
      <Box
        state={state}
        icon={<FaRegCalendarAlt />}
        title={"10일간의 일기예보"}
        content={<></>}
      />
    </WeekContainer>
  );
};

export default Week;
