# frozen_string_literal: true

require "rails_helper"

RSpec.describe Post, type: :model do
  # uses factories

  it "is valid with required attributes" do
    post = described_class.new(
      title: "Novo Post",
      body: "Conteúdo do post.",
      slug: "novo-post",
      user: create(:user)
    )

    expect(post).to be_valid
  end

  it "is invalid without title" do
    post = described_class.new(body: "Conteúdo", slug: "sem-titulo", user: create(:user))

    expect(post).not_to be_valid
    expect(post.errors.of_kind?(:title, :blank)).to be(true)
  end

  it "is invalid without body" do
    post = described_class.new(title: "Sem corpo", slug: "sem-corpo", user: create(:user))

    expect(post).not_to be_valid
    expect(post.errors.of_kind?(:body, :blank)).to be(true)
  end

  it "is invalid without slug" do
    post = described_class.new(title: "Sem slug", body: "Conteúdo", user: create(:user))

    expect(post).not_to be_valid
    expect(post.errors.of_kind?(:slug, :blank)).to be(true)
  end

  it "belongs to user" do
    association = described_class.reflect_on_association(:user)

    expect(association.macro).to be(:belongs_to)
  end

  it "has many comments" do
    association = described_class.reflect_on_association(:comments)

    expect(association.macro).to be(:has_many)
  end
end
