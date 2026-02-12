# frozen_string_literal: true

FactoryBot.define do
  factory :identity do
    provider { "password" }
    sequence(:uid) { |n| "user#{n}@example.com" }
    password { "password123" }
    association :user
  end
end
