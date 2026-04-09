/** Step indicator showing the user's progress through the multi-step event creation flow. */
type Step = {
  id: number;
  title: string;
};

type EventStepperProps = {
  currentStep: number;
  steps: Step[];
};

export default function EventStepper({
  currentStep,
  steps,
}: EventStepperProps) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isDone = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-3">
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isDone
                    ? "border-primary bg-secondary text-foreground"
                    : "border-border bg-background text-muted-foreground",
                ].join(" ")}
              >
                {step.id}
              </div>

              <div>
                <p className="text-sm font-medium">{step.title}</p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="mx-4 hidden h-px w-16 bg-border md:block" />
            )}
          </div>
        );
      })}
    </div>
  );
}