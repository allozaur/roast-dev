export default `
File: apps/website/src/app.d.ts
  
  		interface PageState {
  			activeOffer?: OfferData;
  			chatHistoryDialogIsOpen?: boolean;
+ 			contactCreditAgentOptInDialogIsOpen?: boolean;
  			exploreViewMode?: 'list' | 'map' | 'cards';
  			offerGalleryDialogIsOpen?: boolean;
  			searchFiltersDialogIsOpen?: boolean;
  


---


File: apps/website/src/lib/components/MortgageCalculator.svelte
  
+ <script>
+ 	import { replaceState } from '$app/navigation';
+ 	import { Button, Disclaimer, Icon, NumberInput, RangeInput } from '@resider/design-system';
+ 	import { page } from '$app/stores';
+ 	import NaStartQualificationForm from './NaStartQualificationForm.svelte';
+ 	import { formatCurrency } from '@resider/utils';
+ 
+ 	/** @type {number} */
+ 	export let area;
+ 
+ 	/** @type {boolean} */
+ 	export let customerOwnershipIsValid = false;
+ 
+ 	/** @type {number} */
+ 	export let downPaymentPercent = 20;
+ 
+ 	/** @type {number} */
+ 	export let loanTerm = 30;
+ 
+ 	/** @type {number} */
+ 	export let interestRate = 7;
+ 
+ 	/** @type {number} */
+ 	export let regularMonthlyPayment = 0;
+ 
+ 	/** @type {number} */
+ 	export let price;
+ 
+ 	/** @type {number} */
+ 	export let naStartMonthlyPayment = 0;
+ 
+ 	/** @type {number} */
+ 	export let subsidyAmount = 480000;
+ 
+ 	/** @type {any} */
+ 	export let userCreditProfile = undefined;
+ 
+ 	/** @type {number} */
+ 	let remainingLoanAmount;
+ 
+ 	/** @type {number} */
+ 	let remainingInterest;
+ 
+ 	/** @type {number} */
+ 	let remainingMonthlyPayment;
+ 
+ 	/** @type {number} */
+ 	let subsidyYears = 10;
+ 
+ 	/** @type {number} */
+ 	let subsidyMonthlyPayment;
+ 
+ 	$: downPayment = Math.ceil((price * downPaymentPercent) / 100);
+ 
+ 	$: loanAmount = price - downPayment;
+ 
+ 	$: monthlyPayment = 0;
+ 
+ 	$: monthlyInterestRate = interestRate / 1200;
+ 
+ 	$: numberOfPayments = loanTerm * 12;
+ 
+ 	$: totalInterest = monthlyPayment * numberOfPayments - loanAmount;
+ 
+ 	$: subsidyInterestRate = 1.5;
+ 
+ 	$: subsidyInterest = subsidyAmount * (subsidyInterestRate / 100) * subsidyYears;
+ 
+ 	$: regularMonthlyPayment =
+ 		interestRate === 0
+ 			? loanAmount / numberOfPayments
+ 			: loanAmount *
+ 				(monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)));
+ 
+ 	$: {
+ 		if (subsidyAmount > 0 && customerOwnershipIsValid) {
+ 			const subsidyMonthlyInterestRate = subsidyInterestRate / 1200;
+ 
+ 			subsidyMonthlyPayment =
+ 				subsidyInterestRate === 0
+ 					? subsidyAmount / numberOfPayments
+ 					: subsidyAmount *
+ 						(subsidyMonthlyInterestRate /
+ 							(1 - Math.pow(1 + subsidyMonthlyInterestRate, -numberOfPayments)));
+ 
+ 			remainingLoanAmount = loanAmount - subsidyAmount;
+ 
+ 			const remainingMonthlyInterestRate = interestRate / 1200;
+ 			const remainingNumberOfPayments = loanTerm * 12;
+ 			remainingMonthlyPayment =
+ 				interestRate === 0
+ 					? remainingLoanAmount / remainingNumberOfPayments
+ 					: remainingLoanAmount *
+ 						(remainingMonthlyInterestRate /
+ 							(1 - Math.pow(1 + remainingMonthlyInterestRate, -remainingNumberOfPayments)));
+ 
+ 			remainingInterest = remainingMonthlyPayment * remainingNumberOfPayments - remainingLoanAmount;
+ 
+ 			naStartMonthlyPayment = subsidyMonthlyPayment + remainingMonthlyPayment;
+ 
+ 			monthlyPayment = naStartMonthlyPayment;
+ 		} else {
+ 			monthlyPayment = regularMonthlyPayment;
+ 		}
+ 	}
+ 
+ 	function updateDownPaymentPercent() {
+ 		downPaymentPercent = Math.ceil((downPayment / price) * 100);
+ 	}
+ </script>
+ 
+ <div class="mortgage-calculator">
+ 	<h2>Kalkulator kredytu hipotecznego</h2>
+ 
+ 	<fieldset>
+ 		<legend> Cena nieruchomości </legend>
+ 
+ 		<div class="setting">
+ 			<RangeInput min={100000} max={5000000} bind:value={price} />
+ 
+ 			<NumberInput bind:value={price} separateThousands unit="zł" />
+ 		</div>
+ 	</fieldset>
+ 
+ 	<fieldset>
+ 		<legend>Wkład własny</legend>
+ 
+ 		<div class="setting">
+ 			<RangeInput min={10} max={90} bind:value={downPaymentPercent} />
+ 
+ 			<div class="values">
+ 				<NumberInput bind:value={downPaymentPercent} unit="%" separateThousands />
+ 
+ 				<NumberInput
+ 					unit="zł"
+ 					bind:value={downPayment}
+ 					on:input={updateDownPaymentPercent}
+ 					separateThousands
+ 				/>
+ 			</div>
+ 		</div>
+ 	</fieldset>
+ 
+ 	<fieldset>
+ 		<legend>Okres kredytowania</legend>
+ 
+ 		<div class="setting">
+ 			<RangeInput min={5} max={35} step={5} unit="&nbsp;" bind:value={loanTerm} />
+ 
+ 			<NumberInput unit="lat" bind:value={loanTerm} />
+ 		</div>
+ 
+ 		<caption>
+ 			<Disclaimer text="Większość Polaków bierze kredyt na 25 lat" />
+ 		</caption>
+ 	</fieldset>
+ 
+ 	<fieldset>
+ 		<legend> Oprocentowanie kredytu </legend>
+ 
+ 		<div class="setting">
+ 			<RangeInput
+ 				max={9}
+ 				min={4}
+ 				name="interest_rate"
+ 				step={0.5}
+ 				unit="%"
+ 				bind:value={interestRate}
+ 			/>
+ 
+ 			<NumberInput bind:value={interestRate} unit="%" separateThousands />
+ 		</div>
+ 	</fieldset>
+ 
+ 	<NaStartQualificationForm
+ 		{area}
+ 		hideResults
+ 		{userCreditProfile}
+ 		bind:customerOwnershipIsValid
+ 		bind:subsidyAmount
+ 		bind:subsidyInterestRate
+ 	>
+ 		<svelte:fragment slot="marketing-content">
+ 			<h3>
+ 				Sprawdź czy możesz wziąć kredyt w ramach programu Mieszkanie <strong>#naStart</strong>
+ 			</h3>
+ 		</svelte:fragment>
+ 	</NaStartQualificationForm>
+ 
+ 	<div class="results">
+ 		<table>
+ 			<tr>
+ 				<th scope="col">Wkład własny</th>
+ 				<td class="value">{formatCurrency(downPayment)}</td>
+ 			</tr>
+ 
+ 			{#if customerOwnershipIsValid}
+ 				<tr>
+ 					<th scope="col">Kwota kredytu <Icon name="question-mark" --size="1rem" /></th>
+ 					<td class="value">
+ 						{#if loanAmount - subsidyAmount <= 0}
+ 							<strong>{formatCurrency(loanAmount)}</strong>
+ 						{:else}
+ 							<strong>{formatCurrency(subsidyAmount)}</strong> + {formatCurrency(
+ 								loanAmount - subsidyAmount
+ 							)}
+ 						{/if}
+ 					</td>
+ 				</tr>
+ 
+ 				<tr>
+ 					<th scope="col">Oprocentowanie <Icon name="question-mark" --size="1rem" /></th>
+ 					<td class="value">
+ 						{#if loanAmount <= subsidyAmount}
+ 							<strong>{subsidyInterestRate}%</strong>
+ 						{:else}
+ 							<strong>{subsidyInterestRate}%</strong> + {interestRate}%
+ 						{/if}
+ 					</td>
+ 				</tr>
+ 
+ 				<tr>
+ 					<th scope="col">Odsetki <Icon name="question-mark" --size="1rem" /></th>
+ 					<td class="value">
+ 						{#if loanAmount - subsidyAmount <= 0}
+ 							<strong>{formatCurrency(subsidyInterest)}</strong>
+ 						{:else}
+ 							<strong>{formatCurrency(subsidyInterest)}</strong> + {formatCurrency(
+ 								remainingInterest
+ 							)}
+ 						{/if}
+ 					</td>
+ 				</tr>
+ 			{:else}
+ 				<tr>
+ 					<th scope="col">Kwota kredytu <Icon name="question-mark" --size="1rem" /></th>
+ 					<td class="value">{formatCurrency(loanAmount)}</td>
+ 				</tr>
+ 
+ 				<tr>
+ 					<th scope="col">Oprocentowanie <Icon name="question-mark" --size="1rem" /></th>
+ 					<td class="value">{interestRate}%</td>
+ 				</tr>
+ 
+ 				<tr>
+ 					<th scope="col">Odsetki <Icon name="question-mark" --size="1rem" /></th>
+ 					<td class="value">{formatCurrency(totalInterest)}</td>
+ 				</tr>
+ 			{/if}
+ 
+ 			<tr>
+ 				<th scope="col">Rata miesięczna</th>
+ 				<td class="value main">
+ 					<strong>{formatCurrency(monthlyPayment)}</strong>
+ 				</td>
+ 			</tr>
+ 
+ 			<caption style="caption-side: bottom;">
+ 				<Disclaimer
+ 					text="Kalkulator wylicza orientacyjną ratę Twojego kredytu. Zamów rozmowę z ekspertem, aby omówić
+ 				szczegóły i poznać oferty banków."
+ 				/>
+ 			</caption>
+ 		</table>
+ 	</div>
+ 
+ 	<Button
+ 		kind="primary"
+ 		size="xl"
+ 		on:click={() => replaceState('', { ...$page.state, contactCreditAgentOptInDialogIsOpen: true })}
+ 	>
+ 		Skorzystaj z pomocy doradcy kredytowego
+ 	</Button>
+ </div>
+ 
+ <style lang="postcss">
+ 	.mortgage-calculator {
+ 		border-radius: 1rem;
+ 		border: 2px solid hsla(var(--hsl-primary));
+ 		background: hsla(var(--hsl-primary), 0.075);
+ 		padding: 1.75rem;
+ 		display: grid;
+ 		gap: 1rem;
+ 	}
+ 
+ 	h2 {
+ 		font: var(--f-heading-lg-bold);
+ 		margin-bottom: 1rem;
+ 	}
+ 
+ 	h3 {
+ 		font: var(--f-heading-md-semibold);
+ 		margin-bottom: 1rem;
+ 
+ 		strong {
+ 			font: var(--f-heading-md-bold);
+ 			color: hsla(var(--hsl-primary));
+ 		}
+ 	}
+ 
+ 	fieldset {
+ 		display: grid;
+ 		gap: 1rem;
+ 
+ 		legend {
+ 			font: var(--f-ui-md-medium);
+ 			margin-bottom: 1rem;
+ 		}
+ 	}
+ 
+ 	.setting {
+ 		gap: 1.125rem !important;
+ 		&,
+ 		.values {
+ 			display: flex;
+ 			gap: 0.75rem;
+ 		}
+ 
+ 		:global(.range-input) {
+ 			width: 100%;
+ 		}
+ 		:global(.number-input) {
+ 			width: 10rem;
+ 		}
+ 	}
+ 
+ 	.results {
+ 		display: grid;
+ 
+ 		table {
+ 			background: transparent;
+ 			border-collapse: separate;
+ 			border-spacing: 0 1rem;
+ 		}
+ 
+ 		td {
+ 			background: transparent;
+ 			font: var(--f-ui-md-medium);
+ 
+ 			strong {
+ 				color: hsla(var(--hsl-primary));
+ 			}
+ 		}
+ 
+ 		.value {
+ 			font: var(--f-ui-md-semibold);
+ 			text-align: right;
+ 
+ 			&.main {
+ 				font: var(--f-heading-lg-bold);
+ 
+ 				strong {
+ 					color: hsla(var(--hsl-primary));
+ 				}
+ 			}
+ 		}
+ 	}
+ 
+ 	.mortgage-calculator :global(.na-start-qualification-form) {
+ 		margin-top: 2rem;
+ 	}
+ 
+ 	.program-conditions {
+ 		margin-bottom: 1rem;
+ 	}
+ </style>


---


File: apps/website/src/lib/components/MortgageWidget.svelte
  
+ <script>
+ 	import { page } from '$app/stores';
+ 	import { Button, Icon, Switcher } from '@resider/design-system';
+ 	import { t } from '@resider/i18n';
+ 	import { formatCurrency } from '@resider/utils';
+ 
+ 	/** @type {boolean} */
+ 	export let customerOwnershipIsValid = false;
+ 
+ 	/** @type {number} */
+ 	export let downPaymentPercent = 20;
+ 
+ 	/** @type {number} */
+ 	export let interestRate = 7;
+ 
+ 	/** @type {number} */
+ 	export let loanTerm = 30;
+ 
+ 	/** @type {HTMLDivElement} */
+ 	export let mortgageCalculatorElement;
+ 
+ 	/** @type {string} */
+ 	export let mortgageType = 'regular_mortgage';
+ 
+ 	/** @type {number} */
+ 	export let price;
+ 
+ 	/** @type {number} */
+ 	export let regularMonthlyPayment = 0;
+ 
+ 	/** @type {number} */
+ 	export let naStartMonthlyPayment = 0;
+ 
+ 	$: downPayment = Math.ceil((price * downPaymentPercent) / 100);
+ 
+ 	$: monthlyPayment = mortgageType === 'na_start' ? naStartMonthlyPayment : regularMonthlyPayment;
+ 
+ 	function handleMortgageTypeSwitch() {
+ 		console.log({ mortgageType });
+ 		if (!customerOwnershipIsValid && !$page?.data.userCreditProfile) {
+ 			if (
+ 				window.confirm(
+ 					$t(
+ 						'global.To be able to see the estimated mortgage rate, please submit qualification form'
+ 					)
+ 				)
+ 			) {
+ 				mortgageCalculatorElement?.scrollIntoView({ behavior: 'smooth' });
+ 			}
+ 
+ 			mortgageType = 'regular_mortgage';
+ 		} else if (!customerOwnershipIsValid) {
+ 			customerOwnershipIsValid = true;
+ 		}
+ 	}
+ </script>
+ 
+ <div class="mortgage-widget">
+ 	<h3 style="display: inline-flex; align-items: center; gap: 0.375rem; justify-content: center;">
+ 		Szacowana rata kredytu <Icon name="info" --size="1rem" --stroke="hsla(var(--hsl-gray-dark))" />
+ 	</h3>
+ 
+ 	<Switcher let:SwitcherOption>
+ 		<SwitcherOption
+ 			name="mortgage_type"
+ 			value="na_start"
+ 			bind:group={mortgageType}
+ 			on:change={handleMortgageTypeSwitch}
+ 		>
+ 			#naStart
+ 		</SwitcherOption>
+ 		<SwitcherOption name="mortgage_type" value="regular_mortgage" bind:group={mortgageType}>
+ 			{$t('global.Regular mortgage')}
+ 		</SwitcherOption>
+ 	</Switcher>
+ 
+ 	{#key monthlyPayment}
+ 		<span class="monthly-rate">
+ 			{formatCurrency(monthlyPayment)}
+ 			<span class="period">{$t('global.monthly')}</span>
+ 		</span>
+ 	{/key}
+ 
+ 	<table>
+ 		<tr>
+ 			<td> {$t('global.Down payment')} ({downPaymentPercent}%)</td>
+ 			<td>
+ 				<strong>{formatCurrency(downPayment)}</strong>
+ 			</td>
+ 		</tr>
+ 		<tr>
+ 			<td> {$t('global.Interest rate')} </td>
+ 			<td>
+ 				<strong>{interestRate}%</strong>
+ 			</td>
+ 		</tr>
+ 		<tr>
+ 			<td> {$t('global.Loan term')} </td>
+ 			<td> <strong>{loanTerm} {$t('global.years')}</strong> </td>
+ 		</tr>
+ 	</table>
+ 
+ 	<div class="actions">
+ 		<Button kind="secondary" href="#mortgage-calculator" replaceState size="lg">
+ 			{$t('global.See simulation')}
+ 		</Button>
+ 	</div>
+ </div>
+ 
+ <style lang="postcss">
+ 	.mortgage-widget {
+ 		padding: 1.25rem;
+ 		border: 2px solid hsla(var(--hsl-primary));
+ 		border-radius: 1rem;
+ 		display: flex;
+ 		flex-direction: column;
+ 		gap: 1.25rem;
+ 		text-align: center;
+ 
+ 		strong {
+ 			font-weight: 700;
+ 		}
+ 	}
+ 
+ 	h3 {
+ 		font: var(--f-heading-xs-semibold);
+ 	}
+ 
+ 	.monthly-rate {
+ 		border-radius: 1rem;
+ 		color: hsla(var(--hsl-primary));
+ 		display: flex;
+ 		flex-direction: column;
+ 		gap: 0.125rem;
+ 		justify-content: center;
+ 		padding: 1.75rem;
+ 		justify-content: center;
+ 		background: hsla(var(--hsl-primary), 0.1);
+ 		font: var(--f-heading-md-extrabold);
+ 		text-align: center;
+ 
+ 		.period {
+ 			color: hsla(var(--hsl-primary), 0.625);
+ 			font: var(--f-ui-sm-semibold);
+ 		}
+ 	}
+ 
+ 	.actions {
+ 		display: grid;
+ 		gap: 0.875rem;
+ 	}
+ 
+ 	tr td {
+ 		font: var(--f-ui-sm-medium);
+ 		padding-block: 0.625rem;
+ 
+ 		&:first-child {
+ 			text-align: left;
+ 		}
+ 
+ 		&:last-child {
+ 			text-align: right;
+ 		}
+ 	}
+ </style>
`