class CreateAttempts < ActiveRecord::Migration[5.1]
  def change
    create_table :attempts do |t|
      t.integer :user_id
      t.integer :question_id

      t.timestamps
    end
  end
end
