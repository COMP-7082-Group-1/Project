import type { EventTemplateData } from "@/lib/events/template-preview";

type EventDetailsFormProps = {
  form: EventTemplateData;
  uploadingImage: boolean;
  mainImagePreview: string;
  errors: Partial<Record<keyof EventTemplateData, string>>;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onMainImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EventDetailsForm({
  form,
  errors,
  uploadingImage,
  onInputChange,
  mainImagePreview,
  onMainImageChange,
}: EventDetailsFormProps) {
  const inputClassName =
    "w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary";
  const errorClassName = "mt-1 text-sm text-red-500";

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Event Details</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the event information that will be used in the selected
          template.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-2" data-field="name">
          <label htmlFor="name" className="text-sm font-medium">
            Event Name
          </label>
          <input
            id="name"
            required
            name="name"
            value={form.name}
            onChange={onInputChange}
            placeholder="Enter event name"
            className={inputClassName}
          />
          {errors.name && <p className={errorClassName}>{errors.name}</p>}
        </div>

        <div className="space-y-2" data-field="start_time">
          <label htmlFor="start_time" className="text-sm font-medium">
            Start Time
          </label>
          <input
            id="start_time"
            required
            type="datetime-local"
            name="start_time"
            value={form.start_time}
            onChange={onInputChange}
            className={inputClassName}
          />
          {errors.start_time && (
            <p className={errorClassName}>{errors.start_time}</p>
          )}
        </div>

        <div className="space-y-2 lg:col-span-2" data-field="description">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            required
            name="description"
            value={form.description}
            onChange={onInputChange}
            rows={4}
            placeholder="Describe your event"
            className={inputClassName}
          />
          {errors.description && (
            <p className={errorClassName}>{errors.description}</p>
          )}
        </div>

        <div className="space-y-2" data-field="address">
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <input
            id="address"
            required
            name="address"
            value={form.address}
            onChange={onInputChange}
            placeholder="Street address"
            className={inputClassName}
          />
          {errors.address && <p className={errorClassName}>{errors.address}</p>}
        </div>

        <div className="space-y-2" data-field="city">
          <label htmlFor="city" className="text-sm font-medium">
            City
          </label>
          <input
            id="city"
            required
            name="city"
            value={form.city}
            onChange={onInputChange}
            placeholder="City"
            className={inputClassName}
          />
          {errors.city && <p className={errorClassName}>{errors.city}</p>}
        </div>

        <div className="space-y-2" data-field="state">
          <label htmlFor="state" className="text-sm font-medium">
            State / Province
          </label>
          <input
            id="state"
            name="state"
            value={form.state}
            onChange={onInputChange}
            placeholder="State / Province"
            className={inputClassName}
          />
          {errors.state && <p className={errorClassName}>{errors.state}</p>}
        </div>

        <div className="space-y-2" data-field="postal_code">
          <label htmlFor="postal_code" className="text-sm font-medium">
            Postal Code
          </label>
          <input
            id="postal_code"
            name="postal_code"
            value={form.postal_code}
            onChange={onInputChange}
            placeholder="Postal code"
            className={inputClassName}
          />
          {errors.postal_code && (
            <p className={errorClassName}>{errors.postal_code}</p>
          )}
        </div>

        <div className="space-y-2" data-field="country">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <input
            id="country"
            required
            name="country"
            value={form.country}
            onChange={onInputChange}
            placeholder="Country"
            className={inputClassName}
          />
          {errors.country && <p className={errorClassName}>{errors.country}</p>}
        </div>

        <div className="space-y-2" data-field="main_image_url">
          <label htmlFor="main_image" className="text-sm font-medium">
            Main Image
          </label>
          <input
            id="main_image"
            type="file"
            accept="image/*"
            onChange={onMainImageChange}
            disabled={uploadingImage}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          />

          {uploadingImage && (
            <p className="text-sm text-muted-foreground">Uploading image...</p>
          )}

          {mainImagePreview && (
            <div className="mt-3 overflow-hidden rounded-xl border bg-muted">
              <img
                src={mainImagePreview}
                alt="Uploaded preview"
                className="h-48 w-full object-cover"
              />
            </div>
          )}

          {errors.main_image_url && (
            <p className={errorClassName}>{errors.main_image_url}</p>
          )}
        </div>

        <div className="space-y-2 lg:col-span-2" data-field="google_maps_link">
          <label htmlFor="google_maps_link" className="text-sm font-medium">
            Google Maps Link
          </label>
          <input
            name="google_maps_link"
            id="google_maps_link"
            value={form.google_maps_link}
            onChange={onInputChange}
            placeholder="https://maps.google.com/..."
            className={inputClassName}
          />
          {errors.google_maps_link && (
            <p className={errorClassName}>{errors.google_maps_link}</p>
          )}
        </div>

        <div className="space-y-2 lg:col-span-2" data-field="video_url">
          <label htmlFor="video_url" className="text-sm font-medium">
            Video URL
          </label>
          <input
            id="video_url"
            name="video_url"
            value={form.video_url}
            onChange={onInputChange}
            placeholder="https://..."
            className={inputClassName}
          />
          {errors.video_url && (
            <p className={errorClassName}>{errors.video_url}</p>
          )}
        </div>
      </div>
    </section>
  );
}