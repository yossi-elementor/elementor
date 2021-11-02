import React from 'react';
import OnboardingContainer from "./onboarding-container";

const AppWrapper = elementorCommon.config.isDebug ? React.StrictMode : React.Fragment;
const onBoardingElement = document.getElementById( 'e-onboarding-root' );

ReactDOM.render(
	<AppWrapper>
		<div className="e-onboarding-container">
			<OnboardingContainer />
		</div>
	</AppWrapper>,
	onBoardingElement
);
