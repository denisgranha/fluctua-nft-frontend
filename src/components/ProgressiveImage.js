import  {useState, useEffect } from "react";

export default function ProgressiveImage(props){

    const defaultProps = {
        transitionTime: 500,
        timingFunction: "ease",
        initialBlur: 40
    };

    const [src, setSrc] = useState(props.preview)
    const [blur, setBlur] = useState(props.initialBlur?props.initialBlur:defaultProps.initialBlur)

    useEffect(() => {

        const abortController = new AbortController()  // creating an AbortController

    
        fetch(props.src)
        .then(srcDataURI => {
            setSrc(srcDataURI)
            setBlur(0)
        });

        return () => {
            abortController.abort()  // stop the query by aborting on the AbortController on unmount
        }
    
    })

    function fetch(src){
        return new Promise(resolve => {
            const image = new Image();
            image.src = src;
            image.addEventListener("load", () => resolve(src), false);
        });
    }

    function getStyle() {
        const {transitionTime, timingFunction} = Object.assign({}, props, defaultProps);

        return {
            filter: `blur(${blur}px)`,
            transition: `filter ${transitionTime}ms ${timingFunction}`
        };
    }

    const {render} = props;
    // debugger;

    if(src){
        return render(src, getStyle());
    }
    else{
        return <div></div>
    }

    


}