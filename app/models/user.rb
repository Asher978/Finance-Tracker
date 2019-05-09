# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :user_stocks
  has_many :stocks, through: :user_stocks

  # method to check to see if the stock that user
  # wishes to add to portfolio already exists in stock table
  # and if it is already associated with this user
  # this method will return a boolean (true || false)
  def stock_already_added?(ticker_symbol)

    # check: if stock exists in stock table
    stock = Stock.find_by_ticker(ticker_symbol)

    # return nill if not found
    return false unless stock

    # found the stock. Now check its association with the user
    user_stocks.where(stock_id: stock.id).exists?
  end

  # user has a limit of adding ONLY 10 stocks at a time
  # this method will check the user stock limits
  # method will return a boolean (true || false)
  def under_stock_limit?
    (user_stocks.count < 10)
  end

  # simply checks for the following:
  # ~ user stock limits
  # ~ stock exists in db
  # returns a boolean (true || false)
  def can_add_stock(ticker_symbol)
    under_stock_limit? && !stock_already_added?(ticker_symbol)
  end
end
