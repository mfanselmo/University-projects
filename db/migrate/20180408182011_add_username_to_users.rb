class AddUsernameToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :username, :string
    add_index :users, :username, unique: true
    add_column :users, :admin, :boolean, default: false
    # add_column :users, :likes, :int, default: 0
    # add_column :users, :dislikes, :int, default: 0
    # add_column :users, :kind, :int, default: 0
    # add_column :users, :points, :int, default: 0
  end
end
