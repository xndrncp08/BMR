export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-container px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-8 w-64 animate-pulse rounded bg-neutral-100" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-xl bg-neutral-100" />
        ))}
      </div>
    </div>
  );
}
