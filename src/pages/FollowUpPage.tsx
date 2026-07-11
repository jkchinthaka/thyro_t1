import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, CheckCircle, Calendar, AlertTriangle, X } from "lucide-react";
import { Card, Badge, Btn, Input } from "@/components/common";
import { BLUE, TEAL } from "@/constants/colors";
import { mockAppointments, mockTshHistory, mockNextAppointment } from "@/data/mock";
import { appointmentSchema, type AppointmentFormValues } from "@/schemas/appointmentSchemas";
import { useToast } from "@/hooks/useToast";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function FollowUpPage() {
  useDocumentTitle("Follow-ups");
  const { success } = useToast();
  const appointments = mockAppointments;
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { type: "", date: "", time: "", doctor: "", note: "" },
  });

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("input,button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      trigger?.focus();
    };
  }, [open]);

  const onCreate = (values: AppointmentFormValues) => {
    void values;
    success("Appointment added (demo)");
    reset();
    setOpen(false);
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h2
              className="text-lg font-bold text-foreground"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Care Timeline
            </h2>
            <Btn
              ref={triggerRef}
              size="sm"
              variant="ghost"
              type="button"
              onClick={() => setOpen(true)}
            >
              <Plus className="w-4 h-4" aria-hidden="true" /> Add Appointment
            </Btn>
          </div>
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-4">
              {appointments.map((a, i) => (
                <div key={`${a.type}-${a.date}-${i}`} className="flex gap-4 relative">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-background z-10 ${
                      a.status === "completed"
                        ? "bg-green-500"
                        : a.status === "upcoming"
                          ? "bg-primary"
                          : "bg-muted"
                    }`}
                    aria-hidden="true"
                  >
                    {a.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Calendar className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <Card
                    className={`flex-1 min-w-0 ${a.status === "upcoming" ? "border-primary/30 bg-blue-50/50" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className="font-bold text-foreground text-sm"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {a.type}
                          </h3>
                          <Badge
                            color={
                              a.status === "completed"
                                ? "green"
                                : a.status === "upcoming"
                                  ? "blue"
                                  : "purple"
                            }
                          >
                            {a.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {a.doctor} · {a.date}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.note}</p>
                      </div>
                      {a.status !== "completed" && (
                        <Btn size="sm" variant="ghost" type="button">
                          Reschedule
                        </Btn>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 min-w-0">
          <Card>
            <h3
              className="font-bold text-foreground mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Next Appointment
            </h3>
            <div
              className="rounded-xl p-4"
              style={{ background: `linear-gradient(135deg, ${BLUE}18, ${TEAL}18)` }}
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {mockNextAppointment.type}
              </p>
              <p
                className="text-2xl font-extrabold text-foreground mt-1"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {mockNextAppointment.date}
              </p>
              <p className="text-sm text-muted-foreground">{mockNextAppointment.subtitle}</p>
              <div className="mt-3 p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-700 font-semibold">
                  <AlertTriangle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                  {mockNextAppointment.warning}
                </p>
              </div>
            </div>
            <Btn className="w-full justify-center mt-3" variant="ghost" size="sm" type="button">
              Add to Calendar
            </Btn>
          </Card>

          <Card>
            <h3
              className="font-bold text-foreground mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              TSH History
            </h3>
            <div className="space-y-2 text-sm">
              {mockTshHistory.map((t) => (
                <div key={t.date} className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-muted-foreground">{t.date}</span>
                  <span className="font-bold text-foreground">
                    {t.value} <span className="text-xs font-normal">mIU/L</span>
                  </span>
                  <Badge
                    color={
                      t.status === "optimal" ? "green" : t.status === "normal" ? "blue" : "red"
                    }
                  >
                    {t.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 border-0"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-md bg-card rounded-2xl border border-border shadow-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                id={titleId}
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Add Appointment
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl hover:bg-accent text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-label="Close"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <form className="space-y-3" onSubmit={handleSubmit(onCreate)} noValidate>
              <Input label="Appointment type" error={errors.type?.message} {...register("type")} />
              <Input label="Date" type="date" error={errors.date?.message} {...register("date")} />
              <Input label="Time" type="time" error={errors.time?.message} {...register("time")} />
              <Input label="Doctor (optional)" {...register("doctor")} />
              <Input label="Note (optional)" {...register("note")} />
              <div className="flex gap-2 pt-2">
                <Btn type="submit" className="flex-1 justify-center">
                  Save
                </Btn>
                <Btn type="button" variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Btn>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
