import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ServicesLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="container px-4 md:px-6 py-20">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-16 w-full max-w-2xl" />
            <Skeleton className="h-6 w-full max-w-3xl" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 w-full max-w-md">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center space-y-2">
                  <Skeleton className="h-8 w-16 mx-auto" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <Skeleton className="h-8 w-32 mx-auto rounded-full" />
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader className="space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                  <Skeleton className="h-10 w-full mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section Skeleton */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <Skeleton className="h-8 w-32 mx-auto rounded-full" />
            <Skeleton className="h-12 w-80 mx-auto" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-6">
                  <Skeleton className="h-16 w-16 rounded-2xl flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
            <Skeleton className="h-[600px] w-full rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Why Choose Us Skeleton */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <Skeleton className="h-8 w-32 mx-auto rounded-full" />
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="text-center">
                <CardHeader className="space-y-4">
                  <Skeleton className="h-20 w-20 mx-auto rounded-2xl" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                  <Skeleton className="h-6 w-20 mx-auto rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border space-y-4">
                <Skeleton className="h-12 w-12 mx-auto rounded-full" />
                <Skeleton className="h-6 w-24 mx-auto" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-12 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
