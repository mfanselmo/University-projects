class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.integer :poll_id
      t.string :content

      t.timestamps
    end
  end
end
