import {NEWS_API_KEY} from '../config';

const FetchNewsAPI = async() =>{
    const topic = "bitcoin",
    page = 2;

    const response = await fetch(
        `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&page=${page}&apiKey=${NEWS_API_KEY}`            
    );
    const newsResult = await response.json();
    // console.log(newsResult);
    
    return newsResult;
    
};

export default FetchNewsAPI;

// export const getBitcoinArticles = async () => {
//   try {
//     const response = await fetch(
//       `https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
//     );
//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.log(error);
//   }
// };