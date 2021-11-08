import styled from "styled-components";
import { getStyle } from 'e-utils';

const onboardingPage = {
	base: {
		shared:`
			  display: flex;
			  height: 100%;
			  width: 100%;
			  padding: 1rem 6.5rem;
			  box-sizing: border-box;
		`,
	}
}

const onboardingPageImage = {
	base: {
		shared:`
			flex: 1;
			background-color: lightgray;
			margin: 5rem 0 5rem 5rem;
		`,
	}
}

const onboardingPageContent = {
	base: {
		shared:`
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 2;
			p {
			  font-size: 18px;
			  line-height: 27px;
			}
		`,
	}
}

export const StyledOnboardingPage = styled.div`${ props => getStyle( onboardingPage, props ) }`;
export const StyledOnboardingPageContent = styled.div`${ props => getStyle( onboardingPageContent, props ) }`;
export const StyledOnboardingPageImage = styled.div`${ props => getStyle( onboardingPageImage, props ) }`;
