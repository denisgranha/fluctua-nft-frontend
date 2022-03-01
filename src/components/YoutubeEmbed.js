import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({embedURL}) => (
    <div style={{overflow: 'hidden'}}>
    <iframe 
        title="youtube-video"
        width="560" height="315" src={embedURL} frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        </iframe>
    </div>
);

YoutubeEmbed.propTypes = {
    embedURL: PropTypes.string.isRequired
};

export default YoutubeEmbed;