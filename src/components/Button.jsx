export default function Button({ children, className, variant, ...props }) {
	const variants = {
		green:
			"btn-primary text-neutral-10 hover:bg-primary-hover active:bg-primary-pressed disabled:bg-neutral-20 disabled:text-neutral-40 disabled:hover:bg-neutral-20 disabled:hover:text-neutral-40",
		"outline-green":
			"border border-primary text-primary hover:bg-primary-border focus:bg-primary-surface disabled:text-neutral-40 disabled:border-neutral-20 disabled:hover:border-neutral-20 disabled:hover:text-neutral-40",
		gray: "bg-neutral-20 hover:bg-neutral-30 text-neutral-40 border-none",
		lightgreen:
			"bg-primary-border text-primary hover:bg-primary hover:text-neutral-10 focus:bg-primary-surface isabled:bg-neutral-20 disabled:text-neutral-40 disabled:hover:bg-neutral-20 disabled:hover:text-neutral-40",
	};

	return (
		<button
			className={`btn normal-case ${className} ${variants[variant]}`}
			{...props}
		>
			{children}
		</button>
	);
}
