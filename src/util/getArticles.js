import axios from 'axios';
// import { API, API_KEY, SEARCH_ENDPOINT, DEFAULT_QUERY } from '../config';

/**
 * Combining the API with end point
 */
// const articlesApi = `${API}/${SEARCH_ENDPOINT}`;
const newsApi = "https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&page=1&apiKey=ae6ad755efa541c1b4231038e602741c"
const API_KEY = 'ae6ad755efa541c1b4231038e602741c';

const api_endpoint = "https://newsapi.org/v2/everything";
/**
 * Function to fetch news articles
 */
export const getArticles = (page) => {
    console.log("page count", page);
	return axios
		.get(api_endpoint,{
            params : {
                q : "bitcoin",
                sorrBy : "publishedAt",
                page : page,
                apiKey : API_KEY
            }
        })
		.then((response) => {
            // console.log("API Response with AXIOS",response);
			return getRes(response);
		})
		.catch((error) => {
			console.log(error);
			return { error: true };
		});
};

/**
 * Filtering response data to
 * only return articles & hits
 */
const getRes = (res) => {
	return {
		articles: res.data.articles,
		hits: res.data.totalResults
	};
};