import React, { useEffect } from 'react';
import OnboardingPage from "./onboarding-page";
import { useOnboardingContext } from "../onboarding-context";

export default function AnotherOnboardingPage() {

	const context = useOnboardingContext();

	useEffect( () => {
		context.setCurrentPageStepsCount( 2 );
	}, [] )

	const renderStep = () => {
		switch ( context.currenStepIndex ) {
			case 0:
				return <h3>Step 2/1</h3>
			case 1:
				return <h3>Step 2/2</h3>
		}
	}

	return (
		<OnboardingPage title="Page2" description="Im page 2!">
			{ renderStep() }
		</OnboardingPage>
	)
}
