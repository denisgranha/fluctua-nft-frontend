import React from "react";

// Based on https://github.com/wcandillon/react-progressive-image-loading/blob/master/src/index.tsx
// @todo don't change if unmounted 
// https://jasonwatmore.com/post/2021/08/27/react-how-to-check-if-a-component-is-mounted-or-unmounted
export class ProgressiveImage extends React.Component{

    static defaultProps = {
        transitionTime: 500,
        timingFunction: "ease",
        initialBlur: 40
    };

    constructor(){
        super()
        this.state = {
        }
    }

    componentDidMount() {
        const {src, preview} = this.props;
        const initialBlur = this.props.initialBlur;
        this.setState({ src: preview, blur: initialBlur });
        this.fetch(src)
            .then(srcDataURI => this.setState({ src: srcDataURI, blur: 0 }));
    }


    render() {
        const {src} = this.state;
        const {render} = this.props;
        return render(src, this.getStyle());
    }

    fetch(src){
        return new Promise(resolve => {
            const image = new Image();
            image.src = src;
            image.addEventListener("load", () => resolve(src), false);
        });
    }

    getStyle() {
        const {transitionTime, timingFunction} = this.props;
        const {blur} = this.state;
        return {
            filter: `blur(${blur}px)`,
            transition: `filter ${transitionTime}ms ${timingFunction}`
        };
    }
}

export default ProgressiveImage;