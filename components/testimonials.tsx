// Placeholder reviews — swap these for real ones later. Each entry is
// self-contained, so replacing the array contents is all that's needed.
const TESTIMONIALS = [
  {
    quote:
      "Antes llevaba las facturas en una planilla y se me pasaban los vencimientos. Con Saldo veo todo de un vistazo.",
    name: "[Nombre]",
    role: "freelancer",
  },
  {
    quote:
      "Dejé de perseguir clientes de memoria. Ahora sé exactamente a quién le tengo que escribir cada día.",
    name: "[Nombre]",
    role: "dueña de un pequeño negocio",
  },
  {
    quote:
      "Lo más simple que probé para llevar el control de lo que me deben. Justo lo que necesitaba.",
    name: "[Nombre]",
    role: "diseñador independiente",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
      <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
        Lo que dicen quienes ya usan Saldo
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {TESTIMONIALS.map(({ quote, name, role }) => (
          <div
            key={name + role}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <span
              aria-hidden="true"
              className="font-mono text-3xl leading-none text-primary"
            >
              &ldquo;
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {quote}
            </p>
            <p className="mt-5 text-sm font-medium tracking-tight">
              {name}
              <span className="font-normal text-muted-foreground">
                {" "}
                · {role}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
