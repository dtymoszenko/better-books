Rails.application.routes.draw do
  namespace :api do
    get "books/search", to: "books#search"

    post "auth/register", to: "auth#register"
    post "auth/login",    to: "auth#login"
    get  "auth/me",       to: "auth#me"
  end
end