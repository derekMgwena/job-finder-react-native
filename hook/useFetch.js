import { useState, useEffect } from "react";
import axios from "axios";

/*const options = {
  method: 'GET',
  url: 'https://jsearch.p.rapidapi.com/search',
  params: {
    query: 'Python developer in Texas, USA',
    page: '1',
    num_pages: '1'
  },
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': 'f8bad06311msh398899cea0b798bp1b4e5cjsnb5143edddc13',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
}; */
const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": 'rapidApiKey',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;