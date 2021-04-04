import React from 'react';

const ArticleCard = (props) => {
    const data = props || {},
        title = data.title || "",
        imageURL = data.urlToImage || "",
        content = data.content || "",
        author = data.author || "Author Unavailable",
        source = data.source || {},
        sourceName = source.name || "";

        // console.log("Article title is ", props)
    return(
        <div>
            <h1>Article</h1>
        </div>
    );
};

export default ArticleCard;