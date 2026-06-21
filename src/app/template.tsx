// re-mounts on every navigation, so the page-enter animation plays per route.
// also the skip-link target + main landmark.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="page-enter min-h-dvh scroll-mt-24 outline-none"
    >
      {children}
    </main>
  );
}
