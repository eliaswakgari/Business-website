import { comparisonFeatures } from "./config/comparison.config";
import { TableHeader } from "./components/TableHeader";
import { FeatureRow } from "./components/FeatureRow";

export default function ComparisonTable() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container relative px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Find the Perfect Plan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Compare our plans to find the one that best suits your needs. All plans include our core features.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-lg border shadow-sm">
                <TableHeader />
                <div className="divide-y">
                  {comparisonFeatures.map((feature, index) => (
                    <FeatureRow key={index} feature={feature} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
