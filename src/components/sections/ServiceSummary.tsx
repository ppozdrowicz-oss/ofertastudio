import { services } from "@/content/site";

export function ServiceSummary() {
  return (
    <aside id="mozliwosci" className="service-summary" aria-labelledby="services-title">
      <h3 id="services-title" className="eyebrow">
        Możliwości studia
      </h3>
      <ul>
        {services.map((service) => (
          <li key={service.title}>
            <strong>{service.title}</strong>
            <span> — {service.description}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
