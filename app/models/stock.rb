# frozen_string_literal: true

class Stock < ApplicationRecord
  has_many :user_stocks
  has_many :users, through: :user_stocks

  # look up a stock based on user input
  # and create a new object. Since the response
  # is pretty large from this look up, hence we are
  # only saving the necessary fields
  def self.new_from_lookup(ticker_symbol)
    begin
      looked_up_stock = StockQuote::Stock.quote(ticker_symbol)
      new(name: looked_up_stock.company_name, ticker: looked_up_stock.symbol, last_price: looked_up_stock.previous_close)
    rescue Exception => e
      return nil
    end
  end

  # method to look up if a specific stock
  # exists in the db by providing the ticker field
  def self.find_by_ticker(ticker_symbol)
    where(ticker: ticker_symbol).first
  end
end
