module Api
  module V1
    class UserStocksController < ApplicationController
      before_action :authenticate_user!

      def create
        # before creating a new stock, check if its already
        # in the stocks table
        stock = Stock.find_by_ticker(params[:stock_ticker])

        # if it does nor exist then use the Stock Model
        # method to look up that stock and save to db
        if stock.blank?
          stock = Stock.new_from_lookup(params[:stock_ticker])
          stock.save
        end

        # finally once the stock is saved then insert it
        # in our user_stocks table to associate the user
        # to this stock
        @user_stock = UserStock.create(user: current_user, stock: stock)
        return render json: { message: "Stock #{@user_stock.stock.name} was successfully added to portfolio." }
      end
    end
  end
end
