# frozen_string_literal: true

class TestMessageWorker < ApplicationWorker
  from_queue ENV.fetch("SNEAKERS_TEST_QUEUE", "test.messages")

  def work(payload)
    Rails.logger.info("[#{self.class.name}] payload=#{payload}")
    ack!
  end
end
