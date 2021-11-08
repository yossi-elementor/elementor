import React from 'react';
import { useOnboardingContext } from "./onboarding-context";
import OnboardingProgress from "./onboarding-progress/onboarding-progress";
import styled from 'styled-components';
import { getStyle } from 'e-utils';
import { OnboardingContent, OnboardingFooter, OnboardingWrapper } from "./styles";

const primary = "#040080";
const brand = "#46F2B6";
const nextButton = {
	base: {
		shared: `
			width: 24rem;
			height: 3rem;
			font-size: 18px;
			background-color: ${ primary };
			color: ${ brand };
			border: none;
			cursor: pointer;
		`
	}
}
export default function OnboardingContainer() {
	const StyledButton = styled.button`${ props => getStyle( nextButton, props ) }`;

	const context = useOnboardingContext();

	return (
		<OnboardingWrapper>
			<OnboardingContent>
				<OnboardingProgress/>
				{ context.currentPage }
				<OnboardingFooter>
					<StyledButton onClick={ () => context.next() }>Next</StyledButton>
				</OnboardingFooter>
			</OnboardingContent>
		</OnboardingWrapper>
	)
}
