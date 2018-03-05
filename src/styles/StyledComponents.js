import React from "react";
import Grid from "../Grid";
import styled, { css } from "styled-components";

const cssOddEvenItem = ({ columnIndex, rowIndex }) => css`
    color: ${(columnIndex + rowIndex) % 2 === 1 ? "#666" : "#DDD"};
    background-color: ${(columnIndex + rowIndex) % 2 === 0 ? "#666" : "#DDD"};
`;

const cssFirstColumnItem = ({ isFirstColumn }) => css`
    border-left-width: ${isFirstColumn ? "1px" : 0};
`;

const cssFirstRowItem = ({ isFirstRow }) => css`
    border-top-width: ${isFirstRow ? "1px" : 0};
`;

const StyledCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.32em;
    box-sizing: border-box;
    border: 1px solid #333;
    ${cssOddEvenItem} ${cssFirstColumnItem} ${cssFirstRowItem};
`;

const StyledRowIndex = styled.span`
    flex-grow: 1;
    text-align: right;
    border-right: 1px solid currentColor;
    padding-right: 0.32em;
    margin-right: 0.32em;
`;

const StyledColumnIndex = styled.span`
    flex-grow: 1;
`;

const Cell = ({ columnIndex, rowIndex, style, ...props }) => (
    <StyledCell
        {...{
            columnIndex,
            rowIndex,
            ...props
        }}
        style={{
            ...style
        }}
    >
        <StyledRowIndex>{rowIndex}</StyledRowIndex>
        <StyledColumnIndex>{columnIndex}</StyledColumnIndex>
    </StyledCell>
);

export default props => <Grid {...props} CellComponent={Cell} />;
