class RootController < ApplicationController
  before_action :use_jsx_rendering_defaults

  def show
    render(jsx: "Root/Index", props: { name: params[:name] || "World" })
  end
end
