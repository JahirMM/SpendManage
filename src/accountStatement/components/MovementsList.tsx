import MovementItem from "@/src/accountStatement/components/MovementItem";

function MovementsList() {
  return (
    <div className="mt-3">
      <p className="text-base font-bold">Detalle de movimientos</p>
      <div className="mt-2 space-y-3 max-h-[280px] overflow-y-auto">
        <MovementItem />
        <MovementItem />
      </div>
    </div>
  );
}

export default MovementsList;
