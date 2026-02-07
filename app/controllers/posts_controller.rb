# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :use_jsx_rendering_defaults

  def show
    render(jsx: "Posts/Index", locals: { posts: [1] })
  end
end
