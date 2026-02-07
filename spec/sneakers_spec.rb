# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Sneakers configuration" do
  let(:initializer_path) { Rails.root.join("config/initializers/sneakers.rb") }

  around do |example|
    original_env = ENV.to_hash
    Sneakers.clear!
    example.run
  ensure
    ENV.replace(original_env)
    Sneakers.clear!
    load initializer_path.to_s
  end

  def with_env(hash)
    hash.each { |key, value| ENV[key] = value }
  end

  it "integrates Sneakers logger with Rails logger" do
    with_env("RABBITMQ_URL" => "amqp://guest:guest@localhost:5672/")

    load initializer_path.to_s

    expect(Sneakers::CONFIG[:log]).to eq(Rails.logger)
    expect(Sneakers.logger).to eq(Rails.logger)
  end

  it "builds the AMQP uri and vhost from environment variables" do
    with_env(
      "RABBITMQ_HOST" => "rabbit",
      "RABBITMQ_PORT" => "5673",
      "RABBITMQ_USER" => "app",
      "RABBITMQ_PASSWORD" => "secret",
      "RABBITMQ_VHOST" => "app_vhost"
    )

    load initializer_path.to_s

    expect(Sneakers::CONFIG[:amqp]).to eq("amqp://app:secret@rabbit:5673/app_vhost")
    expect(Sneakers::CONFIG[:vhost]).to eq("/app_vhost")
  end
end

RSpec.describe TestMessageWorker do
  it "acks and logs payload" do
    worker = described_class.allocate

    expect(Rails.logger).to receive(:info).with(/\[TestMessageWorker\] payload=hello/)

    expect(worker.work("hello")).to eq(:ack)
  end
end
