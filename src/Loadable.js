// https://twitter.com/matzatorski/status/872059865350406144
import React from "react";
import L from "react-loadable";

const Loadable = opts => L({
    loading() {
        return <div>Loading...</div>
    },
    delay: 300,
    ...opts,
});

export default Loadable;
