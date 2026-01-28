import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  isMoney: boolean;
}
function StatCard({ title, value, isMoney }: StatCardProps) {
  return (
    <Card className="gap-0 border-none md:py-4">
      <CardHeader>
        <CardTitle className="text-base font-bold text-muted">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="m-0">
        {isMoney ? (
          <>
            <span className="mr-1 text-sm font-semibold">$</span>
            <span className="text-lg font-bold">{value}</span>
          </>
        ) : (
          <span className="text-lg font-bold">{value}</span>
        )}
      </CardContent>
    </Card>
  );
}

export default StatCard;
