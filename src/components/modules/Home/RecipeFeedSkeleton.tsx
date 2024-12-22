import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/react";

const RecipeFeedSkeleton = () => {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-56 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-6 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
    </Card>
  );
};

export default RecipeFeedSkeleton;
