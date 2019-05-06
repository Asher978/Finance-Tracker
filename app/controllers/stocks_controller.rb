class StocksController < ApplicationController

    def search
        if params[:stock].blank?
            flash.now[:danger] = "You must provide a stock symbol!"
        else
            @stock = Stock.new_from_lookup(params[:stock])
            flash.now[:danger] = "You have entered an incorrect symbol!" unless @stock
        end
        respond_to do |format|
            format.js { render partial: "users/result" }
        end
    end

end