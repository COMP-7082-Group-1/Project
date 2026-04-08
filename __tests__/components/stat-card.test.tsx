import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "@/components/dashboard/stat-card";

const BASE_PROPS = {
  icon: <span data-testid="icon">Icon</span>,
  title: "Summer BBQ",
  guests: "1",
  description: "An outdoor party",
  date: "April 21, 2026",
  invited: 12,
  accepted: 7,
  declined: 3,
  maybe: 2,
  location: "Vancouver, BC",
};

describe("StatCard", () => {
  it("renders the event title", () => {
    render(<StatCard {...BASE_PROPS} />);
    expect(screen.getByText("Summer BBQ")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<StatCard {...BASE_PROPS} />);
    expect(screen.getByText("An outdoor party")).toBeInTheDocument();
  });

  it("renders invited, accepted, declined, and maybe counts", () => {
    render(<StatCard {...BASE_PROPS} />);
    expect(screen.getByText(/Invited:\s*12/)).toBeInTheDocument();
    expect(screen.getByText(/Accepted:\s*7/)).toBeInTheDocument();
    expect(screen.getByText(/Declined:\s*3/)).toBeInTheDocument();
    expect(screen.getByText(/Maybe:\s*2/)).toBeInTheDocument();
  });

  it("shows 'This is your event!' when userRsvpStatus is not provided", () => {
    render(<StatCard {...BASE_PROPS} />);
    expect(screen.getByText("This is your event!")).toBeInTheDocument();
  });

  it("shows the user RSVP status when provided", () => {
    render(<StatCard {...BASE_PROPS} userRsvpStatus="accepted" />);
    expect(screen.getByText(/Your status:\s*accepted/)).toBeInTheDocument();
  });

  it("renders zero counts without errors", () => {
    render(
      <StatCard
        {...BASE_PROPS}
        invited={0}
        accepted={0}
        declined={0}
        maybe={0}
      />,
    );
    expect(screen.getAllByText(/0/)[0]).toBeInTheDocument();
  });

  it("renders the location", () => {
    render(<StatCard {...BASE_PROPS} />);
    expect(screen.getByText("Vancouver, BC")).toBeInTheDocument();
  });
});
