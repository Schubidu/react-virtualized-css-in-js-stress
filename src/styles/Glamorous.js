import React from "react";
import Grid from "../Grid";
import glamorous from "glamorous";
import { css } from "glamor";
import cx from "classnames";

const { Div, Span } = glamorous;

const cssOddItem = css({
    color: "#666",
    backgroundColor: "#DDD"
});

const cssEvenItem = css({
    color: "#DDD",
    backgroundColor: "#666"
});

const cssFirstColumnItem = css({
    borderLeftWidth: "1px"
});

const cssFirstRowItem = css({
    borderTopWidth: "1px"
});

const cssCell = css({
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: ".32em",
    boxSizing: "border-box",
    border: "1px solid #333",
    borderLeftWidth: 0,
    borderTopWidth: 0
});

const Cell = ({
    columnIndex,
    rowIndex,
    isFirstColumn,
    isFirstRow,

    style: { position, ...style },
    ...props
}) => (
    <Div
        {...props}
        style={{
            ...style
        }}
        className={cx({
            [cssCell]: true,
            [cssFirstRowItem]: isFirstRow,
            [cssFirstColumnItem]: isFirstColumn,
            [cssOddItem]: (columnIndex + rowIndex) % 2 === 1,
            [cssEvenItem]: (columnIndex + rowIndex) % 2 === 0
        })}
    >
        <Span
            css={{
                flexGrow: 1,
                textAlign: "right",
                borderRight: "1px solid currentColor",
                paddingRight: ".32em",
                marginRight: ".32em"
            }}
        >
            {rowIndex}
        </Span>
        <Span style={{ flexGrow: 1 }}>{columnIndex}</Span>
    </Div>
);

export default props => <Grid {...props} CellComponent={Cell} />;
