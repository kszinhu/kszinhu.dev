# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { "Ada Lovelace" }
    bio { "Pioneira da computação." }
    avatar { "https://example.com/avatars/ada.png" }
  end
end
