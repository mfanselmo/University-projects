class AddDescriptionToForums < ActiveRecord::Migration[5.1]
  def change
    add_column :forums, :description, :string
  end
end
