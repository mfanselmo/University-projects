Rails.application.routes.draw do

  get 'users/index'

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

  match '/users',   to: 'users#index',   via: 'get'
  match '/users/:id', to: 'users#show', via: 'get'

  get '/profile', to: "users#show"
  get '/admin', to: 'index#admin'
  get '/users/:id', to: "users#show", :as => :user

  post "like/:id" => "forums#upvote"
  post "dislike/:id" => "forums#downvote"

  post "c-like/:id" => "comments#upvote"
  post "c-dislike/:id" => "comments#downvote"

  post "subscribe/:user_id/:forum_id" => "subscriptions#create"
  delete "unsubscribe/:id" => "subscriptions#destroy"

  post "postulate/:user_id/:forum_id" => "postulations#create"
  delete "unpostulate/:id" => "postulations#destroy"

  post "moderate/:user_id/:forum_id" => "moderators#create"
  delete "unmoderate/:id" => "moderators#destroy"

end
