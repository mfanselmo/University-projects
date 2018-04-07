class IndexController < ApplicationController
  protect_from_forgery with: :exception

  def hello
  	render html: "Hola a todos, esto no se ve"
  end
end
