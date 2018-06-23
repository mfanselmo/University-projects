class CreatePolls < ActiveRecord::Migration[5.1]
  def change
    create_table :polls do |t|
      t.string :title
      t.integer :post_id

      t.timestamps
    end
  end
end
