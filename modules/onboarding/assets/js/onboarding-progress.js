import React, { useEffect } from 'react';
import { useOnboardingContext } from "./onboarding-context";

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
				<div className={ `e-onboarding-page-circle ${ selected ? 'e-onboarding-page-circle__selected' : '' }` }>
					<span>{ text }</span>
				</div>
				<StepsCircles selected={selected} stepCount={stepCount} />
			</>
		)
	}

	const StepsCircles = ( { stepCount, selected } ) => {
		return (
			<div className={ `e-onboarding-steps-container ${selected ? '' : 'e-onboarding-steps-container__hidden'}` }>
				{ [ ...Array( stepCount ) ].map( ( value, index ) => (
					<div className={ `e-onboarding-steps-container__step ${selected && index === context.currenStepIndex ? 'e-onboarding-steps-container__selected' : ''}` }/>
				) ) }
			</div>
		)
	}

	return (
		<div className="e-onboarding-progress-bar">
			{ context.flow.map( ( page, index ) => {
				return (
					<>
						<PageCircle key={ index } index={ index } selected={ index === context.currentPageIndex }
									stepCount={ page.stepCount }/>
					</>
				)
			} ) }
		</div>
	);
}
