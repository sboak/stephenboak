require 'rubygems'  
require 'sinatra'
require 'haml' 
  
get '/' do
  @title = 'Home'
  @current_page = 'home'
  haml :index, :layout => :'home.layout'
end

get '/beekman' do
  @title = 'The Beekman Tower'
  @current_page = 'beekman'
  haml :beekman, :layout => :'project.layout'
end

get '/doublevision' do
  @title = 'Computerized Double Vision Test'
  @current_page = 'doublevision'
  haml :doublevision, :layout => :'project.layout'
end

get '/dragonfly' do
  @title = 'Dragonfly'
  @current_page = 'dragonfly'
  haml :dragonfly, :layout => :'project.layout'
end

get '/foot' do
  @title = 'Diabetic Foot Research'
  @current_page = 'foot'
  haml :foot, :layout => :'project.layout'
end

get '/helios' do
  @title = 'Helios House'
  @current_page = 'helios'
  haml :helios, :layout => :'project.layout'
end

get '/ipod' do
  @title = 'Home-made iPod Case'
  @current_page = 'ipod'
  haml :ipod, :layout => :'project.layout'
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