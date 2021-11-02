import React, { useEffect, useState, useContext } from 'react';
import HelloOnboardingPage from "./onborading-pages/hello-onboarding-page";
import AnotherOnboardingPage from "./onborading-pages/another-onboarding-page";
import { useOnboardingContext } from "./onboarding-context";
import OnboardingProgress from "./onboarding-progress";
export default function OnboardingContainer() {

	const context = useOnboardingContext();

	return (
		<div className="e-onboarding-container__content">
			<OnboardingProgress />
			{ context.currentPage }
			<button className="e-onboarding-container__content-next-button" onClick={() => context.next()}>Next</button>
		</div>
	)
}
