import React, {useState, useEffect} from 'react';
import FetchNewsAPI from './FetchNewsAPI';
import '../scss/Article.scss';
import {getArticles} from '../util/getArticles';


const Article = (props) =>{
    // let [articles, setArticle] = useState([]);
    // // const articles = props.data || {}

    // useEffect(async()=> {
    //     const Response = await FetchNewsAPI();
    //     setArticle(articles = Response.articles);
    //     console.log("Response is ", Response)
    // }, []);


    // console.log(articles);
    // getArticles();

    const articles = props.articles || [];

    return(
        <div className="article-container">
            {/* <h2>News APP</h2> */}
            <div className="article">
                {
                    articles.map(article => {
                        const data = article || {},
                            title = data.title || "",
                            imageURL = data.urlToImage || "",
                            content = data.content || "",
                            author = data.author || "Author Unavailable",
                            publishDate = data.publishedAt.split('T')[0] || "",
                            source = data.source || {},
                            sourceName = source.name || "";
                        return(
                            <div  className="article-data">
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