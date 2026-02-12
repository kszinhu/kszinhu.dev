# frozen_string_literal: true

require "devise/orm/active_record"

Devise.setup do |config|
  config.mailer_sender = "please-change-me@example.com"

  config.authentication_keys = [:provider, :uid]

  config.case_insensitive_keys = [:provider, :uid]
  config.strip_whitespace_keys = [:provider, :uid]

  config.skip_session_storage = [:http_auth]

  config.stretches = Rails.env.test? ? 1 : 12

  config.password_length = 6..128

  config.reset_password_within = 6.hours

  config.sign_out_via = :delete
end
