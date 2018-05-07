class CreateModerators < ActiveRecord::Migration[5.1]
  def change
    create_table :moderators do |t|
      t.integer :user_id
      t.integer :forum_id

      t.timestamps
    end
  end
end
