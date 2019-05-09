# frozen_string_literal: true

module Api
  module V1
    class StocksController < ApplicationController
      before_action :authenticate_user!

      def create
        @stocks = Stock.all
        render json: @stocks
      end

      def index
        @stocks = Stock.all
        render json: @stocks
      end

      def search
        if params[:stock].blank?
          return render json: { error: "You must provide a stock symbol!" }
        else
          @stock = Stock.new_from_lookup(params[:stock])
          return render json: { error: "You have entered an incorrect symbol!" } unless @stock
        end

        render json: @stock
      end
    end
  end
end
