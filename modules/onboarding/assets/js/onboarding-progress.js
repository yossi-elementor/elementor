import React, { useEffect } from 'react';
import { useOnboardingContext } from "./onboarding-context";

export default function OnboardingProgress() {

	const context = useOnboardingContext();

	const Circle = ( { selected, stepCount } ) => {
		return (
			<>
				<div className={ `circle ${ selected ? 'selected' : '' }` }/>
				{ [
					...Array( stepCount ),
				].map( ( value, index ) => (
					<SmallCircle key={index} selected={selected && index === context.currenStepIndex}/>
				) ) }
			</>
		)
	}

	const SmallCircle = ( { selected } ) => {
		return <div className={ `smallCircle ${ selected ? 'selected' : '' }` }/>
	}

	return (
		<div className="e-onboarding-progress-bar">
			{ context.flow.map( ( page, index ) => {
				return (
					<>
						<Circle key={index} selected={ index === context.currentPageIndex } stepCount={ page.stepCount }/>
					</>
				)
			} ) }
		</div>
	);
}
