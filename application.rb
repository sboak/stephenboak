require 'rubygems'  
require 'sinatra'
require 'haml' 
  
get '/' do
  @title = 'Home'
  @current_page = 'home'
  haml :index, :layout => :'home.layout'
end

get '/quid' do
  @title = 'Quid'
  @current_page = 'quid'
  haml :quid, :layout => :'project.layout'
end