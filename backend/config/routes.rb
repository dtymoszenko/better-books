Rails.application.routes.draw do
  namespace :api do
    get "books/search", to: "books#search"
  end
end