class AddUnreadToNotifications < ActiveRecord::Migration[5.1]
  def change
    add_column :notifications, :unread, :boolean, :default => true
  end
end
