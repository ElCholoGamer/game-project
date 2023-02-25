<script lang="ts">
	import classNames from 'classnames';

	export let value = '';
	let className = '';

	export { className as class };
</script>

<input
	{...$$props}
	bind:value
	type="text"
	class={classNames(
		className,
		'text-2xl rounded-lg py-1 px-4 outline-none focus:placeholder:text-transparent'
	)}
/>
