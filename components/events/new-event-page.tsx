"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import EventStepper from "@/components/events/event-stepper";
import TemplateSelector from "@/components/events/template-selector";
import EventDetailsForm from "@/components/events/event-details-form";
import EventPreview from "@/components/events/event-preview";
import { getTemplateComponent } from "@/lib/events/template-registry";
import GuestListForm, {
  type GuestFormItem,
} from "@/components/events/guest-list-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type {
  EventTemplateData,
  TemplateRecord as Template,
} from "@/lib/events/template-preview";

const steps = [
  { id: 1, title: "Choose Template" },
  { id: 2, title: "Event Details" },
  { id: 3, title: "Preview" },
  { id: 4, title: "Guest List" },
];

const initialForm: EventTemplateData = {
  name: "",
  description: "",
  address: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  start_time: "",
  main_image_url: "",
  video_url: "",
  google_maps_link: "",
};

type EventFormErrors = Partial<Record<keyof EventTemplateData, string>>;

export default function NewEventPage() {
  const router = useRouter();

  const [guests, setGuests] = useState<GuestFormItem[]>([
    { full_name: "", email: "" },
  ]);
  const [guestListError, setGuestListError] = useState("");
  const supabase = useMemo(() => createClient(), []);

  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startClock, setStartClock] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [selectedColorPaletteId, setSelectedColorPaletteId] = useState<
    string | null
  >(null);
  const [form, setForm] = useState<EventTemplateData>(initialForm);
  const [errors, setErrors] = useState<EventFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const selectedTemplate = useMemo(
    () =>
      templates.find((template) => template.id === selectedTemplateId) ?? null,
    [templates, selectedTemplateId],
  );

  const SelectedTemplateComponent = useMemo(() => {
    return getTemplateComponent(selectedTemplate?.key);
  }, [selectedTemplate]);

  const previewData = useMemo<EventTemplateData & { id: string }>(
    () => ({
      ...form,
      main_image_url: mainImagePreview || form.main_image_url,
      id: selectedTemplateId || "",
      color_palette_id: selectedColorPaletteId,
    }),

    [form, mainImagePreview, selectedTemplateId, selectedColorPaletteId],
  );

  const resetFormState = () => {
    setGuests([{ full_name: "", email: "" }]);
    setGuestListError("");
    setMainImageFile(null);
    setMainImagePreview("");
    setStartDate("");
    setStartClock("");
    setCurrentStep(1);
    setSelectedTemplateId(null);
    setSelectedColorPaletteId(null);
    setForm(initialForm);
    setErrors({});
    setSubmitting(false);
    setUploadingImage(false);
  };

  useEffect(() => {
    resetFormState();
  }, []);
  useEffect(() => {
    const loadTemplates = async () => {
      setLoadingTemplates(true);

      const { data, error } = await supabase
        .from("templates")
        .select("id, name, key, image, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading templates:", error);
      } else {
        setTemplates((data as Template[]) || []);
      }

      setLoadingTemplates(false);
    };

    loadTemplates();
  }, [supabase]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  useEffect(() => {
    return () => {
      if (mainImagePreview) {
        URL.revokeObjectURL(mainImagePreview);
      }
    };
  }, [mainImagePreview]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const syncStartTime = (date: string, time: string) => {
    setForm((prev) => ({
      ...prev,
      start_time: date && time ? `${date}T${time}` : "",
    }));

    setErrors((prev) => ({
      ...prev,
      start_time: "",
    }));
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    syncStartTime(value, startClock);
  };

  const handleStartClockChange = (value: string) => {
    setStartClock(value);
    syncStartTime(startDate, value);
  };

  const handleAddGuest = () => {
    setGuests((prev) => [...prev, { full_name: "", email: "" }]);
  };

  const handleRemoveGuest = (index: number) => {
    setGuests((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGuestChange = (
    index: number,
    field: keyof GuestFormItem,
    value: string,
  ) => {
    setGuests((prev) =>
      prev.map((guest, i) =>
        i === index ? { ...guest, [field]: value } : guest,
      ),
    );

    setGuestListError("");
  };

  const validateGuests = () => {
    const cleanedGuests = guests
      .map((guest) => ({
        full_name: guest.full_name.trim(),
        email: guest.email.trim().toLowerCase(),
      }))
      .filter((guest) => guest.full_name || guest.email);

    if (cleanedGuests.length === 0) {
      setGuestListError("Please add at least one guest.");
      return false;
    }

    for (const guest of cleanedGuests) {
      if (!guest.full_name || !guest.email) {
        setGuestListError("Each guest must have a full name and email.");
        return false;
      }

      if (
        !isValidUrl(`mailto:${guest.email}`) &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)
      ) {
        setGuestListError("Please enter valid guest email addresses.");
        return false;
      }
    }

    const emails = cleanedGuests.map((g) => g.email);
    const uniqueEmails = new Set(emails);

    if (emails.length !== uniqueEmails.size) {
      setGuestListError("Duplicate guest emails are not allowed.");
      return false;
    }

    setGuestListError("");
    return true;
  };

  const isValidUrl = (value: string) => {
    if (!value.trim()) return true;

    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const scrollToFirstError = (formErrors: EventFormErrors) => {
    const firstErrorKey = Object.keys(formErrors)[0] as
      | keyof EventTemplateData
      | undefined;

    if (!firstErrorKey) return;

    const element = document.querySelector(
      `[name="${firstErrorKey}"], [data-field="${firstErrorKey}"]`,
    ) as HTMLElement | null;

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    if ("focus" in element) {
      setTimeout(() => {
        (element as HTMLInputElement | HTMLTextAreaElement).focus();
      }, 250);
    }
  };

  const validateForm = () => {
    const newErrors: EventFormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Event name is required.";
    }

    if (!form.start_time.trim()) {
      newErrors.start_time = "Start time is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!form.country.trim()) {
      newErrors.country = "Country is required.";
    }

    if (form.google_maps_link && !isValidUrl(form.google_maps_link)) {
      newErrors.google_maps_link = "Please enter a valid Google Maps link.";
    }

    if (form.video_url && !isValidUrl(form.video_url)) {
      newErrors.video_url = "Please enter a valid video URL.";
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;

    if (!isValid) {
      requestAnimationFrame(() => {
        scrollToFirstError(newErrors);
      });
    }

    return isValid;
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    setMainImageFile(file);

    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }

    const localPreviewUrl = URL.createObjectURL(file);
    setMainImagePreview(localPreviewUrl);

    setErrors((prev) => ({
      ...prev,
      main_image_url: "",
    }));
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedTemplateId) {
      return;
    }

    if (currentStep === 2 && !validateForm()) {
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreateEvent = async () => {
    if (!selectedTemplateId) return;
    if (!validateForm()) return;
    if (!validateGuests()) return;

    setSubmitting(true);

    try {
      let uploadedImageUrl = form.main_image_url || "";

      if (mainImageFile) {
        setUploadingImage(true);

        const fileExt = mainImageFile.name.split(".").pop() || "jpg";
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${fileExt}`;
        const filePath = `events/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("event-images")
          .upload(filePath, mainImageFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          alert(uploadError.message || "Failed to upload image.");
          return;
        }

        const { data } = supabase.storage
          .from("event-images")
          .getPublicUrl(filePath);

        uploadedImageUrl = data.publicUrl;
      }

      const response = await fetch("/api/events/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedTemplateId,
          colorPaletteId: selectedColorPaletteId,
          form: {
            ...form,
            main_image_url: uploadedImageUrl,
          },
          guests,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to publish event.");
        return;
      }

      // alert("Event published successfully.");
      console.log("Published URL:", result.publishedUrl);
      router.replace("/dashboard/events");
    } catch (error) {
      console.log(error);
      // alert("Something went wrong.");
    } finally {
      setUploadingImage(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create a New Event
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a template, enter the event details, and preview it before
          saving.
        </p>
      </div>

      <EventStepper currentStep={currentStep} steps={steps} />

      {currentStep === 1 && (
        <TemplateSelector
          templates={templates}
          loadingTemplates={loadingTemplates}
          selectedTemplateId={selectedTemplateId}
          onSelect={setSelectedTemplateId}
        />
      )}

      {currentStep === 2 && (
        <EventDetailsForm
          form={form}
          startDate={startDate}
          startClock={startClock}
          errors={errors}
          uploadingImage={uploadingImage}
          colorPaletteId={selectedColorPaletteId}
          onInputChange={handleInputChange}
          onStartDateChange={handleStartDateChange}
          onStartClockChange={handleStartClockChange}
          onMainImageChange={handleMainImageChange}
          mainImagePreview={mainImagePreview}
          onColorPaletteChange={setSelectedColorPaletteId}
        />
      )}

      {currentStep === 3 && (
        <EventPreview
          templateComponent={SelectedTemplateComponent}
          data={previewData as EventTemplateData & { id: string }}
        />
      )}

      {currentStep === 4 && (
        <GuestListForm
          guests={guests}
          errors={guestListError}
          onAddGuest={handleAddGuest}
          onRemoveGuest={handleRemoveGuest}
          onGuestChange={handleGuestChange}
        />
      )}

      <div className="mt-10 flex items-center justify-between border-t pt-6">
        <Button
          type="button"
          onClick={prevStep}
          variant="outline"
          disabled={currentStep === 1 || uploadingImage || submitting}
        >
          Back
        </Button>
        {currentStep < 4 ? (
          <Button
            type="button"
            onClick={nextStep}
            disabled={uploadingImage || submitting}
          >
            Continue
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleCreateEvent}
            disabled={submitting || uploadingImage}
          >
            {submitting ? "Publishing..." : "Publish Event"}
          </Button>
        )}
      </div>
    </div>
  );
}
