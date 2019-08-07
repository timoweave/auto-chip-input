/* 
 NOTE: adapt code from https://material-ui.com/components/autocomplete/#react-select
*/
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Select from "react-select";
import { emphasize, makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		height: 250,
		minWidth: 290
	},
	input: {
		display: "flex",
		padding: 0,
		height: "auto"
	},
	valueContainer: {
		display: "flex",
		flexWrap: "wrap",
		flex: 1,
		alignItems: "center",
		overflow: "hidden"
	},
	chip: {
		margin: theme.spacing(0.5, 0.25)
	},
	chipFocused: {
		backgroundColor: emphasize(
			theme.palette.type === "light"
				? theme.palette.grey[300]
				: theme.palette.grey[700],
			0.08
		)
	},
	noOptionsMessage: {
		padding: theme.spacing(1, 2)
	},
	singleValue: {
		fontSize: 16
	},
	placeholder: {
		position: "absolute",
		left: 2,
		bottom: 6,
		fontSize: 16
	},
	paper: {
		position: "absolute",
		zIndex: 1,
		marginTop: theme.spacing(1),
		left: 0,
		right: 0
	},
	divider: {
		height: theme.spacing(2)
	}
}));

const commonPropTypes = {
	children: PropTypes.node,
	innerProps: PropTypes.object.isRequired,
	selectProps: PropTypes.object.isRequired
};

const NoOptionsMessage = props => {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.noOptionsMessage}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
};

NoOptionsMessage.propTypes = {
	...commonPropTypes
};

const inputComponent = props => {
	const { inputRef, ...otherProps } = props;
	return <div ref={inputRef} {...otherProps} />;
};

inputComponent.propTypes = {
	inputRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({
			current: PropTypes.any.isRequired
		})
	])
};

const Control = props => {
	const {
		children,
		innerProps,
		innerRef,
		selectProps: { classes, TextFieldProps }
	} = props;

	return (
		<TextField
			fullWidth
			InputProps={{
				inputComponent,
				inputProps: {
					className: classes.input,
					ref: innerRef,
					children,
					...innerProps
				}
			}}
			{...TextFieldProps}
		/>
	);
};

Control.propTypes = {
	children: PropTypes.node,
	innerProps: PropTypes.shape({
		onMouseDown: PropTypes.func.isRequired
	}).isRequired,
	innerRef: PropTypes.oneOfType([
		PropTypes.oneOf([null]),
		PropTypes.func,
		PropTypes.shape({
			current: PropTypes.any.isRequired
		})
	]).isRequired,
	selectProps: PropTypes.object.isRequired
};

const Option = props => {
	return (
		<MenuItem
			ref={props.innerRef}
			selected={props.isFocused}
			component="div"
			style={{
				fontWeight: props.isSelected ? 500 : 400
			}}
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	);
};

Option.propTypes = {
	children: PropTypes.node,
	innerProps: PropTypes.shape({
		id: PropTypes.string.isRequired,
		// key: PropTypes.string.isRequired,
		key: PropTypes.string,
		onClick: PropTypes.func.isRequired,
		onMouseMove: PropTypes.func.isRequired,
		onMouseOver: PropTypes.func.isRequired,
		tabIndex: PropTypes.number.isRequired
	}).isRequired,
	innerRef: PropTypes.oneOfType([
		PropTypes.oneOf([null]),
		PropTypes.func,
		PropTypes.shape({
			current: PropTypes.any.isRequired
		})
	]),

	isFocused: PropTypes.bool.isRequired,
	isSelected: PropTypes.bool.isRequired
};

const Placeholder = props => {
	const { selectProps, innerProps = {}, children } = props;
	return (
		<Typography
			color="textSecondary"
			className={selectProps.classes.placeholder}
			{...innerProps}
		>
			{children}
		</Typography>
	);
};

Placeholder.propTypes = {
	children: PropTypes.node,
	innerProps: PropTypes.object,
	selectProps: PropTypes.object.isRequired
};

function ValueContainer(props) {
	return (
		<div className={props.selectProps.classes.valueContainer}>
			{props.children}
		</div>
	);
}

ValueContainer.propTypes = {
	children: PropTypes.node,
	selectProps: PropTypes.object.isRequired
};

const MultiValue = props => {
	return (
		<Chip
			tabIndex={-1}
			label={props.children}
			className={clsx(props.selectProps.classes.chip, {
				[props.selectProps.classes.chipFocused]: props.isFocused
			})}
			onDelete={props.removeProps.onClick}
			deleteIcon={<CancelIcon {...props.removeProps} />}
		/>
	);
};

MultiValue.propTypes = {
	children: PropTypes.node,
	isFocused: PropTypes.bool.isRequired,
	removeProps: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		onMouseDown: PropTypes.func.isRequired,
		onTouchEnd: PropTypes.func.isRequired
	}).isRequired,
	selectProps: PropTypes.object.isRequired
};

const Menu = props => {
	return (
		<Paper
			square
			className={props.selectProps.classes.paper}
			{...props.innerProps}
		>
			{props.children}
		</Paper>
	);
};

Menu.propTypes = {
	...commonPropTypes,
	children: PropTypes.element.isRequired
};

const components = {
	Control,
	Menu,
	MultiValue,
	NoOptionsMessage,
	Option,
	Placeholder,
	ValueContainer
};

const AutoChipInput = props => {
	const { title, placeholder, isMulti } = props;
	const { search, setSearch, suggestedList, selectedList } = props;
	const { setSelectedList, onSelectedList } = props;
	const classes = useStyles();
	const theme = useTheme();
	const onChange = value => {
		setSelectedList(value);
		onSelectedList(value);
	};
	const selectStyles = {
		input: base => ({
			...base,
			color: theme.palette.text.primary,
			"& input": {
				font: "inherit"
			}
		})
	};
	const textFieldProps = {
		label: title,
		InputLabelProps: {
			htmlFor: "react-select-multiple",
			shrink: true
		}
	};

	return (
		<Select
			classes={classes}
			styles={selectStyles}
			inputId="react-select-multiple"
			TextFieldProps={textFieldProps}
			placeholder={placeholder}
			components={components}
			value={selectedList}
			onChange={onChange}
			inputValue={search}
			onInputChange={setSearch}
			options={suggestedList}
			isMulti={isMulti}
			disabled={true}
		/>
	);
};

AutoChipInput.propTypes = {
	title: PropTypes.string,
	placeholder: PropTypes.string,
	isMulti: PropTypes.bool,
	search: PropTypes.String,
	suggestedList: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string
		})
	),
	selectedList: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string
		})
	),
	setSelectedList: PropTypes.func,
	setSearch: PropTypes.func,
	isLoading: PropTypes.bool,
	onSelectedList: PropTypes.func,
	disabled: PropTypes.bool
};

AutoChipInput.defaultProps = {
	title: "Search Options",
	placeholder: "Enter option",
	isMulti: false,
	isLoading: false,
	disabled: true,
	onSelectedList: value => {
		console.warn({
			message: "provide your own callback",
			value
		});
	}
};

export default AutoChipInput;
