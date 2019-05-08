# frozen_string_literal: true

class AddCurrentSignInAtToUsresTable < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :current_sign_in_at, :datetime
  end
end
