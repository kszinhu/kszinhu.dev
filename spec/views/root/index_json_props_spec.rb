# frozen_string_literal: true

require "rails_helper"

RSpec.describe "root/index.json.props", type: :view do
  it "exposes footer nav_links and social_links with expected shape" do
    # Render the json.props template for the root index view
    render template: "root/index", formats: [:json]

    # Superglue renders a JSON payload; `rendered` should contain the JSON string
    json = JSON.parse(rendered)
    expect(json).to be_a(Hash)

    # Root-level footer presence
    expect(json).to have_key("footer")
    footer = json.fetch("footer")

    # nav_links: array of { label, href }
    expect(footer).to have_key("nav_links")
    expect(footer["nav_links"]).to be_an(Array)
    first_nav = footer["nav_links"].first
    expect(first_nav).to include("label", "href")
    expect(first_nav["label"]).to be_a(String)
    expect(first_nav["href"]).to be_a(String)

    # social_links: array of { name, label, href, icon? }
    expect(footer).to have_key("social_links")
    expect(footer["social_links"]).to be_an(Array)
    first_social = footer["social_links"].first
    expect(first_social).to include("name", "label", "href")
    expect(first_social["name"]).to be_a(String)
    expect(first_social["label"]).to be_a(String)
    expect(first_social["href"]).to be_a(String)

    # Basic validation of href formats (at least ensure non-empty)
    footer["social_links"].each do |s|
      expect(s["href"].to_s.strip).not_to be_empty
    end

    # Owner / copyright presence (accept multiple possible keys used)
    copy_keys = %w[copy_right copyRight owner_name ownerName]
    present = copy_keys.any? { |k| footer[k].present? }
    expect(present).to be true
  end
end
