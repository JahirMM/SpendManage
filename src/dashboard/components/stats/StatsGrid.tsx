import StatCard from "./StatCard";

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <StatCard title={"Pago de este mes"} value={92435} isMoney={true} />
      <StatCard title={"Movimientos activos"} value={23} isMoney={false} />
      <StatCard title={"Cuentas con gastos"} value={4} isMoney={false} />
      <StatCard title={"Cuentas libres"} value={0} isMoney={false} />
    </div>
  );
}

export default StatsGrid;
