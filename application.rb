require 'rubygems'  
require 'sinatra'
require 'haml' 
  
get '/' do
  @title = 'Home'
  @current_page = 'home'
  haml :index, :layout => :'home.layout'
end