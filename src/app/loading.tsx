export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-t-accent border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDirection: 'reverse' }} />
            </div>
        </div>
    );
}
