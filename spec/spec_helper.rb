# frozen_string_literal: true

RSpec.configure do |config|
  config.example_status_persistence_file_path = "spec/examples.txt"
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
end
