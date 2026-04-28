# frozen_string_literal: true

module ApplicationHelper
  def calculate_duration(start_date, end_date = nil)
    end_date ||= Date.today

    total_months = (end_date.year - start_date.year) * 12 + (end_date.month - start_date.month)
    years = total_months / 12
    months = total_months % 12

    {
      years: years,
      months: months,
      total_months: total_months,
    }
  end

  def format_duration(start_date, end_date = nil)
    duration = calculate_duration(start_date, end_date)
    years = duration[:years]
    months = duration[:months]

    parts = []

    if years > 0
      parts << I18n.t("date.duration.years", count: years)
    end

    if months > 0
      parts << I18n.t("date.duration.months", count: months)
    end

    if parts.empty?
      I18n.t("date.duration.less_than_month")
    else
      parts.join(I18n.t("date.duration.separator"))
    end
  end
end
