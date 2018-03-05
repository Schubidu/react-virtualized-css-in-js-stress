import React, { Fragment } from "react";

// overscanRowCount

const inputs = ["rows", "columns", /*"overscanRowCount", */];

export default ({ onChange, lastFocus, ...values }) => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            maxWidth: "13em",
            marginBottom: ".75em"
        }}
    >
        {inputs.map(input => (
            <Fragment key={input}>
                <label htmlFor={input}>{input}</label>
                <input
                    id={input}
                    type="number"
                    name={input}
                    autoFocus={lastFocus === input}
                    onChange={onChange}
                    defaultValue={values[input]}
                    style={{ width: `${(values[input] + "").length + 2}ch` }}
                />
            </Fragment>
        ))}
    </div>
);
