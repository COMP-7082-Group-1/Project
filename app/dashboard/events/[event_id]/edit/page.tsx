export default async function EditEvent({
  params,
}: {
  params: Promise<{ event_id: string }>;
}) {
  const { event_id } = await params;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Editing event with id: {event_id} </h2>
      

    </div>
  );
}
