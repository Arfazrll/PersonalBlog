declare module 'aos' {
    interface AosOptions {
        offset?: number;
        delay?: number;
        duration?: number;
        easing?: string;
        once?: boolean;
        mirror?: boolean;
        anchorPlacement?: string;
        disable?: boolean | string | (() => boolean);
        startEvent?: string;
        animatedClassName?: string;
        initClassName?: string;
        useClassNames?: boolean;
        disableMutationObserver?: boolean;
        debounceDelay?: number;
        throttleDelay?: number;
    }

    interface Aos {
        init(options?: AosOptions): void;
        refresh(hard?: boolean): void;
        refreshHard(): void;
    }

    const aos: Aos;
    export default aos;
}
