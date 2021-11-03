import React, { useState, useEffect } from 'react';
import OnboardingPage from "./onboarding-page";
import { useOnboardingContext } from "../onboarding-context";
export default function CanvasOnboardingPage() {

	const context = useOnboardingContext();

	const renderStep = () => {
		switch ( context.currenStepIndex ) {
			case 0:
				return <h3>Step 1</h3>
			case 1:
				return <h3>Step 2</h3>
			case 2:
				return <h3>Step 3</h3>
		}
	}

	return (
		<OnboardingPage
			title={__( 'Ready to connect to Elementor?', 'elementor' )}
			description={__( 'You’ve set up your site’s basic identity. Great!\n' +
				'\n' +
				'Now, add your email and connect so you can access your site from the My Elementor dashboard, enter the Kit Library, and so much more!', 'elementor' )}>
			{  renderStep() }
		</OnboardingPage>
	)
}
