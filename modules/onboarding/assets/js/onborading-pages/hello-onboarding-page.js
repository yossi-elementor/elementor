import React, { useState, useEffect } from 'react';
import OnboardingPage from "./onboarding-page";
import { useOnboardingContext } from "../onboarding-context";
export default function HelloOnboardingPage() {

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
		<OnboardingPage title="Page1" description="Im page 1">
			{  renderStep() }
		</OnboardingPage>
	)
}
