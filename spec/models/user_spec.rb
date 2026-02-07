# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  # uses factories

  it "is valid with required attributes" do
    user = described_class.new(
      name: "Grace Hopper",
      bio: "Pioneira",
      avatar: "https://example.com/a.png"
    )

    expect(user).to be_valid
  end

  it "is invalid without name" do
    user = described_class.new(name: nil)

    expect(user).not_to be_valid
    expect(user.errors.details[:name]).to include(hash_including(error: :blank))
  end

  it "has many identities" do
    association = described_class.reflect_on_association(:identities)

    expect(association.macro).to be(:has_many)
  end

  it "has many posts" do
    association = described_class.reflect_on_association(:posts)

    expect(association.macro).to be(:has_many)
  end

  it "has many comments" do
    association = described_class.reflect_on_association(:comments)

    expect(association.macro).to be(:has_many)
  end

  it "can have multiple identities" do
    user = create(:user)
    create(:identity, user: user, provider: "password", uid: "ada@example.com")
    create(:identity, user: user, provider: "google_oauth2", uid: "google-ada-123")

    expect(user.identities.count).to be >= 2
  end
end
