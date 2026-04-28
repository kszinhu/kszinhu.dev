# frozen_string_literal: true

require "rails_helper"

RSpec.describe ApplicationHelper do
  include described_class

  describe "#calculate_duration" do
    it "accepts a positional end_date and returns the expected duration hash" do
      duration = calculate_duration(Date.new(2024, 1, 1), Date.new(2025, 4, 1))

      expect(duration).to eq(
        years: 1,
        months: 3,
        total_months: 15,
      )
    end

    it "defaults end_date to today when not provided" do
      allow(Date).to receive(:today).and_return(Date.new(2025, 4, 1))

      duration = calculate_duration(Date.new(2024, 4, 1))

      expect(duration).to eq(
        years: 1,
        months: 0,
        total_months: 12,
      )
    end
  end

  describe "#format_duration" do
    it "formats duration using positional end_date arguments" do
      text = I18n.with_locale(:en) do
        format_duration(Date.new(2024, 1, 1), Date.new(2025, 4, 1))
      end

      expect(text).to eq("1 year and 3 months")
    end
  end
end
