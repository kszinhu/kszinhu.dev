# frozen_string_literal: true

require "rails_helper"

RSpec.describe Comment, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:post) }
  it { is_expected.to validate_presence_of(:body) }
  it { is_expected.to validate_presence_of(:status) }
  it { is_expected.to define_enum_for(:status).with_values(pending: 0, approved: 1) }

  it "is valid with required attributes" do
    user = create(:user)
    comment = described_class.new(
      body: "Comentário válido.",
      status: :pending,
      user: user,
      post: create(:post, user: user)
    )

    expect(comment).to be_valid
  end

  it "is invalid without body" do
    user = create(:user)
    post = create(:post, user: user)
    comment = described_class.new(status: :pending, user: user, post: post)

    expect(comment).not_to be_valid
    expect(comment.errors.details[:body]).to include(error: :blank)
  end

  it "defaults to pending status" do
    user = create(:user)
    comment = described_class.new(
      body: "Comentário sem status explícito.",
      user: user,
      post: create(:post, user: user)
    )

    expect(comment.status).to eq("pending")
  end

  it "accepts approved status" do
    user = create(:user)
    comment = described_class.new(
      body: "Comentário aprovado.",
      status: :approved,
      user: user,
      post: create(:post, user: user)
    )

    expect(comment).to be_valid
    expect(comment.status).to eq("approved")
  end
end
