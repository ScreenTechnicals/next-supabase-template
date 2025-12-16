import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCheckout = () => {
    return (
        <div className="py-10 max-w-4xl mx-auto">
            <Skeleton className="h-10 w-48 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <CardContent className="p-4 flex gap-4">
                                <Skeleton className="h-24 w-24 rounded-md shrink-0" />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-1/2" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-6 w-20" />
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-8 w-8" />
                                            <Skeleton className="h-6 w-8" />
                                            <Skeleton className="h-8 w-8" />
                                            <Skeleton className="h-8 w-8 ml-2" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div>
                    <Card>
                        <CardContent className="p-6">
                            <Skeleton className="h-7 w-40 mb-4" />
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-10" />
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-20" />
                                </div>
                            </div>
                            <Skeleton className="h-11 w-full mt-6" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
