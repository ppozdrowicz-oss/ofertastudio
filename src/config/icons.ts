import type { LucideIcon } from "lucide-react";
import {
  Camera,
  FileText,
  LifeBuoy,
  PanelsTopLeft,
  SearchCheck,
  ShoppingBag,
  Store,
} from "lucide-react";

import type { IconName } from "../types/content.ts";

export const iconRegistry = {
  audit: SearchCheck,
  camera: Camera,
  commerce: ShoppingBag,
  content: FileText,
  marketplace: Store,
  support: LifeBuoy,
  websites: PanelsTopLeft,
} as const satisfies Record<IconName, LucideIcon>;
