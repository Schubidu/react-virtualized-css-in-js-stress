import React from "react";
import { ArrowKeyStepper, MultiGrid } from "react-virtualized";

const  cellRenderer = ({CellComponent}) => ({ columnIndex, key, rowIndex, style }) => {
    const isFirstRow = rowIndex === 0;
    const isFirstColumn = columnIndex === 0;
    return React.createElement(CellComponent,
            {
                columnIndex,
                key,
                rowIndex,
                style: {
                    ...style,

                },
                isFirstRow,
                isFirstColumn
            }
    )
};

export default ({CellComponent, ...props}) => <MultiGrid {...props} cellRenderer={cellRenderer({CellComponent})} />
