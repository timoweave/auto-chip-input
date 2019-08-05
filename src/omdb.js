import { useState, useEffect } from "react";
import axios from "axios";

const fetchMovie = async props => {
	const { search, setSuggestedList, setIsLoading, apiPrefix } = props;
	setIsLoading(true);
	const resp = await axios.get(`${apiPrefix}&s=${search}`);
	const Search = resp.data.Search.map(movie => ({
		// adapter the data for react-suggest
		...movie,
		label: movie.Title,
		value: movie.Title
	}));
	setSuggestedList(Search);
	setIsLoading(false);
};

export const useOmdb = props => {
	const { i, apiKey } = props;
	const [search, setSearch] = useState("");
	const [selectedList, setSelectedList] = useState([]);
	const [suggestedList, setSuggestedList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const apiPrefix = `https://www.omdbapi.com/?i=${i}&apiKey=${apiKey}`;
		fetchMovie({ apiPrefix, search, setSuggestedList, setIsLoading });
	}, [i, apiKey, search, setSuggestedList]);

	return {
		search,
		suggestedList,
		selectedList,
		setSearch,
		setSelectedList,
		setSuggestedList,
		isLoading
	};
};
