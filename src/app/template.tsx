/**
 * Templates remount on every navigation (unlike layouts), so this CSS
 * animation replays as a subtle page transition. It's a server component
 * with no JS cost; reduced-motion users get an instant swap.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
