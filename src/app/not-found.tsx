import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Container, buttonVariants } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="bg-dot-grid mask-radial absolute inset-0" aria-hidden="true" />
      <Container className="relative text-center">
        <p
          className="animate-rise bg-gradient-to-b from-primary-300 to-primary-600 bg-clip-text font-display text-[7rem] font-extrabold leading-none tracking-tighter text-transparent sm:text-[10rem]"
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="animate-rise delay-1 mt-4 font-display text-display-md font-bold text-neutral-900">
          We couldn&apos;t find that page
        </h1>
        <p className="animate-rise delay-2 mx-auto mt-3 max-w-md text-lg text-neutral-600">
          The page you&apos;re looking for may have moved or doesn&apos;t exist.
        </p>
        <div className="animate-rise delay-3 mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants({ variant: "primary", size: "lg" })}>
            <ArrowLeft aria-hidden="true" />
            Back to home
          </Link>
          <Link href="/products" className={buttonVariants({ variant: "outline", size: "lg" })}>
            <Search aria-hidden="true" />
            Browse products
          </Link>
        </div>
      </Container>
    </section>
  );
}
