import React, { useEffect, useContext, useState, createContext } from 'react';
import HelloOnboardingPage from "./onborading-pages/hello-onboarding-page";
import AnotherOnboardingPage from "./onborading-pages/another-onboarding-page";

const OnboardingContext = createContext();

export function useOnboardingContext() {
	return useContext( OnboardingContext )
}

export function OnboardingContextProvider( { children } ) {
	const flow = [
		{ component: <HelloOnboardingPage/>, stepCount: 3 },
		{ component: <AnotherOnboardingPage/>, stepCount: 2 },
	];

	const [ currentPageIndex, setCurrentPageIndex ] = useState( 0 )
	const [ currentPage, setCurrentPage ] = useState( flow[ 0 ].component )
	const [ currenStepIndex, setCurrentStepIndex ] = useState( 0 )
	const [ currentPageStepsCount, setCurrentPageStepsCount ] = useState( 0 )

	useEffect( () => {
		setCurrentPage( flow[ currentPageIndex ].component );
	}, [ currentPageIndex ] );

	const next = () => {
		const newStep = currenStepIndex + 1;
		if (newStep > flow[ currentPageIndex ].stepCount - 1 && currentPageIndex + 1 < flow.length) {
			setCurrentPageIndex( currentPageIndex + 1 );
			setCurrentStepIndex( 0 );
		} else {
			setCurrentStepIndex(newStep);
		}
	}

	const previous = () => {
		setCurrentPageIndex( currentPageIndex - 1 );
	}

	const value = { flow, currentPage, currentPageIndex, currenStepIndex, currentPageStepsCount, next, previous };

	return <OnboardingContext.Provider value={ value }>{ children }</OnboardingContext.Provider>
}

