import SignUpForm from "@/src/auth/signUp/components/SignUpForm";

function page() {
  return (
    <div className="flex min-h-screen">
      <section className="flex-col justify-between hidden p-12 lg:flex lg:w-1/2 bg-primary">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">SpendManage</span>
        </div>

        <div className="flex justify-center w-full">
          <div className="w-80 h-96 rounded-xl">
            <img
              src="/images/signUp/signUp.webp"
              alt="Login image"
              className="w-full h-full"
            />
          </div>
        </div>

        <div>
          <h1 className="mb-4 text-4xl font-bold text-white">
            Comienza tu viaje financiero
          </h1>
          <p className="text-lg text-gray-300">
            Únete y toma control de tus gastos.
          </p>
        </div>
      </section>

      <SignUpForm />
    </div>
  );
}

export default page;
