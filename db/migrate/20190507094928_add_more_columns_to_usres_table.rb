# frozen_string_literal: true

class AddMoreColumnsToUsresTable < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :sign_in_count, :integer, default: 0, null: false
  end
end
