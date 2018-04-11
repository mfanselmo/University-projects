class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :name
      t.string :title
      t.text :content
      t.references :forum

      t.timestamps
    end

    add_index :posts, :forum_id
  end
end
