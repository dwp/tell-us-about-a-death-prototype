const relationshipSetup = () => {
	const relationship = document.getElementById('relationship');

	// Adjective form of marital status, Probably need to account for typos, different variations
	const maritalStatuses = ['married', 'single', 'divorced', 'widowed', 'civilpartnership'];
	// Same as above, although this is the noun form
	// again, take into account different variations of these words, do we leave it up to the agent to translate?
	const relationshipStatuses = ['wife', 'husband', 'civilpartner', 'exwife', 'exhusband', 'separated'];
	const allStatuses = [...maritalStatuses, ...relationshipStatuses]

	/*
	 * Returns the relationship status
	 * @param {string} val - The value of the relationship input
	 * @returns {string} relationship status of the deceased
	 */
	const getRelationship = (val) => {
		const relationship = val.toLowerCase().replace(/-|\s/g, '');
		// Check this to prevent a pointless status match
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
	const matchStatus = (val) => {
		switch(val) {
			case 'wife':
			case 'husband':
			case 'married':
				return 'married';

			case 'civilpartner':
			case 'civilpartnered':
			case 'civilpartnership':
				return 'civil parternship';

			case 'exwife':
			case 'exhusband':
			case 'divorced':
				return 'divorced';

			case 'separated':
				return 'separated';

			case 'single':
				return 'single';

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

const callerSetup = () => {
	// Second version of this
	const separateCallerFormEl = document.getElementById('caller-form');
	const callerDetailsEl = document.getElementById('caller-no');

	let isCallerSurvivingSpouse = true; // ...Need a better way to do this, dont want to swap types but we need a false, and dont want to negate the var
	let isCallerExecutor = true;

	const toggleViews = el => {
		const shouldCaptureCallersDetails = () => {
			return !isCallerExecutor && !isCallerSurvivingSpouse;
		};

		// This will hide the parent element if needed, and also hide any children elements
		const hideRedundantFields = el => {
			// Else should be fine, because if parent is hidden then subsequent children can't be hidden
			if (el.classList.contains('js-hide-field')) {
				el.classList.add('js-hidden');
			} else {
				const hiddenEls = [...el.querySelectorAll('.js-hide-field')];
				hiddenEls.forEach(hiddenEl => {
					hiddenEl.classList.add('js-hidden');
				});
			}
		};

		const checkEnteredValues = (input) => {
			const type = input.dataset.type;
			const isCallerSpousePostcodeEl = document.getElementById('spouse-yes-postcode');
			const isCallerExecutorPostcodeEl = document.getElementById('executor-yes-postcode');
			const isSpouseOptions = document.getElementById('spouse-yes-panel'); // rename these
			const isExecutorOptions = document.getElementById('executor-yes-panel');

			if (type === 'spouse') {
				if (isCallerExecutorPostcodeEl.value) { // There is a postcode in the input, dont show the others
					hideRedundantFields(isSpouseOptions);
				}
			} else {
				if (isCallerSpousePostcodeEl.value) { // There is a postcode in the input, dont show the others
					hideRedundantFields(isExecutorOptions);
				}
			}
		};

		// The reason this is logic heavy is because im supporting two variations, an inline Q and an additional Q
		// Im going to remove the inline Q cos there's too much logic behind that idea
		el.addEventListener('change', e => {
			const state = (e.target.value.toLowerCase() === 'yes');
			if (e.target.dataset.type === 'spouse') {
				isCallerSurvivingSpouse = state;
			} else {
				isCallerExecutor = state;
			}
			if (shouldCaptureCallersDetails()) {
				if (separateCallerFormEl) {
					separateCallerFormEl.classList.remove('js-hidden');
				} else if (callerDetailsEl) {
					callerDetailsEl.classList.remove('js-hidden-temp');
				}
			} else if (callerDetailsEl) {
				callerDetailsEl.classList.add('js-hidden-temp');
			} else if (separateCallerFormEl) {
				separateCallerFormEl.classList.add('js-hidden');
				checkEnteredValues(e.target);
			} else {
				checkEnteredValues(e.target);
			}
		});
	}

	[...document.querySelectorAll('[name="radio-contact-group-1"]')].forEach(el => toggleViews(el));
	[...document.querySelectorAll('[name="radio-contact-group-2"]')].forEach(el => toggleViews(el));
}

relationshipSetup();
callerSetup();