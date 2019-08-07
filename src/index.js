import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import AutoChipInput2 from "./input2";
import { useOmdb } from "./omdb";

const Container = styled.div`
	font-family: sans-serif;
	text-align: center;
	margin: 2em;
`;

const Center = styled.div`
	width: 80%;
	margin: 20vh auto;
`;

export const App = () => {
	const title = "Hey <AutoChipInput/>";
	const subTitle = "Autocomplete Chip Input Component";
	const isMulti = true;
	const omdb = useOmdb({ i: "tt3896198", apiKey: "b91cba8b" });
	const { selectedList, search, setSelectedList } = omdb;
	const { suggestedList, setSearch, isLoading } = omdb;
	return (
		<Container>
			<h1>{title}</h1>
			<h2>{subTitle}</h2>
			<Center>
				<AutoChipInput2
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
			</Center>
		</Container>
	);
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
