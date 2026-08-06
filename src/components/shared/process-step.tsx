import { Card, CardContent } from "@/components/ui/card";
import type { ProcessStep as ProcessStepData } from "@/types/content";

export type ProcessStepProps = {
  step: ProcessStepData;
};

export function ProcessStep({ step }: ProcessStepProps) {
  return (
    <Card className="h-full" variant="bordered">
      <CardContent className="grid h-full grid-rows-[auto_auto_1fr_auto] gap-4 pt-[var(--space-card-padding)]">
        <p className="text-overline font-bold text-primary uppercase">
          Etap {String(step.order).padStart(2, "0")}
        </p>
        <h3 className="text-h4 font-semibold text-balance">{step.name}</h3>
        <p className="text-body-sm text-muted-foreground">{step.summary}</p>
        <div className="border-t border-border pt-4">
          <p className="text-caption font-semibold tracking-wide text-muted-foreground uppercase">
            Rezultat
          </p>
          <p className="mt-2 text-body-sm">{step.deliverable}</p>
        </div>
      </CardContent>
    </Card>
  );
}
