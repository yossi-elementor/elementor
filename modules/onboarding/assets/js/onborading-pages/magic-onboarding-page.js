import React, { useState, useEffect } from 'react';
import OnboardingPage from "./onboarding-page";
import { useOnboardingContext } from "../onboarding-context";
export default function MagicOnboardingPage() {

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
			title={__( 'Now let’s make some magic.', 'elementor' )}
			description={__( 'Start creating your site by giving it a name.\n' +
				'(If you have a domain, you’ll be able to connect it later.)', 'elementor' )}>
			{  renderStep() }
		</OnboardingPage>
	)
}
