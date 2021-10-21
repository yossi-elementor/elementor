/**
 * @typedef HashCommand
 * @property {string} method,
 * @property {string} command
 */

export default class HashCommands {
	/**
	 * Cannot be static since it uses callback(s) that are available only after '$e' is initialized.
	 */
	dispatchersList = {
		'e:run': {
			runner: $e.run,
			isSafe: ( command ) => $e.commands.getCommandClass( command )?.getInfo().isSafe,
		},

		'e:route': {
			runner: $e.route,
			isSafe: () => true,
		},
	};

	/**
	 * List of current loaded hash commands.
	 *
	 * @type {Array.<HashCommand>}
	 */
	commands = [];

	constructor() {
		this.commands = this.get();
	}

	/**
	 * Function get().
	 *
	 * Get API requests that comes from hash ( eg #e:run ).
	 *
	 * @param {string} hash
	 *
	 * @returns {Array.<HashCommand>}
	 */
	get( hash = location.hash ) {
		const result = [];

		if ( hash ) {
			// Remove first '#' and split each '&'.
			const hashList = hash.substr( 1 ).split( '&' );

			hashList.forEach( ( hashItem ) => {
				const hashParts = hashItem.split( ':' );

				if ( 3 !== hashParts.length ) {
					return;
				}

				const method = hashParts[ 0 ] + ':' + hashParts[ 1 ],
					dispatcher = this.dispatchersList[ method ];

				if ( dispatcher ) {
					const command = hashParts[ 2 ];

					result.push( {
						method,
						command,
					} );
				}
			} );
		}

		return result;
	}

	/**
	 * Function run().
	 *
	 * Run API requests that comes from hash ( eg #e:run ).
	 *
	 * @param {Array.<HashCommand>} [commands=this.commands]
	 */
	async run( commands = this.commands ) {
		// To allow validate the run first.
		for ( const hashCommand of commands ) {
			const dispatcher = this.dispatchersList[ hashCommand.method ];

			if ( ! dispatcher ) {
				return Promise.reject( new Error( `No dispatcher found for the command: \`${ hashCommand.command }\`.` ) );
			}

			if ( ! dispatcher.isSafe( hashCommand.command ) ) {
				return Promise.reject( new Error( `Attempting to run unsafe or non exist command: \`${ hashCommand.command }\`.` ) );
			}
		}

		// This logic will run the promises by sequence (will wait for dispatcher to finish, before run again).
		for ( const hashCommand of commands ) {
			await this.dispatchersList[ hashCommand.method ].runner( hashCommand.command );
		}
	}

	/**
	 * Function runOnce().
	 *
	 * Do same as `run` but clear `this.commands` before leaving.
	 */
	runOnce() {
		this.run( this.commands ).then( () => {
			this.commands = [];
		} );
	}
}
