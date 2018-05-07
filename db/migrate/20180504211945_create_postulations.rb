class CreatePostulations < ActiveRecord::Migration[5.1]
  def change
    create_table :postulations do |t|
      t.integer :user_id, unique: true
      t.integer :forum_id

      t.timestamps
    end
  end
end
