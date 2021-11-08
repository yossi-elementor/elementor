import styled from "styled-components";
import { getStyle } from 'e-utils';

const onboardingWrapper = {
	base: {
		shared:`
			flex: 1;
			display: flex;
			flex-direction: column;
			height: 100%;
			margin: 0 3rem;
			background: #FFFFFF;
			box-shadow: 0 3px 16px rgba(35, 38, 42, 0.2);
			box-sizing: border-box;
		`,
	}
}

const onboardingFooter = {
	base: {
		shared:`
			width: 100%;
			margin: 0 6.5rem 68px 6.5rem;
		`,
	}
}

const onboardingContent = {
	base: {
		shared:`
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			height: 100%;
		`,
	}
}

export const OnboardingWrapper = styled.div`${ props => getStyle( onboardingWrapper, props ) }`;
export const OnboardingContent = styled.div`${ props => getStyle( onboardingContent, props ) }`;
export const OnboardingFooter = styled.div`${ props => getStyle( onboardingFooter, props ) }`;
