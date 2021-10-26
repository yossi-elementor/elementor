import router from '@elementor/router';
import Hello from "./Hello";

export default class Onboarding {

	constructor() {
		this.routes = [
			{
				path: '/onboarding/*',
				component: Hello,
			}
		];

		this.routes.forEach( route => router.addRoute( route ) );
	}
}
