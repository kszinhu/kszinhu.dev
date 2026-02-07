# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    body { "Comentário válido." }
    status { :pending }
    association :user
    association :post
  end
end
