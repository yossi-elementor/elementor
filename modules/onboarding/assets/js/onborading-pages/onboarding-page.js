import React, { useEffect } from 'react';
import { Heading } from 'e-components';
import { StyledOnboardingPage, StyledOnboardingPageContent, StyledOnboardingPageImage } from "./styles";

export default function OnboardingPage({title, description, children}) {
	return (
		<StyledOnboardingPage>

			<StyledOnboardingPageContent>
				<div>
					<Heading variant="h1">{title}</Heading>
					<p>{description}</p>
					{children}
				</div>
			</StyledOnboardingPageContent>

			<StyledOnboardingPageImage>

			</StyledOnboardingPageImage>

		</StyledOnboardingPage>
	)
}
