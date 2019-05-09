# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :stocks
      resources :user_stocks, only: [:create]
      post 'search_stocks', to: 'stocks#search'
    end
  end
end
