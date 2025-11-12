class ApplicationController < ActionController::Base
  # Enables Superglue rendering defaults for sensible view directories.
  before_action :use_jsx_rendering_defaults

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Switch locale based on `locale` param or default locale.
  around_action :switch_locale

  private

  def switch_locale(&action)
    # Check for locale in query params (lang or locale), route params, or use default
    locale = params[:lang] || params[:locale] || I18n.default_locale

    # Ensure the locale is valid before applying
    locale = I18n.available_locales.include?(locale.to_sym) ? locale : I18n.default_locale

    I18n.with_locale(locale, &action)
  end
end
