export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink">
      <div className="flex items-center gap-2 font-mono text-sm text-muted">
        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-ember" />
        loading
      </div>
    </div>
  );
}
