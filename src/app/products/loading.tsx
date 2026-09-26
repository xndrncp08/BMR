import { Container, Skeleton } from "@/components/ui";

export default function ProductsLoading() {
  return (
    <div role="status" aria-label="Loading products">
      <div className="border-b border-neutral-200 bg-white">
        <Container className="py-14 sm:py-20">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-5 h-12 w-full max-w-md" />
          <Skeleton className="mt-5 h-5 w-full max-w-xl" />
        </Container>
      </div>
      <Container className="py-10">
        <Skeleton className="h-[7.5rem] rounded-2xl sm:h-[8.5rem]" />
        <Skeleton className="mt-8 h-4 w-40" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <Skeleton className="aspect-[4/3] rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-6 h-6 w-24" />
              </div>
            </div>
          ))}
        </div>
      </Container>
      <span className="sr-only">Loading products…</span>
    </div>
  );
}
