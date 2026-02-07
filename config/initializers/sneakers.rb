# frozen_string_literal: true

require "sneakers"

sneakers_env = ENV.fetch("SNEAKERS_ENV", Rails.env)

credentials = Rails.application.credentials.dig(:rabbitmq) || {}
rabbitmq_host = ENV.fetch("RABBITMQ_HOST", credentials[:host] || "127.0.0.1")
rabbitmq_port = ENV.fetch("RABBITMQ_PORT", credentials[:port] || "5672")
rabbitmq_vhost = ENV.fetch("RABBITMQ_VHOST", credentials[:vhost] || "/")
rabbitmq_vhost = "/#{rabbitmq_vhost}" unless rabbitmq_vhost.start_with?("/")
rabbitmq_user = ENV.fetch("RABBITMQ_USER", credentials[:user] || "guest")
rabbitmq_password = ENV.fetch("RABBITMQ_PASSWORD", credentials[:password] || "guest")

amqp_uri = ENV.fetch(
  "RABBITMQ_URL",
  "amqp://#{rabbitmq_user}:#{rabbitmq_password}@#{rabbitmq_host}:#{rabbitmq_port}#{rabbitmq_vhost}"
)

Sneakers.configure(
  amqp: amqp_uri,
  vhost: rabbitmq_vhost,
  env: sneakers_env,
  workers: ENV.fetch("SNEAKERS_WORKERS", "2").to_i,
  prefetch: ENV.fetch("SNEAKERS_PREFETCH", "10").to_i,
  heartbeat: ENV.fetch("SNEAKERS_HEARTBEAT", "30").to_i,
  timeout_job_after: ENV.fetch("SNEAKERS_TIMEOUT_JOB_AFTER", "0").to_i,
  log: Rails.logger
)

Sneakers.logger = Rails.logger
