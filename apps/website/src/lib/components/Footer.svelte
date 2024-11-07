<footer>
	<nav>
		<menu>
			<li>
				<a href="/terms-of-use"> Terms of Use </a>
			</li>

			<li>
				<a href="/privacy-policy"> Privacy Policy </a>
			</li>
		</menu>
	</nav>

	<span class="signature"
		>Made with ❤️ by <a href="https://bento.me/allozaur" target="_blank">@allozaur</a></span
	>

	<span class="copyright">© {new Date().getFullYear()} GrygierCo s. c.</span>
</footer>

<style>
	footer {
		display: grid;
		place-items: center;
		padding: 4rem 2rem;
		gap: 4rem;
	}

	menu {
		display: flex;
		gap: 3rem;
		margin: auto;
		padding: 0;

		li {
			list-style: none;

			a {
				font:
					500 1.125rem/1.5 'SF UI Display',
					sans-serif;
				text-decoration: none;
				color: var(--c-text);
			}
		}
	}

	.signature {
		font-size: 1.125rem;
		color: var(--c-text-light);

		a {
			font-weight: 500;
			text-decoration: none;
			color: var(--c-accent);
		}
	}

	.copyright {
		font-size: 0.75rem;
		color: var(--c-text-light);
	}
</style>
