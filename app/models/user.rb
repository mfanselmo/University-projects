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


end
