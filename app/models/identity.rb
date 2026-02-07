# frozen_string_literal: true

require "devise"

# == Schema Information
#
# Table name: identities
#
#  id              :integer          not null, primary key
#  provider        :string           not null
#  uid             :string           not null
#  password_digest :string
#  user_id         :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_identities_on_provider_and_uid  (provider,uid) UNIQUE
#  index_identities_on_user_id           (user_id)
#

class Identity < ApplicationRecord
  devise :database_authenticatable,
         authentication_keys: [:provider, :uid]

  belongs_to :user

  validates :provider, presence: true
  validates :uid, presence: true, uniqueness: { scope: :provider }

  def email_required?
    false
  end

  def will_save_change_to_email?
    false
  end

  alias_attribute :encrypted_password, :password_digest

  def self.password_provider
    "password"
  end

  def password_provider?
    provider == self.class.password_provider
  end
end
