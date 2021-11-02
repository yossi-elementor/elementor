import React, { useEffect, useState } from 'react';
import HelloOnboardingPage from "./onborading-pages/hello-onboarding-page";
import AnotherOnboardingPage from "./onborading-pages/another-onboarding-page";
export default function OnboardingContainer() {

	const [currentPage, setCurrentPage] = useState(0)

	useEffect(() => {

	}, [currentPage])

	const flow = [
		<HelloOnboardingPage />,
		<AnotherOnboardingPage />
	];

	return (
		<div className="e-onboarding-container__content">
			<div className="e-onboarding-container__progress-bar">

			</div>
			{ flow[1] }
		</div>
	)
}
