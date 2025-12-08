import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TotalExpenseCard() {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="text-base font-bold text-primary">Gasto total</CardTitle>
      </CardHeader>
      <CardContent>
          <span className="mr-1 text-base font-semibold">$</span>
          <span className="text-2xl font-bold md:text-[28px]">92.000,32</span>
      </CardContent>
    </Card>
  );
}

export default TotalExpenseCard;
