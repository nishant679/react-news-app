import  {useState, useEffect} from 'react';
import '../scss/Article.scss';


const Article = (props) =>{

    const articles = props.articles || [];

    return(
        <div className="article-container">
            <div className="article">
                {
                    articles.map((article, i) => {
                        const data = article || {},
                            title = data.title || "",
                            imageURL = data.urlToImage || "",
                            content = data.content || "",
                            author = data.author || "Author Unavailable",
                            publishDate = data.publishedAt.split('T')[0] || "",
                            source = data.source || {},
                            sourceName = source.name || "";
                        return(
                            <div  className="article-data" key={i}>
                                <div className="data">
                                    <h4>{title}</h4>
                                    <p className="content">{content}</p>
                                    <span className="author">{author}</span>
                                    <div>
                                        <span className="source">{sourceName}</span>
                                        <span>&#8226;</span>
                                        <span className="date">{publishDate}</span>
                                    </div>
                                    
                                </div>
                                <div className="image-container">
                                    <picture>
                                        <img src={imageURL} alt=""/>
                                    </picture>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );   
};

export default Article;