class StocksController < ApplicationController

    def search
        if params[:stock].present?
            @stock = Stock.new_from_lookup(params[:stock])
            if @stock
                respond_to do |format|
                    format.js { render partial: "users/result" }
                end
            else
                respond_to do |format|
                    flash.now[:danger] = "You have entered an incorrect symbol!"
                    format.js { render partial: "users/result" }
                end
                
            end
        else
            respond_to do |format|
                flash.now[:danger] = "You must provide a stock symbol!"
                format.js { render partial: "users/result" }
            end
        end
    end
    
end