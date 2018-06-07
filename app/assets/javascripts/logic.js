const relationshipSetup = () => {
	const relationship = document.getElementById('relationship');

	// Adjective form of marital status, Probably need to account for typos, different variations
	const maritalStatuses = ['married', 'single', 'divorced', 'widowed', 'civilpartnered', 'civilpartnership'];
	// Same as above, although this is the noun form
	const relationshipStatuses = ['wife', 'husband', 'civilpartner', 'exwife', 'exhusband', 'separated']; // again, take into account different variations of these words, do we leave it up to the agent to translate?
	// Collates the above two lists into one for an easy search but I think this may not be necessary
	const allStatuses = [...maritalStatuses, ...relationshipStatuses]

	/*
	 * Returns the relationship status
	 * @param {string} val - The value of the relationship input
	 * @returns {string} relationship status of the deceased
	 */
	const getRelationship = (val) => {
		const relationship = val.toLowerCase().replace(/-|\s/g, '');
		// probably don't need this as the default of match returns an empty string anyway
		const hasStatus = allStatuses.includes(relationship);

		if (hasStatus) {
			return matchStatus(relationship);
		}
		return '';
	}

	/*
	 * Returns the relationship status
	 * @param {string} val - The value of the relationship input
	 * @returns {string} relationship status of the deceased
	 * multiple cases are being shit...
	 */
	const matchStatus = (val) => { // tidy up cases
		switch(val) {
			case 'wife':
				return 'married';
			case 'husband':
				return 'married';

			case 'civilpartner':
				return 'civil parternship';
			case 'civilpartnered':
				return 'civil parternship';
			case 'civilpartnership':
				return 'civil parternship';

			case 'exwife':
				return 'divorced';
			case 'exhusband':
				return 'divorced';

			case 'separated':
				return 'separated';

			default:
				return ''
		}
	}

	// Check the relationship element is present on the page
	if (relationship) {
		// Add an event listener for the input losing focus
		relationship.addEventListener('blur', e => {
			const { value } = e.target;
			const relationshipValue = getRelationship(value);
			if (relationshipValue) {
				// Either a relationship or marital status has been inputted
				const maritalStatusEl = document.getElementById('marital-status');
				const maritalStatusChoiceEl = document.getElementsByClassName('js-marital-status-choice')[0];
				// Check the maritalStatus element exists on the page
				if (maritalStatusEl) {
					// Set the value to be the correct state and then show the el on the next page
					// conform to HTML standards, i.e ID names
					maritalStatusEl.value = relationshipValue;
					maritalStatusEl.parentElement.classList.remove('js-hidden'); // this should use the official gov one

					if (maritalStatusChoiceEl) {
						maritalStatusChoiceEl.classList.add('js-hidden');
					}
				}
			}
		});
	}
}

relationshipSetup();