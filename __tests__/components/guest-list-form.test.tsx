import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GuestListForm, {
  GuestFormItem,
} from "@/components/events/guest-list-form";

const DEFAULT_GUEST: GuestFormItem = {
  full_name: "Henry Tan",
  email: "henry@example.com",
};

function renderForm(
  guests: GuestFormItem[] = [DEFAULT_GUEST],
  overrides: Partial<{
    errors: string;
    onAddGuest: () => void;
    onRemoveGuest: (index: number) => void;
    onGuestChange: (
      index: number,
      field: keyof GuestFormItem,
      value: string,
    ) => void;
  }> = {},
) {
  const props = {
    guests,
    onAddGuest: vi.fn(),
    onRemoveGuest: vi.fn(),
    onGuestChange: vi.fn(),
    ...overrides,
  };
  render(<GuestListForm {...props} />);
  return props;
}

describe("GuestListForm", () => {
  it("renders the guest list heading", () => {
    renderForm();
    expect(screen.getByText("Guest List")).toBeInTheDocument();
  });

  it("renders the guest's name and email inputs", () => {
    renderForm();
    expect(screen.getByDisplayValue("Henry Tan")).toBeInTheDocument();
    expect(screen.getByDisplayValue("henry@example.com")).toBeInTheDocument();
  });

  it("calls onAddGuest when 'Add Guest' button is clicked", async () => {
    const handlers = renderForm();
    await userEvent.click(screen.getByRole("button", { name: /add guest/i }));
    expect(handlers.onAddGuest).toHaveBeenCalledTimes(1);
  });

  it("calls onRemoveGuest with the correct index when Remove is clicked", async () => {
    const handlers = renderForm([
      { full_name: "Henry Tan", email: "henry@example.com" },
      { full_name: "Not Henry", email: "notHenry@example.com" },
    ]);
    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    await userEvent.click(removeButtons[0]);
    expect(handlers.onRemoveGuest).toHaveBeenCalledWith(0);
  });

  it("disables Remove when there is only one guest", () => {
    renderForm([{ full_name: "Henry Tan", email: "henry@example.com" }]);
    const removeButton = screen.getByRole("button", { name: /remove/i });
    expect(removeButton).toBeDisabled();
  });

  it("calls onGuestChange with index, field, and value when the name input changes", async () => {
    const handlers = renderForm();
    const nameInput = screen.getByDisplayValue("Henry Tan");
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "change");
    const calls = vi.mocked(handlers.onGuestChange).mock.calls;
    expect(calls[calls.length - 1]).toEqual([
      0,
      "full_name",
      expect.any(String),
    ]);
  });

  it("displays a validation error message when errors prop is set", () => {
    renderForm([DEFAULT_GUEST], { errors: "Duplicate email address." });
    expect(screen.getByText("Duplicate email address.")).toBeInTheDocument();
  });

  it("does not render an error box when errors prop is undefined", () => {
    renderForm();
    expect(screen.queryByText(/duplicate/i)).not.toBeInTheDocument();
  });
});
