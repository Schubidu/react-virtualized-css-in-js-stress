import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Options from "./Options";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import queryString from "query-string";
import * as AsyncStyles from "./styles";
import './index.css';

const styles = {
    wrapper: {
        fontFamily: "sans-serif"
    }
};

const ROW_HEIGHT = 30;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const mockGridData = (
    { rows = 1000, columns = 5, overscanRowCount } = {
        rows: 1000,
        columns: 5,
        overscanRowCount: 10
    }
) => {
    const dataGrid = [...Array(parseInt(rows, 10))].map((x, r) =>
        [...Array(parseInt(columns, 10))].map((y, c) => ({
            data: r + "|" + c
        }))
    );

    const columnsWidth = [...Array(parseInt(columns, 10))].map(
        () => (columns + "" + rows).length * 12 + 14 + getRandomInt(50)
    );

    const rowsHeight = [...Array(parseInt(rows, 10))].map(
        () => ROW_HEIGHT + getRandomInt(50)
    );

    return {
        dataGrid,
        rows,
        columns,
        overscanRowCount,
        columnsWidth,
        rowsHeight
    };
};

const MenuLink = ({ label, to, className }) => (
    <Route
        path={to}
        children={({ match, location: { search } }) => (
            <li className="navigation-item-wrapper">
                <Link className={`${className} ${match ? 'active' : ''}`} to={`${to}${search}`}>{label}</Link>
            </li>
        )}
    />
);

class App extends Component {
    state = mockGridData(queryString.parse(global.location.search));

    onChangeHandler = ({ push, location }) => ({ target }) => {
        this.setState(
            ({ rows: prevRows, columns: prevColumns }) => {
                if (isNaN(target.value)) return;
                const { rows, columns } = {
                    rows: prevRows,
                    columns: prevColumns,
                    [target.name]: parseInt(target.value, 10)
                };
                return {
                    ...mockGridData({ rows, columns }),
                    lastFocus: target.name
                };
            },
            () => {
                const { rows, columns } = this.state;
                push(
                    location.pathname +
                        "?" +
                        queryString.stringify({ rows, columns })
                );
            }
        );
    };

    getColumnWidth = ({ index }) => this.state.columnsWidth[index];
    getRowsHeight = ({ index }) => this.state.rowsHeight[index];

    render() {
        const {
            columns,
            rows,
            overscanRowCount,
            columnsWidth,
            rowsHeight
        } = this.state;
        const gridProps = {
            columnCount: columns,
            columnWidth: this.getColumnWidth,
            height: rowsHeight
                .filter((x, i) => i < 10)
                .reduce((acc, col) => acc + col, 0),
            width: columnsWidth.reduce((acc, col) => acc + col, 0),
            rowCount: rows,
            rowHeight: this.getRowsHeight,
            trigger: columns + "" + rows,
            overscanRowCount
        };

        return (
            <Router>
                <Fragment>
                    <nav>
                        <ul className="navigation">
                            {Object.keys(AsyncStyles.default).map(key => (
                                <MenuLink className="navigation-item"
                                    key={key}
                                    to={`/${key}`}
                                    label={key}
                                />
                            ))}
                        </ul>
                    </nav>
                    <Switch>
                        <Route
                            component={({ location, history: { push } }) => (
                                <Options
                                    {...this.state}
                                    onChange={this.onChangeHandler({
                                        push,
                                        location
                                    })}
                                />
                            )}
                        />
                    </Switch>
                    <Switch>
                        {Object.keys(AsyncStyles.default).map(key => (
                            <Route
                                key={key}
                                path={`/${key}`}
                                component={() =>
                                    React.createElement(
                                        AsyncStyles.default[key],
                                        gridProps
                                    )
                                }
                            />
                        ))}
                        <Route
                            component={({ history: { replace } }) =>
                                replace(
                                    `/${
                                        Object.keys(AsyncStyles.default)[0]
                                    }?columns=10&rows=1000`
                                ) || null
                            }
                        />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}
render(<App />, document.getElementById("root"));
