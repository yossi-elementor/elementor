import React from 'react';
import OnboardingContainer from "./onboarding-container";
import { OnboardingContextProvider } from "./onboarding-context";

const AppWrapper = elementorCommon.config.isDebug ? React.StrictMode : React.Fragment;
const onBoardingElement = document.getElementById( 'e-onboarding-root' );

ReactDOM.render(
	<AppWrapper>
		<OnboardingContextProvider>

				<OnboardingContainer />

		</OnboardingContextProvider>
	</AppWrapper>,
	onBoardingElement
);
