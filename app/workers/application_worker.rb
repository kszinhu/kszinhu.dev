# frozen_string_literal: true

require "sneakers"

class ApplicationWorker
  include Sneakers::Worker

  # Subclasses must bind a queue with `from_queue`.

  def work(payload)
    Rails.logger.info("[#{self.class.name}] payload=#{payload}")
    ack!
  end
end
