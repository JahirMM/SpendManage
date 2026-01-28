import LoginForm from "@/src/modules/auth/login/components/LoginForm";

function page() {
  return (
    <div className="flex min-h-screen">
      <section className="flex-col justify-between hidden p-12 lg:flex lg:w-1/2 bg-primary">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">SpendManage</span>
        </div>

        <div className="w-full h-96 rounded-xl">
          <img
            src="/images/login/login.webp"
            alt="Login image"
            className="w-full h-full"
          />
        </div>

        <div>
          <h1 className="mb-4 text-4xl font-bold text-white">
            Bienvenido de nuevo
          </h1>
          <p className="text-lg text-gray-300">
            Continúa gestionando tus finanzas de manera inteligente.
          </p>
        </div>
      </section>

      <LoginForm />
    </div>
  );
}

export default page;
