import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AutoChipInput } from "./autoChipInput";
import { useOmdb } from "./omdb";

const Container = styled.div`
	font-family: sans-serif;
	text-align: center;
`;

export const App = props => {
	const { title, isMulti = true } = props;
	const {
		selectedList,
		search,
		setSelectedList,
		suggestedList,
		setSearch,
		isLoading
	} = useOmdb({
		i: "tt3896198",
		apiKey: "b91cba8b",
		apiPrefix: "https://www.omdbapi.com/?i=tt3896198&apiKey=b91cba8b"
	});
	return (
		<Container>
			<h1>{title}</h1>
			<AutoChipInput
				title={"Search Movie"}
				placeholder="Enter movie title here, please"
				search={search}
				setSearch={setSearch}
				suggestedList={suggestedList}
				selectedList={selectedList}
				setSelectedList={setSelectedList}
				isLoading={isLoading}
				isMulti={isMulti}
			/>
		</Container>
	);
};

App.propTypes = {
	title: PropTypes.string
};

App.defaultProps = {
	title: "Hello Eightfold!"
};
