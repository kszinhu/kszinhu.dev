# frozen_string_literal: true

require "rails_helper"

RSpec.describe Identity, type: :model do
  # uses factories

  it "is valid with provider, uid, and user" do
    identity = described_class.new(
      provider: "password",
      uid: "new@example.com",
      user: create(:user),
      password: "password123"
    )

    expect(identity).to be_valid
  end

  it "is invalid without provider" do
    identity = described_class.new(uid: "missing-provider", user: create(:user))

    expect(identity).not_to be_valid
    expect(identity.errors.details[:provider].pluck(:error)).to include(:blank)
  end

  it "is invalid without uid" do
    identity = described_class.new(provider: "password", user: create(:user))

    expect(identity).not_to be_valid
    expect(identity.errors.details[:uid].pluck(:error)).to include(:blank)
  end

  it "uid is unique per provider" do
    existing = create(:identity, provider: "password", uid: "dup@example.com")
    identity = described_class.new(
      provider: existing.provider,
      uid: existing.uid,
      user: create(:user),
      password: "password123"
    )

    expect(identity).not_to be_valid
    expect(identity.errors.details[:uid].pluck(:error)).to include(:taken)
  end

  it "allows same uid across different providers" do
    existing = create(:identity, provider: "password", uid: "shared@example.com")
    identity = described_class.new(
      provider: "google_oauth2",
      uid: existing.uid,
      user: create(:user)
    )

    expect(identity).to be_valid
  end

  it "belongs to user" do
    association = described_class.reflect_on_association(:user)

    expect(association.macro).to be(:belongs_to)
  end
end
