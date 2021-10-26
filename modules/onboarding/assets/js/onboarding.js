import OnboardingContainer from "./OnbroardingContainer";

const AppWrapper = elementorCommon.config.isDebug ? React.StrictMode : React.Fragment;
const onBoardingElement = document.getElementById( 'e-onboarding-root' );

console.log('asdasdasd')

ReactDOM.render(
	<AppWrapper>
		<div>
			<OnboardingContainer />
		</div>
	</AppWrapper>,
	onBoardingElement
);
