import React from 'react';
import { useOnboardingContext } from "./onboarding-context";
import OnboardingProgress from "./onboarding-progress";
export default function OnboardingContainer() {

	const context = useOnboardingContext();

	return (
		<div className="e-onboarding-container__content">
			<OnboardingProgress />
			{ context.currentPage }
			<div className="e-onboarding-container__footer">
				<button className="next-button" onClick={() => context.next()}>Next</button>

			</div>
		</div>
	)
}
