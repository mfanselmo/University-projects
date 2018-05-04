Rails.application.routes.draw do

  resources :postulations
  resources :moderators
  resources :subscriptions
  resources :forums do
    resources :posts
  end


  
  resources :posts do
    resources :comments
  end

  resources :comments
  
  # devise_for :users
  # devise_for :users, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout', password: 'secret', confirmation: 'verification', unlock: 'unblock', registration: 'register', sign_up: 'cmon_let_me_in'}

  # devise_for :users, controllers: { sessions: 'users/sessions' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # resources :users, only: [:show]

  root "index#home"

  # devise_for :users do
    # get 'logout' => 'devise/sessions#destroy'
  # end
  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  # get '/profile', to: "users#show"
  get '/admin', to: 'index#admin'
  get '/users/:id', to: "users#show", :as => :user

  post "like/:id" => "forums#upvote"
  post "dislike/:id" => "forums#downvote"

  post "subscribe/:user_id/:forum_id" => "subscriptions#create"
  delete "unsubscribe/:id" => "subscriptions#destroy"
end
