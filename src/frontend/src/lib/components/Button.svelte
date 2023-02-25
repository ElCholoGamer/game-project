<script lang="ts">
	import classNames from 'classnames';

	const classes = {
		green: 'bg-green-500 disabled:bg-green-600 before:bg-green-400',
		blue: 'bg-blue-500 disabled:bg-blue-600 before:bg-blue-400',
		red: 'bg-red-500 disabled:bg-red-600 before:bg-red-400',
	};

	export let href: string | undefined = undefined;
	export let color: keyof typeof classes = 'blue';
	let className = '';
	export { className as class };

	$: fullClass = classNames(
		'rounded-md px-8 py-2 text-white font-semibold enabled:cursor-pointer transition-all inline-flex flex-col justify-center relative before:absolute before:w-full before:h-full before:top-0 before:-left-full before:transition-all overflow-hidden z-0 before:-z-10',
		classes[color],
		className
	);
</script>

{#if !href}
	<button
		on:click
		{...$$props}
		class={classNames(fullClass, 'enabled:hover:before:left-0 enabled:active:scale-110')}
	>
		<slot />
	</button>
{:else}
	<a {href} {...$$props} class={classNames(fullClass, 'hover:before:left-0 active:scale-110')}>
		<slot />
	</a>
{/if}
