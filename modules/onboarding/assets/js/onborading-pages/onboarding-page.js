import React, { useEffect } from 'react';
export default function OnboardingPage({title, description, children}) {
	return (
		<div className="e-onboarding-page">
			<div className="e-onboarding-page__content">
				<div>
					<h1>{title}</h1>
					<p>{description}</p>
					{children}
				</div>
			</div>
			<div className="e-onboarding-page__image">

			</div>
		</div>
	)
}
