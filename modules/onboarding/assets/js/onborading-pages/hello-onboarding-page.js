import React, { useState, useEffect } from 'react';
import OnboardingPage from "./onboarding-page";
import { useOnboardingContext } from "../onboarding-context";
import Checkbox from "../../../../../core/app/assets/js/ui/atoms/checkbox";
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
		<OnboardingPage
			title={__( 'We always start with Hello.', 'elementor' )}
			description={__( 'Every WordPress site needs a theme, and Elementor’s Hello theme is a flexible blank canvas where you can build your website exactly the way you want. (Plus, it loads quickly and is great for SEO.)', 'elementor' )}>
			<div>
				<><Checkbox /><span>Continue with Hello theme</span></>
				<><Checkbox /><span>Improve Elementor by sending my anonymous usage data.</span></>
			</div>
		</OnboardingPage>
	)
}
