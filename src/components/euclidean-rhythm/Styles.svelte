<style lang="postcss">
	:global(.realist-inset-box) {
		box-shadow:
			inset 0px -1px 2px rgba(255, 255, 255, 0.05),
			inset 1px -2px 2px rgba(255, 255, 255, 0.4737),
			inset 2px -3px 2px rgba(255, 255, 255, 0.75),
			inset 0px 1px 2px rgba(255, 255, 255, 0.05),
			inset -1px 2px 2px rgba(0, 0, 0, 0.04737),
			inset -2px 3px 2px rgba(0, 0, 0, 0.04474),
			inset -3px 4px 2px rgba(0, 0, 0, 0.04211),
			inset -4px 5px 2px rgba(0, 0, 0, 0.03947),
			inset -5px 6px 2px rgba(0, 0, 0, 0.03684),
			inset -6px 7px 2px rgba(0, 0, 0, 0.03421),
			inset -7px 8px 2px rgba(0, 0, 0, 0.03158),
			inset -8px 9px 2px rgba(0, 0, 0, 0.02895),
			inset -19px 20px 2px transparent;
		@apply border border-neutral-100 bg-neutral-100;
	}
	:global(.realist-btn.sm) {
		box-shadow:
			inset -2px 0 1px 1px rgba(255, 255, 255, 0.7),
			inset 0 0 8px 8px rgba(128, 128, 128, 0.1),
			inset -10px 4px 10px 2px rgba(0, 0, 0, 0.05),
			0px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px rgba(0, 0, 0, 0.05),
			-1px 2px 2px rgba(0, 0, 0, 0.04737),
			-2px 3px 2px rgba(0, 0, 0, 0.04474),
			-3px 4px 2px rgba(0, 0, 0, 0.04211),
			-4px 5px 2px rgba(0, 0, 0, 0.03947),
			-5px 6px 2px rgba(0, 0, 0, 0.03684),
			-6px 7px 2px rgba(0, 0, 0, 0.03421),
			-7px 8px 2px rgba(0, 0, 0, 0.03158),
			-8px 9px 2px rgba(0, 0, 0, 0.02895),
			-9px 10px 2px rgba(0, 0, 0, 0.02632),
			-19px 20px 2px transparent;
		@apply border-b-2 border-neutral-400 -top-0.5 duration-100;
	}
	:global(.realist-btn.sm.pressed),
	:global(.realist-btn.sm:active) {
		box-shadow:
			inset -2px 0 1px 1px rgba(255, 255, 255, 0.7),
			inset 0 0 8px 8px rgba(128, 128, 128, 0.1),
			inset -10px 4px 10px 2px rgba(0, 0, 0, 0.05),
			0px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px rgba(0, 0, 0, 0.05),
			-0px 1px 1px rgba(0, 0, 0, 0.04737),
			-1px 1px 1px rgba(0, 0, 0, 0.04474),
			-2px 2px 1px rgba(0, 0, 0, 0.04211),
			-3px 3px 1px rgba(0, 0, 0, 0.03947),
			-3px 3px 1px rgba(0, 0, 0, 0.03684),
			-4px 4px 1px rgba(0, 0, 0, 0.03421),
			-4px 4px 1px rgba(0, 0, 0, 0.03158),
			-5px 5px 1px rgba(0, 0, 0, 0.02895),
			-5px 5px 1px rgba(0, 0, 0, 0.02632),
			-19px 20px 1px transparent;
		@apply border-b border-neutral-500 top-px duration-100;
	}
	:global(.realist-btn) {
		box-shadow:
			inset -2px 0 1px 1px rgba(255, 255, 255, 0.7),
			inset 0 0 8px 8px rgba(128, 128, 128, 0.1),
			inset -10px 4px 10px 2px rgba(0, 0, 0, 0.05),
			0px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px rgba(0, 0, 0, 0.05),
			-1px 2px 2px rgba(0, 0, 0, 0.04737),
			-2px 3px 2px rgba(0, 0, 0, 0.04474),
			-3px 4px 2px rgba(0, 0, 0, 0.04211),
			-4px 5px 2px rgba(0, 0, 0, 0.03947),
			-5px 6px 2px rgba(0, 0, 0, 0.03684),
			-6px 7px 2px rgba(0, 0, 0, 0.03421),
			-7px 8px 2px rgba(0, 0, 0, 0.03158),
			-8px 9px 2px rgba(0, 0, 0, 0.02895),
			-9px 10px 2px rgba(0, 0, 0, 0.02632),
			-10px 11px 2px rgba(0, 0, 0, 0.02368),
			-11px 12px 2px rgba(0, 0, 0, 0.02105),
			-12px 13px 2px rgba(0, 0, 0, 0.01842),
			-13px 14px 2px rgba(0, 0, 0, 0.01579),
			-14px 15px 2px rgba(0, 0, 0, 0.01316),
			-15px 16px 2px rgba(0, 0, 0, 0.01053),
			-16px 17px 2px rgba(0, 0, 0, 0.00789),
			-17px 18px 2px rgba(0, 0, 0, 0.00526),
			-18px 19px 2px rgba(0, 0, 0, 0.00263),
			-19px 20px 2px transparent;
		/* border-bottom: 10px solid rgb(170, 170, 170); */
		@apply border-b-8 border-neutral-400 bg-gradient-to-r from-neutral-100 to-neutral-300 transition-all duration-200 mx-px -top-1 relative flex items-center justify-center ease-out;
	}
	:global(.realist-btn.error) {
		box-shadow:
			inset -2px 0 1px 1px rgba(255, 155, 155, 0.7),
			inset 0 0 8px 8px rgba(128, 28, 28, 0.1),
			inset -10px 4px 10px 2px rgba(0, 0, 0, 0.05),
			0px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px rgba(0, 0, 0, 0.05),
			-1px 2px 2px rgba(0, 0, 0, 0.04737),
			-2px 3px 2px rgba(0, 0, 0, 0.04474),
			-3px 4px 2px rgba(0, 0, 0, 0.04211),
			-4px 5px 2px rgba(0, 0, 0, 0.03947),
			-5px 6px 2px rgba(0, 0, 0, 0.03684),
			-6px 7px 2px rgba(0, 0, 0, 0.03421),
			-7px 8px 2px rgba(0, 0, 0, 0.03158),
			-8px 9px 2px rgba(0, 0, 0, 0.02895),
			-9px 10px 2px rgba(0, 0, 0, 0.02632),
			-10px 11px 2px rgba(0, 0, 0, 0.02368),
			-11px 12px 2px rgba(0, 0, 0, 0.02105),
			-12px 13px 2px rgba(0, 0, 0, 0.01842),
			-13px 14px 2px rgba(0, 0, 0, 0.01579),
			-14px 15px 2px rgba(0, 0, 0, 0.01316),
			-15px 16px 2px rgba(0, 0, 0, 0.01053),
			-16px 17px 2px rgba(0, 0, 0, 0.00789),
			-17px 18px 2px rgba(0, 0, 0, 0.00526),
			-18px 19px 2px rgba(0, 0, 0, 0.00263),
			-19px 20px 2px transparent;
		@apply border-b-8 border-red-600 bg-gradient-to-r from-red-400 to-red-500;
	}
	:global(.realist-btn.error svg) {
		@apply stroke-red-200;
	}
	:global(.realist-btn.error.pressed),
	:global(.realist-btn.error:active) {
		@apply border-red-700 bg-gradient-to-r from-red-500 to-red-600;
	}
	:global(.realist-btn svg) {
		width: 20px;
		height: 20px;
		stroke: #999999;
	}
	:global(.realist-btn.pressed),
	:global(.realist-btn:active) {
		box-shadow:
			inset -1px 0 1px 1px rgba(255, 255, 255, 0.4),
			inset 0 0 8px 8px rgba(128, 128, 128, 0.1),
			inset -10px 4px 10px 2px rgba(128, 128, 128, 0.05),
			inset -10px 4px 10px 2px rgba(128, 128, 128, 0.05),
			0px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px rgba(0, 0, 0, 0.05),
			-1px 2px 2px rgba(0, 0, 0, 0.04643),
			-2px 3px 2px rgba(0, 0, 0, 0.04286),
			-3px 4px 2px rgba(0, 0, 0, 0.03929),
			-4px 5px 2px rgba(0, 0, 0, 0.03571),
			-5px 6px 2px rgba(0, 0, 0, 0.03214),
			-6px 7px 2px rgba(0, 0, 0, 0.02857),
			-7px 8px 2px rgba(0, 0, 0, 0.025),
			-8px 9px 2px rgba(0, 0, 0, 0.02143),
			-9px 10px 2px rgba(0, 0, 0, 0.01786),
			-10px 11px 2px rgba(0, 0, 0, 0.01429),
			-11px 12px 2px rgba(0, 0, 0, 0.01071),
			-12px 13px 2px rgba(0, 0, 0, 0.00714),
			-13px 14px 2px rgba(0, 0, 0, 0.00357),
			-14px 15px 2px transparent;
		/* border-bottom: 4px solid rgb(153, 153, 153); */
		@apply border-b-4 border-neutral-500 top-px z-0 bg-gradient-to-r from-neutral-200 to-neutral-300;
	}
</style>
