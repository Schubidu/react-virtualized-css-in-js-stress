import React from "react";
import Loadable from "../Loadable";

export const ReactInline = Loadable({
    loader: () =>
        import(/*webpackChunkName: "reactInline" */ "./ReactInline")
});

export const Glamorous = Loadable({
    loader: () =>
        import(/*webpackChunkName: "glamorous" */ "./Glamorous")
});

export const StyledComponents = Loadable({
    loader: () =>
        import(/*webpackChunkName: "styledComponents" */ "./StyledComponents")
});

export const Emotion = Loadable({
    loader: () =>
        import(/*webpackChunkName: "emotion" */ "./Emotion")
});

export default {
    'react-inline': ReactInline,
    'glamorous': Glamorous,
    'styled-components': StyledComponents,
    'emotion': Emotion,
}
