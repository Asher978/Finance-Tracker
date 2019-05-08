# frozen_string_literal: true

require_relative 'boot'
require 'rails/all'

Bundler.require(*Rails.groups)

module StockTracker
  class Application < Rails::Application
    # use api ONLY
    config.api_only = true

    # cors
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3001'
        resource '*',
                 headers: :any,
                 expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
                 methods: %i[get post patch put delete options]
      end
    end
  end
end
