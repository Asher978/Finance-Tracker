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

        # is user tracking this stock already?
        stock_tracking_status = current_user.stock_already_added?(@stock.ticker)

        # can user add more stocks? get limits
        can_add_stocks = current_user.under_stock_limit?

        render json: { stock: @stock, userIsTracking: stock_tracking_status, canAddStock: can_add_stocks }
      end
    end
  end
end
