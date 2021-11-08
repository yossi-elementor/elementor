import React, { useEffect } from 'react';
import { useOnboardingContext } from "../onboarding-context";
import { StyledPageCircle, StyledProgressBar, StyledStep, StyledStepsContainer } from "./styles";

export default function OnboardingProgress() {

	const context = useOnboardingContext();

	const PageCircle = ( { index, stepCount } ) => {
		const selected = index === context.currentPageIndex;
		const completed = index < context.currentPageIndex;
		let text = index + 1;
		if ( completed ) {
			text = "✔";
		}
		return (
			<>
				<StyledPageCircle variant={ selected ? 'selected' : '' } >
					<span>{ text }</span>
				</StyledPageCircle>
				<StepsCircles selected={selected} stepCount={stepCount} />
			</>
		)
	}

	const StepsCircles = ( { stepCount, selected } ) => {
		return (
			<StyledStepsContainer variant={selected ? '' : 'hidden'}>
				{ [ ...Array( stepCount ) ].map( ( value, index ) => (
					<StyledStep variant={selected && index === context.currenStepIndex ? 'selected' : ''}/>
				) ) }
			</StyledStepsContainer>
		)
	}

	return (
		<StyledProgressBar>
			{ context.flow.map( ( page, index ) => {
				return (
					<>
						<PageCircle key={ index } index={ index } selected={ index === context.currentPageIndex }
									stepCount={ page.stepCount }/>
					</>
				)
			} ) }
		</StyledProgressBar>
	);
}
