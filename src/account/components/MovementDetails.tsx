function MovementDetails() {
  return (
    <div className="space-y-3 md:space-y-0 md:flex md:items-center md:justify-between">
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Cuota mensual</p>
        <p className="font-bold">$100.000,00</p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Monto original</p>
        <p className="font-bold">$32.000,00</p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Monto total</p>
        <p className="font-bold">$31.000,00</p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Cuotas</p>
        <p className="font-bold">12</p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Restante</p>
        <p className="font-bold">$1.000,00</p>
      </div>
    </div>
  );
}

export default MovementDetails;
