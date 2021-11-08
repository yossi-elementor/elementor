import styled from "styled-components";
import { getStyle } from 'e-utils';

const progressGray = "#3A3F45";
const progressLightGray = "#BABFC5";
const primary= "#040080";
const brand= "#46F2B6";

const progressBar = {
	base: {
		shared: `
		  display: flex;
		  width: 100%;
		  min-height: 50px;
		  margin-top: 16px;
		  justify-content: center;
		  align-items: center;
		`,
	}
}

const pageCircle = {
	base: {
		shared: `
			display: flex;
  			align-items: center;
  			justify-content: center;
  			width: 24px;
  			height: 24px;
  			border-radius: 24px;
  			border: 1px solid ${ progressLightGray };
  			margin: 0 12px;
		`,
		variant: {
			selected: `
				background-color: ${ progressGray };
				color: white;
			`
		},
	}
}

const stepsContainer = {
	base: {
		shared:`
			display: flex;
		`,
		variant: {
			hidden: `
				width: 0;
  				overflow: hidden;
  				transition: width 2s;
			`
		}
	}
}

const step = {
	base: {
		shared:`
			width: 8px;
			height: 8px;
			border-radius: 10px;
			border: 1px solid ${ progressLightGray };
			margin: 0 8px;
		`,
		variant: {
			selected: `
				background-color: ${ progressGray };
				color: white;
			`
		}
	}
}

export const StyledProgressBar = styled.div`${ props => getStyle( progressBar, props ) }`;
export const StyledPageCircle = styled.div`${ props => getStyle( pageCircle, props ) }`;
export const StyledStepsContainer = styled.div`${ props => getStyle( stepsContainer, props ) }`;
export const StyledStep = styled.div`${ props => getStyle( step, props ) }`;
