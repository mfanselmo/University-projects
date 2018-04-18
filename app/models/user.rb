class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  
  has_many :comments, dependent: :destroy
  has_many :posts, dependent: :destroy

  def user_params
    params.require(:user).permit(:user, :email)
  end

  validates :username, presence: :true, uniqueness: { case_sensitive: false }

  def increment(attribute, by = 1)
    self[attribute] ||= 0
    self[attribute] += by
    self.save
  end

  def decrement(attribute, by = 1)
    self[attribute] ||= 0
    self[attribute] -= by
    self.save
  end  

  def calculate_points(attribute)
    self[attribute] = self.likes - self.dislikes
    self.save
  end  

end
