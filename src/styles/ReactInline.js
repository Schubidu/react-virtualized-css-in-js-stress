import React from "react";
import Grid from "../Grid";

const Cell = ({
    columnIndex,
    rowIndex,
    style,
    isFirstColumn,
    isFirstRow,
    ...props
}) => (
    <div
        {...props}
        style={{
            ...style,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: ".32em",
            boxSizing: "border-box",
            border: "1px solid #333",
            color: (columnIndex + rowIndex) % 2 === 1 ? "#666" : "#DDD",
            backgroundColor:
                (columnIndex + rowIndex) % 2 === 0 ? "#666" : "#DDD",
            borderLeftWidth: isFirstColumn ? "1px" : 0,
            borderTopWidth: isFirstRow ? "1px" : 0
        }}
    >
        <span
            style={{
                flexGrow: 1,
                textAlign: "right",
                borderRight: "1px solid currentColor",
                paddingRight: ".32em",
                marginRight: ".32em"
            }}
        >
            {rowIndex}
        </span>
        <span style={{ flexGrow: 1 }}>{columnIndex}</span>
    </div>
);

export default props => <Grid {...props} CellComponent={Cell} />;
