# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { "Primeiro Post" }
    body { "Conteúdo do post." }
    published_at { Time.current }
    slug { "primeiro-post" }
    association :user
  end
end
