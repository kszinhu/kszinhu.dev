class RootController < ApplicationController
  def show
    render(jsx: "Root/Index", locals: { page_title: "CR - @kszinhu" })
  end
end
