import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { TextLink } from "@/components/ui/text-link";
import { iconRegistry } from "@/config/icons";
import type { ServiceGroup } from "@/types/service";

export type ServiceCardProps = {
  service: ServiceGroup;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconRegistry[service.icon];

  return (
    <Card className="flex h-full flex-col" variant="interactive">
      <CardHeader>
        <IconBox icon={Icon} variant="primary" />
        <CardTitle className="mt-6">{service.name}</CardTitle>
        <CardDescription>{service.summary}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <TextLink href={service.href} variant="arrow">
          Sprawdź zakres
        </TextLink>
      </CardContent>
    </Card>
  );
}
