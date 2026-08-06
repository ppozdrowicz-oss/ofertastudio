import type { ContactConfig } from "../types/content.ts";
import { routes } from "./routes.ts";

export const contactConfig = {
  email: null,
  phone: null,
  address: null,
  legalName: null,
  taxId: null,
  businessHours: null,
  socialProfiles: {
    facebook: null,
    instagram: null,
    linkedin: null,
    youtube: null,
  },
  contactHref: routes.contact,
  briefHref: routes.brief,
  status: "requires-confirmation",
} as const satisfies ContactConfig;
