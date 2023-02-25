<script lang="ts">
	import classNames from 'classnames';

	let className = '';

	export { className as class };
</script>

<span
	{...$$props}
	class={classNames(
		className,
		'animate-spin inline-block w-8 h-8 rounded-full border-4 border-white border-l-transparent'
	)}
/>
