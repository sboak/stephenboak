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

get '/raf' do
  @title = 'World Bank RAF'
  @current_page = 'raf'
  haml :raf, :layout => :'project.layout'
end

get '/riyadh' do
  @title = 'Riyadh Region Project Dashboard'
  @current_page = 'riyadh'
  haml :riyadh, :layout => :'project.layout'
end

get '/dragonfly' do
  @title = 'Dragonfly'
  @current_page = 'dragonfly'
  haml :dragonfly, :layout => :'project.layout'
end