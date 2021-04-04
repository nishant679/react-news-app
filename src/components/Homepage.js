import React, {useState, useEffect, useRef, useCallback} from 'react';
import Article from './Article';
import Loader from './Loader';
import {getArticles} from '../util/getArticles';
import '../scss/search-box.scss';

const HomePage = () => {
    // storing Article in a state
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [hits, setHits] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [topic, setTopic] = useState("India");
    console.log("Search topic is ", topic);

    // utility function to paginate 
    const observer = useRef();
    const lastArticle = useCallback(
        (node) => {
            if(loading) return;
            if(observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entrirs) => {
                if(entrirs[0].isIntersecting){
                    initArticles();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading]
    );

    useEffect(()=>{
        initArticles();
    }, []);


    //utility function to load articles
    const initArticles = () => {
        // set loading true before loading the articles
        setError(false);
        setLoading(true);

        getArticles( page, topic )
            .then((data) => {
                if(!data.error && data !== undefined){
                    //set articles data if no error 
                    setArticles([...articles, data.articles]);
                    setPage(page+1);
                    setHits(Number(data.hits));

                    //reset status
                    setLoading(false);
                    setError(false);
                }else{
                    setError(true);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setError(true);
                setLoading(false);
            })
    };

    //Search form
    const SearchForm = () => {
        let [searchTopic, updateSearchTopic] = useState("");

        const updateData = (e) => {
            updateSearchTopic(e.target.value);
        }
        const updateTopic = () =>{
            setTopic(searchTopic);
            // initArticles();
            // setArticles([]);
            console.log("updated Search topic")
        }
        return(
            <div className="search-container">
                <div className="search">
                    <input 
                        type="text" 
                        value={searchTopic}
                        onChange = {updateData}
                    ></input>
                    <button onClick={updateTopic}>Search</button>
                </div>
            </div>
        )
    };

    //Rendering articles card
    const showArticles = () => {

        console.log("Home page article is ", articles);
        return(
            <React.Fragment>
                {
                    articles.map((article, i)=> {
                        if(articles.length === i+1){
                            return(
                                <div ref={lastArticle} className='article-card' key={i}>                                    
                                    <Article articles={article}/>
                                </div>
                            )
                        }
                        else return(
                            <div className="article-card" key={i}>
                                <Article articles={article} />
                            </div>
                        );
                    })
                }
            </React.Fragment>
        );
    };

    //show error if any 
    const ShowError = () => {
        return(
            <React.Fragment>
                {
                    error && 
                    articles.length < hits && (
                        <ShowError>Something Went Wrong</ShowError>
                    )
                }
            </React.Fragment>
        );
    };

    //show loading animation while loading
    const ShowLoading = () => {
        return(
            <React.Fragment>
                {loading && <Loader/>}
            </React.Fragment>
        );
    }

    //show end of article list
    const ShowEndofArticleList = () => {
        return(
            <React.Fragment>
                {
                    error && 
                    articles.length >= hits && (
                        <ShowError>End of articles</ShowError>
                    )
                }
            </React.Fragment>
        );
    };


    return(
        <React.Fragment>
            <div className="container">
                <SearchForm />
                {showArticles()}
                {ShowLoading()}
                {ShowError()}
                {ShowEndofArticleList()}
            </div>
        </React.Fragment>
    )

};

export default HomePage;