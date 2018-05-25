Rails.application.routes.draw do

  get 'users/index'

  resources :postulations
  resources :moderators
  
  resources :subscriptions
  resources :forums do
    resources :posts
  end

  resources :searches
  
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

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  # devise_for :users do
  #   get '/users/sign_out' => 'devise/sessions#destroy'
  # end

  mount ActionCable.server, at: '/cable'

  match '/users',   to: 'users#index',   via: 'get'
  match '/users/:id', to: 'users#show', via: 'get'
  match 'users/:id' => 'users#destroy', :via => :delete

  get '/profile', to: "users#show"
  get '/admin', to: 'index#admin'
  get '/admin/postulation/:user_id/:forum_id', to: 'index#postulation', as: "postulation_info"
  get '/users/:id', to: "users#show", :as => :user

  post "like/:id", to: "forums#upvote"
  post "dislike/:id", to: "forums#downvote"

  post "c-like/:id", to: "comments#upvote"
  post "c-dislike/:id", to: "comments#downvote"

  post "subscribe/:user_id/:forum_id", to: "subscriptions#create"
  delete "unsubscribe/:id", to: "subscriptions#destroy"

  post "postulate/:user_id/:forum_id", to: "postulations#create"
  delete "unpostulate/:id", to: "postulations#destroy"

  post "moderate/:user_id/:forum_id", to: "moderators#create"
  delete "unmoderate/:id", to: "moderators#destroy"

  post "unread/:notification_id", to: "users#unread"
  delete "del_notify/:notification_id", to: "users#del_notify"

  post "ad_postulate/:user_id", to: "postulations#postulate_admin"

  post "administrate/:user_id", to: "users#admin_create"

end
