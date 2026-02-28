Rails.application.routes.draw do
  get "/api/health", to: "api/health#index"
end