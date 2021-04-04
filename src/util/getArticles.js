import axios from 'axios';
import { API_KEY, SEARCH_ENDPOINT} from '../config';


export const getArticles = (page, topic) => {
    console.log("page count", page);
	return axios
		.get(SEARCH_ENDPOINT,{
            params : {
                q : topic,
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

const getRes = (res) => {
	return {
		articles: res.data.articles,
		hits: res.data.totalResults
	};
};